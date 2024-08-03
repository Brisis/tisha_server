import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantiy: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  locationId: string;
}