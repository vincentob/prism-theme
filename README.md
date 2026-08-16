# @vincentob/prism-theme

一套轻量、可复用的 CSS 设计令牌与 React 主题运行时，支持明暗模式、强调配色和主题状态持久化。

- 零运行时依赖（仅 `react` / `react-dom` 作为 peer dependency）
- 明暗两套模式 × `prism` / `midnight` 两套强调配色
- 主题选择自动持久化到 `localStorage`
- 令牌以 CSS 变量暴露，可直接对接 Tailwind CSS

## 安装

```bash
pnpm add @vincentob/prism-theme
```

包发布在公共 npm registry，安装无需任何认证配置。

## 使用

### 1. 引入令牌样式

```tsx
import "@vincentob/prism-theme/tokens.css";
```

### 2. 包裹应用

```tsx
import { ThemeProvider } from "@vincentob/prism-theme/react";

root.render(
  <ThemeProvider storagePrefix="my-app" defaultTheme="dark">
    <App />
  </ThemeProvider>,
);
```

### 3. 读取和切换主题

```tsx
import { useTheme, ACCENT_THEMES } from "@vincentob/prism-theme/react";

function ThemeToggle() {
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  return (
    <>
      <button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</button>
      {Object.values(ACCENT_THEMES).map((t) => (
        <button key={t.key} onClick={() => setAccent(t.key)}>
          {t.name}
        </button>
      ))}
    </>
  );
}
```

## API

### `<ThemeProvider>`

| Prop | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `storagePrefix` | `string` | `"prism"` | `localStorage` 键前缀，多应用共存时用于隔离 |
| `defaultTheme` | `"light" \| "dark"` | `"light"` | 无历史记录时的初始模式 |
| `defaultAccent` | `"prism" \| "midnight"` | `"prism"` | 无历史记录时的初始配色 |

### `useTheme()`

返回 `{ theme, accent, setTheme, setAccent, toggleTheme }`。必须在 `ThemeProvider` 内调用，否则抛错。

### `ACCENT_THEMES`

配色定义表，含名称、描述、预览渐变和各状态色值，可用于渲染主题选择器。

### 工作原理

`ThemeProvider` 在 `useLayoutEffect` 中把状态同步到 `<html>` 上——切换 `.dark` class 并写入 `data-theme` / `data-accent` 属性，`tokens.css` 依据这三者的组合层叠出最终的 CSS 变量值。用 `useLayoutEffect` 而非 `useEffect` 是为了在首次绘制前完成写入，避免主题闪烁。

## 对接 Tailwind CSS

令牌中的 HSL 三元组可直接映射：

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      border: "hsl(var(--border))",
    },
  },
}
```

## 开发

```bash
pnpm install
pnpm build
```

## 发布

1. 更新 `package.json` 的版本号并提交
2. 打对应的 `v*` 标签并推送：`git tag v0.2.0 && git push --tags`
3. GitHub Actions 自动构建并发布到 npm（需在仓库配置 `NPM_TOKEN` secret）

## License

[MIT](./LICENSE) © Vincent
