import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for banner customization
  const [bgColor, setBgColor] = useState('#0078d7');
  const [bannerText, setBannerText] = useState('I love coding!');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Predefined templates for banner design
  const templates = [
    {
      id: 1,
      name: "Classic",
      defaultBgColor: "#0078d7",
      defaultBannerText: "I love coding!",
      defaultImageUrl: "",
      cssClass: "template-classic"
    },
    {
      id: 2,
      name: "Modern",
      defaultBgColor: "#333",
      defaultBannerText: "Modern Banner",
      defaultImageUrl: "https://via.placeholder.com/400x100?text=Modern",
      cssClass: "template-modern"
    },
    {
      id: 3,
      name: "Elegant",
      defaultBgColor: "#f5f5f5",
      defaultBannerText: "Elegant Design",
      defaultImageUrl: "https://via.placeholder.com/400x100?text=Elegant",
      cssClass: "template-elegant"
    },
  ];

  // Handlers for form input changes
  const handleColorChange = (e) => setBgColor(e.target.value);
  const handleTextChange = (e) => setBannerText(e.target.value);
  const handleImageUrlChange = (e) => {
    console.log("Image URL:", e.target.value);
    setImageUrl(e.target.value);
  };

  // Function to select a template and update state
  const selectTemplate = (template) => {
    setBgColor(template.defaultBgColor);
    setBannerText(template.defaultBannerText);
    setImageUrl(template.defaultImageUrl);
    setSelectedTemplate(template);
  };

  return (
    <div className="App">
      {/* Full-width banner */}
      <header className="banner" style={{ backgroundColor: bgColor }}>
        <h1 data-testid="banner-text">{bannerText}</h1>
        {imageUrl && <img src={imageUrl} alt="Banner Visual" className="banner-image" />}
      </header>

      {/* Form for live customization */}
      <section className="controls">
        <form>
          <div>
            <label htmlFor="bgColor">Banner Background Color:</label>
            <input 
              type="color" 
              id="bgColor" 
              value={bgColor} 
              onChange={handleColorChange} 
            />
          </div>
          <div>
            <label htmlFor="bannerTextInput">Banner Text:</label>
            <input 
              type="text" 
              id="bannerTextInput" 
              value={bannerText} 
              onChange={handleTextChange} 
              placeholder="Enter new banner text" 
            />
          </div>
          <div>
            <label htmlFor="imageUrlInput">Banner Image URL:</label>
            <input 
              type="text" 
              id="imageUrlInput" 
              value={imageUrl} 
              onChange={handleImageUrlChange} 
              placeholder="Enter image URL (optional)" 
            />
          </div>
        </form>
      </section>

      {/* Template Preview Gallery */}
      <section className="template-gallery">
        <h2>Select a Template</h2>
        <div className="gallery-grid">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="template-preview" 
              onClick={() => selectTemplate(template)}
            >
              <p>{template.name}</p>
              <div 
                className="preview-banner" 
                style={{ backgroundColor: template.defaultBgColor }}
              >
                <p>{template.defaultBannerText}</p>
                {template.defaultImageUrl && <img src={template.defaultImageUrl} alt={template.name} />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
