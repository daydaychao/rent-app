import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "../database/database.module";
import {
  DATA_SOURCE,
  SCOOTER_REPOSITORY,
} from "../../common/constants/database.constants";
import { databaseProvider } from "../database/database.providers";
import { DataSource } from "typeorm";
import { ApplicationError } from "../../applicationError";
import { ScooterRepository } from "./scooter.repository";
import Scooter from "./scooter.entity";
import { testScooter1 } from "../../common/constants/test.constants";

describe("ScooterRepository", () => {
  let repository: ScooterRepository;
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
          provide: SCOOTER_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            new ScooterRepository(dataSource),
          inject: [DATA_SOURCE],
        },
      ],
    }).compile();

    repository = module.get<ScooterRepository>(SCOOTER_REPOSITORY);
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

  describe("getScooterById", () => {
    it("should return scooter", async () => {
      await dataSource.getRepository(Scooter).save({ ...testScooter1 });
      const scooterId = 1;
      const result = await repository.getScooterById(scooterId);
      expect(result).toEqual(expect.objectContaining(testScooter1));
    });
    it("should throw ApplicationError('errors.A002')", async () => {
      await dataSource.getRepository(Scooter).save({ ...testScooter1 });
      const scooterId = 2;
      await expect(repository.getScooterById(scooterId)).rejects.toThrow(
        new ApplicationError("errors.A002"),
      );
    });
  });
});
