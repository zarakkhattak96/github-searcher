import { useEffect, useState, useRef } from 'react';

export const useInfiniteLoading = (onScrollBottom: () => void) => {
  const bottomBoundaryRef = useRef<any>();
  const [renderRef, setRenderRef] = useState<boolean>();

  const onIntersection = (entries: any[]) => {
    console.log('asdasdasd');
    if (entries[0].isIntersecting) {
      onScrollBottom();
    }
  };

  useEffect(() => {
    console.log('scrollin');
    const observer = new IntersectionObserver(onIntersection);
    if (observer && bottomBoundaryRef.current) {
      if (true) {
        observer.observe(bottomBoundaryRef.current);
        console.log('asdasdasd');
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bottomBoundaryRef, renderRef]);

  return {
    bottomBoundaryRef,
  };
};
