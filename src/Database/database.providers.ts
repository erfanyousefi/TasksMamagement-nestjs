import { createConnection } from "typeorm";

export const DatabaseProvicers = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'Tasks-management',
            entities: [
                `${__dirname}./../**/*.entity{.ts,.js}`
            ],
            synchronize: true,
        }),
    }
]