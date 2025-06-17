
export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

export interface APIResponse {
  "job-count": number;
  "total-job-count": number;
  jobs: Job[];
}

export interface SlugPath {
  params: { slug: string };
}
