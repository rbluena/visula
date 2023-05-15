import { useEffect, useRef } from "react";

export default function usePreviousValue(value: string) {
  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
