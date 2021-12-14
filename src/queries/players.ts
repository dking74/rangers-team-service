export const getAllPlayersQuery = () => `
SELECT row_to_json(p) as player
FROM public."Player" p`;

export const getPlayersByYearQuery = (year: number) => `
SELECT json_agg(p.*)
FROM public."Roster" r
INNER JOIN public."Player" p ON r.player_id = p.player_id
WHERE r.year = ${year}
GROUP BY r.year`;

export const getPlayerByPlayerIdQuery = (playerId: number) => `
SELECT row_to_json(p) as player
FROM public."Player" p
WHERE player_id = ${playerId}
LIMIT 1`;

/**
 * Get a specific player by their name and year from
 * the Roster table.
 * 
 * @param {string} first_name 
 * @param {string} last_name 
 * @param {number} year 
 * @returns 
 */
export const getPlayerByNameAndYearQuery = (
  first_name: string,
  last_name: string,
  year: string,
) => `
SELECT row_to_json(Player) as player
FROM public."Roster" Roster
INNER JOIN public."Player" Player
ON Roster.player_id = Player.player_id
WHERE Player.first_name = '${first_name}' AND 
Player.last_name = '${last_name}' AND Roster.year = ${year}`;

/**
 * Get players yearly batting/pitching results organized
 * by the individual year.
 * 
 * @param {number} playerId 
 * @returns 
 */
export const getAllYearPlayerResultsQuery = (
  playerId: number,
): string => `
SELECT json_object_agg(
  r.year,
  json_build_object(
    'batting', batting_result.result->'b_result',
    'pitching', pitching_result.result->'p_result'
  )
  ORDER BY r.year
)
FROM public."Player" p
INNER JOIN public."Roster" r ON p.player_id = r.player_id
LEFT JOIN (
  SELECT year, player_id, json_object_agg('b_result', b_result) as result
  FROM public."PlayerBatYearResult" b_result
  WHERE player_id = ${playerId}
  GROUP BY player_id, year
) batting_result ON r.player_id = batting_result.player_id AND r.year = batting_result.year
LEFT JOIN (
  SELECT year, player_id, json_object_agg('p_result', p_result) as result
  FROM public."PlayerPitchYearResult" p_result
  WHERE player_id = ${playerId}
  GROUP BY player_id, year
) pitching_result ON p.player_id = pitching_result.player_id AND r.year = pitching_result.year
WHERE p.player_id = ${playerId}`

/**
 * Query to get player batting/pitching averages during their
 * tenure with the team.
 * 
 * @param {number} playerId 
 * @returns 
 */
