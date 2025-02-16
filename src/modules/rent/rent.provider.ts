import { DataSource } from "typeorm";
import {
  DATA_SOURCE,
  RENT_REPOSITORY,
} from "../../common/constants/database.constants";
import { RentRepository } from "./rent.repository";

export const rentProvider = [
  {
    provide: RENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => new RentRepository(dataSource),
    inject: [DATA_SOURCE],
  },
];
