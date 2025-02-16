import { DataSource } from "typeorm";
import {
  DATA_SOURCE,
  USER_REPOSITORY,
} from "../../common/constants/database.constants";
import { UserRepository } from "./user.repository";

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return new UserRepository(dataSource);
    },
    inject: [DATA_SOURCE],
  },
];
