import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtGuard } from '../auth/guard';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedbacks')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService){}

    @Get()
    findAll() {
        return this.feedbackService.findAll()
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.create(createFeedbackDto)
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.feedbackService.findOne(id)
    }

    @Get("/user/:userId")
    findFarmerFeedbacks(@Param("userId") userId: string) {
        return this.feedbackService.findFarmerFeedbacks(userId)
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        return this.feedbackService.update(id, updateFeedbackDto)
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.feedbackService.delete(id)
    }
}
