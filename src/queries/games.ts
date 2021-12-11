export const getAllGamesQuery = `
SELECT json_object_agg(
  data.year,
  data.json_agg
)
FROM (
  SELECT g.year, json_agg(g.*)
  FROM public."Game" g
  GROUP BY g.year
  ORDER BY g.year
) data`;

export const getGameByYearQuery = (year: number) => `
SELECT json_agg(g)
FROM public."Game" g
WHERE g.year = ${year}`;

export const getGameByGameIdQuery = (gameId: number) => `
SELECT row_to_json(g)
FROM public."Game" g
WHERE g.game_id = ${gameId}`;