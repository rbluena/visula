/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "./Card";
import { useHistoryStore } from "@/lib/client/store/history";
import Spinner from "../common/Spinner/Spinner";
import {
  deleteSchemaHistoryService,
  getAllShemasService,
} from "@/services/schemas";
import { useRouter } from "next/router";

// TODO: Options to "Diff"ing or checking the changes from one schema to another

const RightPaneHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [metaData, setMetaData] = useState<{
    pagination?: { total?: number; page: number; hasMore: boolean };
  }>({ pagination: { page: 1, hasMore: true } });

  const { query } = useRouter();
  const { resetState, appendLoadedSchemas, removeSchema } = useHistoryStore(
    (state) => state
  );
  const historyData = useHistoryStore((state) => {
    return state.schemaIds.map((id) => ({ ...state.data[id] }));
  });

  const isHistoryStateHasAtleastOneItem = historyData.length > 0;

  /**
   *
   */
  function loadMoreSchemas() {
    setIsLoadingMore(true);
    getAllShemasService(query.id as string, {
      page: metaData.pagination!.page,
      limit: 5,
    })
      .then((responseData) => {
        appendLoadedSchemas(responseData);
        setMetaData(responseData.meta);
        setIsLoadingMore(false);
      })
      .catch(() => setIsLoadingMore(false));
  }

  function deleteSchemaHistory(schemaId: string) {
    deleteSchemaHistoryService(query.id as string, schemaId)
      .then(() => {
        removeSchema(schemaId);
      })
      .catch(console.log);
  }

  useEffect(() => {
    if (!isHistoryStateHasAtleastOneItem) {
      getAllShemasService(query.id as string, { page: 1, limit: 5 })
        .then((data) => {
          resetState(data);
          setMetaData(metaData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="divide-y transition-all flex flex-col  divide-slate-100 overflow-y-auto overflow-x-hidden h-[calc(100vh-52px)] relative mt-1">
      {!isLoading
        ? historyData?.map((schema) => {
            return (
              <Card
                key={schema.id}
                name={schema.name as string}
                description={schema.description}
                createdDate={schema.createdAt as any}
                version={schema.tag}
                deleteSchemaHistory={() =>
                  deleteSchemaHistory(schema.id as string)
                }
              />
            );
          })
        : null}

      {isLoading ? (
        <div className="grid place-items-center h-[calc(90vh-52px)] overflow-hidden">
          <Spinner className="w-10 h-10" />
        </div>
      ) : null}

      <div className="fixed bottom-0 bg-transparent border-none w-full">
        <button
          onClick={loadMoreSchemas}
          disabled={isLoadingMore}
          className=" bg-violet-600 flex justify-center  text-white py-1 px-2 w-[120px] text-center hover:bg-violet-500 rounded"
        >
          {isLoadingMore ? <Spinner /> : "Load more"}
        </button>
      </div>
    </div>
  );
};

export default RightPaneHistory;
