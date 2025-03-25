import React from "react";
import "./image.css";

const Image = ({ src, alt, className = "" }) => {
  if (!src) {
    return null;
  }

  return <img src={src} alt={alt} className={`image ${className}`} />;
};

export default Image;
