import { IsDate, IsDateString, isDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;
  
  @IsDateString()
  @IsOptional()
  dob: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  nationalId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['FARMER','INPUTCOORDINATOR','FIELDOFFICER','SUPERUSER'], {
    message: "Valid role required"
  })
  @IsOptional()
  role: "FARMER" | "INPUTCOORDINATOR" | "FIELDOFFICER" | "SUPERUSER";

  @IsEnum(['MALE','FEMALE'], {
    message: "Valid gender required"
  })
  @IsOptional()
  gender: "MALE" | "FEMALE";

  @IsEnum(['Owner','Lease','Sharing'], {
    message: "Valid landOwnership required"
  })
  @IsOptional()
  landOwnership: "Owner" | "Lease" | "Sharing";

  @IsEnum(['Commercial','Subsistence'], {
    message: "Valid farmerType required"
  })
  @IsOptional()
  farmerType: "Commercial" | "Subsistence";

  @IsEnum(['Grain','Fruit','Vegetable'], {
    message: "Valid cropType required"
  })
  @IsOptional()
  cropType: "Grain" | "Fruit" | "Vegetable";

  @IsEnum(['Goat','Cattle','Poultry','Aquatic'], {
    message: "Valid livestockType required"
  })
  @IsOptional()
  livestockType: "Goat" | "Cattle" | "Poultry"|"Aquatic";

  @IsNumber()
  @IsOptional()
  farmSize: number;

  @IsNumber()
  @IsOptional()
  livestockNumber: number;

  @IsString()
  @IsOptional()
  coordinates: string;

  @IsString()
  @IsOptional()
  locationId: string;
}