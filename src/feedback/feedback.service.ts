import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.feedbackMessages.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        })
    }

    async findFarmerFeedbacks(userId: string) {
        return this.prisma.feedbackMessages.findMany({
            where: {
                userId: userId
            },
            orderBy: {
               createdAt: 'desc'
            },
            include: {
                user: true
            }
        })
    }

    async findOne(id: string) {
        const input = await this.prisma.feedbackMessages.findUnique({
            where: {
                id
            }
        })

        if (!input) {
            throw new NotFoundException
        }

        return input
    }

    async create(createFeedbackDto: CreateFeedbackDto) {
        try {
            await this.prisma.feedbackMessages.create({
                data: createFeedbackDto
            })

            return await this.findAll()
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
        const input = await this.findOne(id)

        if (!input) {
            throw new NotFoundException
        }
      
        const updatedFeedback = await this.prisma.feedbackMessages.update({
            where: {
                id
            },
            data: updateFeedbackDto
        })

        return updatedFeedback;
    }

    async delete(id: string) {
        const input = await this.findOne(id)

        if (!input) {
            throw new NotFoundException
        }

        return await this.prisma.input.delete({
            where: {
                id
            }
        })
    }
}
