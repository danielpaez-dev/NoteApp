import React from "react";
import "./image.css";

const Image = ({ src, alt, className = "" }) => {
  return <img src={src} alt={alt} className={`image ${className}`} />;
};

export default Image;
