import {
  IsDefined,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { StrategyType } from './generate-strategy.request.dto';

export class SaveStrategyRequestDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsDefined()
  @IsString()
  opponentClub: string;

  @IsDefined()
  @IsString()
  club: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  type: StrategyType;

  @IsDefined()
  @IsNumber()
  userId: number;
}
