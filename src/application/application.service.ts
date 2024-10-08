import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CreateFarmerApplicationDto } from './dto/create-farmer-application.dto';
import { UpdateFarmerApplicationDto } from './dto/update-farmer-application.dto';

@Injectable()
export class ApplicationService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.inputApplication.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                input: true,
                user: true,
            }
        })
    }

    async findFarmerApplications(userId: string) {
        return this.prisma.inputApplication.findMany({
            where: {
                userId: userId
            },
            orderBy: {
               createdAt: 'desc'
            },
            include: {
                input: true,
                user: true,
            }
        })
    }

    async findOne(id: string) {
        const inputApplication = await this.prisma.inputApplication.findUnique({
            where: {
                id
            }
        })

        if (!inputApplication) {
            throw new NotFoundException
        }

        return inputApplication
    }

    async create(createApplicationDto: CreateApplicationDto) {
        try {
            await this.prisma.inputApplication.create({
                data: {
                    inputId: createApplicationDto.inputId,
                    message: createApplicationDto.message,
                    quantity: createApplicationDto.quantity,
                    userId: createApplicationDto.userId,
                    status: "INPROGRESS"
                }
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
    
    async accept(createFarmerApplicationDto: CreateFarmerApplicationDto) {
        const inputApplication = await this.findOne(createFarmerApplicationDto.applicationId)

        if (!inputApplication) {
            throw new NotFoundException
        }

        const input = await this.prisma.input.findUnique({
            where: {
                id: createFarmerApplicationDto.inputId
            }
        })

        if (!input) {
            throw new NotFoundException
        }
      
        await this.prisma.inputApplication.update({
            where: {
                id: inputApplication.id
            },
            data: {
                status: "ACCEPTED"
            }
        })

        await this.prisma.input.update({
            where: {
                id: inputApplication.inputId
            },
            data: {
                quantity: input.quantity - createFarmerApplicationDto.quantity
            }
        })

        await this.prisma.user.update({
            where: {
                id: createFarmerApplicationDto.userId
            },
            data: {
                inputs: {
                    create: {
                        inputId: createFarmerApplicationDto.inputId,
                        quantity: createFarmerApplicationDto.quantity,
                    }
                }
            }
        })

        return await this.findAll()
    }

    async reject (id: string) {
        const inputApplication = await this.findOne(id)

        if (!inputApplication) {
            throw new NotFoundException
        }

        await this.prisma.inputApplication.update({
            where: {
                id: inputApplication.id
            },
            data: {
                status: 'REJECTED'
            }
        })

        return await this.findAll()
    }

    async update(id: string, updateApplicationDto: UpdateApplicationDto) {
        const inputApplication = await this.findOne(id)

        if (!inputApplication) {
            throw new NotFoundException
        }
      
        const updatedApplication = await this.prisma.inputApplication.update({
            where: {
                id
            },
            data: updateApplicationDto
        })

        return updatedApplication;
    }

    async updateFarmerApplication(id: string, userId: string, updateFarmerApplicationDto: UpdateFarmerApplicationDto) {
        
        
        const input = await this.prisma.inputApplication.findUnique({
            where: {
                id: id
            }
        })

        if (!input) {
            throw new NotFoundException
        }
      
        await this.prisma.inputApplication.update({
            where: {
                id: id
            },
            data: {
            }
        })

        return await this.findFarmerApplications(userId);
    }

    

    async delete(id: string) {
        const input = await this.findOne(id)

        if (!input) {
            throw new NotFoundException
        }

        return await this.prisma.inputApplication.delete({
            where: {
                id
            }
        })
    }
}
