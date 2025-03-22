import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [bannerText, setBannerText] = useState("Your <b>Banner</b> Text");
  const [bannerColor1, setBannerColor1] = useState("#3498db");
  const [bannerColor2, setBannerColor2] = useState("#2ecc71");
  const [bannerHeight, setBannerHeight] = useState(100);
  const [textSize, setTextSize] = useState(24);
  const [textFont, setTextFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#ffffff");
  const [imageUrls, setImageUrls] = useState([]);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [draggingText, setDraggingText] = useState(false);
  const [offsetText, setOffsetText] = useState({ x: 0, y: 0 });

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

  // Generates the full source code as a string, including current state values.
  // This function interpolates state values into the code template.
  const generateCodeString = () => {
    // Escape double quotes in bannerText so that they are valid in the code string.
    const escapedBannerText = bannerText.replace(/"/g, '\\"');
    return `import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [bannerText, setBannerText] = useState("${escapedBannerText}");
  const [bannerColor1, setBannerColor1] = useState("${bannerColor1}");
  const [bannerColor2, setBannerColor2] = useState("${bannerColor2}");
  const [bannerHeight, setBannerHeight] = useState(${bannerHeight});
  const [textSize, setTextSize] = useState(${textSize});
  const [textFont, setTextFont] = useState("${textFont}");
  const [textColor, setTextColor] = useState("${textColor}");
  const [imageUrls, setImageUrls] = useState(${JSON.stringify(imageUrls)});
  const [textPosition, setTextPosition] = useState(${JSON.stringify(textPosition)});
  const [draggingText, setDraggingText] = useState(false);
  const [offsetText, setOffsetText] = useState({ x: 0, y: 0 });

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

  return (
    <div className="App" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className="banner"
        style={{
          background: \`linear-gradient(to right, \${bannerColor1}, \${bannerColor2})\`,
          height: \`\${bannerHeight}px\`,
          position: "relative",
        }}
      >
        <div
          className="banner-text"
          style={{
            fontSize: \`\${textSize}px\`,
            fontFamily: textFont,
            color: textColor,
            position: "absolute",
            left: \`\${textPosition.x}px\`,
            top: \`\${textPosition.y}px\`,
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
              alt="Banner"
              className="banner-image"
              style={{
                width: \`\${image.size}px\`,
                height: "auto",
                position: "absolute",
                left: \`\${image.x}px\`,
                top: \`\${image.y}px\`,
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
      </div>

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
        <input type="range" min="50" max="300" value={bannerHeight} onChange={(e) => setBannerHeight(e.target.value)} />

        <button onClick={addImage}>Add Image</button>
        {imageUrls.map((image, index) => (
          <div key={index}>
            <label>Image URL {index + 1}:</label>
            <input type="text" value={image.url} onChange={(e) => updateImageUrl(index, e.target.value)} />
            <label>Image Size:</label>
            <input type="range" min="50" max="300" value={image.size} onChange={(e) => updateImageSize(index, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
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
      <div
        className="banner"
        style={{
          background: `linear-gradient(to right, ${bannerColor1}, ${bannerColor2})`,
          height: `${bannerHeight}px`,
          position: "relative",
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
              alt="Banner"
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
      </div>

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
        <input type="range" min="50" max="300" value={bannerHeight} onChange={(e) => setBannerHeight(e.target.value)} />

        <button onClick={addImage}>Add Image</button>
        {imageUrls.map((image, index) => (
          <div key={index}>
            <label>Image URL {index + 1}:</label>
            <input type="text" value={image.url} onChange={(e) => updateImageUrl(index, e.target.value)} />
            <label>Image Size:</label>
            <input type="range" min="50" max="300" value={image.size} onChange={(e) => updateImageSize(index, e.target.value)} />
          </div>
        ))}
      </div>
      <button onClick={downloadCode}>Download Code</button>
    </div>
  );
};

export default App;
