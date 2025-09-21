# NoteScribe: Turn Your Handwritten Notes into Text.

NoteScribe is a privacy-first, client-side web application that transforms your handwritten notes into editable text in your browser. Using the power of Tesseract.js, it provides a fast, secure, and intuitive way to digitize your physical notes without ever uploading your data to a server.

**Live Demo:** [https://sanjay-s-13.github.io/NoteScribe/](https://sanjay-s-13.github.io/NoteScribe/)

-----

### ✨ Features

  * **🔐 Privacy-First OCR:** All processing happens directly in your browser using **Tesseract.js**. Your images are never sent to a server.
  * **⚙️ Powerful Preprocessing Tools:** Fine-tune your OCR results with built-in controls for:
      * **Grayscale & Contrast**
      * **Binarization (black & white thresholding)**
      * **Smart Upscaling** for improved clarity
  * **🖥️ Interactive Preview:** Instantly see how preprocessing affects your image to optimize recognition before you start.
  * **📝 Seamless Text Management:**
      * One-click **Copy to Clipboard**
      * **Download** as a `.txt` file
      * Automatic cleanup of raw OCR output for a cleaner result
  * **📱 Fully Responsive:** The clean, user-friendly interface is designed to work flawlessly on desktop, tablet, and mobile devices.

-----

###  Technology Stack

  * **Frontend:** HTML5, CSS3 (Custom Responsive Layout), JavaScript ES6
  * **OCR Engine:** Tesseract.js (v5.x)

-----

###  How It Works

**1. Upload:** Select an image of your handwritten notes from your device.

**2. Preprocess:** Adjust the image with real-time controls to enhance text visibility. This is a crucial step for achieving high accuracy.

**3. Recognize:** Click "Process & OCR." Tesseract.js analyzes the preprocessed image and extracts the text. You'll see a progress bar update in real time.

**4. Finalize:** The recognized text appears in the output box, cleaned and ready to use.

-----

###  Why NoteScribe?

In a world where data privacy is paramount, NoteScribe stands out. It's not just a tool; it's a commitment to security and speed. By keeping all computations on the client side, your notes remain yours, every step of the way.

-----

###  Get Started

Running NoteScribe locally is fast and easy.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Sanjay-S-13/NoteScribe.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd NoteScribe
    ```

3.  Open `index.html` in your favorite web browser.

-----

###  Roadmap

  * **Multi-language Support:** Add support for more languages beyond English.
  * **Cloud OCR Integration:** Implement an optional backend integration with services like Google Vision or AWS Textract for even better accuracy on very messy handwriting.
  * **Dark Mode:** Introduce a user-selectable dark theme for improved accessibility and a modern aesthetic.

-----

### 👨‍💻 Author

**Sanjay S** - [GitHub](https://github.com/Sanjay-S-13) | [LinkedIn](https://www.linkedin.com/in/sanjays13-/)
