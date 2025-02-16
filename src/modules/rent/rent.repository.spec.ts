import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "../database/database.module";
import {
  DATA_SOURCE,
  RENT_REPOSITORY,
} from "../../common/constants/database.constants";
import { databaseProvider } from "../database/database.providers";
import { DataSource } from "typeorm";
import {
  testRent1,
  testScooter1,
  testUser1,
} from "../../common/constants/test.constants";
import { RentRepository } from "./rent.repository";
import Rent from "./rent.entity";
import User from "../user/user.entity";
import Scooter from "../scooter/scooter.entity";
import { CreateRentDto } from "./dto/rent.dto";

describe("RentRepository", () => {
  let repository: RentRepository;
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
          provide: RENT_REPOSITORY,
          useFactory: (dataSource: DataSource) =>
            new RentRepository(dataSource),
          inject: [DATA_SOURCE],
        },
      ],
    }).compile();

    repository = module.get<RentRepository>(RENT_REPOSITORY);
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

  describe("getActiveRentalByUserId", () => {
    it("should return rent", async () => {
      const user = await dataSource.getRepository(User).save({ ...testUser1 });
      const scooter = await dataSource
        .getRepository(Scooter)
        .save({ ...testScooter1 });
      await dataSource
        .getRepository(Rent)
        .save({ ...testRent1, user, scooter });
      const userId = 1;
      const result = await repository.getActiveRentalByUserId(userId);
      expect(result).toEqual(
        expect.objectContaining({
          ...testRent1,
          user: expect.objectContaining(testUser1) as User,
          scooter: expect.objectContaining(testScooter1) as Scooter,
        }),
      );
    });
    it("should return null", async () => {
      const user = await dataSource.getRepository(User).save({ ...testUser1 });
      const scooter = await dataSource
        .getRepository(Scooter)
        .save({ ...testScooter1 });
      await dataSource
        .getRepository(Rent)
        .save({ ...testRent1, user, scooter });
      const userId = 2;
      const result = await repository.getActiveRentalByUserId(userId);
      expect(result).toEqual(null);
    });
  });

  describe("getActiveRentalByScooterId", () => {
    it("should return rent", async () => {
      const user = await dataSource.getRepository(User).save({ ...testUser1 });
      const scooter = await dataSource
        .getRepository(Scooter)
        .save({ ...testScooter1 });
      await dataSource
        .getRepository(Rent)
        .save({ ...testRent1, user, scooter });
      const scooterId = 1;
      const result = await repository.getActiveRentalByScooterId(scooterId);
      expect(result).toEqual(
        expect.objectContaining({
          ...testRent1,
          user: expect.objectContaining(testUser1) as User,
          scooter: expect.objectContaining(testScooter1) as Scooter,
        }),
      );
    });
    it("should return null", async () => {
      const user = await dataSource.getRepository(User).save({ ...testUser1 });
      const scooter = await dataSource
        .getRepository(Scooter)
        .save({ ...testScooter1 });
      await dataSource
        .getRepository(Rent)
        .save({ ...testRent1, user, scooter });
      const scooterId = 2;
      const result = await repository.getActiveRentalByScooterId(scooterId);
      expect(result).toEqual(null);
    });
  });

  describe("createRent", () => {
    it("should return user", async () => {
      const dto: CreateRentDto = {
        startTime: testRent1.start_time,
        endTime: testRent1.end_time,
        user: testUser1 as User,
        scooter: testScooter1 as Scooter,
      };
      const result = await repository.createRent(dto);
      expect(result).toEqual(
        expect.objectContaining({
          ...testRent1,
          user: expect.objectContaining(testUser1) as User,
          scooter: expect.objectContaining(testScooter1) as Scooter,
        }),
      );
    });
  });
});
