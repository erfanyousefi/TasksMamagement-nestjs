import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { CreateUserDTO } from "./dto/user-create.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/JwtPayload";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }
    async signup(createUserDto: CreateUserDTO): Promise<object> {
        return this.userRepository.createUser(createUserDto);
    }
    async signin(createUserDto: CreateUserDTO): Promise<object> {
        const user = await this.userRepository.signin(createUserDto);
        const payload : JwtPayload = { email: user.email };
        const accessToken = this.jwtService.sign(payload);
        user.token = accessToken;
        const result = await this.userRepository.save(user).then(user => {
            return {
                accessToken: user.token
            }
        }).catch(err => {
            throw new UnauthorizedException("Can not signin your account please trining again")
        })
        return result
    }
}