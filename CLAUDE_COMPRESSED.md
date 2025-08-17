# CLAUDE.md

## 主要原则
- 不运行 pnpm dev，由用户执行验证
- 每次少量修改，确保代码可运行
- 以用户最后输入为主
- 不主动恢复任务，需用户审批

## 项目概述
- **技术栈**: Tauri + Vue 3 + TypeScript + Pinia
- **包管理**: pnpm
- **项目名称**: tomato

## 开发命令
- `pnpm dev` - 开发服务器
- `pnpm build` - 生产构建
- `pnpm tauri dev` - Tauri 开发
- `pnpm tauri build` - Tauri 构建

## 项目架构
### 前端
- Vue 3 + TypeScript + Vite
- 端口: 11420 (固定)
- 状态管理: Pinia
- 入口: `src/main.ts` / `src/App.vue`

### 后端
- Tauri 2 + Rust
- 入口: `src-tauri/src/main.rs` / `src-tauri/src/lib.rs`
- 插件: `tauri-plugin-opener`

## 关键配置
- **应用标识**: `com.weiz.tomato`
- **窗口大小**: 800x600
- **开发服务器**: `http://localhost:11420`

## 现有功能
- 番茄时钟核心功能已实现
- Pinia 状态管理已配置
- 三种模式支持：番茄时间、短休息、长休息
- 计时器控制：开始、暂停、重置

## 开发流程
1. 规划 → 2. 编码 → 3. 自检 → 4. 提交 → 5. 验证

## 设计相关
- 设计文件: `.superdesign/design_iterations/pomodoro_timer_1.html`
- 设计分析: `docs/设计分析.md`
- 依赖: Lucide Icons (待添加)