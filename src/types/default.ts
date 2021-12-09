export interface BatYearResultDTO {
  games: number,
  plate_appearances: number,
  at_bats: number,
  runs: number,
  hits: number,
  doubles: number,
  triples: number,
  home_runs: number,
  rbis: number,
  stolen_bases: number,
  caught_stealing: number,
  walks: number,
  strikeouts: number,
  batting_average: number,
  obp: number,
  slg: number,
  ops: number,
  ops_plus: number,
  total_bases: number,
  gdp: number,
  hbp: number,
  sacrifice_fly: number,
  ibb: number,
}

export interface PitchYearResultDTO {
  wins: number,
  losses: number,
  win_percentage: number,
  era: number,
  games: number,
  games_started: number,
  games_finished: number,
  complete_games: number,
  shutouts: number,
  saves: number,
  innings_pitched: number,
  hits: number,
  runs: number,
  earned_runs: number,
  home_runs: number,
  walks: number,
  intentional_walks: number,
  strikeouts: number,
  hbp: number,
  balks: number,
  wild_pitches: number,
  batters_faced: number,
  era_plus: number,
  fip: number,
  whip: number,
  hits_per_9: number,
  bb_per_9: number,
  k_per_9: number,
}

export interface FieldYearResultDTO {
  year: number,
  games: number,
  games_started: number,
  innings: number,
  putouts: number,
  assists: number,
  errors: number,
  double_plays: number,
  fielding_percentage: number,
  drs: number,
  drs_per_year: number,
}