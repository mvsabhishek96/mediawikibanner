# Interactive Banner Creator with Template Management

## Overview
This project is a React-based tool that simplifies the creation of MediaWiki banners. It allows users to live-customize a full-width banner by adjusting the background color, banner text, and image URL. Additionally, it features a template gallery where users can select from pre-designed templates, each with its own layout, font, and styling options.

## Features
- **Live Customization:** Update banner properties instantly without reloading the page.
- **Template Management:** Choose from multiple pre-designed templates to quickly apply different styles.
- **Responsive Preview:** See a real-time preview of your banner as you make changes.
- **Unit Testing:** Includes tests using Jest and React Testing Library for robust functionality.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/mediawikibanner.git
   cd mediawikibanner
------------------------------------------------------------------
Install Dependencies:
npm install
Usage
Start the Development Server:
npm start
Open the App in Your Browser: Visit http://localhost:3000 to view the interactive banner tool.
Customize the Banner:
Use the form to change the background color, banner text, and image URL.
Select a template from the gallery to apply its default settings.
All changes update live in the preview.
Running Tests
To run the unit tests, execute:
npm test
Project Structure
src/App.js: Main React component that implements the banner and template management.
src/App.css: Styles for the banner, form, and template gallery.
src/App.test.js: Unit tests to ensure interactive functionality.
src/index.js: Application entry point.
