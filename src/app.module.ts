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
        const nodeEnv = configService.get("NODE_ENV", "development");

        console.log(`Environment: ${nodeEnv}`);
        console.log(`Database URL available: ${!!databaseUrl}`);

        if (databaseUrl) {
          try {
            // Parse the DATABASE_URL for production
            const url = new URL(databaseUrl);
            console.log(
              `Connecting to database: ${url.hostname}:${
                url.port
              }/${url.pathname.slice(1)}`
            );

            return {
              type: "postgres",
              host: url.hostname,
              port: parseInt(url.port),
              username: url.username,
              password: url.password,
              database: url.pathname.slice(1), // Remove leading slash
              entities: [__dirname + "/**/*.entity{.ts,.js}"],
              synchronize: false, // Disable synchronize in production
              logging: nodeEnv === "development",
              ssl: {
                rejectUnauthorized: false,
              },
              extra: {
                connectionLimit: 10,
                acquireTimeout: 60000,
                timeout: 60000,
                ssl: {
                  rejectUnauthorized: false,
                },
              },
              retryAttempts: 10,
              retryDelay: 3000,
              keepConnectionAlive: true,
            };
          } catch (error) {
            console.error("Error parsing DATABASE_URL:", error);
            throw new Error("Invalid DATABASE_URL format");
          }
        } else {
          console.log("Using individual database environment variables");
          // Fallback to individual environment variables for development
          return {
            type: "postgres",
            host: configService.get("DB_HOST", "localhost"),
            port: configService.get("DB_PORT", 5432),
            username: configService.get("DB_USERNAME", "postgres"),
            password: configService.get("DB_PASSWORD", "password"),
            database: configService.get("DB_NAME", "job_management"),
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: nodeEnv !== "production",
            logging: nodeEnv === "development",
            ssl: false,
            extra: {
              connectionLimit: 10,
              acquireTimeout: 60000,
              timeout: 60000,
            },
            retryAttempts: 10,
            retryDelay: 3000,
            keepConnectionAlive: true,
          };
        }
      },
      inject: [ConfigService],
    }),
    JobsModule,
  ],
})
export class AppModule {}
