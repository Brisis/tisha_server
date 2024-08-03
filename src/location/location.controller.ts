import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtGuard } from '../auth/guard';

@Controller('locations')
export class LocationController {
    constructor(private locationService: LocationService){}

    @Get()
    findAll() {
        return this.locationService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.locationService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(createLocationDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateLocationDto: UpdateLocationDto) {
        return this.locationService.update(id, updateLocationDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.locationService.delete(id)
    }
}
