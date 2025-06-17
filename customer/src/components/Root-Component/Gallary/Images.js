import React, { useState, useEffect } from 'react';
import './Images.css';

const Images = ({ images, interval }) => {
  const [currentImage, setCurrentImage] = useState(0);
  // eslint-disable-next-line
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFade(false);
      }, 500); // Adjust the duration of the fade transition as needed
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div className="slider1" >
      {images.map((image, index) => (
        <img
          key={index + 1}
          src={image}
          alt={`SliderImage ${index}`}
          className={index === currentImage ? 'active' : ''}
          style={{ animationDelay: `${index * interval}ms` }}
        />
      ))}
    </div>

  );

};

export default Images;
