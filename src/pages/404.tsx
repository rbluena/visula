import Link from "next/link";
import { MainLayout } from "@/components";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import Nav from "@/components/layouts/Nav";

const NotFound = () => {
  return (
    <MainLayout headTitle="Visula | Not Found">
      <Nav />
      <div className="w-screen h-screen grid place-items-center overflow-hidden">
        <div className="space-y-4">
          <h1 className="text-4xl text-violet-700 font-bold">404: Not Found</h1>
          <p className="text-slate-700">
            We cannot reach the page you are looking for!{" "}
          </p>
          <div className="flex  items-end">
            <Link
              href="/"
              className="hover:underline underline-offset-2 flex items-end space-x-2"
            >
              <HomeModernIcon className="w-8 h-8" />
              <p className="text-violet-600">Go back home</p>
            </Link>{" "}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const notFoundData = {};

  return {
    props: {
      data: notFoundData,
    },
  };
};

export default NotFound;
