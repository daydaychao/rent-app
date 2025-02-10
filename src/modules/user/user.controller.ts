import { Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("getAllUsers")
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get()
  getUser(): string {
    return "";
  }

  @Post("/register")
  register(): string {
    return "abc";
  }
}
