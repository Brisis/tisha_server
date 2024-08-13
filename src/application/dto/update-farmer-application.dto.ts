import { PartialType } from "@nestjs/mapped-types"
import { CreateFarmerApplicationDto } from "./create-farmer-application.dto";

export class UpdateFarmerApplicationDto extends PartialType(CreateFarmerApplicationDto) {}