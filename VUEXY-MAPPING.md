# Sales Section — Prototype → Vuexy 2 Component Mapping

Reference for converting this prototype into the Vuexy 2 (Vue 2 +
Bootstrap-Vue) app at `inspireo/nvs-frontend-for-claude`. Retail Orders
already has a real Vue implementation on the `P4A` branch
(`src/views/sales/retail-order/`) — that mapping is exact. Sales Orders,
Submissions & Payments, Transactions, and all five detail/sub-screens have
**no existing Vue implementation yet**; their mappings point at the closest
existing screens in the same codebase that this prototype was deliberately
modeled on, so the same patterns, helpers, and conventions carry over rather
than being reinvented.

Shared chrome (`assets/chrome.js`, `assets/shared.css`) is prototype-only
scaffolding — in the real app this is the existing `AppNavbarHorizontal.vue`,
`AppBreadcrumb.vue`, and `scss/variables/variables` tokens, already in place.

## Retail Orders (`retail-orders.html`) — real Vue implementation exists

| Prototype element | Vuexy / Bootstrap-Vue equivalent | Existing file |
|---|---|---|
| `.subnav` pills | Horizontal/vertical nav items, `parent: 'sales'` | `src/navigation/horizontal/sales.js`, `src/navigation/vertical/sales.js` |
| `.page-head` + `.crumbs` | `AppBreadcrumb.vue`, already wired for this route | `src/layouts/components/AppBreadcrumb.vue` (`pageTitle === 'Retail Orders'` branch) |
| `.tabs` / `.tab` | Custom pill buttons bound to `activeTab` — no BV component needed | `RetailOrderList.vue`, `statusTabs` data + `onTabClick()` |
| `.panel` wrapper | `<b-card no-body>` | `RetailOrderList.vue` |
| select-all `.check` | `<b-form-checkbox :indeterminate="isSelectAllIndeterminate" v-model="selectAllOrdersCheckbox">` | `RetailOrderList.vue` `setup()` — `selectAllCheckboxUpdate` |
| `.bulk-btn` | `<b-dropdown text="Bulk actions">` | `RetailOrderList.vue` toolbar row |
| `.search-wrap` | `<b-input-group>` + `<b-form-input>` behind a toggle | `RetailOrderList.vue` search toggle block |
| `.thead` / `.row` grid | `<b-table :items="fetchRetailOrders" :fields="tableColumns">` with `#cell(x)` slots | `useRetailOrderList.js` → `tableColumns` |
| `.badge` (order/payment status) | `resolveOrderStatusBadgeClass` / `resolvePaymentStatusBadgeClass` — custom SCSS pill classes, not `b-badge` | `useRetailOrderList.js` |
| `.more-wrap` / `.menu` | `<b-dropdown variant="link" no-caret right>` with `<b-dropdown-item>` | `RetailOrderList.vue` `#cell(actions)` slot |
| `.pagination` | `<b-pagination v-model="currentPage" :total-rows="totalRetailOrders" :per-page="perPage">` | `useRetailOrderList.js` |
| bulk status `.modal` | `<b-modal id="bulk-status-modal">` + ValidationObserver/Provider (vee-validate) | `RetailOrderList.vue`, `updateBulkStatus()` |
| `.toast` | `this.$bvToast.toast(message, { variant: 'success' })` | same pattern as `onResendTaxInvoice()` |
| Row click → View | `$router.push({ name: 'sales-retail-order-show', params: { id } })` | `src/router/routes/sales.js` |

**Data flow:** `store.dispatch('app-retail-order/fetchRetailOrders', { q, perPage, page, sortBy, sortDesc, status })` → `retailOrderStoreModule.js`; status counts via `fetchStatusCounts()` on mount; bulk update `PATCH sales/retail-orders/action/bulk/status/update`; resend `POST sales/retail-orders/:id/resend-tax-invoice`.

