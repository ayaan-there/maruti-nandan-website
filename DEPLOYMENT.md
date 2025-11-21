# Deployment Guide: Maruti Nandan Marmo & Grani

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites:
- GitHub account (free)
- Vercel account (free)
- Domain: `marutinandankelwa.com`

### Step 1: Push to GitHub

```bash
# 1. Create a GitHub repository at https://github.com/new
#    (Name it: maruti-nandan-website)

# 2. Add GitHub remote and push
git remote add origin https://github.com/YOUR_USERNAME/maruti-nandan-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo: `maruti-nandan-website`
4. Leave settings as default (no build command needed - static site)
5. Click "Deploy" ✨

**Deployment takes ~30 seconds!**

### Step 3: Connect Custom Domain

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter: `marutinandankelwa.com`
5. Click "Add"
6. Follow the DNS setup instructions:
   - If domain registrar supports Vercel DNS (easiest):
     - Click "Use Vercel's Nameservers"
     - Update registrar nameservers to Vercel's
   - OR manually add DNS records:
     - Add A record: `185.199.108.153`
     - Add CNAME record for `www` subdomain

**Domain activation: 5-30 minutes** ⏱️

---

## 📊 Estimated Costs

| Feature | Free Tier | Cost |
|---------|-----------|------|
| Static hosting | ✅ Unlimited | $0 |
| Bandwidth | ✅ 100GB/month | $0 |
| Custom domain | ✅ Yes | $0 |
| Blob storage | ✅ 1GB | $0 |
| SSL/TLS | ✅ Auto | $0 |
| **Total** | | **$0/month** |

---

## 🔄 Update Process (Future)

Once deployed, updates are **automatic**:

```bash
# Make changes locally
vim index.html

# Commit and push
git add .
git commit -m "Update tile descriptions"
git push origin main

# Vercel auto-deploys within 1-2 minutes! ✨
```

---

## 📈 Scale When Needed

If you exceed 20MB image storage later:

### Option A: Upgrade Vercel ($20/mo)
- Includes advanced features
- 100GB/month bandwidth
- Still $0.50/GB for extra storage

### Option B: Use Cloudinary (Free Alternative)
- 25GB free tier
- Better for dynamic image transformations
- No code changes needed - just migrate image URLs

### Option C: AWS S3 + CloudFront (~$1-5/mo)
- Most cost-effective at scale
- Pay-per-use pricing
- Requires 5-10 min setup

---

## 🔐 Production Checklist

- ✅ All images optimized (.webp format)
- ✅ No console errors
- ✅ No broken links
- ✅ Mobile responsive verified
- ✅ Custom domain configured
- ✅ SSL/TLS enabled (automatic)
- ✅ WhatsApp button linked correctly
- ✅ Email form working

---

## 📞 Support

**Vercel Support**: https://vercel.com/help
**Domain Issues**: Contact your domain registrar
**Code Issues**: Check deployment logs at https://vercel.com/dashboard

---

## 🎉 You're Live!

Your website will be available at:
- **Primary**: https://marutinandankelwa.com
- **www**: https://www.marutinandankelwa.com (auto-redirect)
- **Vercel subdomain**: https://maruti-nandan-website.vercel.app (backup)

All with **automatic HTTPS** and **global CDN caching**! 🚀
