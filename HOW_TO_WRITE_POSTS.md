# 如何编写和发布博客文章

本指南将向你介绍如何在你的 Astro 博客中创建、编写和发布新文章。

## 1. 目录结构

你的博客文章存储在 `src/content/blog/` 目录下，并按语言进行分类：

- **中文文章**：`src/content/blog/zh-cn/`
- **英文文章**：`src/content/blog/en/`

## 2. 创建新文章

要创建新文章，请在对应的语言目录下创建一个新的 `.md`（Markdown）或 `.mdx`（MDX）文件。

例如，要创建一篇名为 "我的第一篇博客" 的中文文章：
1. 在 `src/content/blog/zh-cn/` 目录下创建一个名为 `my-first-post.md` 的文件。
2. 在文件顶部添加 **Frontmatter**（元数据）。

## 3. Frontmatter 模板

每篇文章的顶部都必须包含一段 YAML 格式的元数据，用于定义标题、日期、封面图和标签等信息。

```yaml
---
title: '文章标题'
description: '文章的简短描述，将显示在列表页和 SEO 中'
pubDate: '2026-03-21'
heroImage: '../../../assets/blog-placeholder-1.jpg' # 封面图路径
tags: ['astro', 'blog', 'tutorial'] # 标签列表
---
```

### 字段说明：
- `title`: 文章的标题。
- `description`: 文章的简短摘要。
- `pubDate`: 发布日期，格式为 `YYYY-MM-DD`。
- `heroImage`: 文章的封面图。
- `tags`: **（推荐）** 标签列表。
  - **命名规范**：仅限小写字母、数字和连字符（例如 `react-hooks`, `web3`）。
  - **展示位置**：
    - 博客列表页顶部的**过滤按钮**。
    - 搜索框下方的**快速搜索标签**。

## 4. 双语工作流

本博客支持中英双语。为了提供最佳的用户体验，建议同时发布两种语言的版本：

1. **中文版**：`src/content/blog/zh-cn/my-post.md`
2. **英文版**：`src/content/blog/en/my-post.md`

*注意：文件名（Slug）建议保持一致，以便系统自动关联。*

## 5. 处理图片

你有两种方式在文章中使用图片：

### 方式 A：使用 `src/assets/`（推荐）
将图片放在 `src/assets/` 目录下。在 Frontmatter 或 Markdown 中引用时，使用相对路径。

- **Frontmatter 引用**：`heroImage: '../../../assets/your-image.jpg'`
- **Markdown 引用**：`![描述](../../../../assets/your-image.jpg)`

### 方式 B：使用 `public/` 目录
将图片放在项目根目录下的 `public/` 文件夹中。

- **Frontmatter 引用**：`heroImage: '/your-image.jpg'`
- **Markdown 引用**：`![描述](/your-image.jpg)`

## 6. Markdown & MDX 功能

- **Markdown (`.md`)**: 支持所有标准 Markdown 语法（标题、列表、链接、代码块等）。
- **MDX (`.mdx`)**: 除了 Markdown 语法外，你还可以在文章中直接导入和使用 React/Astro 组件。

## 7. 发布流程

1. **本地预览**：运行 `npm run dev`，在浏览器中查看你的新文章。
   - 中文文章：`http://localhost:4321/my-astro-blog/blog/your-post-slug`
   - 英文文章：`http://localhost:4321/my-astro-blog/en/blog/your-post-slug`
2. **发布前检查清单**：
   - [ ] 检查 Frontmatter 是否包含 `title`, `description`, `pubDate`, `tags`。
   - [ ] 确保 `tags` 仅包含小写字母、数字和连字符。
   - [ ] 检查图片路径是否正确。
   - [ ] 运行 `npm run build` 确保项目可以成功构建。
3. **构建发布**：当你准备好发布时，运行 `npm run build` 生成静态文件。

---

祝你写作愉快！
