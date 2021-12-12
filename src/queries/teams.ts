export const getAllTeamPersonnelQuery = `
SELECT json_object_agg(
    tm.year, json_build_object(
       'manager', tm.manager,
       'general_manager', tm.general_manager,
       'president', tm.president,
       'coaches', tc.json_agg
    )
    ORDER BY tm.year
)
FROM (
SELECT c.year, json_agg(c)
FROM public."TeamCoach" c
GROUP BY c.year
) tc, public."TeamManagement" tm
WHERE tc.year = tm.year`;

export const getTeamPersonnelByYearQuery = (year: number) => `
SELECT json_build_object(
    'manager', tm.manager,
    'general_manager', tm.general_manager,
    'president', tm.president,
    'coaches', tc.json_agg
)
FROM (
    SELECT c.year, json_agg(c)
    FROM public."TeamCoach" c
    GROUP BY c.year
) tc, public."TeamManagement" tm
WHERE tc.year = tm.year AND tc.year = ${year}`;

export const getAllStatTeamResultsQuery = `
SELECT json_object_agg(
    batting_result.year,
    json_build_object(
      'batting', batting_result.result,
      'pitching', pitching_result.result
    )
	ORDER BY batting_result.year
)
FROM (
    SELECT year, json_agg(b_result) as result
    FROM public."TeamBatYearResult" b_result
    GROUP BY 1
) batting_result, (
    SELECT year, json_agg(p_result) as result
    FROM public."TeamPitchYearResult" p_result
    GROUP BY 1
) pitching_result
WHERE batting_result.year = pitching_result.year`;

export const getTeamStatResultsByYearQuery = (year: number) => `
SELECT json_build_object(
    'batting', batting_result.result,
    'pitching', pitching_result.result
)
FROM (
    SELECT year, json_agg(b_result) as result
    FROM public."TeamBatYearResult" b_result
    GROUP BY 1
) batting_result, (
    SELECT year, json_agg(p_result) as result
    FROM public."TeamPitchYearResult" p_result
    GROUP BY 1
) pitching_result
WHERE batting_result.year = pitching_result.year AND batting_result.year = ${year}`;

export const getAllTeamResultsQuery = `
SELECT json_object_agg(
	tr.year,
	json_build_object(
		'wins', tr.wins,
		'losses', tr.losses,
		'ties', tr.ties,
		'division_place', tr.division_place,
		'attendance', tr.attendance,
		'postseason', COALESCE(team_post_result.json_agg, to_json('[]'::text))
	)
)
FROM public."TeamResult" tr
LEFT JOIN (
	SELECT tpr.team_result_id, json_agg(tpr)
	FROM public."TeamPostseasonResult" tpr
	GROUP BY 1
) team_post_result ON tr.team_result_id = team_post_result.team_result_id`;

export const getTeamResultsByYearQuery = (year: number) => `
SELECT json_build_object(
	'wins', tr.wins,
	'losses', tr.losses,
	'ties', tr.ties,
	'division_place', tr.division_place,
	'attendance', tr.attendance,
	'postseason', COALESCE(team_post_result.json_agg, to_json('[]'::text))
)
FROM public."TeamResult" tr
LEFT JOIN (
	SELECT tpr.team_result_id, json_agg(tpr)
	FROM public."TeamPostseasonResult" tpr
	GROUP BY 1
) team_post_result ON tr.team_result_id = team_post_result.team_result_id
WHERE tr.year = ${year}`;