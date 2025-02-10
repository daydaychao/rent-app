import { DATA_SOURCE } from "../../common/constants/database.constants";
import AppDataSource from "../../database/dataSource";

export const dbProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      try {
        const appDataSource = await AppDataSource.initialize();
        console.log("Database connection established successfully");
        return appDataSource;
      } catch (error) {
        console.error("Database connection failed", error);
        throw error;
      }
    },
  },
];
