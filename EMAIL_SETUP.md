# Email Setup Guide for Maruti Nandan Website

## 📧 Contact Form Email Service Setup

This guide walks you through setting up the serverless email functionality for your contact form using Vercel and Gmail.

---

## Prerequisites

- ✅ Google/Gmail Account
- ✅ Vercel Account (free tier works)
- ✅ GitHub Account with your repository connected to Vercel
- ✅ Node.js 14+ (for local testing)

---

## Step 1: Set Up Gmail App Password

Gmail requires an **App Password** instead of your regular Gmail password for security reasons.

### Instructions:

1. **Go to Google Account Security:**
   - Open: https://myaccount.google.com/
   - Click on "Security" in the left sidebar

2. **Enable 2-Step Verification (if not already enabled):**
   - Scroll to "How you sign in to Google"
   - Click "2-Step Verification"
   - Follow the prompts to set it up

3. **Generate App Password:**
   - Go back to Security
   - Look for "App passwords" (appears after 2FA is enabled)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - **Copy this password** - you'll use it in Vercel

**Example:** `abcd efgh ijkl mnop`

---

## Step 2: Update Email Configuration

### Local Testing (Optional)

If you want to test locally before deploying:

1. **Create `.env.local` file** in your project root:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-16-char-app-password
   BUSINESS_EMAIL=marutinandan017@gmail.com
   ```

2. **Install dependencies:**
   ```bash
   npm install nodemailer
   ```

3. **Test locally:**
   ```bash
   # Use a local server to test
   npx vercel env pull  # If using Vercel CLI
   npm run dev
   ```

### Production Deployment on Vercel

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add email functionality"
   git push origin main
   ```

2. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project
   - Go to "Settings" → "Environment Variables"

3. **Add Three Environment Variables:**

   | Variable Name | Value | Example |
   |--------------|-------|---------|
   | `GMAIL_USER` | Your Gmail address | `your-email@gmail.com` |
   | `GMAIL_PASSWORD` | 16-char app password | `abcd efgh ijkl mnop` |
   | `BUSINESS_EMAIL` | Business email to receive inquiries | `marutinandan017@gmail.com` |

4. **Click "Save"** and redeploy:
   - Go to "Deployments" tab
   - Click "Redeploy" on your latest deployment (or push again to trigger auto-deploy)

---

## Step 3: Verify Email Function Works

### Test the API Endpoint

After deployment, test that emails are being sent:

