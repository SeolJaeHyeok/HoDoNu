import { useCallback, useEffect, useRef } from 'react';

const useInterSectionObserver = (onIntersect: any, options?: any) => {
  const ref = useRef(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;

    // Observer 등록
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    // cleanup function - Observer 해제
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useInterSectionObserver;
