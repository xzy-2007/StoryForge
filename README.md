# StoryForge

StoryForge 是一个基于 Electron + React + TypeScript 的可视化剧情节点编辑器，面向独立游戏开发者、剧情创作者和互动叙事设计者。

## 项目简介

StoryForge 提供类似 Unity 编辑器的节点式剧情设计能力。用户可以通过创建节点、连接节点、编辑属性，快速构建多分支剧情结构。

**"这东西为什么有人会用？"** — 市面上缺乏轻量级、开源、专用的剧情节点编辑器。StoryForge 填补了这个空白：一个开箱即用、可个性化定制的桌面工具。

## 技术栈

| 技术 | 用途 |
|---|---|
| Electron | 桌面框架 |
| React + TypeScript | UI 框架 |
| Vite (electron-vite) | 构建工具 |
| React Flow | 节点图编辑器 |
| Vitest | 测试框架 |
| html-to-image | PNG 导出 |
| Docker | 容器分发 |

## 功能特性

- **6 种节点类型**：💬 对话、🔀 选择、📌 事件、❓ 条件、🏁 结局、📝 备注
- **可视化编辑**：拖拽、连线、框选、批量移动
- **属性面板**：右侧编辑标题/内容/类型，支持折叠
- **内容折叠**：超过 100 字自动折叠，可展开/收起
- **主题系统**：5 套预设主题 + 自定义颜色
- **节点样式**：圆角矩形、胶囊形、卡片式
- **导出**：PNG 高清图片、Markdown 结构化文档
- **右键菜单**：快速切换类型、复制、删除
- **保存/加载**：JSON 格式，本地存储

## 目录结构

```
StoryForge/
├── electron/
│   ├── main.ts            # Electron 主进程
│   └── preload.ts         # 预加载脚本
├── src/
│   ├── components/
│   │   ├── editor/        # 编辑器组件（StoryFlow, StoryNodeComponent, Toolbar, ContextMenu）
│   │   ├── inspector/     # 属性面板
│   │   └── settings/      # 设置面板
│   ├── models/            # 数据模型（StoryNode, NodeType, NodeShape）
│   ├── services/          # 服务层（ProjectManager, ExportService）
│   ├── theme/             # 主题系统
│   ├── App.tsx            # 根组件
│   └── main.tsx           # 渲染入口
├── tests/                 # 测试文件
├── .gitlab-ci.yml         # CI 配置
├── Dockerfile             # 容器分发
└── SPEC.md / PLAN.md / AGENT_LOG.md  # 项目文档
```

## 安装与运行

### 前置要求

- Node.js >= 18
- npm >= 9

### 开发模式

```bash
# 安装依赖
npm install

# 启动开发模式（Electron 窗口 + HMR）
npm run dev
```

### 运行测试

```bash
npm test
```

### 构建生产版本

```bash
npm run build
```

### 预览构建产物

```bash
npm run preview
```

## 分发

### Docker 容器

```bash
# 构建镜像
docker build -t storyforge .

# 运行容器
docker run -p 5173:5173 storyforge

# 访问 http://localhost:5173
```

### Electron Builder（原生桌面应用）

待配置 `electron-builder` 后，运行：

```bash
npm run build:electron
```

产物在 `dist/` 目录下，包含 Windows / macOS / Linux 安装程序。

## 安全说明

### 凭据管理

当前版本**不调用任何外部 API**（不含 LLM 调用、不含遥测上报），因此不存在 API Key 泄露风险。所有数据存储在用户本地的 `localStorage` 中，不上传任何服务器。

如未来加入 AI 辅助功能，将遵循以下原则：

- API Key **绝不硬编码**进源码
- **绝不提交**进 Git（含历史）
- 使用安全存储方式（操作系统钥匙串或加密文件）
- 录入时掩码显示，查看时不回显明文

### 数据安全

- 所有项目数据仅存储在浏览器 `localStorage` 中
- 不收集任何用户数据
- 不上传任何信息到远程服务器

## 已知限制

- 无 Undo/Redo 功能（撤销/重做）
- 无自动布局功能
- 无节点搜索功能
- 仅支持中文界面
- localStorage 容量限制约 5MB，大项目建议频繁保存

## 开发流程

本项目遵循 Superpowers 软件开发流程：

```
SPEC → PLAN → Task → TDD (Red → Green → Refactor) → Review → Commit
```

## 许可证

MIT

## 课程信息

AI4SE 期末项目 B 类 —— 非 Harness 应用类项目