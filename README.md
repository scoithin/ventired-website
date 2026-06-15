# Venti Red CMS — File Structure

## What's in this folder and what each file does

```
ventired-cms/
│
├── SETUP-GUIDE.md          ← START HERE. Step-by-step setup instructions.
│
├── netlify.toml            ← Tells Netlify how to build and deploy your site.
│                             DO NOT edit unless you know what you're doing.
│
├── .gitignore              ← Tells Git which files to ignore. Leave it.
│
├── .github/
│   └── workflows/
│       └── deploy.yml      ← Auto-deploys when you push to GitHub. Leave it.
│
├── public/                 ← Everything in here becomes your live website.
│   ├── admin/
│   │   ├── index.html      ← The CMS login page at /admin
│   │   └── config.yml      ← Defines every editable field in the CMS.
│   │                         Edit this if you want to add/change fields.
│   └── images/
│       └── uploads/        ← Images you upload via CMS land here. Leave it.
│
├── content/                ← Your editable content. Edit via CMS or directly.
│   ├── posts/              ← Blog posts (one .md file per post)
│   ├── pipeline/           ← Pipeline entries (one .md file per deal)
│   ├── testimonials/       ← Client testimonials
│   └── intelligence/       ← Z358 One / Parteloa feature entries
│
└── _data/                  ← Site-wide settings and structured data.
    ├── settings.json       ← Contact details, URLs — edit via CMS Settings
    ├── homepage.json       ← Hero text, stats — edit via CMS Homepage
    └── pricing.json        ← Pricing cards — edit via CMS Pricing
```

## The most important things to know

1. **You edit content through the CMS**, not by editing files directly. The files are just where the CMS stores what you type.

2. **Every save in the CMS triggers a deploy** — your site updates in ~30 seconds.

3. **To add a blog post**: Log into /admin → Blog Posts → New Blog Post → write → Publish.

4. **To update the pipeline**: Log into /admin → Live Pipeline → click the entry → change status → Save.

5. **To change pricing**: Log into /admin → Site Settings → Pricing → edit → Save.

6. **Images** go through the CMS upload button — drag in, click Insert.
