import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtGuard } from '../auth/guard';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateFarmerApplicationDto } from './dto/create-farmer-application.dto';
import { UpdateFarmerApplicationDto } from './dto/update-farmer-application.dto';

@Controller('applications')
export class ApplicationController {
    constructor(private applicationService: ApplicationService){}

    @Get()
    findAll() {
        return this.applicationService.findAll()
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationService.create(createApplicationDto)
    }

    @UseGuards(JwtGuard)
    @Post("/accept")
    accept(@Body() createFarmerApplicationDto: CreateFarmerApplicationDto) {
        return this.applicationService.accept(createFarmerApplicationDto)
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.applicationService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Post("/reject/:id")
    reject(@Param("id") id: string) {
        return this.applicationService.reject(id)
    }

    @Get("/user/:userId")
    findFarmerApplications(@Param("userId") userId: string) {
        return this.applicationService.findFarmerApplications(userId)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
        return this.applicationService.update(id, updateApplicationDto)
    }

    @UseGuards(JwtGuard)
    @Patch("/update-assigned/:id/user/:userId")
    updateFarmerApplication(@Param("id") id: string,@Param("userId") userId: string, @Body() updateFarmerApplicationDto: UpdateFarmerApplicationDto) {
        return this.applicationService.updateFarmerApplication(id, userId, updateFarmerApplicationDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.applicationService.delete(id)
    }
}
