import { jobTypes } from "@/lib/jobTypes";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import Prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

async function filterJobs(formData: FormData) {
  "use server";
  const value = Object.fromEntries(formData); // turn formdata to js objects
  const {location, q, remote, type} = jobFilterSchema.parse(value);
  const searchParams = new URLSearchParams({
    ...(q && {q: q.trim()}),
    ...(location && {location}),
    ...(type && {type}),
    ...(remote && {remote: "true"}),
  }) 
  redirect(`/?${searchParams.toString()}`)
}

interface Props {
  defaultValue: JobFilterValues
}

export default async function JobFilterSidebar({defaultValue: {location, q, remote, type}}: Props) {
  const defaultValue = {
    location, q, remote, type
  }
  const distinctLocations = (await Prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  return (
    <aside className="md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg p-4">
      <form action={filterJobs} key={JSON.stringify(defaultValue)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input name="q" id="q" placeholder="Title, Company, etc.." defaultValue={q}/>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue={type || ""}>
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={location || ""}>
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={remote}
            />
            <Label htmlFor="remote">Remote Job</Label>
          </div>
          <FormSubmitButton>
            Filter Jobs
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
