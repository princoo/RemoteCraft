import { APIResponse, Job } from "@/types/job";

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("https://remotive.com/api/remote-jobs?limit=10");
  const data: APIResponse = await res.json();
  return data.jobs;
}
