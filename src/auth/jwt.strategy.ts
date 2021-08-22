import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "./auth.repository";
import { JwtPayload } from "./dto/JwtPayload";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'erfanyousefi.ir1309++',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ email });
        if (!user) throw new UnauthorizedException("Can not access to your account please trining again ")
        return user
    }
}