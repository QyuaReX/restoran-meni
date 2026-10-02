# 📱 Digital Restaurant Menu (NFC)

This project represents an MVP (Minimum Viable Product) version of a full-stack web application for digital menus. It allows restaurant guests instant access to the menu by simply tapping their smartphone on an **NFC tag**, without the need to install additional applications or scan PDF files.

## 🚀 Main Features

*   **Contactless Access:** Optimized for NFC tags (NTAG213/215) using unique URL links.
*   **Multi-language Support:** Built-in support for Bosnian, English, and German languages.
*   **Speed and Responsiveness:** A Single-Page Application (SPA) approach enables instant loading and adaptation to all screen sizes.
*   **Dynamic Data:** All items, prices, and descriptions are fetched directly from a relational MySQL database.

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MySQL (cloud-hosted)
*   **Deployment:** Render.com (Backend) / Aiven (Database)

## 📂 Project Structure[cite: 1]

- `index.html` - Main user interface (Frontend)
- `server.js` - Node.js API and server configuration
- `logo.png` - Graphical resources
- `package.json` - Node.js dependencies (Express, MySQL2, CORS)

## 💻 Running the Project Locally

If you want to run the project on your computer for further development:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/QyuaReX/restoran-meni.git](https://github.com/QyuaReX/restoran-meni.git)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
   Create an .env file in the main directory or export the variables in the terminal:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=digitalni_meni
   DB_PORT=3306
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```
   The application will be available at `http://localhost:3000`.

## 🗺️ Future Roadmap

- [ ] Development of a secure Admin panel for restaurant owners (adding/deleting dishes).
- [ ] Implementation of local LLM models (Ollama/Qwen) for automatic AI menu translation.
- [ ] Adding an option to temporarily hide "unavailable" items with a single click.

---
*Designed and developed in Sarajevo, BiH.*