## Sales Orders (`sales-orders.html`) — model on Retail Orders' own pattern

This is the closest structural analog already in the app — build it as a
second instance of the same `RetailOrderList.vue` pattern (tabs + custom pill
badges + bulk actions), pointed at a new `app-sales-order` store module and
`sales-orders/*` endpoints, rather than a new component shape. Column
differences from Retail Orders: `Related Quotation` (was `Related SR/Appt`)
and `Product / Package` (new column, no equivalent in Retail Orders — insert
between Quotation and Customer). Row actions: `View`, `Generate Invoice`
(replaces `Resend Tax Invoice`).

## Submissions & Payments (`submissions-payments.html`) — model on `src/views/customer/invoices/List.vue` + `useInvoiceList.js`

| Prototype element | Vuexy / Bootstrap-Vue equivalent | Reference file |
|---|---|---|
| Collapsible multi-field `.search-panel` | Individual `b-input-group`s per field (Customer Name, NRIC, Invoice No., File No., Lot No.), each with a clear-X | `List.vue` search block |
| `.filter-panel` dropdown | `<b-dropdown>` wrapping a dedicated filter component (`.sync` props: status, file type, date) | `InvoiceFilter.vue` |
| `.chips-row` | `<b-form-tag variant="danger">` per active filter, shown `v-if` any filter set, + "Clear Filters" link | `List.vue` |
| `.badge` (payment status) | Standard `<b-badge :variant="light-${resolveInvoiceStatusVariant(status)}">` — **different palette from Retail/Sales Orders**: `Paid`→`success`, `Pending Payment`→`warning`, else `secondary` | `useInvoiceList.js` |
| Row columns (Trx ID / NVS File Type / Purchaser(s) / Payment Status / Created / Actions) | `b-table` `:items="invoicesData"` (plain array binding, not a provider function) with `#cell(x)` slots | `useInvoiceList.js` — `invoicesData` ref |
| Row actions | View, Register Payment (routes to payment-registration screen), Download (POST → blob PDF), Email to Customer (modal) | `List.vue` dropdown |
| Email modal | `<b-modal>` with name/email/message fields + ValidationProvider | `List.vue` email modal |
| Fetch pattern | Debounced (1000ms `setTimeout`) `watch` per filter field calling `fetchInvoices()`, not a single deep watch | `useInvoiceList.js` |
| ACL gating | `useAclUtils().canViewThisAction` wraps every action/button | `useInvoiceList.js` |

No status tabs and no bulk-select on this screen — that's intentional, matching the real Invoices list (single-select actions only).

## Transactions (`transactions.html`) — model on `src/views/customer/receipts/List.vue` + `useReceiptList.js` ("Payments/Receipts")

Near-identical structure to Submissions & Payments (same author pattern) — reuse everything above plus:

| Prototype element | Vuexy / Bootstrap-Vue equivalent | Reference file |
|---|---|---|
| "Today's Transactions" toggle button | Outline button that toggles a background class (`f-white-background`/`f-primary-background`) and defaults the date filter to today | `List.vue` header actions |
| "Register Payment" button | `<b-button variant="success">`, routes to `customers-register-payment` | `List.vue` header actions |
| Extra search fields (Receipt No., Zone/Lot No., **Created By**) | Same `b-input-group` pattern as Invoices, one more field | `useReceiptList.js` |
| `.filter-panel` (status, payment mode, date) | `ReceiptFilter.vue` — payment mode has 14 real options (CASH/NETS/PAYNOW/GIRO/CHEQUE/…); prototype only models the 5 most common | `ReceiptFilter.vue` |
| `.badge` (status) | `resolveReceiptStatusVariant`: `Paid`→`success`, `Void`→`danger`, else `secondary` | `useReceiptList.js` |
| Row actions | View, **Edit Remarks** (modal with textarea, `POST customer/receipts/save/remarks`), Download, Email to Customer | `List.vue` dropdown |

