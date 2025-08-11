import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, Between, ILike } from "typeorm";
import { Job } from "./entities/job.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { QueryJobDto } from "./dto/query-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepository.create(createJobDto);
    return await this.jobsRepository.save(job);
  }

  async findAll(query: QueryJobDto) {
    const {
      searchQuery,
      location,
      jobType,
      salaryMin,
      salaryMax,
      page = 1,
      limit = 10,
    } = query;

    const queryBuilder = this.jobsRepository.createQueryBuilder("job");

    // Apply search filter
    if (searchQuery) {
      queryBuilder.andWhere(
        "(LOWER(job.title) LIKE LOWER(:searchQuery) OR LOWER(job.company) LIKE LOWER(:searchQuery))",
        { searchQuery: `%${searchQuery}%` }
      );
    }

    // Apply location filter
    if (location) {
      queryBuilder.andWhere("job.location = :location", { location });
    }

    // Apply job type filter
    if (jobType) {
      queryBuilder.andWhere("job.workType = :jobType", { jobType });
    }

    // Apply salary filter
    if (salaryMin !== undefined || salaryMax !== undefined) {
      if (salaryMin !== undefined && salaryMax !== undefined) {
        // Convert LPA to monthly salary for filtering
        queryBuilder.andWhere(
          "(job.salaryMin * 100000 / 12) / 1000 BETWEEN :salaryMin AND :salaryMax",
          { salaryMin, salaryMax }
        );
      } else if (salaryMin !== undefined) {
        queryBuilder.andWhere(
          "(job.salaryMin * 100000 / 12) / 1000 >= :salaryMin",
          { salaryMin }
        );
      } else if (salaryMax !== undefined) {
        queryBuilder.andWhere(
          "(job.salaryMin * 100000 / 12) / 1000 <= :salaryMax",
          { salaryMax }
        );
      }
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Order by creation date (newest first)
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

  async findOne(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, updateJobDto);
    return await this.jobsRepository.save(job);
  }

  async remove(id: number): Promise<void> {
    const job = await this.findOne(id);
    await this.jobsRepository.remove(job);
  }

  // Method to seed initial data
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
          jobDescription:
            "We are looking for a Full Stack Developer to join our team.",
          applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
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
}
