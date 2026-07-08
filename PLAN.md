# StoryForge —— 开发计划

版本：v1.0

项目类型：

AI4SE 期末项目 B 类 —— 非 Harness 应用类项目


---

# 1. 项目开发目标


本计划用于指导 StoryForge 的完整开发流程。


StoryForge 是一个基于 Electron + React + TypeScript 的可视化剧情节点编辑器。


目标：

实现一个类似 Unity 编辑器中节点编辑窗口的软件。


最终用户能够：

1. 创建剧情节点；
2. 编辑节点属性；
3. 拖拽移动节点；
4. 创建剧情连接；
5. 删除剧情连接；
6. 管理简单剧情分支；
7. 保存和加载剧情项目。


---

# 2. 开发原则


项目遵循 Superpowers 工作流程：


SPEC
↓
PLAN
↓
Task拆分
↓
TDD开发
↓
Code Review
↓
测试验证
↓
发布



所有功能开发必须遵循：

1. 先编写失败测试；
2. 确认测试失败（Red）；
3. 编写最小实现；
4. 测试通过（Green）；
5. 重构优化。


每个 Task 完成后：

- 进行 SPEC 合规检查；
- 进行代码质量检查；
- 提交 Git commit。


---

# 3. 技术栈


## 开发语言

TypeScript


## 桌面框架

Electron


## 前端框架

React + Vite


## 节点编辑框架

React Flow


选择理由：

- 提供成熟的节点图编辑能力；
- 支持节点拖拽；
- 支持 Edge 创建和删除；
- 降低底层图形开发复杂度。


## 测试框架

Vitest


## 数据存储

JSON 文件


## 打包

Electron Builder


---

# 4. 总体任务规划


## 任务依赖关系



Task1
|
Task2
|
Task3
|
+----------------+
| |
Task4 Task5
| |
+----------------+
|
Task6
|
Task7
|
Task8



说明：

Task1：
项目初始化


Task2：
基础数据模型


Task3：
剧情关系管理核心


Task4：
可视化节点编辑器


Task5：
节点属性编辑器


Task6：
项目保存加载


Task7：
完整工作台 UI


Task8：
测试、CI、分发


---

# Task 1：初始化 Electron + React + TypeScript 项目


## 目标

建立 StoryForge 基础开发环境。


## 集成方案

采用 **electron-vite** 作为 Electron + Vite 集成工具。
理由：
- 开箱即用，统一管理主进程、预加载脚本、渲染进程的编译与热更新；
- 社区维护活跃，文档完善。


## 涉及文件

```
package.json

electron/
├── main.ts          # Electron 主进程入口
└── preload.ts       # 预加载脚本（contextBridge）

src/
├── index.html       # 渲染进程 HTML 入口（BrowserWindow 加载此文件）
├── main.tsx         # React 渲染入口
└── App.tsx          # React 根组件

electron.vite.config.ts   # electron-vite 配置（替代 vite.config.ts）

tsconfig.json              # 根配置
tsconfig.node.json         # 主进程/预加载 TS 配置
tsconfig.web.json          # 渲染进程 TS 配置
```


## 实现内容



完成：

- electron-vite 项目初始化；
- Electron 主进程（main.ts）；
- 预加载脚本（preload.ts）；
- index.html（渲染进程 HTML 入口）；
- React 渲染入口（main.tsx、App.tsx）；
- TypeScript 配置（tsconfig.json + tsconfig.node.json + tsconfig.web.json）；
- electron-vite 配置（electron.vite.config.ts）。


启动后显示 StoryForge 主窗口。


## 测试


验证：

