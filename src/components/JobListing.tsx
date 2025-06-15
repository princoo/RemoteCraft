import { Job } from "@/types/job";
import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function JobListing({ featuredJobs }: { featuredJobs: Job[] }) {
  return (
    <div>
      <div className="space-y-4">
        {featuredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Instagram className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-black">{job.title}</h3>
                <p className="text-gray-500">
                  {job.salary !== "" ? job.salary : "---"}
                </p>
              </div>
            </div>

            <Link href={`/jobs/${job.id}`}>
              <Button variant="secondary" size="small">
                View
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
