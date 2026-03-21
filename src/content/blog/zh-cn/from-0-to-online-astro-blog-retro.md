---
title: '《从 0 到上线：我的 Astro 博客搭建与踩坑复盘》'
description: '记录我从零开始搭建 Astro 博客，并解决多语言、搜索、评论及部署问题的全过程。'
pubDate: '2026-03-21T14:10:00+08:00'
publishedAt: '2026-03-21T14:10:00+08:00'
tags: ['astro', 'blogging', 'i18n', 'deployment', 'debugging']
---

搭建一个属于自己的博客，是很多开发者的“执念”。在尝试过多种方案后，我最终选择了 Astro。这篇文章将完整记录我从 0 到上线的全过程，以及在这个过程中踩过的那些坑。

## 1. 缘起：为什么选择 Astro？

在静态网站生成器（SSG）百花齐放的今天，Astro 凭借其“群岛架构（Islands Architecture）”脱颖而出。对我而言，选择它的理由非常纯粹：

- **极致性能**：默认零 JS，只有在需要交互的地方才引入脚本。
- **内容驱动**：天然支持 Markdown/MDX，非常适合博客这种以文字为主的项目。
- **生态丰富**：官方提供了大量的集成（Integrations），如 Tailwind、Sitemap、Search 等。

## 2. 快速起步：从模板到本地预览

我使用了 Astro 官方的博客模板作为起点：

```bash
npm create astro@latest -- --template blog
```

初始化完成后，我并没有急着改样式，而是先理清了项目的目录结构。`src/content/` 是核心，所有的博文都存放在这里，并通过 `src/content.config.ts` 进行 Schema 校验。这种“类型安全”的内容管理方式让我非常受用。

## 3. 核心功能：i18n 与搜索的集成

为了让博客更具国际化视野，我引入了多语言支持。通过在 `src/content/blog/` 下划分 `zh-cn` 和 `en` 目录，并配合自定义的路由逻辑，实现了平滑的语言切换。

此外，我还集成了 **Pagefind** 作为站内搜索方案。它是一个极其轻量的静态搜索库，不需要后端支持，非常适合部署在 GitHub Pages 上。

## 4. 踩坑一：GitHub Pages 的 Base URL 陷阱

这是我遇到的第一个大坑。由于我的博客部署在 `https://<username>.github.io/<repo-name>/` 下，所有的内部链接如果写成 `/about`，在生产环境下都会指向根域名，导致 404。

**解决方案**：
在 `astro.config.mjs` 中正确配置 `base` 字段，并在所有链接跳转处使用 `import.meta.env.BASE_URL` 进行拼接。

## 5. 踩坑二：ClientRouter 带来的脚本失效

为了提升站内跳转的流畅度，我启用了 Astro 的 `ClientRouter`。然而，这导致了 Giscus 评论框在页面切换后无法正常加载。

**原因分析**：
`ClientRouter` 是通过客户端路由进行页面替换的，传统的 `window.onload` 或 `<script>` 标签只会在首次进入站点时执行。

**解决方案**：
监听 `astro:page-load` 事件，在每次页面加载完成后手动触发评论框的初始化逻辑。

## 6. 踩坑三：部署环境的 Node 版本警告

在 GitHub Actions 部署时，我发现即使配置了 Node 20，依然会收到一些关于 Node 版本的弃用警告。

**排查结论**：
这些警告大多来自上游的 GitHub Actions（如 `actions/checkout` 或 `actions/setup-node`）的旧版本依赖。通过将所有 Action 升级到最新主版本（如 `@v4` 或 `@v6`），可以消除大部分警告。

## 7. 总结：博客搭建的“最小闭环”

这次搭建过程让我深刻体会到：**先跑通最小闭环，再逐步迭代功能。**

从最初的一个 `Hello World` 页面，到现在的多语言、带搜索、带评论的完整博客，每一步的踩坑都是成长的机会。如果你也想搭建自己的博客，不要犹豫，现在就开始吧！

---

**接下来我会继续分享更多关于 Astro 开发的实战技巧，欢迎持续关注。**
