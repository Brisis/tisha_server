import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFarmerApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  inputId: string;

  @IsNumber()
  @IsOptional()
  payback: number;

  @IsBoolean()
  @IsOptional()
  received: boolean;
}