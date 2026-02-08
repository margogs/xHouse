(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const safe = (fn) => { try { return fn(); } catch (e) { console.error(e); } };

  window.crmData = window.crmData || null;

  function seed() {
    return {
      buildings: [
        { id: 1, address: 'ул. Ленина, д. 15', floors: 9, apartments: 72, risks: ['electrical', 'elevator'] },
        { id: 2, address: 'пр. Победы, д. 42', floors: 5, apartments: 40, risks: ['roof'] },
      ],
      residents: [
        { id: 1, name: 'Иванов Иван Иванович', apartment: '15', buildingId: 1, phone: '+7 (916) 123-45-67', email: 'ivanov@mail.ru', status: 'active', balance: 1500.5, residentsCount: 3 },
        { id: 2, name: 'Петрова Мария Сергеевна', apartment: '42', buildingId: 1, phone: '+7 (916) 234-56-78', email: 'petrova@mail.ru', status: 'active', balance: -2300.75, residentsCount: 2 },
      ],
      tickets: [
        { id: 1, residentId: 1, buildingId: 1, type: 'ремонт', title: 'Протечка в ванной', status: 'open', priority: 'high', createdAt: '2024-08-01', assignedTo: 'Дмитрий К.' },
        { id: 2, residentId: 2, buildingId: 1, type: 'электрика', title: 'Не работает розетка', status: 'in_progress', priority: 'medium', createdAt: '2024-08-03', assignedTo: 'Дмитрий К.' },
      ],
      services: [
        { id: 1, name: 'Содержание общего имущества', type: 'main', tariff: 25.5, period: 'monthly', buildingId: 1, sla: '24/7' },
        { id: 2, name: 'Ремонт лифта', type: 'additional', tariff: 1200, period: 'on-demand', buildingId: 1, sla: '4 часа' },
      ],
      payments: [
        { id: 1, amount: 1836, status: 'paid' },
        { id: 2, amount: 1200, status: 'processing' },
      ],
    };
  }

  function initData() {
    const raw = localStorage.getItem('crmData');
    if (!raw) {
      window.crmData = seed();
      localStorage.setItem('crmData', JSON.stringify(window.crmData));
      return;
    }
    try { window.crmData = JSON.parse(raw); }
    catch { window.crmData = seed(); localStorage.setItem('crmData', JSON.stringify(window.crmData)); }
  }

  const normalizeTicketStatus = (s) => {
    s = String(s || '').toLowerCase().trim();
    if (s === 'in_progress' || s === 'in progress' || s === 'in-progress') return 'inprogress';
    return s;
  };

  function area() {
    const el = $('#content-area');
    if (!el) throw new Error('Нет #content-area');
    return el;
  }

  const PAGES = new Set(['dashboard','buildings','residents','tickets','services','payments','contractors','documents','requisites','profile']);

  function setActive(page) {
    $$('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('data-page') === page));
  }

  function loadPage(page) {
    page = PAGES.has(page) ? page : 'dashboard';
    setActive(page);
    area().innerHTML = '<div class="loading">Загрузка...</div>';
    setTimeout(() => safe(() => routes[page](), `route:${page}`), 50);
  }

  // --- Chart
  function renderChart() {
    const c = $('#analyticsChart');
    if (!c || typeof Chart === 'undefined') return;

    if (window.__chart) { window.__chart.destroy(); window.__chart = null; }

    window.__chart = new Chart(c.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг'],
        datasets: [
          { label: 'Начислено', data: [10,12,13,14,16,17,18,19], borderColor:'#6912FF', tension:0.3, fill:false },
          { label: 'Оплачено', data: [9,10,11,12,14,15,16,17], borderColor:'#00D1B2', tension:0.3, fill:false },
        ]
      },
      options: { responsive:true, maintainAspectRatio:false }
    });
  }

  // --- Pages
  function dashboard() {
    const el = area();
    el.innerHTML = `
      <div class="page-header"><h2 class="page-title">Аналитика</h2></div>
      <style>
        .chart-wrap{height:360px;background:var(--white);border:1px solid var(--gray-200);border-radius:12px;padding:16px;box-sizing:border-box}
        .chart-wrap canvas{width:100%!important;height:100%!important;display:block}
      </style>
      <div class="chart-wrap"><canvas id="analyticsChart"></canvas></div>
    `;
    renderChart();
  }

  function residents() {
    const el = area();
    const rows = (window.crmData.residents || []).map(r => {
      const b = (window.crmData.buildings || []).find(x => x.id === r.buildingId);
      return `<tr><td>${r.name}</td><td>${b ? b.address : '—'}</td><td>${r.apartment}</td><td>${r.status}</td></tr>`;
    }).join('');
    el.innerHTML = `
      <div class="page-header"><h2 class="page-title">Жильцы</h2></div>
      <div class="table-container">
        <table><thead><tr><th>ФИО</th><th>Дом</th><th>Кв</th><th>Статус</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4" style="text-align:center">Нет данных</td></tr>`}</tbody></table>
      </div>
    `;
  }

  function tickets() {
    const el = area();
    const rows = (window.crmData.tickets || []).map(t => {
      const st = normalizeTicketStatus(t.status);
      return `<tr><td>#${t.id}</td><td>${t.title}</td><td>${st}</td><td>${t.createdAt}</td></tr>`;
    }).join('');
    el.innerHTML = `
      <div class="page-header"><h2 class="page-title">Обращения</h2></div>
      <div class="table-container">
        <table><thead><tr><th>ID</th><th>Тема</th><th>Статус</th><th>Дата</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4" style="text-align:center">Нет данных</td></tr>`}</tbody></table>
      </div>
    `;
  }

  function services() {
    const el = area();
    const rows = (window.crmData.services || []).map(s => {
      return `<tr><td>${s.name}</td><td>${s.type}</td><td>${s.tariff}</td><td>${s.period}</td><td>${s.sla || '—'}</td></tr>`;
    }).join('');
    el.innerHTML = `
      <div class="page-header"><h2 class="page-title">Услуги и тарифы</h2></div>
      <div class="table-container">
        <table><thead><tr><th>Услуга</th><th>Тип</th><th>Тариф</th><th>Период</th><th>SLA</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="5" style="text-align:center">Нет данных</td></tr>`}</tbody></table>
      </div>
    `;
  }

  function buildings() { area().innerHTML = `<div class="page-header"><h2 class="page-title">Дома</h2></div>`; }
  function stub(title) { area().innerHTML = `<div class="page-header"><h2 class="page-title">${title}</h2></div>`; }

  const routes = {
    dashboard,
    buildings,
    residents,
    tickets,
    services,
    payments: () => stub('Платежи'),
    contractors: () => stub('Подрядчики'),
    documents: () => stub('Документы'),
    requisites: () => stub('Реквизиты для оплаты'),
    profile: () => stub('Профиль УК'),
  };

  function setupNav() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.nav-link');
      if (!a) return;
      e.preventDefault();
      loadPage(a.getAttribute('data-page'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    safe(() => {
      const cd = $('#current-date');
      if (cd) cd.textContent = new Date().toLocaleDateString('ru-RU', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    });
    safe(initData);
    safe(setupNav);
    safe(() => loadPage('dashboard'));
    window.addEventListener('resize', () => safe(() => window.__chart?.resize?.()));
  });
})();
