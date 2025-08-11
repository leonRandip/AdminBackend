"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const jobs_service_1 = require("./jobs/jobs.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : ["http://localhost:3000"];
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const port = process.env.PORT || 3001;
    await app.listen(port, "0.0.0.0");
    console.log(`Application is running on port: ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    if (process.env.NODE_ENV !== "production") {
        try {
            const jobsService = app.get(jobs_service_1.JobsService);
            await jobsService.seedInitialData();
        }
        catch (error) {
            console.log("Database seeding skipped or failed:", error.message);
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map