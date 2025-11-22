# 🏛️ Maruti Nandan - Marble & Granite Website

> A premium marble & granite showcase site built in **3 days** with full deployment. No cap, this project slaps. 🚀

---

## what's this about?

This is the official website for **Maruti Nandan Marble & Granite**, a paid project that showcases their premium collection of marble and granite products. Think of it as the digital storefront where customers can look for required products and get in touch.

Built from scratch to production in just **72 hours** – design, development, email setup, AND deployment included. That's giving speed, efficiency, and main character energy.

---

## 🎯 Features (no mid vibes here)

- **Responsive Design** – Looks fire on mobile, tablet, desktop (all the things)
- **Product Showcase** – Beautiful gallery of marble and granite collections
- **Email Integration** – Direct contact form that actually works (nodemailer flex)
- **Production Deployed** – Live on Vercel with security headers that pass Nikto scans
- **Fast AF** – Optimized for speed because slow sites are for boomers

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Email**: Nodemailer (Node.js backend)
- **Hosting**: Vercel
- **Security**: Custom security headers (X-Content-Type-Options, CSP, HSTS, etc.)

---

## 📁 Project Structure

```
├── index.html              # Main landing page
├── style.css              # All the styling drip
├── script.js              # Interactive features
├── api/
│   └── sendMail.js        # Email handler
├── home/                  # Home section assets
├── buttonbg/              # Button styling assets
├── featurebg/             # Feature section assets
├── granite/               # Granite collection data
├── indian marble/         # Indian marble data
├── imported marble/       # Imported marble data
├── vercel.json            # Deployment config with security headers
└── package.json           # Dependencies (nodemailer)
```

---

## 🚀 Getting Started (if you wanna tinker)

### Prerequisites
- Node.js (for email functionality)
- A text editor (VS Code recommended)
- Internet connection (obviously)

### Installation
```bash
npm install
```

### Running Locally
```bash
# For the frontend, just open index.html in your browser
# For email testing, you'll need to set up your SMTP credentials in sendMail.js
```

### Deploy to Vercel
```bash
# Make sure you have Vercel CLI installed
vercel
```

---

## 📧 Email Setup

The contact form uses Nodemailer. To make it work:

1. Update `api/sendMail.js` with your email credentials
2. Use an app password (don't use your main password, that's giving amateur hour)
3. Test it out

---

## 🔒 Security (we keep it tight)

This site has the security headers that matter:
- **X-Content-Type-Options**: Prevents MIME sniffing attacks
- **Content-Security-Policy**: Blocks unauthorized scripts
- **Strict-Transport-Security**: Forces HTTPS (no compromise)
- **Referrer-Policy**: Protects user privacy
- **Permissions-Policy**: Restricts unnecessary browser features

Nikto scan? Already passing. We don't do bare minimum here.

---

## 📞 Contact

Got questions about the website? Hit up Maruti Nandan directly through the contact form on the site. They handle the business side, this repo is just the tech.

---

## 📜 License

This is a custom project built for Maruti Nandan Marble & Granite. Not licensed for public use.

---

## 💡 Fun Facts

- ✨ Built in 72 hours 
- 🎨 Designed with actual marble & granite aesthetics in mind
- 🔒 Security hardened from day one
- 📱 Mobile-first approach 
- ⚡ Zero bloat, zero unnecessary frameworks

---

**Made with** 💪 **and** 🎯 **by a developer who actually wants to build**

**Last Updated**: November 22, 2025

---

*P.S. If this website helps Maruti Nandan sell more marble, that's a W. That's the whole point fr fr.*

