import Link from "next/link";
import { MainLayout } from "@/components";
import Nav from "@/components/layouts/Nav";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Logo from "@/assets/Logo";

export default function Home() {
  return (
    <MainLayout headTitle="Visula - Home">
      <Nav />
      <div className="bg-white">
        <div className="pt-[60px] max-w-[1248px] mx-auto p-4 min-h-screen">
          <div className="p-2 py-8">
            <div className="flex items-start gap-1 text-4xl">
              <Logo />
              <span className="uppercase bg-indigo-100 text-indigo-800 text-xs font-bold p-1 rounded-full">
                Beta
              </span>
            </div>

            <div className="flex flex-col gap-2 lg:flex-row pt-8">
              <div className=" space-y-4 md:space-y-6 lg:max-w-[50%] pr-4 mr-2">
                <p className="uppercase text-slate-600">
                  From individuals to enterprises
                </p>
                <h1 className="text-3xl font-semibold leading-tight">
                  Design and deploy schemas, and perform ETL operations for
                  CMSs.
                </h1>
                <p className="text-slate-600 max-w-lg text-sm">
                  As we aim at <em>Contentful</em>, <em>Sanity</em>, and other
                  CMSs, our app targets to improve the ability to design and
                  migrate schemas, data seeding, and perform AI-assisted ETL
                  operations for your favorite CMS.
                </p>

                <div className="flex gap-2 flex-wrap">
                  {/* <Link
                    href="/waitlist"
                    className="rounded-full bg-slate-900 hover:bg-black leading-4 p-4 px-8 text-md flex items-center justify-center text-white"
                  >
                    Join the waitlist&nbsp;&nbsp;
                    <ArrowRightIcon className="w-4 h-4 text-lg" />
                  </Link> */}
                  <Link
                    href="/try"
                    className="rounded-full border-2 border-slate-900 hover:bg-slate-600 leading-4 p-4 px-8 text-md flex items-center justify-center text-slate-900 hover:text-white"
                  >
                    Give a try&nbsp;&nbsp;
                    <ArrowRightIcon className="w-4 h-4 text-lg" />
                  </Link>
                </div>
              </div>
              {/* start: Right side pane, video */}
              <div className="w-full mt-4 md:w-[60%] md:mt-0">
                <iframe
                  loading="lazy"
                  className="aspect-video w-full"
                  // style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
                  src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGGlnjQ49M&#x2F;GXjUXPiFC6RuQjLS4PtM0A&#x2F;watch?embed"
                  allowFullScreen
                  allow="fullscreen"
                ></iframe>
              </div>
            </div>
            {/* end: Right side pane, video */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
