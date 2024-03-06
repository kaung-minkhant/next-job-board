import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { title } from "process";

interface Props {
  filterValues: JobFilterValues;
}
export default async function JobResults({
  filterValues: { location, q, remote, type },
}: Props) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilters: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
            },
          },
          {
            companyName: {
              search: searchString,
            },
          },
          {
            type: {
              search: searchString,
            },
          },
          {
            locationType: {
              search: searchString,
            },
          },
          {
            location: {
              search: searchString,
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilters,
      type ? {type: type} : {},
      location ? {location}: {},
      remote ? {locationType: 'Remote'} : {},
      {approved: true}
    ]
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4 flex-grow">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {
        jobs.length === 0 && <p className="text-center m-auto">No jobs found. Try adjusting search filters</p>
      }
    </div>
  );
}
