import { useLayoutEffect, useEffect, useState } from "react";
import { useMirrorStore } from "./MirrorContext";
import { v4 as uuidv4 } from "uuid";

export const useMirror = <T extends HTMLElement>(
  ref: React.RefObject<T | null>
) => {
  const [id] = useState(() => uuidv4());
  const register = useMirrorStore((state) => state.register);
  const unregister = useMirrorStore((state) => state.unregister);
  const update = useMirrorStore((state) => state.update);

  useLayoutEffect(() => {
    if (ref.current) {
      register(id, ref.current);
    }
    return () => unregister(id);
  }, [id, register, unregister, ref]);

  useEffect(() => {
    let cancel = false;
    const sync = () => {
      if (cancel) return;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(ref.current);
        const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
        update(id, rect, borderRadius);
      }
      requestAnimationFrame(sync);
    };
    sync();
    return () => {
      cancel = true;
    };
  }, [id, update, ref]);
};
