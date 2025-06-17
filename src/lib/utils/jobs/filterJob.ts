import { Job } from "@/types/job";

export function getJobById(jobs: Job[], id: string) {
    return jobs.find((job) => job.id.toString() === id);
}