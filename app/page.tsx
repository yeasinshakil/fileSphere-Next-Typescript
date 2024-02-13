import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-600 dark:bg-slate-800">
      <div className="container py-5 flex flex-col lg:flex-row items-center gap-10 lg:gap-2">
        <div className="lg:w-[50%] flex flex-col space-y-5 text-white">
          <h1 className="text-5xl font-bold">
            Everything you and your business need to work efficiently, all in
            one place
          </h1>
          <p className="pb-7 lg:pb-20">
            Collaborate seamlessly and deliver work faster from anywhere with
            FileSphere. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement—without leaving FileSphere.
          </p>

          <Link href={"/dashboard"}>
            <Button className="bg-blue-500 text-white font-semibold hover:bg-blue-700 ">
              Try it for free{" "}
              <span>
                <ArrowRight className=" ml-10" />
              </span>
            </Button>
          </Link>
        </div>

        <div className="h-full pb-10">
          <video
            muted
            loop
            autoPlay
            typeof="video/mp4"
            className="rounded-lg"
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
          >
            Your browser does not support video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
