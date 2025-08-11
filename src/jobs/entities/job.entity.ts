import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "varchar", length: 255 })
  company: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  logo: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  logoColor: string;

  @Column({ type: "varchar", length: 100 })
  experience: string;

  @Column({ type: "varchar", length: 50 })
  workType: string;

  @Column({ type: "varchar", length: 100 })
  salary: string;

  @Column({ type: "varchar", length: 100 })
  timePosted: string;

  @Column({ type: "varchar", length: 255 })
  location: string;

  @Column({ type: "text", array: true, default: [] })
  description: string[];

  @Column({ type: "varchar", length: 100 })
  jobType: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salaryMin: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salaryMax: number;

  @Column({ type: "text", nullable: true })
  jobDescription: string;

  @Column({ type: "date", nullable: true })
  applicationDeadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
