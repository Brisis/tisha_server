import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    farmSize: number;

    @IsString()
    @IsNotEmpty()
    locationId: string;

    @IsString()
    @IsOptional()
    coordinates: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
