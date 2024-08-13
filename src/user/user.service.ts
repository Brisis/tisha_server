import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto';
import * as argon from "argon2"

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    
    async findAll(query?: string) {
        let users = []
        if (query != undefined) {
            users = await this.prisma.user.findMany({
                where: {
                    AND: [
                        {name: {
                            contains: query,
                            mode: 'insensitive'
                        },},
                        {role: "FARMER"}
                    ]
                 
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    inputs: {
                        include: {
                            input: true
                        }
                    },
                    location: true
                }
            })

        }
        else {
            users = await this.prisma.user.findMany({
                where: {
                    role: "FARMER"
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    inputs: {
                        include: {
                            input: true
                        }
                    },
                    location: true
                }
            })
        }


        return users
    }

    async create(createUserDto: CreateUserDto) {        
        try {
            const hashedPassword = await argon.hash(createUserDto.password)
            const role = "FARMER"

            await this.prisma.user.create({
                data: {
                    role: role,
                    name: createUserDto.name,
                    surname: createUserDto.surname,
                    dob: createUserDto.dob,
                    age: createUserDto.age,
                    gender: createUserDto.gender,
                    phone: createUserDto.phone,
                    address: createUserDto.address,
                    nationalId: createUserDto.nationalId,
                    locationId: createUserDto.locationId,
                    farmSize: createUserDto.farmSize,
                    email: createUserDto.email,
                    coordinates: createUserDto.coordinates,
                    landOwnership: createUserDto.landOwnership,
                    farmerType: createUserDto.farmerType,
                    cropType: createUserDto.cropType,
                    livestockType: createUserDto.livestockType,
                    livestockNumber: createUserDto.livestockNumber,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })

            
            return await this.findAll()
            
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Credentials taken")
                }
            }
            else {
                throw error
            }
        }
    }


    async findOne(id: string) {        
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                inputs: {
                    include: {
                        input: true
                    }
                },
                location: true
            }
        })        

        if (!user) {
            throw new NotFoundException
        }        

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (updateUserDto.locationId) {
            const locationId = updateUserDto.locationId

            const location = await this.prisma.location.findUnique({
                where: {
                    id: locationId
                }
            })

            if (!location) {
                throw new NotFoundException("Location not found") 
            }
        }  
      
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto,
            include: {
                inputs: true,
                location: true
            }
        })        

        return updatedUser;
    }

    async updateRole(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException("User not found")
        }
      
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto,
            include: {
                inputs: true,
                location: true
            }
        })

        return updatedUser;
    }

    async updateUserInputs(id: string, inputs: any[]) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        let userItems = []
        for (let i = 0; i < user.inputs.length; i++) {
            const element = {
                id: user.inputs[i].id,
                inputId: user.inputs[i].inputId
            }
            userItems.push(element)
        }

        let connArr = inputs.filter(x => !userItems.includes(x));        

        let discArr = userItems.filter(x => !inputs.includes(x));
        
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                inputs: {
                    disconnect: discArr.map(c => ({ id: c["id"] })) || [],
                    connect: connArr.map(c => ({ id: c["id"] })) || []
                }
            },
            include: {
                inputs: true,
                location: true
            }
        })

        return updatedUser;
    }

    async delete(id: string) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException
        }

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
