import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { USER_REPOSITORY } from "../../common/constants/database.constants";
import User from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        name: "ailsa",
      },
    });
  }

  getUsers() {
    return ["user1", "user2"];
  }
}
