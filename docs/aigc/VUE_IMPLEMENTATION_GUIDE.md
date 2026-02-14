# Vue Demo 实现指南

本文档详细说明了如何将原始JavaScript Demo迁移到Vue 3 + TypeScript的完整过程。

## 项目结构说明

### 核心组件

#### `src/components/SheetMusicDisplay.vue`
这是应用的主UI组件，包含：
- **Header**：应用标题和深色模式按钮
- **Sample Selector**：乐谱样本下拉选择器
- **状态反馈**：加载状态和错误提示
- **Controls Panel**：功能控制按钮网格
  - 缩放控制（放大/缩小）
  - 光标控制（显示/隐藏/导航）
  - 后端选择（SVG/Canvas）
  - 页面格式选择
  - 转调输入
  - 调试选项（天空线/底线）
- **Canvas Container**：乐谱显示区域

#### `src/composables/useSamples.ts`
管理可用的乐谱样本：
- 定义了60+个样本
- 提供样本路径生成功能
- 导出响应式样本数组

#### `src/composables/useSheetMusic.ts`
核心业务逻辑层：
- **State**：响应式状态管理（缩放、主题、渲染选项等）
- **Zoom控制**：zoomIn/zoomOut/setZoom
- **Cursor控制**：showCursor/hideCursor/moveCursor等
- **Backend控制**：setBackendType
- **Page Format控制**：setPageFormat
- **Debug选项**：toggleSkyline/toggleBottomline/setBoundingBox
- **声学处理**：setTransposition
- **OSMD集成**：initializeOSMD/loadScore

#### `src/types/osmd.ts`
TypeScript类型定义：
- `OpenSheetMusicDisplay`接口
- `OSMDOptions`配置接口
- `SheetMusicState`状态接口
- `PageFormat`和`BackendType`类型

#### `src/config/osmd.config.ts`
集中配置文件：
- OSMD默认配置
- 页面格式列表
- 调试边界框类型
- 常数定义（缩放范围、转调范围等）

## 从原始Demo的迁移

### 原始代码特点
- jQuery依赖（用于DOM操作）
- Semantic UI组件库
- 全局变量管理状态
- 事件处理器绑定复杂

### Vue版本改进

#### 1. 状态管理
**原始**：全局变量（zoom, showControls, etc）
**Vue**：
```typescript
const state = reactive<SheetMusicState>({
  zoom: 1.0,
  isDarkMode: false,
  // ... 其他状态
})
```

#### 2. 事件处理
**原始**：
```javascript
document.getElementById('zoom-in-btn').addEventListener('click', function() {
  zoom *= 1.1;
  // ...
})
```

**Vue**：
```vue
<button @click="zoomIn">🔍+ Zoom In</button>
```

#### 3. 条件渲染
**原始**：
```javascript
if (showControls) {
  divControls.style.visibility = 'visible'
} else {
  divControls.style.display = 'none'
}
```

**Vue**：
```vue
<div v-if="selectedSample" class="...controls...">
  <!-- 控制面板内容 -->
</div>
```

#### 4. 样式管理
**原始**：Semantic UI + 自定义CSS
**Vue**：Tailwind CSS + 响应式工具类

#### 5. 组件化
**原始**：单一HTML/JS文件
**Vue**：
- SheetMusicDisplay.vue（主组件）
- useSamples.ts（样本管理）
- useSheetMusic.ts（业务逻辑）
- 类型定义和配置分离

## 核心功能实现

### 1. 乐谱加载和渲染
```typescript
const loadSelectedSample = async () => {
  if (!selectedSample.value || !state.osmdInstance) return

  try {
    const sampleObj = samples.find(s => s.name === selectedSample.value)
    const scorePath = `/samples/${sampleObj.file}`
    await loadScore(scorePath)
  } catch (e) {
    console.error('Failed to load sample:', e)
  }
}
```

### 2. 缩放实现
```typescript
const zoomIn = () => {
  if (state.zoom < 5.0) {
    state.zoom = Math.min(state.zoom + 0.1, 5.0)
    updateZoom()
  }
}

const updateZoom = () => {
  if (state.osmdInstance) {
    state.osmdInstance.Zoom = state.zoom
    state.osmdInstance.render()
  }
}
```

### 3. 光标控制
```typescript
const showCursor = () => {
  state.showCursor = true
  state.osmdInstance?.cursor?.show()
}

const moveCursorNext = () => {
  state.osmdInstance?.cursor?.next()
}
```

