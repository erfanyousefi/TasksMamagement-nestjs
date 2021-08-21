import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/user-create.dto";
import { User } from "./user.entity";
import { hashPassword } from "./../handlers"
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDTO): Promise<object> {
        let { name, email, password } = createUserDto;
        password = await hashPassword(password)
        let user = this.create({name,  email, password})
        let response = await this.save(user)
            .then(result => {
                return {
                    status: 201,
                    message: "Success",
                    user: result
                }
            })
            .catch(err => {
                if (err.code === '23505') throw new BadRequestException('Email already exist')
                throw new InternalServerErrorException()
            })
        return response
    }

}