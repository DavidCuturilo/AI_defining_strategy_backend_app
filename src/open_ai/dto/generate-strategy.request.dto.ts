export interface GenerateStrategyRequestDto {
  club: string;
  opponentClub: string;
  league: string;
  desiredStrategy: StrategyType[];
}

export enum StrategyType {
  ATTACK = 'Attack',
  DEFENSE = 'Defense',
  SPECIFIC_STRATEGY = 'Specific strategy',
  INCLUDE_ALL = 'Include all',
}
