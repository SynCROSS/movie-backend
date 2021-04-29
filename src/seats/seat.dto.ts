import { IsNumber, IsString } from 'class-validator';

export class SeatDTO {
  @IsString({ each: true }) seatNumbers!: string[];
  @IsNumber() seatCount!: number;
  @IsNumber() theaterID!: number;
  @IsString() username!: string;
}
