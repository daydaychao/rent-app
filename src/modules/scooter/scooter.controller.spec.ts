import { Test, TestingModule } from "@nestjs/testing";
import { ScooterController } from "./scooter.controller";
import { ScooterService } from "./scooter.service";
import { testScooter1 } from "../../common/constants/test.constants";
import Scooter from "./scooter.entity";

describe("ScooterController", () => {
  let controller: ScooterController;
  let service: jest.Mocked<ScooterService>;

  beforeAll(async () => {
    service = {
      getScooterById: jest
        .fn()
        .mockResolvedValue({ ...testScooter1 } as Scooter),
    } as Partial<ScooterService> as jest.Mocked<ScooterService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScooterController],
    })
      .useMocker((token) => {
        if (token === ScooterService) {
          return service;
        }
      })
      .compile();

    controller = module.get<ScooterController>(ScooterController);
    service = module.get(ScooterService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("getScooterById", () => {
    it("should return scooter", async () => {
      const scooterId: number = 1;
      const result = await controller.getScooterById(scooterId);
      expect(service.getScooterById).toHaveBeenCalled();
      expect(service.getScooterById).toHaveBeenCalledWith(scooterId);
      expect(result).toEqual(testScooter1);
    });
  });
});
