import { Module } from "@nestjs/common";
import { DatabaseProvicers } from "./database.providers";

@Module({
    providers: [...DatabaseProvicers],
    exports: [...DatabaseProvicers],
})
export class DatabaseModule {}