## Detail / sub-screens

Reached via row "View" actions and the "Register Payment" entry points above. `src/views/customer/invoices/Detail.vue` (route `customers-invoices-show`) turns out to be the single best analog for the two-column info-card + line-items + totals-footer shell used by all four "Detail" screens below — it already combines everything Retail/Sales Order Detail need (customer info, a linked file/product, an itemized table with GST totals, payment history, related records, activity log), so all four share its structure even though only Invoice Detail maps to it directly.

| Screen | File | Modeled on |
|---|---|---|
| Retail Order Detail | `retail-order-detail.html` | `src/views/customer/invoices/Detail.vue` + `InvoiceItems.vue` shell (header/status pill/kebab menu, two-column info cards, itemized table w/ Subtotal+GST+Total footer, nested payment history, "Related Service Requests" card — this maps directly to the SR-linkage requirement, Activity Log timeline via `app-timeline`/`app-timeline-item`) |
| Sales Order Detail | `sales-order-detail.html` | Same `Detail.vue` shell; header pattern can alternatively borrow `src/views/purchase/purchase-order/PurchaseOrderDetail.vue`'s signatory/approval-icon row (lines 1-66) instead of a plain status pill if an approval-chain feel is wanted |
| Invoice Detail | `invoice-detail.html` | `src/views/customer/invoices/Detail.vue` itself — this *is* the invoice detail screen already in the codebase. Field names carry over directly: `trxNo`, `trxDate`, `paymentStatus`, `purchasers[0].{name,nric,contact,customer.email}`, `fileNo`/`lotLocation`/`nvsFileType`, `billings` line items (`InvoiceItems.vue`), `receipts` list (`Receipts.vue`), attachments, activity log |
| Register Payment | `register-payment.html` | Real route `customers-register-payment` → `src/views/customer/payment/RegisterPayment.vue` (2830 lines, resource `['File','Invoice']`) — **fully implemented already, not a stub**. Prototype mirrors its actual structure: summary card ("Making Payment For" + "Previously Paid"/"Total Outstanding" from `fileDetail.ledgerSummary`), a selectable installments/invoices table with Select All, "Amount to be Paid" input, and payment-mode-conditional fields (Cheque/GIRO/Card show extra `b-form-group`s) |
| Transaction / Receipt Detail | `transaction-detail.html` | `src/views/customer/receipts/Detail.vue` (route `customers-receipts-show`) + `Payment.vue` + `Allocation.vue` — header with kebab menu, Service Agent avatar chip, "Receipt Information" card (Paid Amount, Bank In Description, Transaction Date, Remarks w/ inline-edit pencil), "Product and Customer Details" card, "Receipt/Credit Note Allocation" card, attachments, activity log |

Confirmed during research: no "Retail Order" or "Sales Order" concept exists anywhere in the current codebase (`grep` for either term returns zero hits) — `Detail.vue` is the closest real analog for both, which is why they share its shell here.

## General notes for the developer

- Badge colors, spacing, and type scale were lifted directly from
  `scss/variables/variables` (`$primary` etc.) — no new design tokens needed.
- Two distinct badge languages exist in this app and the prototype preserves
  both: Retail/Sales Orders use custom color-coded pill classes
  (`resolve*BadgeClass` helpers, bespoke SCSS); Submissions & Payments /
  Transactions use standard Bootstrap-Vue `b-badge light-{variant}` semantic
  colors (`success`/`warning`/`danger`/`secondary`). Don't unify them —
  that's how the real app already draws this distinction.
- The prototype's grid-column table layout (`.thead`/`.row`) is a stand-in
  for `b-table`'s own row rendering — column widths are illustrative, not
  literal CSS to port.
- Sort click handlers map 1:1 to `b-table`'s built-in `sort-by`/`sort-desc`
  props + `@sort-changed`.
- All sample data across every screen is placeholder — none of it should be
  treated as real customer or financial data.
