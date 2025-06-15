import { Search } from "lucide-react";
import { fetchJobs } from "@/lib/fetchJobs";
import JobListing from "@/components/JobListing";
import { Job } from "@/types/job";

export async function getStaticProps() {
  const jobs = await fetchJobs();
  return {
    props: {
      jobs,
    },
    revalidate: 30,
  };
}
export default function Jobs({ jobs }: { jobs: Job[] }) {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Jobs</h1>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <JobListing featuredJobs={jobs} />
        </div>
      </div>
    </main>
  );
}
