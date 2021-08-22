import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { UserRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret : "erfanyousefi.ir1309++",
            signOptions: {
                expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 6)
            }
        }),
        TypeOrmModule.forFeature([UserRepository])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports : [JwtStrategy, PassportModule]
})
export class AuthModule { }