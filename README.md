# NVS-OS Sales Prototype

Clickable HTML/CSS/JS prototype of the Sales section for NVS-OS (Nirvana
Memorial Garden admin app) — a dev-handoff reference for building these
screens into the Vuexy 2 (Vue 2 + Bootstrap-Vue) frontend at
`inspireo/nvs-frontend-for-claude`. No build step, no dependencies — open
any `.html` file directly, or serve the folder with any static server
(e.g. `python3 -m http.server`).

## Screens

| File | Status |
|---|---|
| [`retail-orders.html`](retail-orders.html) | Matches an existing, real Vue implementation (`P4A` branch) |
| [`sales-orders.html`](sales-orders.html) | New — modeled on the Retail Orders pattern above |
| [`submissions-payments.html`](submissions-payments.html) | New — modeled on the existing Invoices list |
| [`transactions.html`](transactions.html) | New — modeled on the existing Payments/Receipts list |
| [`retail-order-detail.html`](retail-order-detail.html) | New — reached via "View" from Retail Orders |
| [`sales-order-detail.html`](sales-order-detail.html) | New — reached via "View" from Sales Orders |
| [`invoice-detail.html`](invoice-detail.html) | New — reached via "View" from Submissions & Payments |
| [`register-payment.html`](register-payment.html) | New — reached via "Register Payment" |
| [`transaction-detail.html`](transaction-detail.html) | New — reached via "View" from Transactions |

All sample data is placeholder, clearly tagged "DEV PROTOTYPE" on every page.

## For the developer

See [`VUEXY-MAPPING.md`](VUEXY-MAPPING.md) for a component-by-component
mapping from this prototype to the real Bootstrap-Vue components and
existing source files it should become.

## Structure

```
retail-orders.html
sales-orders.html
submissions-payments.html
transactions.html
retail-order-detail.html
sales-order-detail.html
invoice-detail.html
register-payment.html
transaction-detail.html
assets/
  shared.css   — design tokens + shared component styles
  chrome.js    — shared navbar/secondary-nav + toast helper
VUEXY-MAPPING.md
```
