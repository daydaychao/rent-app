import { DataSource } from "typeorm";
import {
  DATA_SOURCE,
  SCOOTER_REPOSITORY,
} from "../../common/constants/database.constants";
import { ScooterRepository } from "./scooter.repository";

export const scooterProvider = [
  {
    provide: SCOOTER_REPOSITORY,
    useFactory: (dataSource: DataSource) => new ScooterRepository(dataSource),
    inject: [DATA_SOURCE],
  },
];
