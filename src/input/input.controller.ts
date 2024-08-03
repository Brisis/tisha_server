import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InputService } from './input.service';
import { JwtGuard } from '../auth/guard';
import { UpdateInputDto } from './dto/update-input.dto';
import { CreateInputDto } from './dto/create-input.dto';

@Controller('inputs')
export class InputController {
    constructor(private inputService: InputService){}

    @Get()
    findAll() {
        return this.inputService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.inputService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createInputDto: CreateInputDto) {
        return this.inputService.create(createInputDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateInputDto: UpdateInputDto) {
        return this.inputService.update(id, updateInputDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.inputService.delete(id)
    }
}
