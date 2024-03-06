import { Job } from "@prisma/client";
import Image from "next/image";
import CompanyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatCurrency, formatRelativeDate } from "@/lib/utils";
import Badge from "./Badge";

interface Props {
  job: Job;
}
export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    location,
    locationType,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: Props) {
  return (
    <article className="gap-3 border flex rounded-lg p-5 hover:bg-muted/60">
      <Image
        className="rounded-lg self-center"
        src={companyLogoUrl || CompanyLogoPlaceholder}
        alt={`${companyName} Logo`}
        width={100}
        height={100}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" /> {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" /> {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" /> {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" /> {formatCurrency(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" /> {formatRelativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground"><Clock size={16} className="shrink-0" /> {formatRelativeDate(createdAt)}</span>
      </div>
    </article>
  );
}