```bash
# Replace YOUR_DOMAIN with your Vercel domain
curl -X POST https://your-domain.vercel.app/api/sendMail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test-email@gmail.com",
    "phone": "+91 9414173630",
    "message": "Testing the contact form email functionality"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Check Your Inbox

You should receive:
1. **Email #1** - In your business email (marutinandan017@gmail.com) with the customer's inquiry
2. **Email #2** - In the customer's email with a confirmation message from Maruti Nandan

---

## Email Templates

### Email to Business
- Professional layout
- Contact details clearly displayed
- Message in a highlighted box
- Reply-to is set to customer's email for easy response

### Email to Customer (Confirmation)
- Thank you message
- Confirmation of received inquiry
- Quick contact options (WhatsApp link, phone, address)
- Professional branding with business details

---

## Troubleshooting

### Issue: "Invalid Login Credentials"

**Solution:**
- Make sure you're using **App Password** (16 characters), not your regular Gmail password
- Check that 2-Step Verification is enabled
- Verify the password is entered correctly without extra spaces

### Issue: "Failed to send email"

**Solution:**
1. Check that all 3 environment variables are set in Vercel
2. Verify environment variables don't have leading/trailing spaces
3. Check that BUSINESS_EMAIL is a valid email address
4. Look at Vercel Function Logs for detailed error messages

**To view logs:**
- Vercel Dashboard → Deployments → Click your deployment
- Go to "Logs" tab
- Look for errors from the `/api/sendMail` function

### Issue: Email goes to Spam

**Solution:**
- Gmail may filter auto-sent emails to spam initially
- Mark the email as "Not Spam" to help Gmail learn
- Check SMTP authentication headers are correct (they are by default)

### Issue: Environment Variables Not Working

**Solution:**
1. Make sure you **Redeploy** after adding environment variables
2. Wait 2-3 minutes for changes to take effect
3. Clear browser cache (Ctrl+Shift+Del)
4. Verify in Vercel → Settings → Environment Variables that all 3 are listed

---

## Security Best Practices

✅ **This implementation includes:**
- HTML sanitization to prevent XSS attacks
- Email validation (regex check)
- Required field validation
- No sensitive data in logs
- Secure credential handling via environment variables
- HTTPS-only communication

✅ **Good practices:**
- Never commit `.env` files to GitHub
- Use App Passwords, not regular Gmail passwords
- Rotate App Password every 6 months
- Monitor email deliverability

---

## Email Customization

### To Change Business Email

1. **In Vercel Environment Variables:**
   - Change `BUSINESS_EMAIL` value
   - Redeploy

2. **In code** (`/api/sendMail.js`):
   - Line ~64: `to: process.env.BUSINESS_EMAIL,`
   - This uses the environment variable automatically

### To Customize Email Template

Edit `/api/sendMail.js`:
- **Lines 67-95:** Business email HTML template
- **Lines 98-145:** Confirmation email HTML template

### To Change Email Subject Line

In `/api/sendMail.js`:
- **Line 66:** `subject: 'New Contact Form Submission from ${name}'`
- **Line 97:** `subject: 'We have received your message - Maruti Nandan Marmo & Grani'`

---

## Rate Limiting & Limits

**Gmail/Nodemailer limits:**
- 100 emails per day from free Gmail account
- Some email providers may block bulk emails
- Consider upgrading to Gmail for Business (G Suite) for higher limits

**Vercel limits:**
- 12 seconds execution time limit on serverless functions
- More than enough for email sending
- Logs available for 24 hours

---

## Support & Troubleshooting

### Need Help?

1. **Check Vercel Logs:**
   - Vercel Dashboard → Select project → Deployments
   - Click your deployment → "Logs" tab
   - Search for `/api/sendMail` entries

2. **Test Locally:**
   ```bash
   npm install nodemailer
   # Create test script and run locally
   ```

3. **Check Gmail Security:**
   - Verify app password is correct
   - Check 2FA is enabled
   - Verify sending from correct Gmail account

4. **Verify DNS Settings:**
   - Make sure your Vercel domain is correctly configured
   - Check CNAME/A records point to Vercel

---

## Alternative Email Services

If you prefer not to use Gmail, you can modify the `/api/sendMail.js` file to use:

- **SendGrid** - Popular, reliable, free tier available
- **Mailgun** - Developer-friendly, good documentation
- **Postmark** - Transactional email focused
- **AWS SES** - Powerful, part of AWS ecosystem

Just update the `nodemailer` transporter configuration.

---

## File Locations

| File | Purpose |
|------|---------|
| `/api/sendMail.js` | Serverless email function |
| `index.html` | Contact form HTML |
| `script.js` | Form submission handler |
| `style.css` | Form styling |

---

## Summary Checklist

- [ ] Created Gmail App Password (16 characters)
- [ ] Set `GMAIL_USER` in Vercel Environment Variables
- [ ] Set `GMAIL_PASSWORD` in Vercel Environment Variables
- [ ] Set `BUSINESS_EMAIL` in Vercel Environment Variables
- [ ] Redeployed project on Vercel
- [ ] Tested contact form by submitting a test message
- [ ] Verified business email received the inquiry
- [ ] Verified test email received the confirmation
- [ ] Confirmed emails are not going to spam folder

---

## 🎉 You're All Set!

Your contact form is now fully functional with email notifications. Customers can submit inquiries and both they and you will receive confirmation emails.

**Questions?** Check the Vercel docs at https://vercel.com or Gmail help at https://support.google.com

---

**Last Updated:** November 2025
**Status:** ✅ Production Ready
