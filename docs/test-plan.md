# UniStore E-Commerce Platform - Test Plan

## 1. Introduction

### 1.1 Purpose

Concise, practical test strategy for UniStore (Next.js storefront backed by Supabase for auth/data, Stripe in test mode for payments, seeded demo products) to keep core customer flows reliable.

### 1.2 Scope

Web storefront only: product browse/search, authentication, cart, checkout (test-mode Stripe), account/wishlist.

### 1.3 Document Version

- Version: 1.0
- Date: January 23, 2026
- Author: Farkas Ozor

---

## 2. Test Objectives

- Verify core e-commerce functionality works as expected
- Ensure user authentication and authorization flows are secure
- Validate product browsing, search, and filtering capabilities
- Confirm shopping cart operations (add, update, remove items)
- Test checkout process including payment options and order placement
- Verify account management features (profile, orders, wishlist)
- Identify critical defects before release
- Ensure responsive design works across different screen sizes

---

## 3. Test Scope

### 3.1 In Scope

- **Authentication**: Sign up, login, logout, session management
- **Product Browsing**: Homepage, categories, product details, flash sales, best selling
- **Search**: Product search, search suggestions, results filtering
- **Shopping Cart**: Add to cart, update quantity, remove items, cart persistence
- **Checkout**: Billing information, payment method selection, coupon application, order placement
- **Account Management**: Profile editing, order history, wishlist, settings
- **Navigation**: Header navigation, footer links, breadcrumbs
- **Responsive Design**: Desktop, tablet, mobile viewports

### 3.2 Out of Scope

- Backend API performance testing
- Database integrity testing
- Third-party integrations (payment gateways, email services)
- Security penetration testing
- Load/stress testing
- Cross-browser compatibility (focus on Chrome only for this phase)

---

## 4. Test Environment

### 4.1 Hardware

- Desktop: Windows 10/11, 8GB RAM minimum
- Mobile devices: Android/iOS for responsive testing

### 4.2 Software

- Browser: Google Chrome (latest version)
- Screen resolutions: 1920x1080 (desktop), 768x1024 (tablet), 375x667 (mobile)
- Node.js: v18+ for running development server
- Test management: Manual test execution via documented test cases

### 4.3 Test Data

- Test user accounts with known credentials
- Sample products across multiple categories
- Valid/invalid coupon codes
- Test payment information (for non-production environments)

### 4.4 Environment URLs

- Development: http://localhost:3000
- Staging: [To be determined]
- Production: [To be determined]

---

## 5. Test Types

### 5.1 Manual Testing

- Functional testing of all features
- UI/UX validation
- Exploratory testing
- Smoke testing (critical path verification)
- Regression testing after changes

### 5.2 Automated Testing (Selenium)

- Product navigation flow
- Search functionality
- Cart access and authentication redirect
- Regression suite for critical paths

---

## 6. Test Approach

### 6.1 Test Execution Strategy

1. **Smoke Testing**: Verify critical functionality works (login, search, add to cart, checkout)
2. **Functional Testing**: Execute detailed test cases for each feature
3. **Regression Testing**: Re-test after bug fixes or new features
4. **Exploratory Testing**: Ad-hoc testing to discover edge cases

### 6.2 Defect Management

- Defects logged with severity (Critical, High, Medium, Low) and priority
- Include steps to reproduce, expected vs actual results, screenshots
- Track defects in bug report template
- Retest after fixes are deployed

### 6.3 Test Prioritization

**P1 - Critical**: Authentication, checkout, order placement
**P2 - High**: Product browsing, cart management, search
**P3 - Medium**: Wishlist, account settings, filters
**P4 - Low**: UI polish, minor formatting issues

---

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria

- Test environment is set up and accessible
- Application is deployed to test environment
- Test data is prepared and available
- Test cases are reviewed and approved
- Known blockers are resolved

### 7.2 Exit Criteria

- All P1 and P2 test cases executed with ≥95% pass rate
- All critical and high severity defects are resolved and retested
- Smoke test suite passes 100%
- No open critical defects
- Test summary report is completed

---

## 8. Risks and Assumptions

### 8.1 Risks

| Risk                                            | Impact | Mitigation                                                |
| ----------------------------------------------- | ------ | --------------------------------------------------------- |
| Test environment downtime                       | High   | Notify team immediately, schedule maintenance windows     |
| Incomplete test data                            | Medium | Prepare comprehensive test data sets in advance           |
| Limited testing time                            | High   | Prioritize P1/P2 test cases, automate repetitive tests    |
| Browser compatibility issues                    | Medium | Focus on Chrome first, document any browser-specific bugs |
| Third-party service failures (Supabase, Stripe) | High   | Use test/sandbox environments, have fallback data         |

### 8.2 Assumptions

- Application is stable enough for testing
- Test users have access to necessary accounts
- Backend services (database, authentication) are operational
- Requirements are clearly defined and documented
- Supabase project is active and accessible

---

## 9. Test Deliverables

- Test Plan document (this document)
- Test Cases document with detailed steps
- Bug Report template
- Test Execution Checklist
- Test Summary Report (after execution)
- Defect logs with screenshots

---

## 10. Test Schedule

| Phase                        | Duration | Activities                               |
| ---------------------------- | -------- | ---------------------------------------- |
| Test Planning                | 1 day    | Define scope, approach, create test plan |
| Test Case Design             | 2 days   | Write detailed test cases, review        |
| Test Environment Setup       | 1 day    | Configure environment, prepare test data |
| Test Execution               | 3-5 days | Execute manual and automated tests       |
| Defect Reporting & Retesting | 2-3 days | Log defects, retest fixes                |
| Test Closure                 | 1 day    | Summary report, lessons learned          |

---

## 11. Roles and Responsibilities

| Role          | Responsibility                                       |
| ------------- | ---------------------------------------------------- |
| QA Tester     | Execute test cases, log defects, report status       |
| Test Lead     | Review test plan, approve test cases, track progress |
| Developer     | Fix defects, provide build updates                   |
| Product Owner | Clarify requirements, prioritize defects             |

---

## 12. Approval

| Name | Role             | Signature | Date |
| ---- | ---------------- | --------- | ---- |
|      | QA Lead          |           |      |
|      | Development Lead |           |      |
|      | Product Owner    |           |      |
