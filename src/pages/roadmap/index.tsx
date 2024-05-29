import { useState } from "react";
import { MainLayout, Spinner } from "@/components";
import Nav from "@/components/layouts/Nav";

const Raodmap = () => {
  const [showFeatureRequest, setShowFeatureRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MainLayout headTitle="Visula - Raodmap">
      <Nav />
      <div className="max-h-screen overflow-hidden pt-[60px]">
        <div className="flex p-2 bg-indigo-50 space-x-4">
          <div className="space-x-2">
            <input
              id="roadmap"
              type="radio"
              value="roadmap"
              checked={!showFeatureRequest}
              onChange={() => setShowFeatureRequest(false)}
              className="w-4 h-4"
            />
            <label htmlFor="roadmap" className="text-slate-700">
              Roadmap
            </label>
          </div>
          <div className="space-x-2">
            <input
              id="feature-request"
              type="radio"
              value="feature-request"
              checked={showFeatureRequest}
              onChange={() => setShowFeatureRequest(true)}
              className="w-4 h-4"
            />
            <label htmlFor="feature-request" className="text-slate-700">
              Feature request
            </label>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white grid place-items-center p-4 min-h-screen">
            <Spinner className="w-16" />{" "}
          </div>
        ) : null}

        <iframe
          className={`airtable-embed ${showFeatureRequest ? "" : "hidden"}`}
          src="https://airtable.com/embed/shrCojmuMcdxvyV8G?backgroundColor=blue"
          loading="lazy"
          width="100%"
          height="533"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />

        <iframe
          className={`airtable-embed ${showFeatureRequest ? "hidden" : ""}`}
          src="https://airtable.com/embed/shrsY2eoICp1MtcXm?backgroundColor=blue"
          loading="lazy"
          width="100%"
          height="533"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </MainLayout>
  );
};

export default Raodmap;
