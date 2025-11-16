O-TEC Frontend

Multilingual Next.js 16 App Router frontend for Strapi v5 Headless CMS

This application provides a fully responsive, Arabic/English website using data fetched dynamically from Strapi v5.
Features include hero slider, services pages, team carousel, clients section, global search, RTL support, and newsletter subscription.

🧩 Tech Stack

Next.js 14 (App Router)

TypeScript
Tailwind CSS
Redux Toolkit
React-i18next (EN/AR with RTL support)
Formik + Yup
Strapi v5 REST API
Node 20LTS

⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_CMS_URL=http://localhost:1337 // Replace these

🌍 Internationalization (i18n)

EN / AR support
RTL auto-switching for Arabic
Cached initialization to avoid re-renders
Translations loaded from /locales/*

🎨 UI Features

Responsive design (mobile ✔ tablet ✔ desktop ✔)
Tailwind custom theme colors (brown, background, navbar)
Hero image/video slider
Team carousel
Service pages with dynamic CMS content
Global search (Teams + Services)

Thank you 😊