import { Search } from "lucide-react";
// import Link from "next/link";
import Image from "next/image";
import { fetchJobs } from "@/lib/fetchJobs";
import JobListing from "@/components/JobListing";
import { Job } from "@/types/job";
import Input from "@/components/Input";
export async function getStaticProps() {
  const jobs = await fetchJobs();

  return {
    props: {
      jobs,
    },
    revalidate: 30, // ISR: Regenerate this page every 30 seconds
  };
}

export default function Home({ jobs }: { jobs: Job[] }) {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src="/home-banner.avif"
              alt="Remote work illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                Find your next remote job
              </h1>

              {/* Search Bar */}
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input />
                  <button className="absolute right-0 top-0 bottom-0 bg-blue hover:bg-blue/50 text-white px-8 rounded-r-lg font-semibold transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Jobs
          </h2>

          <div className="space-y-4">
            <JobListing featuredJobs={jobs} />
          </div>
        </div>
      </section>
    </main>
  );
}
