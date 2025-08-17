

## tauri

https://v2.tauri.app/

```bash
pnpm create tauri-app

cd tomato
pnpm install
pnpm tauri dev
```

 src-tauri/tauri.conf.json:8 - devUrl

  - 作用: 告诉 Tauri 前端开发服务器的地址
  - 用途: Tauri 启动时会加载这个 URL 的内容到桌面应用窗口中
  - 上下文: Tauri 进程需要知道在哪里获取前端内容

  vite.config.ts:17 - port

  - 作用: 配置 Vite 开发服务器监听的端口
  - 用途: 实际启动前端开发服务器，监听 1420 端口的请求
  - 上下文: Vite 进程的端口配置

  协同工作流程

  1. Tauri 启动 → 读取 tauri.conf.json 中的 devUrl
  2. Tauri 执行 beforeDevCommand → 运行 pnpm dev
  3. Vite 启动 → 根据 vite.config.ts 在 1420 端口启动服务器
  4. Tauri 加载 → 从 http://localhost:1420 加载前端内容到桌面窗口

  两个配置必须保持一致，否则 Tauri 找不到前端服务器。


  
以上是设计实现。请以此为参考创建tauri的UI。专注于干净、可维护的代码结构。我们先不实现逻辑，只实现UI。
- 使用 timeout 10 pnpm dev 来启动服务
- 先规划步骤，第一个步骤应该是创建一个基本的UI
- 一步一步来实现，每一步都应该保证代码是可以运行的。
- 每一步都测试，确保代码是正确的。
- 每一步都在在询问我后再继续
