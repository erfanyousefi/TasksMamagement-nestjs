import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Req() req){
        return req.user
    }
}