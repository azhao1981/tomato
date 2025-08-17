1. 启动开发服务器

pnpm dev

1. 打开浏览器开发者工具

- 按 F12 或右键选择"检查元素"
- 切换到 "Vue" 或 "Vue DevTools" 标签页

3. 验证 Pinia DevTools

在 Vue DevTools 中：
- 左侧面板应该显示 "Pinia" 选项
- 点击 "Pinia" 可以查看所有 store 的状态
- 应该能看到 timerStore（如果已创建）

4. 测试状态管理

在应用中测试：
- 尝试修改状态（如点击按钮）
- 观察 DevTools 中的状态变化
- 检查时间线功能是否正常工作

5. 如果 Pinia DevTools 未显示

可能的原因：
- Vue DevTools 未正确安装
- 生产模式下 DevTools 被禁用
- Pinia 未正确注册

解决方法：
- 确保 main.ts 中正确配置了 Pinia
- 检查浏览器是否安装了 Vue DevTools 扩展
- 在开发模式下运行应用

如果你需要我帮你检查当前项目中的 Pinia 配置，请告诉我！