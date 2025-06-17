import { Job } from "./job"

export interface Company {
  slug: string
  name: string
  description: string
  website: string
  logo: string
  openRoles: Job[]
  jobCount: number
}

export interface CompanyProfileProps {
  companyJobs: Job[];
  error: string;
}