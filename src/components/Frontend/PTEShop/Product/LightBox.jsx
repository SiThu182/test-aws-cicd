import React, { useState, useRef, useEffect } from "react";
import "./LightBox.css"; // Create this CSS file for styles
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
const Lightbox = ({ image, onClose, imageStyle, imageRatio }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);

  const startDrag = (e) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "landscape" : "portrait"
  );
  const duringDrag = (e) => {
    if (isDragging) {
      const dx = e.clientX - lastPosition.x;
      const dy = e.clientY - lastPosition.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Lock the background scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Unlock the background scroll on cleanup
      document.body.style.overflow = "";
    };
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.max(1, prevZoom * scale)); // Ensure zoom is not less than 1
  };

  const zoomIn = () => {
    setZoom((prevZoom) => prevZoom * 1.1);
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(1, prevZoom * 0.9));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox-content"
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={endDrag}
        onWheel={handleWheel}
        style={{ ...imageStyle, aspectRatio: imageRatio }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={image}
          alt="lightbox"
          style={{
            ...imageStyle,
            width: "100%",
            height: "auto",
            aspectRatio: imageRatio,
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        />
        <div className="zoom-buttons">
          <button onClick={zoomOut}>-</button>
          <button onClick={zoomIn}>+</button>
          <button onClick={onClose}>
            <CloseFullscreenIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
