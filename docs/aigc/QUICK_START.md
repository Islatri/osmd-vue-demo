# Vue Demo 项目结构和快速开始

## 📁 完整项目结构

```
osmd-vue-demo/
│
├── 📄 项目根目录文件
│   ├── package.json                    # 项目依赖和脚本
│   ├── vite.config.ts                  # Vite构建配置
│   ├── tsconfig.json                   # TypeScript编译配置
│   ├── index.html                      # 主HTML入口
│   ├── README.md                       # 原始项目说明
│   ├── UI_STYLE_GUIDE.md              # UI设计指南 ✨
│   │
│   ├── OSMD_VUE_DEMO_README.md        # Vue版本使用手册 📚
│   ├── VUE_IMPLEMENTATION_GUIDE.md    # 实现细节指南 📖
│   └── VUE_MIGRATION_SUMMARY.md       # 迁移总结 📋
│
├── 📁 src/                             # 源代码目录
│   │
│   ├── 🔵 main.ts                      # 应用入口
│   ├── 🔵 App.vue                      # 根组件 ⭐
│   ├── 🔵 index.css                    # 全局样式
│   ├── 🔵 vite-env.d.ts                # Vite环境类型
│   │
│   ├── 📦 components/
│   │   └── SheetMusicDisplay.vue      # 主UI组件 ⭐ (370行)
│   │       └── 功能：样本选择、按钮控制、乐谱显示
│   │
│   ├── 📦 composables/
│   │   ├── useSamples.ts              # 样本管理 ⭐ (70行)
│   │   │   └── 功能：样本列表、路径生成
│   │   │
│   │   └── useSheetMusic.ts           # 业务逻辑 ⭐ (210行)
│   │       └── 功能：所有OSMD操作、状态管理
│   │
│   ├── 📦 types/
│   │   └── osmd.ts                    # TypeScript类型 ⭐ (80行)
│   │       └── 定义：OSMD接口、State、类型
│   │
│   ├── 📦 config/
│   │   └── osmd.config.ts             # 配置管理 (90行)
│   │       └── 配置：默认选项、页面格式、常数
│   │
│   └── 📦 examples/
│       └── ComposableExamples.vue     # 使用示例 (200行)
│           └── 展示：所有API的使用方法
│
├── 📁 demo/                            # 原始Demo文件
│   ├── index.html                      # 原始HTML
│   ├── index.js                        # 原始JavaScript (1153行)
│   ├── demo.css                        # 原始样式
│   ├── BrahWiMeSample.musicxml         # 乐谱样本
│   ├── BrookeWestSample.musicxml       # 乐谱样本
│   └── resources/                      # 资源文件
│
├── 📁 public/                          # 静态资源
│
└── 📁 node_modules/                    # 依赖包
```

## 🚀 快速开始

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 开发模式
```bash
npm run dev
```
访问 `http://localhost:5173`

### 3️⃣ 生产构建
```bash
npm run build
npm run preview
```

## 📖 核心文件说明

### 🎯 主要组件 (src/components/SheetMusicDisplay.vue)

**功能**：完整的UI和用户交互
- ✅ 样本选择下拉列表
- ✅ 缩放控制按钮（放大/缩小）
- ✅ 光标控制（显示/隐藏/前后导航）
- ✅ 页面格式选择
- ✅ 转调控制
- ✅ 深色模式切换
- ✅ 调试选项（后端、边界框等）
- ✅ 响应式网格布局

### 🧮 状态和逻辑 (src/composables/useSheetMusic.ts)

**功能**：核心业务逻辑和状态管理
```typescript
// 主要方法
- zoomIn() / zoomOut()          // 缩放
- showCursor() / hideCursor()   // 光标显示
- moveCursorNext() / Previous() // 光标导航
- setPageFormat()               // 页面格式
- setTransposition()            // 转调
- toggleSkyline()               // 天空线
- setBoundingBox()              // 边界框
- loadScore()                   // 加载乐谱
```

### 📚 样本管理 (src/composables/useSamples.ts)

**功能**：管理60+个乐谱样本
```typescript
// 60+个样本包括：
- 贝多芬、巴赫、莫扎特等经典作品
- OSMD功能测试音乐
- 各种体裁和难度的乐谱
```

### 🔤 类型定义 (src/types/osmd.ts)

**功能**：完整的TypeScript类型定义
```typescript
- OpenSheetMusicDisplay 接口
- OSMDOptions 配置
- SheetMusicState 状态
- BackendType / PageFormat 类型别名
```

### ⚙️ 配置管理 (src/config/osmd.config.ts)

