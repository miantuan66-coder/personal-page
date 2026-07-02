# 个人主页

这是一个适合放进简历、也适合生成二维码分享的静态网页。页面重点不是展示作品，而是补充简历之外的信息：稳定生活、学习习惯和适应能力。联系流程通过招聘担当进行，网页不展示联系方式。

页面默认语言是日语，并支持在右上角切换：

- 日本語
- 中文
- English

## 文件说明

- `index.html`：网页内容
- `style.css`：页面样式
- `app.js`：语言切换、更新时间等轻量交互
- `.nojekyll`：GitHub Pages 发布辅助文件
- `DEPLOY.md`：发布到 GitHub Pages 的详细步骤
- `supabase.sql`：旧版学习记录系统的数据库脚本，暂时保留备用

## 本地预览

在这个文件夹运行：

```bash
python3 -m http.server 8080
```

然后打开：

```text
http://localhost:8080
```

如果手机和电脑在同一个 Wi-Fi 下，可以用电脑的局域网地址访问，例如：

```text
http://192.168.x.x:8080
```

## 修改内容

主要改这些位置：

- 页面左上角缩写：`index.html` 里的 `CD`
- 首页标题：`你好，我在日本认真生活，也在持续学习。`
- 学习栏目：`学习与成长记录`
- 价值观列表：`我重视的事情`

三种语言的文案主要在 `app.js` 的 `translations` 里修改。

## 发布成网址

推荐先用 GitHub Pages，详细步骤见：

```text
DEPLOY.md
```

也可以任选一个静态网站平台：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

发布后会得到一个公网链接。把这个链接生成二维码，别人扫码就能打开。只要链接不变，以后更新网页内容时二维码不用重新生成。

上传到 GitHub 时，不需要上传 `preview-qr-lan.png` 和 `preview-qr-localhost.png`，它们只是本地预览二维码。
