# UniStore

UniStore is a modern, demo e-commerce web application built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/).  
It features a clean, responsive UI, category browsing, user authentication, cart, wishlist, and more—designed for learning and demonstration purposes.

---

## 🚀 Features

- **Product Catalog**: Browse products by category, with random demo listings for each category page.
- **Authentication**: User registration, login, and account management powered by Supabase Auth.
- **Cart & Wishlist**: Add products to your cart or wishlist (requires login).
- **Profile & Orders**: Manage your profile, view orders, and update security settings.
- **Responsive Design**: Fully responsive for desktop and mobile, including a mobile menu.
- **Demo Data**: Products are not categorized in the database; category pages show random products for demo realism.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/unistore.git
cd unistore
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**Never commit your `.env.local` or any secrets to a public repository!**

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

- `/app` - Next.js app directory (pages, routes, API)
- `/components` - UI and layout components
- `/data` - Demo data and navigation links
- `/utils` - Utility functions (e.g., Supabase API helpers)
- `/public` - Static assets (images, icons)

---

## 📝 Notes

- **Demo Mode:** Product categories are not enforced in the database. Category pages display a random selection of products for demo purposes.
- **Secrets:** All environment variables and secrets must be kept out of the repository. See `.gitignore` for details.
- **Supabase:** You must have a Supabase project with a `products` table and authentication enabled.

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.  
Set your environment variables in the deployment dashboard.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🛡️ License

This project is for demo and educational purposes only.

---

**Enjoy exploring UniStore!**