**功能**：集中化的配置管理
```typescript
- OSMD_DEFAULT_CONFIG       // 默认配置
- PAGE_FORMATS              // 页面格式列表
- BOUNDING_BOX_TYPES        // 调试框类型
- 缩放/转调范围常数
```

## 📊 UI布局说明

### 响应式栅栏系统
```
移动端 (< 640px)   : grid-cols-2
平板   (≥ 640px)   : sm:grid-cols-3
小屏幕 (≥ 768px)   : md:grid-cols-4
大屏幕 (≥ 1024px)  : lg:grid-cols-5
```

### 颜色和样式规范
```
背景色:     bg-white/60 dark:bg-slate-800/60
毛玻璃:     backdrop-blur-sm
边框:       border-slate-200/50 dark:border-slate-700/50
文字:       text-slate-900 dark:text-slate-100
过渡:       transition-colors duration-300
```

## 🎮 功能演示

### 加载乐谱
```typescript
1. 从下拉列表选择样本
2. 自动加载并渲染乐谱
```

### 调整显示
```typescript
1. 点击 "🔍+ Zoom In" 放大
2. 点击 "🔍- Zoom Out" 缩小
3. 实时显示缩放百分比
```

### 导航光标
```typescript
1. 点击 "👁 Show" 显示光标
2. 点击 "← Prev" 和 "Next →" 导航
3. 点击 "↻ Reset" 重置位置
```

### 转调操作
```typescript
1. 在转调输入框输入值 (-12 ~ +12)
2. 乐谱实时转调
```

### 调试选项
```typescript
1. 启用 "Skyline" 查看排版参考线
2. 启用 "Bottomline" 查看底部参考线
3. 从下拉列表选择边界框显示类型
```

## 🔧 开发工作流

### 添加新样本
1. 编辑 `src/composables/useSamples.ts`
2. 在 `SAMPLES` 对象中添加新条目
3. 重启开发服务器

### 添加新功能
1. 在 `src/composables/useSheetMusic.ts` 添加逻辑和状态
2. 在 `src/components/SheetMusicDisplay.vue` 添加UI
3. 在 `src/types/osmd.ts` 更新类型定义
4. 在 `src/config/osmd.config.ts` 添加配置（如需要）

### 修改样式
1. 编辑 `src/components/SheetMusicDisplay.vue` 中的Tailwind类
2. 或编辑 `src/index.css` 添加自定义样式
3. 使用深色模式类：`dark:text-slate-100`

## 📝 文档导航

| 文档                                    | 用途               | 读者        |
| --------------------------------------- | ------------------ | ----------- |
| **OSMD_VUE_DEMO_README.md**             | API使用和功能说明  | 最终用户    |
| **VUE_IMPLEMENTATION_GUIDE.md**         | 详细实现和迁移指南 | 开发人员    |
| **VUE_MIGRATION_SUMMARY.md**            | 项目总结和对比     | 项目管理    |
| **UI_STYLE_GUIDE.md**                   | 设计规范和样式指南 | UI/前端开发 |
| **src/examples/ComposableExamples.vue** | 代码示例和用法     | 开发人员    |

## 🛠️ 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build           # 生产构建

# 检查
npm run build           # 包含 vue-tsc -b (类型检查)

# 预览
npm run preview         # 本地预览构建结果
```

## 📦 项目依赖

```json
{
  "dependencies": {
    "vue": "^3.5.28",
    "lucide-vue-next": "^0.564.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.18",
    "typescript": "~5.9.3",
    "tailwindcss": "^4.1.18",
    "@vitejs/plugin-vue": "^6.0.4"
  }
}
```

## 🎓 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Composition API指南](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript支持](https://vuejs.org/guide/typescript/)
- [Tailwind CSS文档](https://tailwindcss.com/)
- [OSMD官方项目](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay)

## ❓ 常见问题

### Q: 乐谱不显示？
**A**: 确保OSMD库已正确配置，检查浏览器控制台错误。

### Q: 如何添加自己的乐谱？
**A**: 将.musicxml或.mxl文件放在 `/samples` 文件夹，在useSamples.ts中添加条目。

### Q: 如何修改按钮样式？
**A**: 编辑SheetMusicDisplay.vue中的Tailwind类。参考UI_STYLE_GUIDE.md了解设计规范。

### Q: 支持移动设备吗？
**A**: 完全支持！使用了响应式设计，在各种屏幕尺寸上都能良好工作。

## 📞 获取帮助

1. 查阅相应的文档文件
2. 查看src/examples/中的示例
3. 检查浏览器控制台的错误信息
4. 参考OSMD官方文档

---

**项目完成日期**：2026年2月14日

**版本**：1.0.0 (Vue版本)

**许可证**：遵循OSMD原始项目许可证

🎉 **享受使用Vue版本的OSMD Demo！**
