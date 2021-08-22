import { BadRequestException, ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/user-create.dto";
import { User } from "./user.entity";
import { hashPassword } from "./../handlers"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private readonly jwtService: JwtService;
    async createUser(createUserDto: CreateUserDTO): Promise<object> {
        let { name, email, password } = createUserDto;
        password = await hashPassword(password)
        let user = this.create({ name, email, password })
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
                console.log(err);

                throw new InternalServerErrorException()
            })
        return response
    }
    async signin(createUserDto: CreateUserDTO): Promise<User> {
        const { email, password } = createUserDto;
        const user = await this.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        } else {
            throw new UnauthorizedException('Email OR password is mistak')
        }
    }

}