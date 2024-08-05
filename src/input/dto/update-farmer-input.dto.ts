import { PartialType } from "@nestjs/mapped-types"
import { CreateFarmerInputDto } from "./create-farmer-input.dto";

export class UpdateFarmerInputDto extends PartialType(CreateFarmerInputDto) {}