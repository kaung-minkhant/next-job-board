import Image from "next/image";
import Link from "next/link";
import Logo from '@/assets/logo.png'
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="logo" width={40} height={40}/>
          <span className="text-xl font-bold tracking-tight">Job Board</span>
        </Link>
        <Button asChild>
          <Link href={'/jobs/new'}>
            Post Job
          </Link>
        </Button>
      </nav>
    </header>
  );
}
