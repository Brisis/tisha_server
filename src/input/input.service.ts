import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInputDto } from './dto/create-input.dto';
import { UpdateInputDto } from './dto/update-input.dto';

@Injectable()
export class InputService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.input.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc'
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
            const input = await this.prisma.input.create({
                data: createInputDto
            })

            return input
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
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
