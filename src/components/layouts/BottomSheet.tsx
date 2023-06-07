import { useGlobalStore } from "@/lib/client/store/global";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const BottomSheet = ({ children }: Props) => {
  const [sheetHeight, setSheetHeight] = useState<number>(110);
  const bottomSheetStatus = useGlobalStore((state) => state.bottomSheetOpen);

  useEffect(() => {
    if (bottomSheetStatus === "closed") {
      setSheetHeight(110);
    }

    if (bottomSheetStatus === "opened") {
      setSheetHeight(40);
    }

    if (bottomSheetStatus === "expanded") {
      setSheetHeight(5);
    }
  }, [bottomSheetStatus]);

  return (
    <div
      className={`bg-white w-full transition-all fixed bottom-1 z-50 overflow-hidden shadow-xl border-t-2 border-t-slate-200`}
      style={{ top: `${sheetHeight}%` }}
    >
      {bottomSheetStatus === "closed" ? null : children}
    </div>
  );
};

export default BottomSheet;
