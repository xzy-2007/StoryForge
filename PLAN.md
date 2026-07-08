# StoryForge —— 开发计划

版本：v2.0

项目类型：AI4SE 期末项目 B 类 —— 非 Harness 应用类项目

---

## 1. 技术栈

| 技术 | 版本 | 用途 |
|---|---|---|
| TypeScript | ~5.5 | 开发语言 |
| React | ^18.3 | UI 框架 |
| Electron | ^31.2 | 桌面框架 |
| electron-vite | ^2.3 | 构建工具 |
| React Flow | ^11.11 | 节点图编辑器 |
| Vitest | ^1.6 | 测试框架 |
| html-to-image | ^1.11 | PNG 导出 |
| Electron Builder | (dev) | 桌面打包 |

---

## 2. 任务完成状态

### Task 1：项目初始化 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 建立 Electron + React + TypeScript + Vite 开发环境 |
| 涉及文件 | `package.json`, `electron/main.ts`, `electron/preload.ts`, `src/index.html`, `src/main.tsx`, `src/App.tsx`, `electron.vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tsconfig.web.json` |
| 完成 commit | `e39f4ea` |
| 验证 | `npm run dev` 启动 Electron 窗口 |

### Task 2：数据模型 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 实现 StoryNode、NodeType、NodeShape 等核心数据模型 |
| 涉及文件 | `src/models/StoryNode.ts` |
| 完成 commit | `6917c3a` |
| 验证 | `npm test` 通过 StoryNode 模型测试 |

### Task 3：节点连接与状态管理 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 实现 React Flow 节点显示、拖拽、连线、删除 |
| 涉及文件 | `src/components/editor/StoryFlow.tsx`, `src/components/editor/StoryNodeComponent.tsx` |
| 完成 commit | `de67570` |
| 验证 | StoryFlow 测试通过（节点渲染、连线创建、连线删除） |

### Task 4：节点编辑画布 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 完善画布功能，统一状态管理 |
| 涉及文件 | `src/components/editor/StoryFlow.tsx`, `src/App.tsx` |
| 完成 commit | `9e2eca8` |
| 验证 | 画布可正常显示、拖拽、连线 |

### Task 5：Inspector 属性面板 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 实现右侧属性面板，支持编辑标题、内容、类型 |
| 涉及文件 | `src/components/inspector/Inspector.tsx` |
| 完成 commit | `18386e1` |
| 验证 | Inspector 测试通过（显示、编辑、联动） |

### Task 6：保存/加载 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 实现 ProjectManager 序列化/反序列化 |
| 涉及文件 | `src/services/ProjectManager.ts` |
| 完成 commit | `9e2eca8` |
| 验证 | ProjectManager 测试通过（保存/加载 JSON） |

### Task 7：UI 优化与功能增强 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 完善工作台 UI，增加主题、节点样式、导出、设置等功能 |
| 涉及文件 | 多个组件文件 |
| 完成 commit | 多个 commit |
| 子任务 | |
| 7.1 | 工具栏 UI 优化、中文化 |
| 7.2 | 节点类型扩充（6 种） |
| 7.3 | 主题系统（5 套预设 + 自定义颜色） |
| 7.4 | 节点样式选择（圆角/胶囊/卡片） |
| 7.5 | 导出 PNG + Markdown |
| 7.6 | 属性面板折叠功能 |
| 7.7 | 右键菜单 |
| 7.8 | 框选/批量移动 |
| 7.9 | 内容折叠（超 100 字） |
| 7.10 | 设置面板（含使用说明） |
| 7.11 | 去除 Electron 原生菜单栏 |
| 验证 | 全部测试通过，构建成功 |

### Task 8：测试、CI、分发 ✅

| 项目 | 详情 |
|---|---|
| 目标 | 满足课程工程要求 |
| 涉及文件 | `.gitlab-ci.yml`, `Dockerfile`, `.dockerignore` |
| 子任务 | |
| 8.1 | CI 配置 `.gitlab-ci.yml`（含 `unit-test` job） |
| 8.2 | Docker 容器分发 |
| 8.3 | 文档更新（SPEC/PLAN/README/AGENT_LOG） |
| 验证 | CI 通过，容器构建成功 |

---

## 3. 任务依赖关系图

```
Task1 (项目初始化)
  └→ Task2 (数据模型)
       └→ Task3 (节点连接与状态管理)
            └→ Task4 (节点编辑画布)
                 ├→ Task5 (Inspector 属性面板)
                 ├→ Task6 (保存/加载)
                 └→ Task7 (UI 优化与功能增强)
                      └→ Task8 (测试、CI、分发)
```

---

## 4. 测试清单

| 测试文件 | 测试数 | 覆盖内容 |
|---|---|---|
| `tests/models/StoryNode.test.ts` | 2 | 创建节点、字段完整性 |
| `tests/services/ProjectManager.test.ts` | 2 | 保存序列化、加载反序列化 |
| `tests/components/editor/StoryFlow.test.tsx` | 3 | 节点渲染、连线创建、连线删除 |
| `tests/components/editor/StoryNodeComponent.test.tsx` | 3 | 标题、内容、类型标签渲染 |
| `tests/components/editor/Toolbar.test.tsx` | 1 | 按钮渲染 |
| `tests/components/inspector/Inspector.test.tsx` | 3 | 标题显示、内容显示、编辑联动 |
| `src/App.test.tsx` | 3 | 应用渲染、标题、布局 |
| `tests/build.test.ts` | 1 | 构建烟雾测试 |
| **总计** | **18** | |

---

## 5. 未完成 / 待改进

| 项目 | 优先级 | 说明 |
|---|---|---|
| Undo / Redo | 低 | 撤销/重做功能，当前未实现 |
| 自动布局 | 低 | 自动排列节点，当前未实现 |
| 节点搜索 | 低 | 按标题/内容搜索节点，当前未实现 |