# AGENT_LOG

记录 StoryForge 使用 AI Agent 辅助开发的过程。

---

## 2026-07-07

### Phase: 项目规约与计划

**Superpowers Skills:** brainstorming, writing-plans

**完成内容：**
- 完成项目需求分析
- 完成 SPEC v1.0 设计
- 完成 PLAN v1.0 制定
- 确定项目方向：可视化剧情节点编辑器

**人工决策：**
- 选择 B 类项目：非 Harness 应用类
- 选择 Electron 桌面应用技术栈
- 限制 MVP 范围，排除 AI 生成、角色系统等扩展功能
- 确定使用 React Flow 作为节点编辑器核心库

**AI 协助：**
- AI 协助需求细化、架构讨论和任务分解
- AI 提出了 AI 生成剧情、角色系统等建议，人工判断后拒绝以控制范围

---

## 2026-07-08

### Phase: 核心功能实现

**Superpowers Skills:** subagent-driven-development, test-driven-development

**完成内容：**

| Task | 完成内容 | Commit |
|---|---|---|
| Task 1 | Electron + React + TypeScript + Vite 项目初始化 | `e39f4ea` |
| Task 2 | StoryNode 数据模型、NodeType 枚举、createStoryNode 函数 | `6917c3a` |
| Task 3 | React Flow 节点显示、连线、状态管理 | `de67570` |
| Task 4 | 节点编辑画布、状态管理重构 | `9e2eca8` |
| Task 5 | Inspector 属性面板（标题、内容、类型编辑） | `18386e1` |
| Task 6 | ProjectManager 保存/加载 JSON 序列化 | `9e2eca8` |

**修复的 Bug：**
- 修复 App 与 StoryFlow 状态不一致导致增删节点失效的 bug（各自维护独立 state）
- 重构 StoryFlow 为受控组件，由 App 统一管理 state

**测试情况：**
- 18 个测试全部通过
- 覆盖：数据模型、服务层、组件渲染、用户交互

---

### Phase: UI 优化与功能增强

**Superpowers Skills:** subagent-driven-development, test-driven-development

**完成内容：**

| 功能 | 涉及文件 | 说明 |
|---|---|---|
| 中文化 | 所有组件 | 全部界面文字改为中文 |
| 节点类型扩充 | `src/models/StoryNode.ts` | 从 2 种扩充到 6 种（对话、选择、事件、条件、结局、备注） |
| 主题系统 | `src/theme/ThemeContext.tsx` | 5 套预设主题 + 11 维度自定义颜色，持久化 |
| 节点样式 | `src/components/editor/StoryNodeComponent.tsx` | 圆角矩形、胶囊形、卡片式 |
| 导出 PNG | `src/services/ExportService.ts` | 3 倍像素比，仅节点区域 |
| 导出 Markdown | `src/services/ExportService.ts` | 结构化文档 |
| 属性面板折叠 | `src/components/inspector/Inspector.tsx` | 可折叠至 40px |
| 右键菜单 | `src/components/editor/ContextMenu.tsx` | 切换类型、复制、删除 |
| 设置面板 | `src/components/settings/SettingsPanel.tsx` | 主题、颜色、样式、使用说明 |
| 框选/批量移动 | `src/components/editor/StoryFlow.tsx` | 启用 React Flow 原生多选 |
| 内容折叠 | `src/components/editor/StoryNodeComponent.tsx` | 超 100 字自动折叠 |
| 去除原生菜单 | `electron/main.ts` | `Menu.setApplicationMenu(null)` |
| 帮助按钮 | 工具栏 | 点击后打开设置面板并滚动到使用说明 |

**人工干预：**
- 调整主题配色方案使各主题差异更明显
- 修复属性面板折叠后无法展开的 bug
- 修复 PNG 导出清晰度低、包含控件栏的问题
- 移除菱形节点样式（用户要求删除）
- 移除 Electron 原生菜单栏（File/Edit/View/Window/Help）

---

### Phase: 工程交付

**Superpowers Skills:** test-driven-development, requesting-code-review

**完成内容：**

| 交付物 | 状态 |
|---|---|
| `.gitlab-ci.yml` | ✅ 创建，含 `unit-test` job |
| `Dockerfile` | ✅ 创建，多阶段构建 |
| `.dockerignore` | ✅ 创建 |
| `SPEC.md` v2.0 | ✅ 重写，覆盖所有功能 |
| `PLAN.md` v2.0 | ✅ 重写，与实际代码对齐 |
| `AGENT_LOG.md` | ✅ 扩写 |
| `README.md` | ✅ 更新 |
| `REFLECTION.md` | ⏳ 模板已提供，需学生自行撰写 |
| `SPEC_PROCESS.md` | ⏳ 需补充冷启动验证（需用不同 agent 重新执行） |

**测试结果：** 18/18 测试通过，构建成功

---

## 经验教训

1. **State 管理是核心难点**：App 与 StoryFlow 各自维护独立 state 导致 UI 不同步，重构为单一数据源后解决
2. **主题系统应尽早设计**：后期加入主题时需修改所有组件样式，提前规划可减少重构成本
3. **Context 隔离影响测试**：`useTheme` 要求 ThemeProvider 包裹，测试文件需统一添加 Provider 包装
4. **React Flow 的受控模式**：当使用 props 传递 nodes/edges 时，需注意 React Flow 内部状态与外部状态的同步问题
5. **PNG 导出需精确选择 DOM 元素**：导出整个 wrapper 会包含 Controls 组件，需精确选择 `.react-flow__viewport`