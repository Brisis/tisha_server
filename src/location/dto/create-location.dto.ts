import { IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  city: string
}