### 4. 转调功能
```typescript
const setTransposition = (semitones: number) => {
  state.transposition = semitones
  if (state.osmdInstance?.Sheet) {
    state.osmdInstance.Sheet.Transpose(semitones)
    state.osmdInstance.render()
  }
}
```

## UI设计遵循规范

### 样式系统
应用遵循 `UI_STYLE_GUIDE.md` 的简洁实用设计：

#### 颜色系统
- **背景**：`bg-white/60 dark:bg-slate-800/60`（60%不透明度）
- **边框**：`border-slate-200/50 dark:border-slate-700/50`（50%不透明度）
- **文本**：`text-slate-900 dark:text-slate-100`（高对比度）
- **毛玻璃**：`backdrop-blur-sm`（增强现代感）

#### 交互设计
- **按钮尺寸**：紧凑 `p-2 text-xs`
- **间距**：`gap-2` 紧凑布局
- **过渡**：仅颜色过渡 `transition-colors duration-300`
- **悬停**：背景变浅 `hover:bg-blue-50/50 dark:hover:bg-slate-800/70`

#### 响应式布局
```vue
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
  <!-- 控制按钮 -->
</div>
```
- 移动端：2列
- 平板（sm）：3列
- 小屏（md）：4列
- 大屏（lg）：5列

## 开发工作流

### 1. 开发环境
```bash
npm install
npm run dev
```

### 2. 类型检查
```bash
npm run build  # 会执行 vue-tsc -b
```

### 3. 生产构建
```bash
npm run build
npm run preview
```

## 特性对比表

| 功能     | 原始Demo    | Vue版本      | 备注         |
| -------- | ----------- | ------------ | ------------ |
| 样本管理 | 硬编码      | 类管理       | 更易维护     |
| 缩放     | 手动DOM更新 | 自动响应式   | 性能更好     |
| 光标控制 | 事件监听    | 组件方法     | 更简洁       |
| 样式     | Semantic UI | Tailwind CSS | 更轻量       |
| 深色模式 | CSS类手动   | 响应式切换   | 实时生效     |
| 类型安全 | 无          | TypeScript   | 开发体验更好 |
| 移动适配 | 部分支持    | 完整支持     | 优化响应式   |
| 代码量   | 1000+ 行    | 分模块化     | 易于维护     |

## 新增功能

相比原始Demo，Vue版本添加了：

1. **类型安全**：完整的TypeScript类型定义
2. **配置集中**：OSMD配置独立到配置文件
3. **模块化**：好业务逻辑分离到composables
4. **更好的状态管理**：响应式状态管理，无全局变量污染
5. **现代UI**：Tailwind CSS + 毛玻璃设计
6. **更低的包体积**：无jQuery和Semantic UI依赖
7. **更快的性能**：Vue 3的优化和响应式系统
8. **完整的文档**：类型定义、配置文件和使用指南

## 扩展建议

### 添加的功能
1. **PDF导出**：集成jsPDF和svg2pdf
2. **播放控制**：集成音频播放库
3. **标记/注释**：为乐谱添加用户编辑
4. **收藏夹**：本地存储用户偏好的样本
5. **搜索功能**：快速搜索样本库

### 性能优化
1. **虚拟滚动**：大样本列表优化
2. **图片懒加载**：加载指示符
3. **缓存**：已加载的乐谱缓存
4. **工作线程**：后台处理OSMD渲染

### UX改进
1. **快捷键**：键盘快捷方式
2. **触摸手势**：移动端缩放/导航
3. **撤销/重做**：编辑历史
4. **比较视图**：并排显示版本

## 常见问题解答

### Q: OSMD导入失败怎么办？
A: 检查OSMD是否正确放置在项目中。通常路径应该是 `src/OpenSheetMusicDisplay/`。

### Q: 如何添加新的样本？
A: 编辑 `src/composables/useSamples.ts` 中的 `SAMPLES` 对象，添加新的样本条目。

### Q: 如何自定义样式？
A: 修改 `SheetMusicDisplay.vue` 中的Tailwind类名，或编辑 `src/index.css` 添加自定义样式。

### Q: 如何添加新的功能？
A: 
1. 在 `useSheetMusic.ts` 添加状态和方法
2. 在 `SheetMusicDisplay.vue` 添加UI元素
3. 绑定事件处理器

## 许可证

遵循与原始OSMD项目相同的许可证。
