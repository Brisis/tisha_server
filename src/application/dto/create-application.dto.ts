import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  inputId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}