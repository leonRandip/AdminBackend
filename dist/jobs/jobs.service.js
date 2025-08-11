"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
let JobsService = class JobsService {
    constructor(jobsRepository) {
        this.jobsRepository = jobsRepository;
    }
    async create(createJobDto) {
        const job = this.jobsRepository.create(createJobDto);
        return await this.jobsRepository.save(job);
    }
    async findAll(query) {
        const { searchQuery, location, jobType, salaryMin, salaryMax, page = 1, limit = 10, } = query;
        const queryBuilder = this.jobsRepository.createQueryBuilder("job");
        if (searchQuery) {
            queryBuilder.andWhere("(LOWER(job.title) LIKE LOWER(:searchQuery) OR LOWER(job.company) LIKE LOWER(:searchQuery))", { searchQuery: `%${searchQuery}%` });
        }
        if (location) {
            queryBuilder.andWhere("job.location = :location", { location });
        }
        if (jobType) {
            queryBuilder.andWhere("job.workType = :jobType", { jobType });
        }
        if (salaryMin !== undefined || salaryMax !== undefined) {
            if (salaryMin !== undefined && salaryMax !== undefined) {
                queryBuilder.andWhere("(job.salaryMin * 100000 / 12) / 1000 BETWEEN :salaryMin AND :salaryMax", { salaryMin, salaryMax });
            }
            else if (salaryMin !== undefined) {
                queryBuilder.andWhere("(job.salaryMin * 100000 / 12) / 1000 >= :salaryMin", { salaryMin });
            }
            else if (salaryMax !== undefined) {
                queryBuilder.andWhere("(job.salaryMin * 100000 / 12) / 1000 <= :salaryMax", { salaryMax });
            }
        }
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        queryBuilder.orderBy("job.createdAt", "DESC");
        const [jobs, total] = await queryBuilder.getManyAndCount();
        return {
            jobs,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const job = await this.jobsRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }
    async update(id, updateJobDto) {
        const job = await this.findOne(id);
        Object.assign(job, updateJobDto);
        return await this.jobsRepository.save(job);
    }
    async remove(id) {
        const job = await this.findOne(id);
        await this.jobsRepository.remove(job);
    }
    async seedInitialData() {
        const existingJobs = await this.jobsRepository.count();
        if (existingJobs === 0) {
            const initialJobs = [
                {
                    title: "Full Stack Developer",
                    company: "Amazon",
                    logo: "/amazon.png",
                    logoColor: "#232f3e",
                    experience: "1-3 yr Exp",
                    workType: "Onsite",
                    salary: "12LPA",
                    timePosted: "24h Ago",
                    location: "Bangalore",
                    description: [
                        "A user-friendly interface lets you browse stunning photos and videos",
                        "Filter destinations based on interests and travel style, and create personalized",
                    ],
                    jobType: "Full Time",
                    salaryMin: 12,
                    salaryMax: 12,
                    jobDescription: "We are looking for a Full Stack Developer to join our team.",
                    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
                {
                    title: "Node Js Developer",
                    company: "Tesla",
                    logo: "/tesla.png",
                    logoColor: "#171a20",
                    experience: "1-3 yr Exp",
                    workType: "Onsite",
                    salary: "15LPA",
                    timePosted: "24h Ago",
                    location: "Mumbai",
                    description: [
                        "A user-friendly interface lets you browse stunning photos and videos",
                        "Filter destinations based on interests and travel style, and create personalized",
                    ],
                    jobType: "Full Time",
                    salaryMin: 15,
                    salaryMax: 15,
                    jobDescription: "Join our team as a Node.js Developer.",
                    applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                },
                {
                    title: "UX/UI Designer",
                    company: "Swiggy",
                    logo: "/swiggy.png",
                    logoColor: "#fc8019",
                    experience: "1-3 yr Exp",
                    workType: "Onsite",
                    salary: "10LPA",
                    timePosted: "24h Ago",
                    location: "Delhi",
                    description: [
                        "A user-friendly interface lets you browse stunning photos and videos",
                        "Filter destinations based on interests and travel style, and create personalized",
                    ],
                    jobType: "Full Time",
                    salaryMin: 10,
                    salaryMax: 10,
                    jobDescription: "Creative UX/UI Designer needed for our design team.",
                    applicationDeadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
                },
            ];
            await this.jobsRepository.save(initialJobs);
            console.log("Initial job data seeded successfully");
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map