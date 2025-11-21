# Maruti Nandan Marmo & Grani - Tile Website

A modern, responsive website showcasing premium marble and granite tiles for Maruti Nandan Marmo & Grani, based in Kelwa, Rajasthan.

## 📱 Features

- **Responsive Design**: Fully mobile-optimized (tested on desktop, tablet, mobile)
- **Dynamic Tile Showcase**: Automatically loads tiles from JSON manifests
- **Image Optimization**: All tiles in WebP format for fast loading
- **Smooth Animations**: Scroll-triggered animations (desktop clip-path, mobile transform)
- **Contact Form**: Direct messaging with success feedback
- **Testimonials Carousel**: Auto-rotating customer reviews
- **Google Maps Integration**: Location embed for Kelwa, Rajasthan
- **WhatsApp & Instagram**: Direct social media links
- **Zero JavaScript Dependencies**: Pure vanilla JS (no npm required)

## 🗂️ Project Structure

```
/
├── index.html              # Main page structure
├── style.css               # All styling & animations (1362 lines)
├── script.js               # All interactions & dynamic loading (266 lines)
├── favicon.ico             # Company logo icon
├── vercel.json             # Deployment configuration
│
├── granite/                # Granite tile showcase (31 tiles)
│   ├── index.json          # Manifest of tile names
│   └── *.webp              # Tile images
│
├── indian marble/          # Indian marble showcase (9 tiles)
│   ├── index.json
│   └── *.webp
│
└── imported marble/        # Imported marble showcase (11 tiles)
    ├── index.json
    └── *.webp
```

## 🎨 Design Specifications

- **Hero Section**: 80vh (desktop), 100vh (mobile) with blue marble background
- **Breakpoint**: 768px (tablet threshold)
- **Color Scheme**: Professional blues (#0C345A) with warm accents (#BB7E5D)
- **Typography**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Animation Timing**: 0.3s-0.8s cubic-bezier easing for smooth motion

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete setup instructions.

**Quick Start:**
1. Push to GitHub
2. Connect to Vercel
3. Point domain DNS to Vercel
4. Done! ✨

**Free hosting tier covers:**
- ✅ Unlimited static site hosting
- ✅ 100GB/month bandwidth
- ✅ 1GB Blob storage (for 20MB images)
- ✅ Global CDN
- ✅ Auto HTTPS

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (desktop, mobile)
- **Page Load**: < 2 seconds (global CDN)
- **Images**: All .webp (20MB total optimized)
- **Bundle Size**: 2.1KB HTML + 46KB CSS + 9KB JS = 57KB total

## 🔐 Security & Compliance

- ✅ No console errors
- ✅ No broken links
- ✅ HTTPS/TLS everywhere
- ✅ Form validation (HTML5)
- ✅ Accessibility labels (aria-label)
- ✅ No external dependencies
- ✅ No tracking/cookies

## 🎯 Key Pages

1. **Home** - Hero section, features grid, testimonials
2. **Showcase** - 51 tiles across 3 categories with dynamic loading
3. **About** - Company story & vision
4. **Contact** - Form, phone, email, address, Google Maps embed

## 📞 Contact

- **Phone**: +91 9414173630
- **Email**: marutinandan017@gmail.com
- **Location**: NH-8 Nijarna Road, Kelwa, Rajsamand
- **WhatsApp**: Direct link in floating button
- **Instagram**: @mn_granites

## 📝 License

© 2025 Maruti Nandan Marmo and Grani Pvt. Ltd. All rights reserved.

---

**Built with:** HTML5 • CSS3 • Vanilla JavaScript
**Hosted on:** Vercel (free tier)
**Domain:** marutinandankelwa.com
