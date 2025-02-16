import { DataSource, EntityManager, IsNull, Repository } from "typeorm";
import User from "./user.entity";
import { Injectable } from "@nestjs/common";
import { ApplicationError } from "../../applicationError";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";

@Injectable()
export class UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async getAllUsers(manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    return await repository.find({
      where: {
        deleted_at: IsNull(),
      },
    });
  }

  async getUserById(userId: number, manager?: EntityManager): Promise<User> {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = await repository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ApplicationError("errors.A001");
    return user;
  }

  async getUserByAccount(
    account: string,
    manager?: EntityManager,
  ): Promise<User | null> {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = await repository.findOne({
      where: {
        account,
      },
    });
    return user;
  }

  async register(dto: UserRegisterDto, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = repository.create({
      name: dto.name,
      email: dto.email,
      account: dto.account,
      password: dto.password,
    });
    return await repository.save(user);
  }

  async login(dto: UserLoginDto, manager?: EntityManager) {
    const repository = manager ? manager.getRepository(User) : this.repository;
    const user = await repository.findOne({
      where: {
        account: dto.account,
        password: dto.password,
      },
    });
    if (!user) throw new ApplicationError("errors.A005");
    return user;
  }
}
