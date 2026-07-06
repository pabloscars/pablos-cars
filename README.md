# Pablo's Cars — Website

A salvage/rebuilt-title vehicle inventory site: browse everything, message on
Facebook if you're serious. No checkout, no online payments, no phone number
published anywhere.

## What's different about this version

Unlike the very first draft, **you never have to edit a code file or
re-upload anything by hand.** Once this is deployed (steps below), you get
a private page at `yoursite.com/admin` — log in, click a car, edit fields,
drag in photos, hit **Publish**. The live site updates automatically in
under a minute. That's powered by a free tool called **Decap CMS**, wired
up to this site already — you just need to finish the one-time connection
steps below.

## Important: this needs to be hosted to work

This site loads its car data with `fetch()`, which browsers block when you
just double-click `index.html` on your computer. It will look broken (blank
white screen with an error message) if opened that way — **that's expected**,
not a bug. It works correctly once deployed to Netlify (or any real web
host), or if you preview it with a local dev server. If you want to preview
it on your computer first: install [Node.js](https://nodejs.org), then in
this folder run `npx serve` and open the URL it gives you.

## One-time setup (do this once, in order)

### 1. Create a free GitHub account
Go to [github.com](https://github.com) and sign up. This is just where your
site's files live — you'll rarely, if ever, need to look at it directly.

### 2. Create a new repository and upload this folder
- Click "New repository," name it something like `pablos-cars`, keep it Public, create it.
- On the repository page, click "uploading an existing file" and drag this
  entire folder's contents in. Commit the upload.
- No command line, no git software needed — this is all drag-and-drop in your browser.

### 3. Connect the repository to Netlify
- Go to [netlify.com](https://netlify.com), sign up (free), and choose
  "Import an existing project" / "Add new site" → "Import from GitHub."
- Pick the `pablos-cars` repository you just created.
- Leave the build settings as-is (no build command needed) and deploy.
- Netlify gives you a live URL immediately, like `random-name-123.netlify.app`.

### 4. Turn on Netlify Identity + Git Gateway (this powers your login)
- In your Netlify site dashboard: **Site configuration → Identity → Enable Identity.**
- Under Identity settings, set registration to "Invite only" (so random
  people can't create admin accounts on your site).
- Still in Identity settings, scroll to **Services → Git Gateway → Enable Git Gateway.**
- Go to the **Identity** tab for your site → **Invite users** → invite your
  own email address. You'll get an email — click it, set a password.

### 5. Log in and try it
- Go to `your-netlify-url.netlify.app/admin`
- Log in with the email/password you just set
- You'll see two sections: **Cars** and **Business Info**
- Click into "All Cars," open the Nissan Versa entry, look around — this is
  your real listing, already loaded
- Try editing something small and hitting **Publish** — watch it go live in ~30–60 seconds

### 6. Get a real domain (optional but recommended)
Buy `pablos-cars.com` (or whatever you land on) from Namecheap, Cloudflare,
or GoDaddy — usually $10–20/year. In Netlify: **Domain settings → Add a
custom domain**, then follow their instructions for pointing your domain to
Netlify. I can walk through the exact clicks once you're at this step.

## Day-to-day: adding, editing, or selling a car

1. Go to `yoursite.com/admin`, log in
2. Click **Cars → All Cars**
3. To add a car: click "Add" at the bottom of the list, fill in the fields, drag in photos, **Publish**
4. To edit a car: click it, change price/mileage/status/whatever, **Publish**
5. To mark something sold: open it, change Status to "sold," add a Date Sold, **Publish**

Photos you drag in are automatically uploaded, stored, and wired into the
listing — you never touch a filename or a folder.

## Editing your business info (name, Facebook link, bio)

Same `/admin` page → **Business Info** → edit the one form → **Publish**.
Updates the header, footer, contact page, and about page everywhere at once.

## File structure (for reference — you shouldn't need to touch these directly anymore)

```
index.html          Homepage — continuous feed of available + sold cars
vehicle.html         Individual car detail page (reads ?id=... from data/cars.json)
titles.html          What is a salvage/rebuilt title?
sourcing.html        How I get my cars
about.html           About Pablo
contact.html         Contact page
admin/               The Decap CMS login + config — this is your editing dashboard
data/cars.json       Your actual car listings (the CMS edits this for you)
data/business.json   Your business info (the CMS edits this for you)
css/style.css        All styling
js/                  Site logic — rendering, data loading, nav/footer
images/              Uploaded photos land in images/uploads/ automatically
```

## What's intentionally left out (for now)

- **No filters or a separate "sold" page** — everything shows in one
  continuous feed on the homepage, available cars first, by design.
- **Photo sub-sections** (exterior/interior/engine bay/etc.) exist in the
  data structure but aren't yet exposed as fields in the CMS — the Versa
  listing shows the simpler version for now. Easy to add if you want that
  level of detail later.
- **No phone number anywhere** — every contact path goes through Facebook or email.
- **No checkout or online payment** — deliberately, per your original spec.

## Analytics (optional, add later)

Netlify has basic built-in analytics you can turn on for a small monthly
fee, or you can add Plausible/Google Analytics by pasting one script tag
into each page's `<head>` — ask me when you're ready and I'll wire it in.
