import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsModule } from "./jobs/jobs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get("DATABASE_URL");

        if (databaseUrl) {
          // Parse the DATABASE_URL for production
          const url = new URL(databaseUrl);
          return {
            type: "postgres",
            host: url.hostname,
            port: parseInt(url.port),
            username: url.username,
            password: url.password,
            database: url.pathname.slice(1), // Remove leading slash
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: false, // Disable synchronize in production
            logging: false,
            ssl: {
              rejectUnauthorized: false,
            },
            extra: {
              connectionLimit: 10,
              acquireTimeout: 60000,
              timeout: 60000,
            },
          };
        } else {
          // Fallback to individual environment variables for development
          return {
            type: "postgres",
            host: configService.get("DB_HOST", "localhost"),
            port: configService.get("DB_PORT", 5432),
            username: configService.get("DB_USERNAME", "postgres"),
            password: configService.get("DB_PASSWORD", "password"),
            database: configService.get("DB_NAME", "job_management"),
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: configService.get("NODE_ENV") !== "production",
            logging: configService.get("NODE_ENV") !== "production",
            ssl: false,
            extra: {
              connectionLimit: 10,
              acquireTimeout: 60000,
              timeout: 60000,
            },
          };
        }
      },
      inject: [ConfigService],
    }),
    JobsModule,
  ],
})
export class AppModule {}
