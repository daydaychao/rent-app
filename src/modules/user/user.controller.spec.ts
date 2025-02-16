import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserLoginDto, UserRegisterDto } from "./dto/user.dto";
import { testUser1, testUser2 } from "../../common/constants/test.constants";
import User from "./user.entity";

describe("UserController", () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    service = {
      getAllUsers: jest.fn().mockResolvedValue([
        { ...testUser1, id: 1 },
        { ...testUser2, id: 2 },
      ] as User[]),
      getUserById: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
      register: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
      login: jest.fn().mockResolvedValue({ ...testUser1, id: 1 } as User),
    } as Partial<UserService> as jest.Mocked<UserService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return service;
        }
      })
      .compile();
    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return users", async () => {
      const result = await controller.getAllUsers();
      expect(service.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual({
        status: "Success",
        data: [
          { ...testUser1, id: 1 },
          { ...testUser2, id: 2 },
        ],
      });
    });
  });

  describe("getUserById", () => {
    it("should return user", async () => {
      const userId = 1;
      const result = await controller.getUserById(userId);
      expect(service.getUserById).toHaveBeenCalled();
      expect(service.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        status: "Success",
        data: { ...testUser1, id: 1 },
      });
    });
  });

  describe("register", () => {
    it("should return user", async () => {
      const dto: UserRegisterDto = { ...testUser1 };
      const result = await controller.register(dto);
      expect(service.register).toHaveBeenCalled();
      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...testUser1, id: 1 });
    });
  });

  describe("login", () => {
    it("should return user", async () => {
      const dto: UserLoginDto = { ...testUser1 };
      const result = await controller.login(dto);
      expect(service.login).toHaveBeenCalled();
      expect(service.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ ...testUser1, id: 1 });
    });
  });
});
