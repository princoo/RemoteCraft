import { Bookmark } from "lucide-react";
import { fetchJobs } from "@/lib/fetchJobs";
import { Job } from "@/types/job";
import formatDateOnly from "../../lib/utils/formatDate";
import Link from "next/link";
import Button from "@/components/Button";
import { getJobSlugPaths } from "@/lib/utils/getDataPaths";
import { getJobById } from "@/lib/utils/jobs/filterJob";
import PageGuard from "@/components/PageGuard";
import { slugify } from "@/lib/utils/company/slugify";

export async function getStaticPaths() {
  try {
    const jobs = await fetchJobs();
    const paths = getJobSlugPaths(jobs);
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error generating static paths for jobs:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const slug = params?.slug;
    if (!slug || typeof slug !== "string") {
      return {
        props: {
          job: null,
        },
        revalidate: 1800,
      };
    }
    const jobs = await fetchJobs();
    const job = getJobById(jobs, slug);
    if (!job) {
      return {
        props: {
          job: null,
        },
        revalidate: 1800,
      };
    }
    return {
      props: { job },
      revalidate: 30,
    };
  } catch (error) {
    console.error("Error in getStaticProps for job slug:", error);
    return {
      props: {
        job: null,
        error: "Failed to fetch job data",
      },
      revalidate: 30,
    };
  }
}

export default function JobDetail({
  job,
  error,
}: {
  job: Job;
  error?: string;
}) {
  const isValid = !!job;
  return (
    <PageGuard isValid={!!job} error={error}>
      {isValid && (
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-gray">at {job.company_name}</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray rounded-lg hover:bg-gray/50">
                <Bookmark className="w-4 h-4" />
                <span>Save job</span>
              </button>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black/80 mb-6">
                Job details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray mb-1">
                      Publication date
                    </h3>
                    <p>{formatDateOnly(job.publication_date)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray mb-1">
                      Category
                    </h3>
                    <p>{job.category}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray mb-1">
                      Employment type
                    </h3>
                    <p>{job.job_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray mb-1">
                      Location
                    </h3>
                    <p>{job.candidate_required_location}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray mb-4">
                About {job.company_name}
              </h2>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <div className="flex flex-wrap gap-3">
                {job.tags.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray/20 text-black/50 rounded-full text-sm font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <Button variant="primary" size="medium">
                Apply now
              </Button>
              <Link href={`/company/${slugify(job.company_name)}`}>
                <Button variant="secondary" size="large">
                  Message company
                </Button>
              </Link>
            </div>
          </div>
        </main>
      )}
    </PageGuard>
  );
}
