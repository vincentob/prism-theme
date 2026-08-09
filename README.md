# @vincentob/prism-theme

一套轻量、可复用的 CSS 设计令牌与 React 主题运行时，支持明暗模式、强调配色和主题状态持久化。

## 安装

私有 GitHub Package 需要在消费项目的 `.npmrc` 配置：

```ini
@vincentob:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @vincentob/prism-theme
```

## 使用

```tsx
import "@vincentob/prism-theme/tokens.css";
import { ThemeProvider } from "@vincentob/prism-theme/react";

root.render(
  <ThemeProvider storagePrefix="my-app" defaultTheme="dark">
    <App />
  </ThemeProvider>,
);
```

通过 `useTheme()` 可读取或切换 `light` / `dark` 模式及 `prism` / `midnight` 配色。

## 构建和发布

```bash
pnpm install
pnpm build
pnpm publish
```

发布前先更新 `package.json` 的版本号，再从 `main` 创建对应的 `v*` 标签，由 GitHub Actions 构建并发布。

仓库与 GitHub Package 均应保持私有。包使用 `UNLICENSED`，用于私有项目，不授予公开复制或分发许可。
