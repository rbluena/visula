import Link from "next/link";
import { MainLayout } from "@/components";
import Nav from "@/components/layouts/Nav";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo";

// TODO: Put the video at the center with title and description of the product.

export default function Home() {
  return (
    <MainLayout headTitle="Visula - Home">
      <Nav />
      <div className="bg-white">
        <div className="pt-[60px] max-w-[1248px] mx-auto p-4 min-h-screen">
          <div className="p-2 py-8">
            <div className="flex items-baseline text-4xl">
              <Logo />
            </div>

            <div className="flex flex-col lg:flex-row pt-8">
              <div className=" space-y-4 md:space-y-6 lg:max-w-[50%] pr-4 mr-2">
                <p className="uppercase text-slate-600">
                  From individuals to enterprises
                </p>
                <h1 className="text-3xl font-semibold leading-tight">
                  Design and deploy schemas, and perform ETL oparations for
                  CMSs.
                </h1>
                <p className="text-slate-600 max-w-lg text-sm">
                  As we will be supporting <em>Contentful</em>, <em>Sanity</em>,
                  and others, our app is targeting to improve the ability to
                  design and migrate schemas, deploy dummy data, and perform
                  complex ETL operations for your favorite CMS.
                </p>

                <div className="flex gap-2 flex-wrap">
                  <Link
                    href="/waitlist/try"
                    className="rounded-full border-2 border-slate-900 hover:bg-slate-600 leading-4 p-4 px-8 text-md flex items-center justify-center text-slate-700 hover:text-white"
                  >
                    Give a try&nbsp;&nbsp;
                    <ArrowRightIcon className="w-4 h-4 text-lg" />
                  </Link>
                  <Link
                    href="/waitlist"
                    className="rounded-full bg-slate-900 hover:bg-black leading-4 p-4 px-8 text-md flex items-center justify-center text-white"
                  >
                    Join the waitlist&nbsp;&nbsp;
                    <ArrowRightIcon className="w-4 h-4 text-lg" />
                  </Link>
                </div>
              </div>

              {/* start: Right side pane, video */}
              <div className="w-[60%]">
                <iframe
                  width="100%"
                  // height="100%"
                  className="aspect-video"
                  src="https://www.youtube.com/embed/M4vrwI5PDI0?controls=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
