# UniStore E-Commerce - Test Cases

## Test Case Summary

Total Test Cases: 15
Priority Breakdown: P1 (5), P2 (6), P3 (4)

---

## Authentication & User Management

### TC-001: User Sign Up - Valid Data

**Priority:** P1  
**Preconditions:** User is not logged in  
**Test Data:** Valid email, password (min 6 characters)

| Step | Action                               | Expected Result                                       |
| ---- | ------------------------------------ | ----------------------------------------------------- |
| 1    | Navigate to home page                | Homepage loads successfully                           |
| 2    | Click "Sign Up" in navigation        | Sign up page opens                                    |
| 3    | Enter valid email (test@example.com) | Email field accepts input                             |
| 4    | Enter valid password (Test123!)      | Password field accepts input, shows masked characters |
| 5    | Click "Sign Up" button               | Account created, user redirected to home/login        |
| 6    | Verify confirmation message          | Success message displayed                             |

**Expected:** User account created successfully

---

### TC-002: User Login - Valid Credentials

**Priority:** P1  
**Preconditions:** User account exists  
**Test Data:** Email: test@example.com, Password: Test123!

| Step | Action                          | Expected Result                    |
| ---- | ------------------------------- | ---------------------------------- |
| 1    | Navigate to login page          | Login page loads                   |
| 2    | Enter valid email               | Email field populated              |
| 3    | Enter valid password            | Password field populated (masked)  |
| 4    | Click "Login" button            | User logged in successfully        |
| 5    | Verify redirect to homepage     | Homepage loads with user logged in |
| 6    | Check header for user icon/name | User indicator shown in header     |

**Expected:** User successfully authenticated and logged in

---

### TC-003: User Login - Invalid Credentials

**Priority:** P2  
**Preconditions:** User is not logged in  
**Test Data:** Email: test@example.com, Password: WrongPass123

| Step | Action                    | Expected Result                                         |
| ---- | ------------------------- | ------------------------------------------------------- |
| 1    | Navigate to login page    | Login page loads                                        |
| 2    | Enter valid email         | Email field populated                                   |
| 3    | Enter incorrect password  | Password field populated                                |
| 4    | Click "Login" button      | Error message displayed                                 |
| 5    | Verify user not logged in | User remains on login page                              |
| 6    | Verify error message      | Clear error message shown (e.g., "Invalid credentials") |

**Expected:** Login fails with appropriate error message

---

## Product Browsing & Navigation

### TC-004: Homepage Product Display

**Priority:** P2  
**Preconditions:** Application is running, products exist in database

| Step | Action                      | Expected Result                                     |
| ---- | --------------------------- | --------------------------------------------------- |
| 1    | Navigate to homepage (/)    | Homepage loads successfully                         |
| 2    | Verify Flash Sales section  | Flash Sales products displayed with discount badges |
| 3    | Verify Categories section   | Category cards displayed with icons                 |
| 4    | Verify Best Selling section | Best selling products shown                         |
| 5    | Verify Our Products section | Product grid displayed                              |
| 6    | Check product cards         | Each card shows image, name, price, stock status    |

**Expected:** All homepage sections display products correctly

---

### TC-005: Product Detail Page Navigation

**Priority:** P2  
**Preconditions:** Homepage loaded with products

| Step | Action                              | Expected Result                          |
| ---- | ----------------------------------- | ---------------------------------------- |
| 1    | On homepage, click any product card | Product detail page opens                |
| 2    | Verify URL contains /product/[id]   | Correct product URL                      |
| 3    | Verify product name displayed       | Product name matches card clicked        |
| 4    | Verify product price                | Price displayed correctly                |
| 5    | Verify product image                | Product image shown (with thumbnails)    |
| 6    | Verify stock status                 | "In Stock" or "Out of Stock" shown       |
| 7    | Verify "Buy Now" button             | Button visible and enabled (if in stock) |
| 8    | Verify quantity selector            | Quantity controls (+/-) displayed        |

**Expected:** Product detail page displays all product information correctly

---

### TC-006: Category Filtering

**Priority:** P3  
**Preconditions:** Homepage loaded

