import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';
import { CreateFarmerInputDto } from './dto/create-farmer-input.dto';
import { UpdateFarmerInputDto } from './dto/update-farmer-input.dto';

@Injectable()
export class InputService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.input.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async findFarmerInputs(userId: string) {
        return this.prisma.assignedInput.findMany({
            where: {
                userId: userId
            },
            orderBy: {
               createdAt: 'desc'
            },
            include: {
                input: true
            }
        })
    }

    async findOne(id: string) {
        const input = await this.prisma.input.findUnique({
            where: {
                id
            }
        })

        if (!input) {
            throw new NotFoundException
        }

        return input
    }

    async create(createInputDto: CreateInputDto) {
        try {
            await this.prisma.input.create({
                data: createInputDto
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

    async addFarmerInput(userId: string, createFarmerInputDto: CreateFarmerInputDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException("User not found")
        }

        // let userItems = []
        // for (let i = 0; i < user.inputs.length; i++) {
        //     const element = {
        //         id: user.inputs[i].id,
        //         inputId: user.inputs[i].inputId
        //     }
        //     userItems.push(element)
        // }

        // let connArr = inputs.filter(x => !userItems.map(ui => ui.inputId).includes(x.id));        
        
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                inputs: {
                    create: createFarmerInputDto
                }
            },
            include: {
                inputs: true,
                location: true
            }
        })

        return await this.findFarmerInputs(userId);
    }

    async update(id: string, updateInputDto: UpdateInputDto) {
        const input = await this.findOne(id)

        if (!input) {
            throw new NotFoundException
        }
      
        const updatedInput = await this.prisma.input.update({
            where: {
                id
            },
            data: updateInputDto
        })

        return updatedInput;
    }

    async updateFarmerInput(id: string, userId: string, updateFarmerInputDto: UpdateFarmerInputDto) {
        
        
        const input = await this.prisma.assignedInput.findUnique({
            where: {
                id: id
            }
        })

        if (!input) {
            throw new NotFoundException
        }
      
        await this.prisma.assignedInput.update({
            where: {
                id: id
            },
            data: {
                payback: updateFarmerInputDto.payback,
                received: updateFarmerInputDto.received
            }
        })

        return await this.findFarmerInputs(userId);
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
