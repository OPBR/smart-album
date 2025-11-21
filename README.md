# Smart Album (智能相册)

Smart Album 是一个基于 Next.js 构建的现代 Web 相册应用，集成了强大的图片编辑功能。

## 🌟 功能特性

### 🎨 图片编辑器 (Photo Editor)
内置专业的 Web 图片编辑器，支持以下功能：
- **基础操作**：图片上传、缩放、移动。
- **裁剪 (Crop)**：支持自由比例裁剪，拖拽调整裁剪区域。
- **滤镜 (Filters)**：
  - 复古 (Sepia)
  - 黑白 (Grayscale)
  - 模糊 (Blur)
  - 锐化 (Sharpen)
- **参数调节 (Adjustments)**：
  - 亮度 (Brightness)
  - 对比度 (Contrast)
  - 饱和度 (Saturation)
- **历史记录**：支持撤销 (Undo) 和重做 (Redo) 操作。
- **导出**：一键导出编辑后的高清图片。

### 🛠 技术栈
- **框架**: [Next.js](https://nextjs.org/) (React 19)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图形处理**: [Fabric.js (v6)](http://fabricjs.com/) - 强大的 Canvas 库
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand) - 轻量级状态管理
- **图标**: Lucide React

## 🚀 快速开始

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **启动开发服务器**
   ```bash
   pnpm dev
   ```

3. **访问应用**
   打开浏览器访问 [http://localhost:3000/editor](http://localhost:3000/editor) 体验图片编辑功能。

## 🗺️ 未来规划 (Roadmap)

### 阶段一：基础功能完善 (已完成)
- [x] 图片上传与展示
- [x] 基础裁剪与旋转
- [x] 常用滤镜与参数调节
- [x] 撤销/重做机制
- [x] 移动端触摸适配

### 阶段二：智能识别与管理 (进行中)
- [ ] **人脸识别**: 集成 Google MediaPipe，自动识别照片中的人脸。
- [ ] **智能分类**: 根据时间、地点、人物自动整理相册。
- [ ] **云端同步**: 集成 AWS S3 或 OSS，支持多端同步。

### 阶段三：高级编辑与体验
- [ ] **AI 修复**: 消除路人、老照片修复。
- [ ] **批量处理**: 批量添加水印、调整大小。
- [ ] **PWA 支持**: 支持离线访问和安装到桌面。

### 阶段四：多平台支持
- [ ] **移动端 App**: 使用 React Native 或 Capacitor 构建 iOS/Android 应用。
- [ ] **桌面端 App**: 使用 Electron 构建桌面客户端。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📄 许可证

MIT License
