import { fetchJobs } from "@/lib/fetchJobs";
import Image from "next/image";
import JobListing from "@/components/JobListing";
import Sidebar from "@/components/company/Sidebar";
import Button from "@/components/Button";
import PageGuard from "@/components/PageGuard";
import { CompanyProfileProps } from "@/types/company";
import {
  getCompanyJobs,
  getCompanyNames,
  isJobsValid,
} from "@/lib/utils/company/filterCompany";
import { getCompanySlugPaths } from "@/lib/utils/getDataPaths";

export async function getStaticPaths() {
  const jobs = await fetchJobs();
  const companySlugs = getCompanyNames(jobs);
  const paths = getCompanySlugPaths(companySlugs);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const slug = params?.slug;
    if (!slug || typeof slug !== "string") {
      return {
        props: {
          companyJobs: null,
        },
        revalidate: 1800,
      };
    }
    const jobs = await fetchJobs();
    const companyJobs = getCompanyJobs(jobs, slug);
    if (companyJobs.length === 0) {
      return {
        props: {
          companyJobs: null,
        },
        revalidate: 1800,
      };
    }
    return {
      props: { companyJobs },
      revalidate: 1800,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        error: "Failed to load company jobs",
        companyJobs: null,
      },
      revalidate: 1800,
    };
  }
}

export default function CompanyProfile({
  companyJobs,
  error,
}: CompanyProfileProps) {
  const isValid = isJobsValid(companyJobs);
  return (
    <PageGuard isValid={isJobsValid(companyJobs)} error={error}>
      {isValid && (
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-8">
              <Sidebar />

              <main className="flex-1">
                <div className="p-8 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6">
                      {/*logo */}
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src={companyJobs[0].company_logo}
                          alt={companyJobs[0].company_name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>

                      {/* iinfo */}
                      <div>
                        <h1 className="text-3xl font-bold text-black/50 mb-2">
                          {companyJobs[0].company_name}
                        </h1>
                      </div>
                    </div>

                    {/* actions */}
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 border border-gray rounded-lg hover:bg-gray/50 cursor-pointer">
                        Follow
                      </button>
                      <Button variant="primary" size="large">
                        View company profile
                      </Button>
                    </div>
                  </div>
                </div>

                {/* other jobs */}
                <div className="p-8 mb-8">
                  <h2 className="text-xl font-bold mb-6">Open roles</h2>
                  <div className="space-y-4">
                    <JobListing featuredJobs={companyJobs} />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </PageGuard>
  );
}
