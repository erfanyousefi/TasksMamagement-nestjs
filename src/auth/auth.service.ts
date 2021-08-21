import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { CreateUserDTO } from "./dto/user-create.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) { }
    async signup(createUserDto: CreateUserDTO): Promise<object> {
        return this.userRepository.createUser(createUserDto);
    }
    async signin(createUserDto: CreateUserDTO): Promise<object> {
        let { email, password } = createUserDto;
        const user = await this.userRepository.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            return {
                status : 200,
                message : "Success"
            }
        }else{
            throw new UnauthorizedException('Email Or password is mistak')
        }
    }
}