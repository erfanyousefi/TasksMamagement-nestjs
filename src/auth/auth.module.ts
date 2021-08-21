import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { UserRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

@Module({
    imports : [TypeOrmModule.forFeature([UserRepository])],
    controllers : [AuthController],
    providers : [AuthService],
})
export class AuthModule {}