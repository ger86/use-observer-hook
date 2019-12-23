import { useEffect, useRef, useState } from "react";

const useObserver = options => {
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState([]);

  const observer = useRef(new IntersectionObserver(observedEntries => {
    setEntries(observedEntries);
  }, options));

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    if (elements.length) {
      elements.forEach(element => currentObserver.observe(element));
    }
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [elements]);

  return [observer.current, setElements, entries];
};

export default useObserver;
