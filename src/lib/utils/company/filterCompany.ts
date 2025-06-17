import { Job } from "@/types/job";
import { slugify } from "./slugify";

export function getCompanyNames(jobs: Job[]): string[] {
  return Array.from(new Set(jobs.map((job) => slugify(job.company_name))));
}

export function getCompanyJobs(jobs: Job[], companyName: string): Job[] {
  return jobs.filter(
    (job) => slugify(job.company_name) === companyName.toLowerCase()
  );
}

export function isJobsValid(data: Job[] | null) {
  return Array.isArray(data) && data.length > 0;
}
