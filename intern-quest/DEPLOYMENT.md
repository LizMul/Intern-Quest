# 🚀 Deployment Guide for Intern Quest

## Option 1: VERCEL (Recommended - Easiest!)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Intern Quest app"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find your `Intern_Quest` repo and click Import
5. Leave all settings as default
6. Click "Deploy" 🎉

### That's it! 
- Vercel will automatically build and deploy
- Your app gets a URL like: `https://intern-quest.vercel.app`
- Every time you push to GitHub, it auto-deploys!

---

## Option 2: NETLIFY

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your repo
5. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy" 🎉

---

## Option 3: GITHUB PAGES

1. In `package.json`, add:
```json
"homepage": "https://yourusername.github.io/Intern_Quest"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

---

## Share Your App! 📢
- **Vercel**: `https://intern-quest.vercel.app`
- **Netlify**: `https://intern-quest.netlify.app`
- **GitHub Pages**: `https://yourusername.github.io/Intern_Quest`

Share the link with friends, classmates, or everyone applying for internships!

---

## Bonus: Auto-Deployment Setup
Once deployed, every time you:
- Push code to GitHub → Vercel auto-deploys
- No manual steps needed!

Happy deploying! 🎉
