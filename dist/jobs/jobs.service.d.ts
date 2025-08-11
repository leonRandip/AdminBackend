import { Repository } from "typeorm";
import { Job } from "./entities/job.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { QueryJobDto } from "./dto/query-job.dto";
export declare class JobsService {
    private jobsRepository;
    constructor(jobsRepository: Repository<Job>);
    create(createJobDto: CreateJobDto): Promise<Job>;
    findAll(query: QueryJobDto): Promise<{
        jobs: Job[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Job>;
    update(id: number, updateJobDto: UpdateJobDto): Promise<Job>;
    remove(id: number): Promise<void>;
    seedInitialData(): Promise<void>;
}