```bash
npm run dev

结果：

Electron 窗口正常打开；
页面显示 StoryForge。


## 依赖

开发依赖：
- electron
- electron-vite
- @vitejs/plugin-react
- typescript

运行依赖：
- react
- react-dom

Task 2：实现剧情数据模型
目标

建立剧情编辑器核心数据结构。

涉及文件
src/models/

Node.ts

NodeType.ts

Edge.ts

Project.ts
Node 模型

字段：

字段	类型	说明
id	string	节点唯一标识
type	NodeType	节点类型
title	string	标题
description	string	剧情描述
position	Position	画布坐标

提供：

createNode()

作用：

自动生成 id；
创建默认结构。
NodeType

采用字符串枚举。

类型：

enum NodeType {

EVENT="EVENT",

DIALOGUE="DIALOGUE",

CHOICE="CHOICE",

END="END"

}

原因：

JSON 可读性更强；
方便调试；
方便用户查看项目文件。
Edge 模型

字段：

字段	类型
id	string
source	string
target	string
label	string

提供：

createEdge()
Project 模型

字段：

version
name
nodes
edges
TDD 测试
Node

测试：

创建节点成功；
字段完整。
Edge

测试：

创建连接；
source 和 target 正确。
Project

测试：

JSON 序列化；
JSON 反序列化。
Task 3：实现剧情节点连接与分支管理
目标

实现节点连接和剧情分支基础支持。

文件

src/components/editor/
├── StoryFlow.tsx
├── StoryFlow.test.tsx (更新)
└── StoryNodeComponent.tsx (更新)

功能

状态管理重构

将 StoryFlow 从静态节点迁移为 React Flow 推荐状态管理：
- useNodesState
- useEdgesState

节点连接

- 支持通过拖拽端口创建 Edge（onConnect + addEdge）
- 支持删除 Edge（onEdgesChange）

剧情分支基础支持

- 节点显示类型标签（DIALOGUE / CHOICE）
- CHOICE 节点允许多个输出连接

实现说明

使用 React Flow 内置状态管理，未单独创建 GraphManager 类。
状态封装在 StoryFlow 组件内部，Task4 保存加载时需提升。

测试
T1

StoryFlow 渲染初始节点。

验证：

节点文本在 DOM 中可见。

T2

通过 addEdges 创建 Edge。

验证：

Edge 数量增加。

T3

通过 deleteElements 删除 Edge。

验证：

Edge 数量归零。

--- 已完成 ---

测试3

删除节点。

验证：

关联 Edge 同时删除。

Task 4：实现节点编辑画布
目标

实现类似 Unity 的节点编辑区域。

技术方案

使用：

React Flow

原因：

支持节点拖动；
支持连线；
支持删除；
适合快速构建编辑器。
文件
src/components/editor/


Canvas.tsx

NodeView.tsx
功能
节点显示

显示：

类型；
标题。
节点移动

拖动节点：

更新 position。

创建连接

用户：

拖动节点端口。

结果：

调用 GraphManager 创建 Edge。

删除连接

用户：

选择 Edge。

按 Delete。

结果：

删除 Edge。

测试

验证：

节点移动后坐标变化；
创建连接后 Edge 生成；
删除连接后 Edge 消失。
Task 5：实现 Inspector 属性编辑器
目标

实现节点属性查看和修改。

文件
src/components/

Inspector.tsx
功能

显示：

title；
description；
type。

支持修改。

测试

验证：

选择节点后显示属性；
修改标题后数据同步。
Task 6：实现项目保存和加载
目标

实现项目文件管理。

文件
src/services/

ProjectManager.ts
功能

支持：

新建项目；
保存 JSON；
加载 JSON。

文件格式：

{
"name":"example",
"nodes":[],
"edges":[]
}

NodeType 使用字符串保存。

测试

流程：

创建节点；
创建连接；
保存；
加载。

验证：

数据完全一致。

Task 7：完善编辑器工作台 UI
目标

完成最终软件界面。

文件
src/layout/

EditorLayout.tsx
界面
----------------------
菜单栏
----------------------
资源区 | Canvas | Inspector
----------------------
状态栏
功能

增加：

文件入口；
工具栏；
状态提示；
基础美化。
测试

验证：

软件正常显示；
基础操作可使用。
Task 8：测试、CI、分发
目标

满足课程工程要求。

自动化测试

提供：

npm test

要求：

一键运行全部测试。

CI

配置：

.gitlab-ci.yml

必须包含：

unit-test:

功能：

安装依赖；
执行测试。
分发

采用：

Electron Builder

生成：

Windows 可执行程序。

README说明：

获取方式；
安装方式；
key 配置方式（如未来加入 API）；
已知限制。
安全要求

确保：

无 API Key；
无敏感信息；
不提交 .env。
5. MVP 范围
必须完成

Task1

Task2

Task3

Task4

Task5

Task6

完成后：

具备完整剧情编辑能力。

推荐完成

Task7

提升展示效果。

时间允许

Task8

6. 风险控制
风险1：节点编辑复杂

解决：

使用 React Flow。

风险2：功能扩大

禁止加入：

AI自动生成剧情；
世界观数据库；
角色系统；
游戏运行。
风险3：时间不足

开发优先级：

数据模型

>

GraphManager

>

节点编辑

>

属性编辑

>

保存加载

>

UI优化

>

发布