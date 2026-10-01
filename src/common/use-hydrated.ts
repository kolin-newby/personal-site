import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False while rendering the prerendered HTML and while hydrating it, true
// from then on (and from the first render when nothing was prerendered).
// Lets render output that can't match the server's, like a random pick, wait
// until hydration is done.
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
