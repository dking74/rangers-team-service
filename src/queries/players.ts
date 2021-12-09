export const getAllPlayersQuery = () => `
SELECT row_to_json(p) as player
FROM public."Player" p`;

export const getPlayerByPlayerIdQuery = (playerId: number) => `
SELECT row_to_json(p) as player
FROM public."Player" p
WHERE player_id = ${playerId}
LIMIT 1`;