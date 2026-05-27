# MaxCraftMC 网站维护人员操作手册

这份文档给不熟悉电脑操作的维护人员使用。只要按顺序做，一般就可以完成“拉取网站、更新内容、测试、推送上线”。

## 需要先安装

1. 安装 Git：<https://git-scm.com/downloads>
2. 安装 Hugo Extended：<https://gohugo.io/installation/>
3. 准备一个 GitHub 账号，并确认自己有这个仓库的写入权限。

如果已经安装过，可以跳过。

## 第一次拉取网站

在想存放网站的文件夹里打开 PowerShell，然后输入：

```powershell
git clone --recurse-submodules git@github.com:FloppyBetaStudio/maxcraftmc-wiki.git
cd maxcraftmc-wiki
```

如果使用 HTTPS 地址，也可以输入：

```powershell
git clone --recurse-submodules https://github.com/FloppyBetaStudio/maxcraftmc-wiki.git
cd maxcraftmc-wiki
```

## 每次修改前先更新

进入仓库文件夹后，先输入：

```powershell
git pull --recurse-submodules
git submodule update --init --recursive
```

这样可以把别人已经发布的修改同步到自己电脑上。

## 修改网站内容

常用内容文件在 `content` 文件夹里：

| 页面 | 文件 |
| --- | --- |
| 服务器地址 | `content/posts/address.md` |
| 新玩家指南 | `content/posts/guide.md` |
| 服务器大宪章 | `content/posts/charter.md` |
| 服务器介绍 | `content/detail.md` |
| 红石服特色 | `content/redstone/features.md` |
| 游戏规则 | `content/redstone/gamerules.md` |

可以用 VS Code 或记事本打开这些 `.md` 文件。修改正文时，尽量只改 `---` 下面的内容；`---` 之间的是页面信息，除非知道含义，否则不要随意删除。

首页的视觉和交互主要在这些文件里：

| 用途 | 文件 |
| --- | --- |
| 首页结构 | `layouts/index.html` |
| 首页和站点专用样式 | `assets/css/site.css` |
| 粒子和点击效果 | `assets/js/site.js` |

如果只是更新服务器公告、地址、规则，通常不需要改这些文件。

## 在本机预览

修改后输入：

```powershell
hugo server
```

看到类似 `Web Server is available at http://localhost:1313/` 后，打开浏览器访问：

<http://localhost:1313/>

检查页面内容、链接和排版。检查完后，回到 PowerShell，按 `Ctrl+C` 停止预览。

预览时建议重点检查：

1. 首页第一屏是否能看清 Java 版地址、基岩版地址和端口。
2. 基岩版“一键添加到基岩版”按钮是否存在。
3. “服务器地址”“新玩家指南”“服务器大宪章”“个人中心”“网页地图”的入口是否容易找到。
4. 手机浏览器宽度下文字是否没有被截断。

## 正式构建检查

推送前再输入：

```powershell
hugo --gc --minify
```

如果没有红色报错，说明网站可以正常构建。

## 查看改了哪些文件

输入：

```powershell
git status
```

确认列出来的是自己这次要改的文件。

## 保存修改并推送上线

输入下面三条命令。第一条会加入全部修改；第二条的引号里写这次改了什么；第三条会推送到 GitHub 并触发上线。

```powershell
git add .
git commit -m "docs: update server information"
git push
```

推送后等待几分钟，打开线上网站检查：

<https://maxcraft.iruanp.com/>

## 如果遇到问题

如果 `git pull` 或 `git push` 报错，不要连续乱试。把 PowerShell 里的错误信息复制出来，发给仓库管理员或服主。

联系邮箱：floppy@iruanp.com
