import { Inject, Injectable } from "@nestjs/common";
import {
  RENT_REPOSITORY,
  USER_REPOSITORY,
  SCOOTER_REPOSITORY,
  DATA_SOURCE,
} from "../../common/constants/database.constants";
import { CreateRentDto, RentDto } from "./dto/rent.dto";
import { UserRepository } from "../user/user.repository";
import { RentRepository } from "./rent.repository";
import { ScooterRepository } from "../scooter/scooter.repository";
import dayjs from "dayjs";
import { DataSource } from "typeorm";
import { ApplicationError } from "../../applicationError";

@Injectable()
export class RentService {
  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,

    @Inject(RENT_REPOSITORY)
    private rentRepository: RentRepository,

    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,

    @Inject(SCOOTER_REPOSITORY)
    private scooterRepository: ScooterRepository,
  ) {}

  async rent(dto: RentDto) {
    return await this.dataSource.manager.transaction(async (manager) => {
      //檢查使用者是否存在
      const user = await this.userRepository.getUserById(dto.userId, manager);

      //檢查車輛是否存在
      const scooter = await this.scooterRepository.getScooterById(
        dto.scooterId,
        manager,
      );

      //檢查使用者是否已租借車輛
      const userRentData = await this.rentRepository.getActiveRentalByUserId(
        dto.userId,
        manager,
      );
      if (userRentData)
        throw new ApplicationError("errors.A003", {
          licensePlate: userRentData.scooter.license_plate,
        });

      //檢查車輛是否已被租借
      const scooterRentData =
        await this.rentRepository.getActiveRentalByScooterId(
          dto.scooterId,
          manager,
        );
      if (scooterRentData) throw new ApplicationError("errors.A004");

      //新增租借
      const createRent: CreateRentDto = {
        user: user,
        scooter: scooter,
        startTime: dayjs().toDate(),
        endTime: null,
      };
      const rent = await this.rentRepository.createRent(createRent);
      return rent;
    });
  }
}
