import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['FARMER','DISTRIBUTOR','SUPERUSER'], {
    message: "Valid role required"
  })
  @IsOptional()
  role: "FARMER" | "DISTRIBUTOR" | "SUPERUSER";

  @IsNumber()
  @IsNotEmpty()
  farmSize: number;

  @IsString()
  @IsOptional()
  coordinates: string;

  @IsString()
  @IsOptional()
  locationId: string;
}