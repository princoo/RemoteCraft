import { APIResponse, Job } from "@/types/job";

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs?limit=10");
    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
    }
    const data: APIResponse = await res.json();
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error("invalid jobs format in response");
    }
    return data.jobs;
  } catch (error) {
    console.error("fetchJobs error:", error);
    throw error; //am throwing this error again so that getStaticProps can catch it
  }
}
