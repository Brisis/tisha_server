import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.location.findMany({
            select: {
                id: true,
                name: true,
                city: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
    }

    async findOne(id: string) {
        const location = await this.prisma.location.findUnique({
            where: {
                id
            }
        })

        if (!location) {
            throw new NotFoundException
        }

        return location
    }

    async create(createLocationDto: CreateLocationDto) {
        try {
            const location = await this.prisma.location.create({
                data: createLocationDto
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

    async update(id: string, updateLocationDto: UpdateLocationDto) {
        const location = await this.findOne(id)

        if (!location) {
            throw new NotFoundException
        }
      
        const updatedLocation = await this.prisma.location.update({
            where: {
                id
            },
            data: updateLocationDto
        })

        return updatedLocation;
    }

    async delete(id: string) {
        const location = await this.findOne(id)

        if (!location) {
            throw new NotFoundException
        }

        return await this.prisma.location.delete({
            where: {
                id
            }
        })
    }
}
