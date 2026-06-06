# MaxCraftMC Wiki

这里是 [MaxCraftMC 原版生存服务器](https://maxcraft.iruanp.com/) 官网仓库。推送到 `main` 分支后，GitHub Actions 会构建 Hugo 静态站点并部署到线上。

给网站维护人员的日常操作说明见：[维护人员操作手册](docs/MAINTAINER_GUIDE.md)。

本仓库的站点样式主要放在 `assets/css/site.css` 和 `assets/js/site.js`，页面结构主要看 `layouts/index.html`。旧 Tailbliss 主题里仍需要的运行时资源已经 vendored 到 `assets/css/style.css`、`assets/js/darkmode.js` 和 `static/`，不再依赖外部主题；通用组件样式来自 `github.com/FloppyBetaStudio/maxcraftmc-ui-svelte` Hugo 模块。

常用命令：

```powershell
hugo server
hugo --gc --minify
git status
git push
```
