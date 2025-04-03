import React, { useState } from "react";
import "./App.css";

const App = () => {
  // Banner state variables
  const [bannerText, setBannerText] = useState("Your <b>Banner</b> Text");
  const [bannerColor1, setBannerColor1] = useState("#3498db");
  const [bannerColor2, setBannerColor2] = useState("#2ecc71");
  const [bannerHeight, setBannerHeight] = useState(150);
  const [bannerWidth, setBannerWidth] = useState(800);
  const [textSize, setTextSize] = useState(24);
  const [textFont, setTextFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#ffffff");
  const [imageUrls, setImageUrls] = useState([]);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [draggingText, setDraggingText] = useState(false);
  const [offsetText, setOffsetText] = useState({ x: 0, y: 0 });

  // Additional styling options
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState(10);

  // Handle banner text dragging
  const handleTextMouseDown = (e) => {
    setDraggingText(true);
    setOffsetText({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingText) {
      setTextPosition({
        x: e.clientX - offsetText.x,
        y: e.clientY - offsetText.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingText(false);
  };

  // Image controls remain unchanged
  const addImage = () => {
    setImageUrls([...imageUrls, { url: "", x: 50, y: 50, size: 100 }]);
  };

  const updateImageUrl = (index, url) => {
    const updatedImages = [...imageUrls];
    updatedImages[index].url = url;
    setImageUrls(updatedImages);
  };

  const updateImagePosition = (index, x, y) => {
    const updatedImages = [...imageUrls];
    updatedImages[index].x = x;
    updatedImages[index].y = y;
    setImageUrls(updatedImages);
  };

  const updateImageSize = (index, size) => {
    const updatedImages = [...imageUrls];
    updatedImages[index].size = size;
    setImageUrls(updatedImages);
  };

  // Handle banner resizing via dragging on the bottom-right resize handle
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = bannerWidth;
    const startHeight = bannerHeight;

    const handleResizeMouseMove = (event) => {
      const newWidth = startWidth + (event.clientX - startX);
      const newHeight = startHeight + (event.clientY - startY);
      if (newWidth > 200) { // Enforce a minimum width
        setBannerWidth(newWidth);
      }
      if (newHeight > 50) { // Enforce a minimum height
        setBannerHeight(newHeight);
      }
    };

    const handleResizeMouseUp = () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  // (Optional) Code download functionality remains unchanged
  const generateCodeString = () => {
    const escapedBannerText = bannerText.replace(/"/g, '\\"');
    return `// Generated App.js code
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [bannerText, setBannerText] = useState("${escapedBannerText}");
  // ... other state variables ...
  return (
    // ... JSX code ...
  );
};

export default App;
`;
  };

  const downloadCode = () => {
    const codeStr = generateCodeString();
    const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "App.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Banner Section */}
      <div
        className="banner"
        style={{
          background: `linear-gradient(to right, ${bannerColor1}, ${bannerColor2})`,
          height: `${bannerHeight}px`,
          width: `${bannerWidth}px`,
          border: `3px solid ${borderColor}`,
          borderRadius: `${borderRadius}px`,
          position: "relative",
          padding: "10px",
          margin: "20px auto",
        }}
      >
        <div
          className="banner-text"
          style={{
            fontSize: `${textSize}px`,
            fontFamily: textFont,
            color: textColor,
            position: "absolute",
            left: `${textPosition.x}px`,
            top: `${textPosition.y}px`,
            cursor: "grab",
          }}
          onMouseDown={handleTextMouseDown}
        >
          {bannerText}
        </div>
        {imageUrls.map((image, index) =>
          image.url && (
            <img
              key={index}
              src={image.url}
              alt={`Banner ${index}`}
              className="banner-image"
              style={{
                width: `${image.size}px`,
                height: "auto",
                position: "absolute",
                left: `${image.x}px`,
                top: `${image.y}px`,
                cursor: "grab",
              }}
              onMouseDown={(e) => {
                const offsetX = e.clientX - image.x;
                const offsetY = e.clientY - image.y;
                const moveImage = (event) =>
                  updateImagePosition(index, event.clientX - offsetX, event.clientY - offsetY);
                const stopMoving = () => document.removeEventListener("mousemove", moveImage);
                document.addEventListener("mousemove", moveImage);
                document.addEventListener("mouseup", stopMoving, { once: true });
              }}
            />
          )
        )}
        {/* Resize Handle for interactive resizing */}
        <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
      </div>

      {/* Controls Section */}
      <div className="controls">
        <label>Banner Text (Plain Text Only):</label>
        <textarea value={bannerText} onChange={(e) => setBannerText(e.target.value)} />

        <label>Font Size:</label>
        <input type="range" min="10" max="100" value={textSize} onChange={(e) => setTextSize(e.target.value)} />

        <label>Font Family:</label>
        <select value={textFont} onChange={(e) => setTextFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
        </select>

        <label>Font Color:</label>
        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />

        <label>Gradient Color 1:</label>
        <input type="color" value={bannerColor1} onChange={(e) => setBannerColor1(e.target.value)} />

        <label>Gradient Color 2:</label>
        <input type="color" value={bannerColor2} onChange={(e) => setBannerColor2(e.target.value)} />

        <label>Banner Height:</label>
        <input type="range" min="50" max="600" value={bannerHeight} onChange={(e) => setBannerHeight(e.target.value)} />

        <label>Banner Width:</label>
        <input type="range" min="200" max="1200" value={bannerWidth} onChange={(e) => setBannerWidth(e.target.value)} />

        <label>Border Color:</label>
        <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />

        <label>Border Radius:</label>
        <input type="range" min="0" max="50" value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} />

        <button onClick={addImage}>Add Image</button>
        {imageUrls.map((image, index) => (
          <div key={index} className="image-control">
            <label>Image URL {index + 1}:</label>
            <input type="text" value={image.url} onChange={(e) => updateImageUrl(index, e.target.value)} />
            <label>Image Size:</label>
            <input type="range" min="50" max="300" value={image.size} onChange={(e) => updateImageSize(index, e.target.value)} />
          </div>
        ))}

        <button onClick={downloadCode}>Download Code</button>
      </div>
    </div>
  );
};

export default App;
