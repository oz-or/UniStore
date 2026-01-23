# UniStore Selenium smoke suite (JavaScript)

## Setup

1. Install dependencies
   ```bash
   cd selenium
   npm install
   ```
2. Configure environment
   - Copy `.env.example` to `.env`
   - Set `BASE_URL` to your running app (e.g., `http://localhost:3000`)
   - Set `HEADLESS=false` to watch the browser locally

## Run

```bash
npm test
```

## What the tests cover

- `addToCartNavigation.test.js`: from home, open first product card and verify product page loads
- `searchFlow.test.js`: submit navbar search and assert URL contains the query
- `cartRedirect.test.js`: visiting /cart while logged out redirects to login or shows cart

## Selectors

Tests rely on `data-testid` hooks:

- `data-testid="navbar-search-input"`
- `data-testid="navbar-search-submit"`
- `data-testid="product-card"`, `product-card-name`, `product-card-price`, `product-card-add-to-cart`

If you change UI structure, keep these hooks or update selectors in `tests/pageObjects`.
