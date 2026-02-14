# OpenSheetMusicDisplay Vue Demo

这是使用Vue 3 + TypeScript实现的OpenSheetMusicDisplay (OSMD)交互式演示应用。

## 项目结构

```
src/
├── App.vue                          # 主应用组件
├── components/
│   └── SheetMusicDisplay.vue       # 乐谱显示主组件
├── composables/
│   ├── useSamples.ts               # 乐谱样本管理
│   └── useSheetMusic.ts            # OSMD逻辑处理
├── main.ts                          # 应用入口
└── index.css                        # 全局样式

demo/
├── index.html                       # 原始Demo HTML
├── index.js                         # 原始Demo JavaScript
├── demo.css                         # 原始Demo样式
└── *.musicxml                       # 乐谱样本文件
```

## 功能特性

### 乐谱管理
- **样本库**：包含60+个经典乐谱和功能测试样本
- **动态加载**：从useSamples.ts管理的样本列表中选择加载

### 用户交互
- **缩放控制**：放大/缩小乐谱显示（10% - 500%）
- **光标控制**：
  - 显示/隐藏播放光标
  - 上一个/下一个音符导航
  - 重置光标位置
  - 跟随光标选项
- **渲染后端**：SVG或Canvas渲染方式切换
- **页面格式**：支持多种纸张尺寸（A3, A4, A5, Letter、竖/横版）
- **转调**：实时转调（-12～+12个半音）

### 调试选项
- **边界框显示**：查看各种图形元素的边界框
- **天空线/底线**：显示排版参考线
- **深色模式**：界面主题切换

## 设计规范

遵循 [UI_STYLE_GUIDE.md](../UI_STYLE_GUIDE.md) 的简洁实用型UI设计：
- **透明毛玻璃美学**：半透明背景 + 毛玻璃模糊效果
- **高信息密度**：紧凑布局，最大化可用空间
- **响应式设计**：支持移动、平板、桌面各种屏幕尺寸
- **高对比度**：深色/浅色模式支持

## 样式说明

### 颜色方案
- **半透明背景**：`bg-white/60 dark:bg-slate-800/60`
- **毛玻璃效果**：`backdrop-blur-sm`
- **边框**：`border-slate-200/50 dark:border-slate-700/50`（50%透明度）
- **文字色**：`text-slate-900 dark:text-slate-100`（高对比度）

### 交互元素
- **按钮尺寸**：紧凑 `p-2 text-xs`
- **过渡效果**：仅使用颜色过渡 `transition-colors`
- **悬停状态**：背景变浅 `hover:bg-blue-50/50`

### 网格布局
- **移动端**：2列
- **平板**：3列
- **桌面**：4-5列
- **间距**：`gap-2`（紧凑）

## 实现细节

### useSamples.ts
- **样本列表**：SAMPLES对象包含所有可用样本
- **路径生成**：getSamplePath()方法构造样本URL
- **类型安全**：提供TypeScript接口定义

### useSheetMusic.ts
- **状态管理**：SheetMusicState接口存储应用状态
- **OSMD集成**：initializeOSMD()和loadScore()方法
- **功能模块**：
  - Zoom controls（缩放）
  - Cursor controls（光标）
  - Backend controls（渲染方式）
  - Page format controls（页面格式）
  - Debug controls（调试）
  - Transpose（转调）

### SheetMusicDisplay.vue
- **模板结构**：
  - Header区顶部
  - 样本选择器
  - 状态提示（加载/错误）
  - 控制按钮网格
  - 乐谱显示容器
  - 版本信息页脚

- **响应式设计**：
  - `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`
  - 根据屏幕尺寸自动调整列数

## 使用方法

### 开发模式
```bash
npm install
npm run dev
```
访问 `http://localhost:5173`

### 生产构建
```bash
npm run build
```

### 功能使用流程

1. **选择样本**
   - 从下拉列表选择乐谱
   - 自动加载并渲染

2. **调整显示**
   - 使用缩放按钮调整大小
   - 切换渲染后端
   - 选择页面格式

3. **导航乐谱**
   - 使用光标按钮导航
   - 启用"跟随光标"自动滚动

4. **调试/分析**
   - 启用边界框查看元素布局
   - 显示天空线/底线查看排版
   - 查看深色模式适配

## 关键代码示例

### 加载OSMD
```typescript
const OpenSheetMusicDisplay = await import(
  '../OpenSheetMusicDisplay/OpenSheetMusicDisplay'
).then((m) => m.OpenSheetMusicDisplay)

initializeOSMD(canvasDiv, OpenSheetMusicDisplay)
```

### 缩放
```typescript
const zoomIn = () => {
  if (state.zoom < 5.0) {
    state.zoom = Math.min(state.zoom + 0.1, 5.0)
    updateZoom()
  }
}
```

### 转调
```typescript
const setTransposition = (semitones: number) => {
  state.transposition = semitones
  if (state.osmdInstance && state.osmdInstance.Sheet) {
    state.osmdInstance.Sheet.Transpose(semitones)
    state.osmdInstance.render()
  }
}
```

## 样本库说明

包含的样本分为两类：

### 经典音乐作品
- 贝多芬、巴赫、莫扎特、海顿等大师作品
- 钢琴奏鸣曲、弦乐四重奏等各种体裁

### OSMD功能测试用例
- 音符符头形状测试
- 和弦符号测试
- 打鼓五线谱测试
- 制表符测试
- 各种表情符号、装饰音、踏板等测试

## 开发计划

### Phase 2（如需要）
- [ ] PDF导出功能
- [ ] 播放功能集成
- [ ] MIDI支持
- [ ] 注释/标记功能
- [ ] 收藏夹功能
- [ ] 搜索/筛选功能

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动浏览器（iOS Safari, Chrome Mobile）

## 许可证

遵循与原始OSMD项目相同的许可证。

## 参考资源

- [OpenSheetMusicDisplay 官网](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay)
- [Vue 3 官方文档](https://vuejs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
