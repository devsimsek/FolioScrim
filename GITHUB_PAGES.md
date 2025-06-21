# 🚀 GitHub Pages Deployment Guide

Simple guide to deploy your **FolioScrim** portfolio to GitHub Pages.

## ⚡ Quick Setup

### 1. **Push to GitHub**
```bash
git add .
git commit -m "🎭 Initial FolioScrim setup"
git push origin main
```

### 2. **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. That's it! The workflow will automatically deploy

### 3. **Your Site is Live!**
- URL: `https://yourusername.github.io/repositoryname/`
- Check the **Actions** tab to see deployment progress
- First deployment takes ~2-3 minutes

## 🎛️ Configuration

### Update Your Config
Make sure your `config.json` has the correct site URL:

```json
{
  "seo": {
    "siteUrl": "https://yourusername.github.io/repositoryname"
  }
}
```

### Repository Settings
- Repository must be **public** (for free GitHub accounts)
- Default branch should be `main`
- GitHub Actions must be enabled

## 🔧 How It Works

1. **Push to main branch** → Triggers deployment
2. **GitHub Actions runs** → Builds your app with `npm run build`
3. **Deploys dist folder** → Serves your built portfolio
4. **Live at your GitHub Pages URL** → Ready to share!

## 🌐 Custom Domain (Optional)

To use your own domain (like `portfolio.yourdomain.com`):

1. **Add CNAME file**:
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **Update DNS** at your domain provider:
   ```
   Type: CNAME
   Name: @
   Value: yourusername.github.io
   ```

3. **Commit and push**:
   ```bash
   git add public/CNAME
   git commit -m "🌐 Add custom domain"
   git push origin main
   ```

## 🛠️ Troubleshooting

### Common Issues

**❌ 404 Error**
- Check that GitHub Pages source is set to "GitHub Actions"
- Verify your repository is public
- Make sure the workflow completed successfully

**❌ Config Not Loading**
- Ensure `config.json` is in the `public` folder
- Check browser console for network errors
- Verify JSON syntax is valid

**❌ Build Failing**
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Test locally with `npm run build`

### Debug Steps
```bash
# Test locally first
npm run build
npm run preview

# Check if files exist
ls -la dist/
ls -la public/
```

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] First workflow run completed successfully
- [ ] Site accessible at GitHub Pages URL
- [ ] Config loading correctly
- [ ] Images displaying properly
- [ ] Theme switcher working
- [ ] Mobile responsive

## 🎭 That's It!

Your FolioScrim is now live and will automatically redeploy every time you push changes to the main branch. Transform your portfolio like theater magic! ✨

**Need help?** Check the GitHub Actions logs or open an issue in the repository.