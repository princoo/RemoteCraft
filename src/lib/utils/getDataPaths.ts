import { Job, SlugPath } from "@/types/job";

export function getJobSlugPaths(jobs: Job[]): SlugPath[] {
  return jobs.map((job) => ({
    params: { slug: job.id.toString() },
  }));
}
export function getCompanySlugPaths(companies: string[]): SlugPath[] {
  return companies.map((company) => ({
    params: { slug: company },
  }));
}
