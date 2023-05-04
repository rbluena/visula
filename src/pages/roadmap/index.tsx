import { useState } from "react";
import { MainLayout } from "@/components";
import Nav from "@/components/layouts/Nav";

const Raodmap = () => {
  const [showFeatureRequest, setShowFeatureRequest] = useState(false);
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
        <iframe
          className={`airtable-embed ${showFeatureRequest ? "" : "hidden"}`}
          src="https://airtable.com/embed/shrCojmuMcdxvyV8G?backgroundColor=blue"
          width="100%"
          height="533"
        />

        <iframe
          className={`airtable-embed ${showFeatureRequest ? "hidden" : ""}`}
          src="https://airtable.com/embed/shrsY2eoICp1MtcXm?backgroundColor=blue"
          width="100%"
          height="533"
        />
      </div>
    </MainLayout>
  );
};

export default Raodmap;
