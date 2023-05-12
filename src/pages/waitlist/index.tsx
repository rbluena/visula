import { useState } from "react";
import { MainLayout, Spinner } from "@/components";
import Nav from "@/components/layouts/Nav";

const Waitlist = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MainLayout headTitle="Visula - Waitlist">
      <Nav />
      <div className="max-h-screen overflow-hidden pt-[60px]">
        {isLoading ? (
          <div className="bg-white grid place-items-center p-4 min-h-screen">
            <Spinner className="w-16" />{" "}
          </div>
        ) : null}
        <iframe
          className="airtable-embed bg-white"
          src="https://airtable.com/embed/shre174eu7R9ql5FU?backgroundColor=blue"
          width="100%"
          style={{ height: "100vh", background: "white" }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}

          // style="background: transparent; border: 1px solid #ccc;"
        />
      </div>
    </MainLayout>
  );
};

export default Waitlist;
