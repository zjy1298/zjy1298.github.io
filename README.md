# Jinyang Zhang — Personal Homepage

A bilingual static academic homepage built with plain HTML, CSS, and JavaScript. No build step or external dependency is required.

## Preview locally

```bash
cd /cpfs01/user/fengxiao.zjy/personal-homepage
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Publish with GitHub Pages

Create a GitHub repository named `<username>.github.io`, then run:

```bash
git init
git add index.html styles.css script.js assets README.md
git commit -m "Create personal homepage"
git branch -M main
git remote add origin git@github.com:<username>/<username>.github.io.git
git push -u origin main
```

In the repository, open **Settings → Pages**, choose **Deploy from a branch**, and select `main` and `/ (root)`.

The website will be available at `https://<username>.github.io/`.

The PKU emblem used in this site is sourced from the official Peking University website.
The ZJU emblem used in this site is sourced from the official Zhejiang University website.
