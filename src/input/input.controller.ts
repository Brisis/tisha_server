import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InputService } from './input.service';
import { JwtGuard } from '../auth/guard';
import { UpdateInputDto } from './dto/update-input.dto';
import { CreateInputDto } from './dto/create-input.dto';
import { CreateFarmerInputDto } from './dto/create-farmer-input.dto';
import { UpdateFarmerInputDto } from './dto/update-farmer-input.dto';

@Controller('inputs')
export class InputController {
    constructor(private inputService: InputService){}

    @Get()
    findAll() {
        return this.inputService.findAll()
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createInputDto: CreateInputDto) {
        return this.inputService.create(createInputDto)
    }

    @UseGuards(JwtGuard)
    @Get("/assigned")
    findAllFarmerInputs() {
        return this.inputService.findAllFarmerInputs()
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.inputService.findOne(id)
    }

    @Get("/user/:userId")
    findFarmerInputs(@Param("userId") userId: string) {
        return this.inputService.findFarmerInputs(userId)
    }

    @Post("/add-to-farmer/:userId")
    addFarmerInput(@Param("userId") userId: string, @Body() createFarmerInputDto: CreateFarmerInputDto) {
        return this.inputService.addFarmerInput(userId, createFarmerInputDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateInputDto: UpdateInputDto) {
        return this.inputService.update(id, updateInputDto)
    }

    @UseGuards(JwtGuard)
    @Patch("/update-assigned/:id/user/:userId")
    updateFarmerInput(@Param("id") id: string,@Param("userId") userId: string, @Body() updateFarmerInputDto: UpdateFarmerInputDto) {
        return this.inputService.updateFarmerInput(id, userId, updateFarmerInputDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.inputService.delete(id)
    }
}
