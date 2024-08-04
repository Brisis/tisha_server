import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

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