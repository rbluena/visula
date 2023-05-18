import { useEffect, useState } from "react";
import Card from "./Card";

// TODO: Options to "Tag", "Delete", "Preview"ing the version, "Diff"ing or checking the changes from one schema to another

const RightPaneHistory = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Get all versions of the product
  }, []);

  return (
    <div className="divide-y divide-slate-100 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-52px)] relative mt-1">
      <Card
        name="Amazing progress"
        description=""
        createdDate=""
        version="2.1"
      />
      <Card
        name="Amazing progress"
        description=""
        createdDate=""
        version="2.1"
      />
    </div>
  );
};

export default RightPaneHistory;
