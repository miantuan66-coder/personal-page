# 发布到 GitHub Pages

这个网页是纯静态网页，上传到 GitHub Pages 后就可以获得公网链接，再用公网链接生成正式二维码。

## 第一步：创建 GitHub 仓库

1. 打开 GitHub。
2. 新建一个仓库，例如：`personal-page`。
3. 仓库建议设为 Public。
4. 不需要勾选创建 README，因为本文件夹里已经有 README。

## 第二步：上传文件

上传这个文件夹里的主要文件：

- `index.html`
- `style.css`
- `app.js`
- `README.md`
- `.nojekyll`

不需要上传：

- `preview-qr-lan.png`
- `preview-qr-localhost.png`

## 第三步：开启 GitHub Pages

1. 进入仓库页面。
2. 打开 `Settings`。
3. 点击左侧 `Pages`。
4. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. 保存。

## 第四步：等待网址生成

通常 1 到 3 分钟后，GitHub 会显示一个网址，例如：

```text
https://你的用户名.github.io/personal-page/
```

这个网址就是可以放进简历、也可以生成二维码的公网链接。

## 第五步：生成正式二维码

拿到公网链接后，可以让我用这个链接生成正式二维码。
