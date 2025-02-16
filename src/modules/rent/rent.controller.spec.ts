import { Test, TestingModule } from "@nestjs/testing";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";
import {
  testRent1,
  testScooter1,
  testUser1,
} from "../../common/constants/test.constants";
import { RentDto } from "./dto/rent.dto";
import Rent from "./rent.entity";

describe("RentController", () => {
  let controller: RentController;
  let service: jest.Mocked<RentService>;

  beforeEach(async () => {
    service = {
      rent: jest.fn().mockResolvedValue({
        ...testRent1,
        id: 1,
        user: { ...testUser1, id: 1 },
        scooter: { ...testScooter1, id: 1 },
      } as Rent),
    } as Partial<RentService> as jest.Mocked<RentService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
    })
      .useMocker((token) => {
        if (token === RentService) {
          return service;
        }
      })
      .compile();

    controller = module.get<RentController>(RentController);
    service = module.get(RentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("getScooterById", () => {
    it("should return scooter", async () => {
      const dto: RentDto = { userId: 1, scooterId: 1 };
      const result = await controller.rent(dto);
      expect(service.rent).toHaveBeenCalled(); //確保方法被正確呼叫
      expect(service.rent).toHaveBeenCalledWith(dto); //確保方法傳入的參數正確
      expect(result).toEqual({
        ...testRent1,
        id: 1,
        user: { ...testUser1, id: 1 },
        scooter: { ...testScooter1, id: 1 },
      }); //確保返回的結果符合預期
    });
  });
});
