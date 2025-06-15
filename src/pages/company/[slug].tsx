import { fetchJobs } from "@/lib/fetchJobs";
import { Job } from "@/types/job";
import Image from "next/image";
import JobListing from "@/components/JobListing";
import Sidebar from "@/components/company/Sidebar";

interface CompanyProfileProps {
  companyJobs: Job[];
}

export async function getStaticPaths() {
  try {
    const jobs = await fetchJobs();
    const companySlugs = Array.from(
      new Set(jobs.map((job) => job.company_name.toLowerCase()))
    );

    const paths = companySlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching company slugs:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const slug = params?.slug;
    if (!slug || typeof slug !== "string") {
      return {
        notFound: true,
      };
    }

    const jobs = await fetchJobs();
    const companyJobs = jobs.filter(
      (job) => job.company_name.toLowerCase() === slug.toLowerCase()
    );

    if (!companyJobs || companyJobs.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        companyJobs,
      },
      revalidate: 1800,
    };
  } catch (error) {
    console.error("Error fetching company:", error);
    return {
      notFound: true,
    };
  }
}

export default function CompanyProfile({ companyJobs }: CompanyProfileProps) {
  console.log(companyJobs)
  if (!companyJobs || companyJobs.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Company Not Found
          </h1>
          <p className="text-gray-600">
            The company you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex-1">
            {/* Company Header */}
            <div className="p-8 mb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6">
                  {/* Company Logo */}
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src={companyJobs[0].company_logo}
                      alt={companyJobs[0].company_name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>

                  {/* Company Info */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {companyJobs[0].company_name}
                    </h1>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Follow
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    View company profile
                  </button>
                </div>
              </div>
            </div>

            {/* Open Roles */}
            <div className="p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Open roles
              </h2>
              <div className="space-y-4">
                <JobListing featuredJobs={companyJobs} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
