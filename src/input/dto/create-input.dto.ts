import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  originalQuantity: number;

  @IsString()
  @IsOptional()
  unit: string;

  @IsEnum(['Tructor','Seeds','Fertiliser','Insecticide'], {
    message: "Valid type required"
  })
  @IsNotEmpty()
  type: "Tructor" | "Seeds" | "Fertiliser" | "Insecticide";

  @IsEnum(['Pfumvudza','Command','Donors','NGO','WHO'], {
    message: "Valid type required"
  })
  @IsNotEmpty()
  scheme: "Pfumvudza" | "Command" | "Donors" | "NGO" | "WHO";

  @IsString()
  @IsOptional()
  barcode: string;

  @IsString()
  @IsOptional()
  chassisNumber: string;

  @IsString()
  @IsOptional()
  engineType: string;

  @IsString()
  @IsOptional()
  numberPlate: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  locationId: string;
}