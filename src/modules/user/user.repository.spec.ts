import { Test, TestingModule } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { DatabaseModule } from "../database/database.module";
import {
  DATA_SOURCE,
  USER_REPOSITORY,
} from "../../common/constants/database.constants";
import { databaseProvider } from "../database/database.providers";
import { DataSource } from "typeorm";
import { testUser1, testUser2 } from "../../common/constants/test.constants";
import User from "./user.entity";
import { ApplicationError } from "../../applicationError";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";

describe("UserRepository", () => {
  let repository: UserRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: DatabaseModule,
          providers: [...databaseProvider],
          exports: [...databaseProvider],
        },
      ],
      providers: [
        {
          provide: USER_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            new UserRepository(dataSource),
          inject: [DATA_SOURCE],
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(USER_REPOSITORY);
    dataSource = module.get<DataSource>(DATA_SOURCE);
  });

  beforeEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return users", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      await dataSource.getRepository(User).save({ ...testUser2 });
      const result = await repository.getAllUsers();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining(testUser1),
          expect.objectContaining(testUser2),
        ]),
      );
    });
    it("should return null", async () => {
      const result = await repository.getAllUsers();
      expect(result).toEqual([]);
    });
  });

  describe("getUserById", () => {
    it("should return user", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      await dataSource.getRepository(User).save({ ...testUser2 });
      const userId = 2;
      const result = await repository.getUserById(userId);
      expect(result).toEqual(expect.objectContaining(testUser2));
    });
    it("should throw ApplicationError('errors.A001')", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      const userId = 2;
      await expect(repository.getUserById(userId)).rejects.toThrow(
        new ApplicationError("errors.A001"),
      );
    });
  });

  describe("getUserByAccount", () => {
    it("should return user", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      const userAccount = testUser1.account;
      const result = await repository.getUserByAccount(userAccount);
      expect(result).toEqual(expect.objectContaining(testUser1));
    });
    it("should return null", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      const userAccount = testUser1.account + "123";
      const result = await repository.getUserByAccount(userAccount);
      expect(result).toEqual(null);
    });
  });

  describe("register", () => {
    it("should return user", async () => {
      const dto: UserRegisterDto = { ...testUser1 };
      const result = await repository.register(dto);
      expect(result).toEqual(expect.objectContaining(testUser1));
    });
  });

  describe("login", () => {
    it("should return user", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      const dto: UserLoginDto = [testUser1].map((testUser) => ({
        account: testUser.account,
        password: testUser.password,
      }))[0];
      const result = await repository.login(dto);
      expect(result).toEqual(expect.objectContaining(testUser1));
    });
    it("should throw error errors.A005", async () => {
      await dataSource.getRepository(User).save({ ...testUser1 });
      const dto: UserLoginDto = [testUser2].map((testUser) => ({
        account: testUser.account,
        password: testUser.password,
      }))[0];
      await expect(repository.login(dto)).rejects.toThrow(
        new ApplicationError("errors.A005"),
      );
    });
  });
});
