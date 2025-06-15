import { Bookmark } from "lucide-react";
import { fetchJobs } from "@/lib/fetchJobs";
import { Job } from "@/types/job";
import formatDateOnly from "../../lib/utils/formatDate";
import Link from "next/link";

export async function getStaticPaths() {
  const jobs = await fetchJobs();
  const paths = jobs.map((job) => ({
    params: { slug: job.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j.id.toString() === params.slug);
  if (!job) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      job,
    },
    revalidate: 30,
  };
}

export default function JobDetail({ job }: { job: Job }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <p className="text-xl text-gray-500">at {job.company_name}</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4" />
            <span className="text-gray-700">Save job</span>
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Job details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Publication date
                </h3>
                <p className="text-gray-900">
                  {formatDateOnly(job.publication_date)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Category
                </h3>
                <p className="text-gray-900">{job.category}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Employment type
                </h3>
                <p className="text-gray-900">{job.job_type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-gray-900">
                  {job.candidate_required_location}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {job.company_name}
          </h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h2>
          <div className="flex flex-wrap gap-3">
            {job.tags.map((benefit, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {benefit}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Apply now
          </button>
          <Link
            href={`/company/${job.company_name}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <button>Message company</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
