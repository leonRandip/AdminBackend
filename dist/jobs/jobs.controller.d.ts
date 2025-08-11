import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { QueryJobDto } from "./dto/query-job.dto";
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto): Promise<import("./entities/job.entity").Job>;
    findAll(query: QueryJobDto): Promise<{
        jobs: import("./entities/job.entity").Job[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/job.entity").Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<import("./entities/job.entity").Job>;
    remove(id: string): Promise<void>;
}
