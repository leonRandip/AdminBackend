import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsModule } from "./jobs/jobs.module";

// Helper function to parse database URL safely
function parseDatabaseUrl(databaseUrl: string) {
  try {
    // Use URL constructor if available
    if (typeof URL !== "undefined") {
      const url = new URL(databaseUrl);
      return {
        host: url.hostname,
        port: url.port ? parseInt(url.port) : 5432, // Default to 5432 if no port specified
        username: url.username,
        password: url.password,
        database: url.pathname.slice(1), // Remove leading slash
      };
    } else {
      // Fallback parsing for environments where URL constructor might not be available
      const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+)(?::(\d+))?\/(.+)/;
      const match = databaseUrl.match(regex);

      if (match) {
        return {
          username: match[1],
          password: match[2],
          host: match[3],
          port: match[4] ? parseInt(match[4]) : 5432, // Default to 5432 if no port specified
          database: match[5],
        };
      }
      throw new Error("Invalid database URL format");
    }
  } catch (error) {
    console.error("Error parsing DATABASE_URL:", error);
    throw new Error("Invalid DATABASE_URL format");
  }
}

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
            const dbConfig = parseDatabaseUrl(databaseUrl);
            console.log(
              `Connecting to database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
            );
            console.log(`Username: ${dbConfig.username}`);
            console.log(`SSL enabled: true`);

            return {
              type: "postgres",
              host: dbConfig.host,
              port: dbConfig.port,
              username: dbConfig.username,
              password: dbConfig.password,
              database: dbConfig.database,
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
              connectTimeoutMS: 30000,
              acquireTimeoutMillis: 30000,
              idleTimeoutMillis: 30000,
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
