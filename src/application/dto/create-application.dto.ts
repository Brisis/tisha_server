import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  inputId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}