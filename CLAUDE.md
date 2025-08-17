# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Tauri + Vue 3 的桌面应用程序项目。项目名称为 "tomato"，使用 pnpm 作为包管理器。

## 开发命令

### 常用命令
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本（包含 TypeScript 类型检查）
- `pnpm preview` - 预览构建结果
- `pnpm tauri dev` - 启动 Tauri 开发模式
- `pnpm tauri build` - 构建 Tauri 应用程序

### 包管理
- 使用 `pnpm` 而不是 `npm` 进行依赖管理
- 依赖安装：`pnpm install`

## 项目架构

### 前端架构
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **主入口**: `src/main.ts`
- **根组件**: `src/App.vue`
- **开发服务器端口**: 1420（固定端口，严格模式）

### 后端架构
- **框架**: Tauri 2 + Rust
- **主入口**: `src-tauri/src/main.rs`
- **业务逻辑**: `src-tauri/src/lib.rs`
- **插件**: 使用 `tauri-plugin-opener`

### 文件结构
- `src/` - Vue 前端源码
- `src-tauri/` - Rust 后端源码
- `public/` - 静态资源
- `dist/` - 构建输出目录

## 关键配置

### Tauri 配置
- **应用标识**: `com.weiz.tomato`
- **窗口默认大小**: 800x600
- **开发服务器**: `http://localhost:1420`
- **前端构建命令**: `pnpm build`
- **前端输出目录**: `../dist`

### Vite 配置
- 固定端口 1420，严格模式
- 忽略 `src-tauri` 目录的文件监听
- 支持 HMR（热模块替换）

## 开发注意事项

### 前后端通信
- 使用 `@tauri-apps/api/core` 的 `invoke` 函数调用 Rust 命令
- Rust 命令使用 `#[tauri::command]` 宏定义
- 在 `lib.rs` 的 `invoke_handler` 中注册命令

### TypeScript 配置
- 使用 `vue-tsc` 进行类型检查
- 构建时会先运行类型检查，再进行 Vite 构建

### 安全配置
- CSP（内容安全策略）设置为 null，开发环境无限制

## 现有功能

项目包含一个示例功能：
- 前端输入框和按钮，调用 Rust 的 `greet` 命令
- Rust 端接收名称参数，返回格式化的问候语