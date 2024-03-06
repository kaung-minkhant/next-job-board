import JobFilterSidebar from "@/components/JobFIlterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

function getTitle({location, q, remote, type}: JobFilterValues) {
  const titlePrefix = q ? `${q} Jobs` : type ? `${type} Developer Jobs` : remote ? "Remote Developer Jobs" : "All Developer Jobs";
  const titleSuffix = location ? ` in ${location}` : "";

  return titlePrefix + titleSuffix
}

export function generateMetadata({searchParams: {location, q, remote, type}}: Props): Metadata {
  const filterValues: JobFilterValues = {
    q, type, location, remote: remote === 'true' ? true: false
  }
  return {
    title: `${ getTitle(filterValues) } | Job Board`
  }
}

interface Props {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}
export default async function Home({
  searchParams: { location, q, remote, type },
}: Props) {
  const filterValues: JobFilterValues = {
    q, type, location, remote: remote === 'true' ? true: false
  }
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValue={filterValues}/>
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
