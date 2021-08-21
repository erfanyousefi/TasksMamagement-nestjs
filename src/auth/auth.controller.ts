import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/user-create.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post("/signup")
    signup(@Body() createUserDto: CreateUserDTO): Promise<object> {
        return this.authService.signup(createUserDto);
    }
    @Post('/signin')
    signin(@Body() createUserDto: CreateUserDTO): Promise<object> {
        return this.authService.signin(createUserDto);
    }
}