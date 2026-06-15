# Venti Red CMS — Setup Guide
## Accurate as of June 2026 — based on current Netlify docs

---

## What you'll have when done

- Site live on Netlify at a temporary URL (e.g. `amazing-fox-123.netlify.app`)
- CMS login at `your-netlify-url.netlify.app/admin`
- Ability to edit pipeline, blog posts, testimonials, pricing, settings — all in browser
- Every save auto-publishes in ~30 seconds

---

## What you need

- Your laptop, Chrome browser
- The `ventired-cms` folder from the zip
- ~45 minutes

---

## Step 1 — Create a GitHub account

1. Go to **github.com** → click **Sign up**
2. Use `scott@ventired.com`
3. Verify your email

---

## Step 2 — Create your GitHub repo and upload files

1. Log into GitHub → click the **+** icon (top right) → **New repository**
2. Name it `ventired-website`
3. Set to **Private**
4. Click **Create repository**

**Upload the files:**

1. On the empty repo page, click **uploading an existing file**
2. Open the `ventired-cms` folder on your computer
3. Select ALL files inside it (Cmd+A / Ctrl+A) and drag them into the upload box
4. Scroll down, type `Initial upload` in the commit message box
5. Click **Commit changes**

> Upload the *contents* of `ventired-cms`, not the folder itself. Your repo root should show `netlify.toml`, `public/`, `content/`, `_data/` directly.

---

## Step 3 — Create a Netlify account

1. Go to **app.netlify.com** → click **Sign up**
2. Choose **Sign up with GitHub** — links both accounts automatically

---

## Step 4 — Deploy your site on Netlify

1. In the Netlify dashboard, click **Add new project**
2. Click **Import an existing project**
3. Click **Deploy with GitHub**
4. Authorise Netlify when prompted
5. Search for `ventired-website` and click it
6. On the build settings screen:
   - **Branch:** `main`
   - **Build command:** leave completely blank
   - **Publish directory:** `public`
7. Click **Deploy site**

Netlify will deploy in ~20 seconds and give you a URL like `https://amazing-fox-123456.netlify.app`

**If it fails:** Go to the deploy log (click the failed deploy). The most common issue is the publish directory — make sure it says `public`, not blank or `dist`.

---

## Step 5 — Enable Netlify Identity

Netlify renamed things. Identity is now under **Project configuration**, not Integrations.

1. In your site dashboard, click **Project configuration** in the left sidebar
2. Scroll down to **Identity** in the left sidebar under Project configuration
3. Click **Enable Identity**
4. Once enabled, under **Registration preferences** select **Invite only**
5. Still in Identity settings, scroll to **Services**
6. Click **Enable Git Gateway**

> Git Gateway is what allows the CMS to actually write files back to your GitHub repo. Without it the CMS loads but nothing saves.

---

## Step 6 — Invite yourself as admin

1. In the left sidebar under Project configuration, click **Identity**
2. Click the **Users** tab
3. Click **Invite users**
4. Enter `scott@ventired.com`
5. Click **Send invite**
6. Check your email — click the invite link
7. Set a password and save it

---

## Step 7 — Add the Identity widget to your admin panel

This is a one-time file edit. The widget is the popup that handles your CMS login.

Open the file `ventired-cms/public/admin/index.html` in any text editor (right-click → Open with → TextEdit on Mac, Notepad on Windows).

Find this line:
```
<style>
```

Add this line **above** it:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Save the file. Then go back to GitHub, navigate to `public/admin/index.html`, click the pencil icon (Edit), paste the script tag in the right place, and click **Commit changes**.

Netlify will redeploy automatically in ~20 seconds.

---

## Step 8 — Log into the CMS

1. Go to `https://your-netlify-url.netlify.app/admin`
2. You should see a login screen
3. Click **Login with Netlify Identity**
4. Enter your email and password from Step 6
5. You're in

---

## Step 9 — Connect your custom domain (when ready)

1. In Netlify, go to **Project configuration** → **Domain management**
2. Click **Add a domain**
3. Enter `ventired.com`
4. Follow Netlify's DNS instructions (they give you nameservers to set at your registrar)
5. DNS propagates in minutes to a few hours

---

## What you can edit in the CMS

Once logged in at `/admin` you'll see these sections in the left sidebar:

| Section | What you edit |
|---|---|
| **Blog Posts** | Write Strategy Hub articles. Markdown editor. Publish or save as draft. |
| **Live Pipeline** | Add/edit/remove pipeline deals. Change status, order, show/hide on homepage. |
| **Testimonials** | Add client quotes. Set display order. Toggle homepage visibility. |
| **VR Intelligence** | Add Z358 One / Parteloa feature entries and updates. |
| **Site Settings → Global** | Email, phone, WhatsApp, calendar link, Stripe link, address. |
| **Site Settings → Homepage** | Hero headline, stats, pipeline footer text. |
| **Site Settings → Pricing** | All three engagement prices, notes, feature lists. |

---

## Troubleshooting

**"Unable to access identity settings" error on CMS login**
→ Git Gateway not enabled. Go to Project configuration → Identity → Services → Enable Git Gateway.

**CMS loads but login button doesn't appear**
→ Identity widget script tag missing from `public/admin/index.html`. See Step 7.

**Deploy failed**
→ Click the red failed deploy in Netlify. Read the log. 99% of the time it's the publish directory set to the wrong folder. Fix: Project configuration → Build & deploy → Build settings → set Publish directory to `public`.

**Changes saved in CMS but not appearing on site**
→ Check Netlify dashboard for a new deploy triggering. If no deploy triggered, Git Gateway may have lost its token — go to Project configuration → Identity → Services → Git Gateway → Regenerate.

**Invite email didn't arrive**
→ Check spam. If nothing, go back to Identity → Users → Invite users and resend.

---

## Stuck anywhere?

Come back here and tell me exactly what you're seeing — the error message word for word, or describe what's on screen. I'll tell you exactly what to click.

