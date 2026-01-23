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
- `/contexts` - React context providers (Cart, Session, User)
- `/data` - Demo data and navigation links
- `/docs` - Testing documentation (test plan, test cases, checklists)
- `/hooks` - Custom React hooks
- `/lib` - Library utilities and helpers
- `/selenium` - Automated test suite (Selenium WebDriver)
- `/types` - TypeScript type definitions
- `/utils` - Utility functions (e.g., Supabase API helpers)
- `/public` - Static assets (images, icons)

---

## 🧪 Testing

UniStore includes comprehensive testing documentation and automated tests to ensure quality and reliability.

### Manual Testing

We maintain detailed test documentation in the `/docs` folder:

- **[Test Plan](docs/test-plan.md)** - Complete testing strategy, objectives, scope, and approach
- **[Test Cases](docs/test-cases.md)** - 15 detailed test cases covering:
  - Authentication & User Management (TC-001 to TC-003)
  - Product Browsing & Navigation (TC-004 to TC-006)
  - Search Functionality (TC-007 to TC-008)
  - Shopping Cart (TC-009 to TC-012)
  - Checkout Process (TC-013 to TC-014)
  - Account Management (TC-015)
- **[Test Execution Checklist](docs/test-execution-checklist.md)** - Daily smoke tests and full execution tracking
- **[Bug Report Template](docs/bug-report-template.md)** - Standardized defect reporting

#### Running Manual Tests

1. Ensure the development server is running (`npm run dev`)
2. Follow the [Test Execution Checklist](docs/test-execution-checklist.md)
3. Start with the daily smoke test (15-20 minutes)
4. Execute detailed test cases as needed
5. Log any defects using the bug report template

### Automated Testing (Selenium)

Selenium WebDriver tests cover critical user flows in the `/selenium` directory.

#### Test Coverage

- **Product Navigation**: Homepage to product detail page flow
- **Search Functionality**: Navbar search submission and query validation
- **Cart Authentication**: Cart access and login redirect behavior

#### Setup & Execution

1. Navigate to the selenium directory:

   ```bash
   cd selenium
   npm install
   ```

2. Configure environment (optional):

   ```bash
   # Copy .env.example to .env and customize
   BASE_URL=http://localhost:3000
   HEADLESS=false  # Set to true for CI/CD
   ```

3. Run the test suite:

   ```bash
   npm test
   ```

4. View detailed results in the terminal output

#### Test Selectors

Tests use `data-testid` attributes for reliable element selection:

- `navbar-search-input`, `navbar-search-submit`
- `product-card`, `product-card-name`, `product-card-price`
- `product-card-add-to-cart`

When modifying UI components, maintain these test IDs or update the corresponding page objects in `/selenium/tests/pageObjects`.

For more details, see the [Selenium README](selenium/README.md).

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
