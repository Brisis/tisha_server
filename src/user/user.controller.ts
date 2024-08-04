import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get()
    findAll(@Query('query') query?: string) {
        return this.userService.findAll(query);
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(JwtGuard)
    @Get("authenticate")
    getLoggedUser(@GetUser() user: User) {          
        if(user) {  
            return this.userService.findOne(user.id);
        }   
        return new ForbiddenException("Token Expired")
    }
    
    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Patch(":id/update")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id/update-role")
    updateUserRole(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateRole(id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Patch(":id/update-inputs")
    updateUserCategories(@Param("id") id: string, @Body() inputs: any) {
        return this.userService.updateUserInputs(id, inputs["inputs"])
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id)
    }
}
