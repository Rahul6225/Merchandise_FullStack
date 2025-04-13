import React from "react";
import "./CSS/AutoScrollSlider.css";

interface AutoScrollSliderProps {
  images: string[];
}

const AutoScrollSlider: React.FC<AutoScrollSliderProps> = ({ images = [] }) => {
  const duplicatedImages = [...images, ...images]; // For infinite scroll illusion

  return (
    <div className="slider-container">
      <div className="slider-track">
        {duplicatedImages.map((img, index) => (
          <div className="slide" key={index}>
            <img src={img} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollSlider;
