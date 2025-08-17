

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