export const getPlayerStatAveragesQuery = (playerId: number) => `
SELECT json_build_object(
    'batting', (CASE WHEN data.batting_data->>'games' IS NOT NULL
        THEN data.batting_data
        ELSE NULL
      END
    ),
    'pitching', (CASE WHEN data.pitch_data->>'games' IS NOT NULL
        THEN data.pitch_data
        ELSE NULL
      END
    )
  )
FROM (
    SELECT json_build_object(
        'games', ROUND(AVG(b_result.games)::numeric, 2),
        'plate_appearances', ROUND(AVG(b_result.plate_appearances)::numeric, 2),
        'at_bats', ROUND(AVG(b_result.at_bats)::numeric, 2),
        'runs', ROUND(AVG(b_result.runs)::numeric, 2),
        'hits', ROUND(AVG(b_result.hits)::numeric, 2),
        'doubles', ROUND(AVG(b_result.doubles)::numeric, 2),
        'triples', ROUND(AVG(b_result.triples)::numeric, 2),
        'home_runs', ROUND(AVG(b_result.home_runs)::numeric, 2),
        'rbis', ROUND(AVG(b_result.rbis)::numeric, 2),
        'stolen_bases', ROUND(AVG(b_result.stolen_bases)::numeric, 2),
        'caught_stealing', ROUND(AVG(b_result.caught_stealing)::numeric, 2),
        'walks', ROUND(AVG(b_result.walks)::numeric, 2),
        'strikeouts', ROUND(AVG(b_result.strikeouts)::numeric, 2),
        'batting_average', ROUND(AVG(b_result.batting_average)::numeric, 3),
        'obp', ROUND(AVG(b_result.obp)::numeric, 3),
        'slg', ROUND(AVG(b_result.slg)::numeric, 3),
        'ops', ROUND(AVG(b_result.ops)::numeric, 3),
        'ops_plus', ROUND(AVG(b_result.ops_plus)::numeric, 3),
        'total_bases', ROUND(AVG(b_result.total_bases)::numeric, 2),
        'gdp', ROUND(AVG(b_result.gdp)::numeric, 2),
        'hbp', ROUND(AVG(b_result.hbp)::numeric, 2),
        'sacrifice_fly', ROUND(AVG(b_result.sacrifice_fly)::numeric, 2),
        'ibb', ROUND(AVG(b_result.ibb)::numeric, 2)
    ) as batting_data,
    json_build_object(
        'wins', ROUND(AVG(p_result.wins)::numeric, 2),
        'losses', ROUND(AVG(p_result.losses)::numeric, 2),
        'win_percentage', ROUND(AVG(p_result.losses)::numeric, 3),
        'era', ROUND(AVG(p_result.era)::numeric, 3),
        'games', ROUND(AVG(p_result.games)::numeric, 2),
        'games_started', ROUND(AVG(p_result.games_started)::numeric, 2),
        'games_finished', ROUND(AVG(p_result.games_finished)::numeric, 2),
        'complete_games', ROUND(AVG(p_result.complete_games)::numeric, 2),
        'shutouts', ROUND(AVG(p_result.shutouts)::numeric, 2),
        'saves', ROUND(AVG(p_result.saves)::numeric, 2),
        'innings_pitched', ROUND(AVG(p_result.innings_pitched)::numeric, 2),
        'hits', ROUND(AVG(p_result.hits)::numeric, 2),
        'runs', ROUND(AVG(p_result.runs)::numeric, 2),
        'earned_runs', ROUND(AVG(p_result.earned_runs)::numeric, 2),
        'home_runs', ROUND(AVG(p_result.home_runs)::numeric, 2),
        'walks', ROUND(AVG(p_result.walks)::numeric, 2),
        'intentional_walks', ROUND(AVG(p_result.intentional_walks)::numeric, 2),
        'strikeouts', ROUND(AVG(p_result.strikeouts)::numeric, 2),
        'hbp', ROUND(AVG(p_result.hbp)::numeric, 2),
        'balks', ROUND(AVG(p_result.balks)::numeric, 2),
        'wild_pitches', ROUND(AVG(p_result.wild_pitches)::numeric, 2),
        'batters_faced', ROUND(AVG(p_result.batters_faced)::numeric, 2),
        'era_plus', ROUND(AVG(p_result.era_plus)::numeric, 3),
        'fip', ROUND(AVG(p_result.fip)::numeric, 2),
        'whip', ROUND(AVG(p_result.whip)::numeric, 3),
        'hits_per_9', ROUND(AVG(p_result.hits_per_9)::numeric, 2),
        'bb_per_9', ROUND(AVG(p_result.bb_per_9)::numeric, 2),
        'k_per_9', ROUND(AVG(p_result.k_per_9)::numeric, 2)
    ) as pitch_data
    FROM public."Player" p
    LEFT JOIN public."PlayerBatYearResult" b_result ON p.player_id = b_result.player_id
    LEFT JOIN public."PlayerPitchYearResult" p_result ON p.player_id = p_result.player_id
    WHERE p.player_id = ${playerId}
) data`;

export const searchPlayerQuery = (searchString: string) => `
SELECT
  p.player_id,
  CONCAT(p.first_name, ' ', p.last_name) as name,
  p.age,
  p.position,
  p.height,
  p.weight,
  p.throws,
  p.bats
FROM public."Player" p
WHERE position(LOWER('${searchString}') in LOWER(p.first_name)) > 0 OR 
position(LOWER('${searchString}') in LOWER(p.last_name)) > 0 OR
position(LOWER('${searchString}') in LOWER(CONCAT(p.first_name, ' ', p.last_name))) > 0`;