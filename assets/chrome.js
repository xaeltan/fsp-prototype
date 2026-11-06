// Shared navbar / secondary-nav chrome + toast helper, used by every screen.
(function () {
  var NAV_PILLS = [
    { key: 'orders', label: 'Sales Orders', href: 'sales-orders.html', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { key: 'payments', label: 'Submissions & Payments', href: 'submissions-payments.html', icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { key: 'retail', label: 'Retail Orders', href: 'retail-orders.html', icon: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' },
    { key: 'transactions', label: 'Transactions', href: 'transactions.html', icon: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' },
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var NAVBAR_HTML =
    '<div class="navbar">' +
      '<div class="navbar-icons">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" class="active"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" class="pinned"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>' +
      '</div>' +
      '<div class="brand">NIRVANA</div>' +
      '<div class="navbar-right">' +
        '<div class="bell"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="badge-dot">3</span></div>' +
        '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<div class="who"><div class="name">BOA User</div><div class="role">Senior Executive, Business Operation &amp; Administration and Registry</div></div>' +
        '<div class="avatar">OA</div>' +
      '</div>' +
    '</div>';

  var CUSTOMERS = {
    'Michelle Tay': { nric: 'S12***67A', mobile: '+65 9123 4567', email: 'michelle.tay@example.com', address: '12 Sunrise Avenue, #05-01, Singapore 536789' },
    'Wei Ling Koh': { nric: 'S87***21B', mobile: '+65 8234 5678', email: 'weiling.koh@example.com', address: '45 Marina Parade, #12-08, Singapore 449269' },
    'Rajesh Kumar': { nric: 'S45***93C', mobile: '+65 9345 6789', email: 'rajesh.kumar@example.com', address: '8 Toa Payoh Lorong 6, #03-15, Singapore 310008' },
    'Amanda Lim': { nric: 'S66***48D', mobile: '+65 8456 7890', email: 'amanda.lim@example.com', address: '23 Bukit Timah Road, #08-22, Singapore 259770' },
    'David Lim': { nric: 'S23***15E', mobile: '+65 9567 8901', email: 'david.lim@example.com', address: '6 Serangoon Ave 3, #10-04, Singapore 556083' },
    'Nur Aisyah': { nric: 'S91***76F', mobile: '+65 8678 9012', email: 'nur.aisyah@example.com', address: '19 Tampines Street 45, #07-11, Singapore 520019' },
    'Kelvin Goh': { nric: 'S38***02G', mobile: '+65 9789 0123', email: 'kelvin.goh@example.com', address: '3 Clementi Ave 2, #14-06, Singapore 129905' },
    'Farah Yusof': { nric: 'S57***89H', mobile: '+65 8890 1234', email: 'farah.yusof@example.com', address: '27 Yishun Ring Road, #06-19, Singapore 760027' },
    'Tan Boon Huat': { nric: 'S34***56J', mobile: '+65 9901 2345', email: 'boonhuat.tan@example.com', address: '14 Ang Mo Kio Ave 6, #02-33, Singapore 560014' },
    'Siti Rahayu': { nric: 'S62***40K', mobile: '+65 8012 3456', email: 'siti.rahayu@example.com', address: '5 Jurong West St 52, #09-17, Singapore 640005' },
    'James Ong': { nric: 'S49***28L', mobile: '+65 9123 8765', email: 'james.ong@example.com', address: '31 Hougang Ave 8, #11-02, Singapore 530031' },
  };

  window.NvsChrome = {
    customer: function (name) { return CUSTOMERS[name] || { nric: 'S00***00X', mobile: '+65 9000 0000', email: 'customer@example.com', address: 'Address on file' }; },
    money: function (n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    mountNavbar: function (elId) {
      document.getElementById(elId).innerHTML = NAVBAR_HTML;
    },
    mountSubnav: function (elId, currentKey) {
      var html = NAV_PILLS.map(function (p) {
        var on = p.key === currentKey;
        if (on) {
          return '<div class="pill on">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p.icon + '</svg>' +
            esc(p.label) + '</div>';
        }
        return '<a class="pill" href="' + p.href + '">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p.icon + '</svg>' +
          esc(p.label) + '</a>';
      }).join('');
      document.getElementById(elId).innerHTML = html;
    },
    esc: esc,
    fmtMoney: function (n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    toast: (function () {
      var timer = null;
      return function (msg) {
        var t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(timer);
        timer = setTimeout(function () { t.classList.remove('show'); }, 2200);
      };
    })(),
  };
})();