| Step | Action                          | Expected Result                |
| ---- | ------------------------------- | ------------------------------ |
| 1    | Click on "Phones" category card | Navigate to /category/Phones   |
| 2    | Verify filtered products        | Only phone products displayed  |
| 3    | Return to homepage              | Navigate back                  |
| 4    | Click on "Gaming" category      | Navigate to /category/Gaming   |
| 5    | Verify filtered products        | Only gaming products displayed |

**Expected:** Category filters show only relevant products

---

## Search Functionality

### TC-007: Product Search - Valid Query

**Priority:** P2  
**Preconditions:** User on any page, products exist

| Step | Action                             | Expected Result                  |
| ---- | ---------------------------------- | -------------------------------- |
| 1    | Locate search input in header      | Search bar visible               |
| 2    | Enter "phone" in search field      | Text entered                     |
| 3    | Observe auto-suggestions           | Dropdown shows matching products |
| 4    | Click search button or press Enter | Navigate to /search?q=phone      |
| 5    | Verify search results page         | Results page loads               |
| 6    | Verify products displayed          | Products matching "phone" shown  |
| 7    | Verify result count                | At least one product returned    |

**Expected:** Search returns relevant products

---

### TC-008: Product Search - No Results

**Priority:** P3  
**Preconditions:** User on homepage

| Step | Action                                  | Expected Result            |
| ---- | --------------------------------------- | -------------------------- |
| 1    | Enter "xyznonexistentproduct" in search | Text entered               |
| 2    | Click search button                     | Navigate to search results |
| 3    | Verify "No products found" message      | Clear message displayed    |
| 4    | Verify no products shown                | Empty results list         |

**Expected:** Appropriate message shown when no results found

---

## Shopping Cart

### TC-009: Add Product to Cart - Logged In

**Priority:** P1  
**Preconditions:** User is logged in, viewing product detail page

| Step | Action                                       | Expected Result                           |
| ---- | -------------------------------------------- | ----------------------------------------- |
| 1    | On product detail page, verify quantity is 1 | Quantity selector shows 1                 |
| 2    | Click "Buy Now" button                       | Product added to cart                     |
| 3    | Observe cart icon in header                  | Cart count badge increments               |
| 4    | Click cart icon                              | Navigate to /cart                         |
| 5    | Verify cart page                             | Cart page opens                           |
| 6    | Verify product in cart                       | Product listed with name, price, quantity |
| 7    | Verify subtotal                              | Subtotal = price × quantity               |

**Expected:** Product successfully added to cart

---

### TC-010: Add Product to Cart - Not Logged In

**Priority:** P1  
**Preconditions:** User is not logged in, viewing product card on homepage

| Step | Action                     | Expected Result              |
| ---- | -------------------------- | ---------------------------- |
| 1    | Hover over product card    | "Add to Cart" button appears |
| 2    | Click "Add to Cart" button | User redirected to /login    |
| 3    | Verify login page loaded   | Login form displayed         |

**Expected:** User must log in before adding to cart

---

### TC-011: Update Cart Item Quantity

**Priority:** P2  
**Preconditions:** User logged in, cart has 1 product with quantity 1

| Step | Action                            | Expected Result                       |
| ---- | --------------------------------- | ------------------------------------- |
| 1    | Navigate to /cart                 | Cart page loads                       |
| 2    | Locate quantity dropdown for item | Dropdown showing current quantity (1) |
| 3    | Click dropdown, select quantity 3 | Quantity updates to 3                 |
| 4    | Verify line total updates         | Line total = price × 3                |
| 5    | Verify subtotal updates           | Subtotal reflects new quantity        |
| 6    | Verify success message            | "Quantity updated successfully!"      |

**Expected:** Cart quantity and totals update correctly

---

### TC-012: Remove Item from Cart

**Priority:** P2  
**Preconditions:** User logged in, cart has at least 1 product

| Step | Action                             | Expected Result                             |
| ---- | ---------------------------------- | ------------------------------------------- |
| 1    | Navigate to /cart                  | Cart page loads                             |
| 2    | Click delete (×) icon on cart item | Confirmation modal/toast appears            |
| 3    | Confirm deletion ("Yes")           | Item removed from cart                      |
| 4    | Verify item no longer in cart      | Product not listed                          |
| 5    | Verify subtotal updates            | Subtotal recalculated (or shows 0 if empty) |
| 6    | Verify cart count in header        | Cart badge decrements                       |

