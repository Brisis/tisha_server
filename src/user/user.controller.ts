import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id)
    }
}
