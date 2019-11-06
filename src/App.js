import React, { useEffect } from "react";
import useObserver from "./useObserver";
import placeholder from "./placeholder.jpg";
import "./App.css";

function App() {
  const images = [
    "http://placekitten.com/g/600/600",
    "http://placekitten.com/g/700/700",
    "http://placekitten.com/g/800/800"
  ];

  const [observer, setElements, entries] = useObserver({
    threshold: 0.25,
    root: null
  });

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  useEffect(() => {
    const images = document.querySelectorAll(".lazy");
    setElements(images);
  }, [setElements]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>UseObserver hook example</h1>
        {images.map(source => (
          <img key={source} className="lazy" data-src={source} src={placeholder} alt="name" />
        ))}
      </header>
    </div>
  );
}

export default App;
