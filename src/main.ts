import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { JobsService } from "./jobs/jobs.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend - configurable for different environments
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const port = process.env.PORT || 3001;
  await app.listen(port, "0.0.0.0"); // Listen on all interfaces for Render
  console.log(`Application is running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

  // Seed initial data only in development
  if (process.env.NODE_ENV !== "production") {
    try {
      const jobsService = app.get(JobsService);
      await jobsService.seedInitialData();
    } catch (error) {
      console.log("Database seeding skipped or failed:", error.message);
    }
  }
}

bootstrap();
