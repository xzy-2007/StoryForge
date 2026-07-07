# StoryForge

StoryForge 是一个基于 Electron + React + TypeScript 的可视化剧情节点编辑器。

## 项目简介

StoryForge 面向独立游戏开发者、剧情创作者和互动叙事设计者，提供类似 Unity 编辑器的节点式剧情设计能力。

用户可以通过创建节点、连接节点和编辑属性，快速构建多分支剧情结构。

## 技术栈

- Electron
- React
- TypeScript
- Vite
- React Flow
- Vitest
- Electron Builder

## 开发流程

本项目遵循 Superpowers 软件开发流程：

SPEC  
↓  
PLAN  
↓  
Task  
↓  
TDD  
↓  
Review  
↓  
Commit


## 当前状态

项目处于初始化阶段。

已完成：

- 项目需求分析
- SPEC设计
- PLAN制定
- Superpowers流程规划


## 安全说明

当前版本不调用外部 LLM API，因此不存在 API Key。

未来若加入 AI 功能：

- Key 不进入源码
- Key 不提交 Git
- 使用安全存储方案


## 分发

将在开发完成后通过 Electron Builder 生成桌面应用。


## 限制

当前版本不包含：

- AI 自动生成剧情
- 角色系统
- 世界观数据库
- 游戏运行功能