**Expected:** Item successfully removed from cart

---

## Checkout Process

### TC-013: Checkout - Complete Order with Payment on Delivery

**Priority:** P1  
**Preconditions:** User logged in, cart has items

| Step | Action                                    | Expected Result                             |
| ---- | ----------------------------------------- | ------------------------------------------- |
| 1    | On cart page, click "Proceed to Checkout" | Navigate to /checkout                       |
| 2    | Fill First Name                           | Input accepted                              |
| 3    | Fill Last Name                            | Input accepted                              |
| 4    | Fill Email Address                        | Input accepted                              |
| 5    | Fill Phone Number                         | Input accepted                              |
| 6    | Fill City                                 | Input accepted                              |
| 7    | Fill Street Address                       | Input accepted                              |
| 8    | Select "Payment on Delivery" radio button | Option selected                             |
| 9    | Verify order summary                      | Cart items, subtotal, shipping, total shown |
| 10   | Click "Place Order" button                | Order placed                                |
| 11   | Verify redirect to success page           | /checkout/success?orderId=...               |
| 12   | Verify success message                    | Order confirmation displayed                |

**Expected:** Order placed successfully, confirmation shown

---

### TC-014: Checkout - Apply Coupon Code

**Priority:** P3  
**Preconditions:** User on checkout page with items in cart, valid coupon exists

| Step | Action                                 | Expected Result                        |
| ---- | -------------------------------------- | -------------------------------------- |
| 1    | On checkout page, locate coupon field  | Coupon input visible                   |
| 2    | Enter valid coupon code (e.g., SAVE10) | Code entered                           |
| 3    | Click "Apply Coupon" button            | Coupon validated                       |
| 4    | Verify discount applied                | Discount line appears in order summary |
| 5    | Verify total recalculated              | Total = subtotal + shipping - discount |
| 6    | Verify success message                 | "Coupon applied successfully!"         |

**Expected:** Coupon discount applied correctly

---

## Account Management

### TC-015: View Order History

**Priority:** P3  
**Preconditions:** User logged in, user has placed at least 1 order

| Step | Action                                      | Expected Result                          |
| ---- | ------------------------------------------- | ---------------------------------------- |
| 1    | Click user icon/dropdown in header          | User menu opens                          |
| 2    | Select "My Account" or navigate to /account | Account page loads                       |
| 3    | Click "Order History" in sidebar            | Navigate to /account/orders              |
| 4    | Verify orders displayed                     | List of past orders shown                |
| 5    | Verify order details                        | Order ID, date, items, total visible     |
| 6    | Click on an order                           | Order detail page or expanded view opens |

**Expected:** Order history displays correctly with all order information

---

## Regression Test Suite (Smoke Test)

### Quick Smoke Test Checklist

Execute these in order to verify critical functionality after each deployment:

- [ ] **Login** - Can log in with valid credentials
- [ ] **Homepage** - Homepage loads with products
- [ ] **Search** - Search returns results
- [ ] **Product Detail** - Can open product detail page
- [ ] **Add to Cart** - Can add product to cart
- [ ] **Cart** - Cart displays items correctly
- [ ] **Checkout** - Can reach checkout page
- [ ] **Place Order** - Can place an order (test account only)
- [ ] **Order Confirmation** - Success page displays after order

**Pass Criteria:** All items checked = Smoke test PASSED

---

## Test Execution Notes

### Test Data Requirements

- Test user accounts: test1@example.com, test2@example.com (password: Test123!)
- Valid coupon codes: SAVE10 (10% off), WELCOME5 (5% off)
- Test products: At least 5 products across different categories
- Test credit card (staging): Use Stripe test card 4242 4242 4242 4242

### Known Limitations

- Supabase project must be active (check .env.local configuration)
- Email confirmation may not work in local environment
- Payment processing requires Stripe test mode

### Test Environment Setup

1. Start dev server: `npm run dev`
2. Ensure Supabase connection is active
3. Verify test products exist in database
4. Clear browser cache if encountering issues
5. Use Chrome DevTools for debugging

---

## Defect Report Reference

When logging defects found during test execution, use the Bug Report Template (bug-report-template.md) and include:

- Test Case ID
- Steps to reproduce
- Expected vs Actual results
- Screenshots/recordings
- Severity and Priority
