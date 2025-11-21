# Smart Album

Smart Album is a modern Web photo album application built with Next.js, featuring powerful image editing capabilities.

## 🌟 Features

### 🎨 Photo Editor
Built-in professional Web image editor supporting the following features:
- **Basic Operations**: Image upload, scaling, moving.
- **Crop**: Supports free-form cropping, drag to adjust crop area.
- **Filters**:
  - Sepia
  - Grayscale
  - Blur
  - Sharpen
- **Adjustments**:
  - Brightness
  - Contrast
  - Saturation
- **History**: Supports Undo and Redo operations.
- **Export**: One-click export of edited high-quality images.

### 🛠 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Graphics**: [Fabric.js (v6)](http://fabricjs.com/) - Powerful Canvas library
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   pnpm dev
   ```

3. **Access Application**
   Open your browser and visit [http://localhost:3000/editor](http://localhost:3000/editor) to experience the photo editing features.

## 🗺️ Roadmap

### Phase 1: Basic Features (Completed)
- [x] Image upload and display
- [x] Basic cropping and rotation
- [x] Common filters and parameter adjustments
- [x] Undo/Redo mechanism
- [x] Mobile touch adaptation

### Phase 2: Smart Recognition & Management (In Progress)
- [ ] **Face Recognition**: Integrate Google MediaPipe for automatic face detection.
- [ ] **Smart Categorization**: Automatically organize albums by time, location, and people.
- [ ] **Cloud Sync**: Integrate AWS S3 or OSS for multi-device synchronization.

### Phase 3: Advanced Editing & Experience
- [ ] **AI Repair**: Remove passersby, restore old photos.
- [ ] **Batch Processing**: Batch add watermarks, resize.
- [ ] **PWA Support**: Support offline access and desktop installation.

### Phase 4: Multi-platform Support
- [ ] **Mobile App**: Build iOS/Android apps using React Native or Capacitor.
- [ ] **Desktop App**: Build desktop clients using Electron.

## 🤝 Contribution

Issues and Pull Requests are welcome to help improve this project!

## 📄 License

MIT License
