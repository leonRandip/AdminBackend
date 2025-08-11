import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { JobsService } from "./jobs/jobs.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: "http://localhost:3000",
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
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

  // Seed initial data
  try {
    const jobsService = app.get(JobsService);
    await jobsService.seedInitialData();
  } catch (error) {
    console.log("Database seeding skipped or failed:", error.message);
  }
}

bootstrap();
