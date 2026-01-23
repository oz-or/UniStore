# Bug Report Template

## Defect ID: BUG-[NUMBER]

---

## 1. Summary

**Brief Description:**  
[One-line summary of the defect]

---

## 2. Defect Details

**Reported By:**  
[Tester Name]

**Date Reported:**  
[YYYY-MM-DD]

**Test Case ID:**  
[TC-XXX]

**Environment:**

- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 143.0.7499.193]
- Screen Resolution: [e.g., 1920x1080]
- URL: [e.g., http://localhost:3000/cart]

**Build/Version:**  
[e.g., v1.0.0 or commit hash]

---

## 3. Severity & Priority

**Severity:**

- [ ] **Critical** - Blocks testing, system crash, data loss
- [ ] **High** - Major functionality broken, no workaround
- [ ] **Medium** - Functionality impaired, workaround exists
- [ ] **Low** - Minor issue, cosmetic, typo

**Priority:**

- [ ] **P1** - Fix immediately
- [ ] **P2** - Fix in current sprint
- [ ] **P3** - Fix in next sprint
- [ ] **P4** - Backlog

---

## 4. Steps to Reproduce

**Preconditions:**  
[List any setup required before reproducing the issue]

**Steps:**

1. [First step]
2. [Second step]
3. [Third step]
4. [Continue as needed]

---

## 5. Expected Result

[What should happen according to requirements/design]

---

## 6. Actual Result

[What actually happens - the defect behavior]

---

## 7. Reproducibility

- [ ] **Always** - Occurs every time
- [ ] **Often** - Occurs >50% of attempts
- [ ] **Sometimes** - Occurs <50% of attempts
- [ ] **Once** - Occurred only once, cannot reproduce

**Reproduction Rate:** [e.g., 5/5 attempts, 3/10 attempts]

---

## 8. Attachments

**Screenshots:**  
[Attach or link to screenshots showing the issue]

**Video/GIF:**  
[Link to screen recording if available]

**Logs:**  
[Paste relevant console errors, stack traces, or logs]

```
[Paste error logs here]
```

**Additional Files:**  
[Any other relevant files: network logs, HAR files, etc.]

---

## 9. Additional Information

**Workaround:**  
[If a temporary workaround exists, describe it]

**Related Defects:**  
[Link to similar or related bugs]

**Impact:**  
[Describe impact on users, business, or testing]

**Notes:**  
[Any other relevant information]

---

## 10. Status Tracking

**Status:**

- [ ] New
- [ ] Assigned
- [ ] In Progress
- [ ] Fixed
- [ ] Ready for Retest
- [ ] Closed
- [ ] Reopened
- [ ] Deferred
- [ ] Won't Fix

**Assigned To:**  
[Developer name]

**Fixed In Build:**  
[Version/commit where fix is included]

**Verified By:**  
[Tester name who verified fix]

**Verification Date:**  
[YYYY-MM-DD]

**Verification Result:**

- [ ] Pass - Defect fixed
- [ ] Fail - Defect still exists
- [ ] Regression - New issues introduced

---

## 11. Comments/History

[Chronological log of updates, discussions, and resolution progress]

**[YYYY-MM-DD HH:MM] - [Name]:**  
[Comment text]

---

## Example Bug Report

---

## Defect ID: BUG-001

### 1. Summary

Cart quantity update fails with "undefined" error when selecting quantity >5

### 2. Defect Details

**Reported By:** Jane Doe  
**Date Reported:** 2026-01-23  
**Test Case ID:** TC-011  
**Environment:**

- OS: Windows 11
- Browser: Chrome 143.0.7499.193
- Screen Resolution: 1920x1080
- URL: http://localhost:3000/cart

**Build/Version:** v1.0.0

### 3. Severity & Priority

**Severity:** ☑ High  
**Priority:** ☑ P1

### 4. Steps to Reproduce

**Preconditions:** User logged in, cart contains 1 product with quantity 1

**Steps:**

1. Navigate to /cart
2. Click quantity dropdown for the item
3. Select quantity "6" from dropdown
4. Observe result

### 5. Expected Result

- Quantity updates to 6
- Line total recalculates: price × 6
- Subtotal updates accordingly
- Success toast: "Quantity updated successfully!"

### 6. Actual Result

- Error toast appears: "Failed to update quantity"
- Console shows: `TypeError: Cannot read property 'quantity' of undefined`
- Quantity remains at 1
- No update occurs

### 7. Reproducibility

☑ Always - 5/5 attempts

### 8. Attachments

**Screenshots:** [screenshot-cart-error.png]

**Console Logs:**

```
TypeError: Cannot read property 'quantity' of undefined
    at updateCartItemQuantity (actions.ts:45)
    at async handleQuantityChange (page.tsx:123)
```

### 9. Additional Information

**Workaround:** Manually refresh page after selecting quantity, then item updates correctly

**Impact:** Users cannot update cart quantities above 5, blocking normal cart management

**Notes:** Issue does not occur for quantities 1-5. Only affects quantities 6-10

### 10. Status Tracking

**Status:** ☑ Assigned  
**Assigned To:** John Developer  
**Fixed In Build:** [Pending]

### 11. Comments/History

**[2026-01-23 14:30] - Jane Doe:**  
Initial bug report created, assigned to dev team

**[2026-01-23 15:00] - John Developer:**  
Investigating. Appears to be array index issue in cart state management
