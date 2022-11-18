import { useCallback, useEffect, useRef } from 'react';

const useInterSect = (onIntersect: any, options?: any) => {
  const ref = useRef(null);

  const callback = useCallback(
    (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useInterSect;
