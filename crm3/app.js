// app.js — xHouse CRM (полная рабочая версия: все страницы + фикс аналитики)
(() => {
  'use strict';

  // ---------------- Utils ----------------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const safe = (fn, label = 'safe') => {
    try { return fn(); } catch (e) { console.error(`[${label}]`, e); }
  };

  const money = (n, frac = 2) => Number(n || 0).toLocaleString('ru-RU', { maximumFractionDigits: frac });
  const esc = (s) => String(s ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

  const normalizeTicketStatus = (status) => {
    const s = String(status || '').trim().toLowerCase();
    if (s === 'open') return 'open';
    if (s === 'resolved' || s === 'closed') return 'resolved';
    if (s === 'inprogress' || s === 'in_progress' || s === 'in progress' || s === 'in-progress') return 'inprogress';
    return 'open';
  };

  const area = () => {
    const el = $('#content-area');
    if (!el) throw new Error('Не найден #content-area');
    return el;
  };

  // --------------- Data ------------------
  window.crmData = window.crmData || null;

  function seedData() {
    return {
      currentCompany: {
        id: 1,
        legalName: "ООО 'Управляющая Компания Профи'",
        inn: "7701234567",
        ogrn: "1177745678901",
        region: "Москва",
        contacts: { phone: "+7 (495) 123-45-67", email: "info@uk-profi.ru", address: "ул. Тверская, д. 10" },
        licenses: ["Лицензия №12345", "Лицензия №67890"],
      },
      companies: [
        {
          id: 1,
          legalName: "ООО 'Управляющая Компания Профи'",
          inn: "7701234567",
          ogrn: "1177745678901",
          region: "Москва",
          contacts: { phone: "+7 (495) 123-45-67", email: "info@uk-profi.ru", address: "ул. Тверская, д. 10" },
          licenses: ["Лицензия №12345", "Лицензия №67890"],
        },
      ],
      buildings: [
        { id: 1, address: "ул. Ленина, д. 15", floors: 9, apartments: 72, risks: ["electrical", "elevator"], passport: { elevators: ["Пассажирский №1 - 2005г", "Грузовой - 2005г"], itp: { type: "Индивидуальный", year: 2010 } } },
        { id: 2, address: "пр. Победы, д. 42", floors: 5, apartments: 40, risks: ["roof"], passport: { elevators: [], itp: { type: "Центральный", year: 2008 } } },
        { id: 3, address: "ул. Садовая, д. 7", floors: 12, apartments: 96, risks: [], passport: { elevators: ["Пассажирский №1 - 2015г", "Пассажирский №2 - 2015г"], itp: { type: "Индивидуальный", year: 2015 } } },
      ],
      residents: [
        { id: 1, name: "Иванов Иван Иванович", apartment: "15", buildingId: 1, phone: "+7 (916) 123-45-67", email: "ivanov@mail.ru", status: "active", balance: 1500.50, residentsCount: 3 },
        { id: 2, name: "Петрова Мария Сергеевна", apartment: "42", buildingId: 1, phone: "+7 (916) 234-56-78", email: "petrova@mail.ru", status: "active", balance: -2300.75, residentsCount: 2 },
        { id: 3, name: "Сидоров Алексей Петрович", apartment: "7", buildingId: 2, phone: "+7 (916) 345-67-89", email: "sidorov@mail.ru", status: "inactive", balance: 0, residentsCount: 1 },
        { id: 4, name: "Козлова Елена Владимировна", apartment: "23", buildingId: 3, phone: "+7 (916) 456-78-90", email: "kozlova@mail.ru", status: "active", balance: 5000.25, residentsCount: 4 },
      ],
      tickets: [
        { id: 1, residentId: 1, buildingId: 1, type: "ремонт", title: "Протечка в ванной комнате", description: "Сильная протечка из потолка в ванной комнате", status: "open", priority: "high", createdAt: "2024-08-01", updatedAt: "2024-08-02", assignedTo: "Дмитрий К." },
        { id: 2, residentId: 2, buildingId: 1, type: "электрика", title: "Не работает розетка на кухне", description: "Розетка перестала работать после грозы", status: "in_progress", priority: "medium", createdAt: "2024-08-03", updatedAt: "2024-08-04", assignedTo: "Дмитрий К." },
        { id: 3, residentId: 4, buildingId: 3, type: "уборка", title: "Не убран мусор в подъезде", description: "Мусор не вывозится уже 3 дня", status: "resolved", priority: "low", createdAt: "2024-07-28", updatedAt: "2024-07-30", assignedTo: "Алексей М." },
        { id: 4, residentId: 3, buildingId: 2, type: "отопление", title: "Холодные батареи", description: "В квартире холодно, батареи еле теплые", status: "open", priority: "high", createdAt: "2024-08-05", updatedAt: "2024-08-05", assignedTo: "Дмитрий К." },
      ],
      services: [
        { id: 1, name: "Содержание общего имущества", type: "main", tariff: 25.50, period: "monthly", buildingId: 1, contractorId: 1, sla: "24/7", description: "Уборка подъездов, обслуживание лифтов, ремонт общедомового оборудования" },
        { id: 2, name: "Вывоз ТКО", type: "main", tariff: 15.30, period: "monthly", buildingId: 1, contractorId: 2, sla: "ежедневно", description: "Вывоз твердых коммунальных отходов" },
        { id: 3, name: "Ремонт лифтового оборудования", type: "additional", tariff: 1200.00, period: "on-demand", buildingId: 1, contractorId: 3, sla: "4 часа", description: "Экстренный и плановый ремонт лифтов" },
        { id: 4, name: "Техническое обслуживание ИТП", type: "main", tariff: 18.75, period: "monthly", buildingId: 3, contractorId: 1, sla: "24 часа", description: "Обслуживание индивидуального теплового пункта" },
      ],
      contractors: [
        { id: 1, legalName: "ООО 'Сервис Плюс'", inn: "7712345678", workTypes: ["уборка территории", "текущий ремонт"], bankDetails: "АО 'Альфа-Банк' р/с 40702810123450001234", status: "активен" },
        { id: 2, legalName: "ООО 'Эко-Транс'", inn: "7723456789", workTypes: ["вывоз ТКО", "утилизация"], bankDetails: "ПАО 'Сбербанк' р/с 40702810234560002345", status: "активен" },
        { id: 3, legalName: "ООО 'Лифт-Сервис'", inn: "7734567890", workTypes: ["ремонт лифтов", "техническое обслуживание"], bankDetails: "АО 'Тинькофф Банк' р/с 40702810345670003456", status: "на проверке" },
      ],
      payments: [
        { id: 1, serviceId: 1, amount: 1836.00, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" },
        { id: 2, serviceId: 2, amount: 1101.60, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" },
        { id: 3, serviceId: 3, amount: 1200.00, status: "processing", date: "2024-08-15", payer: "ООО 'УК Профи'" },
        { id: 4, serviceId: 1, amount: 1836.00, status: "charged", date: "2024-09-01", payer: "ООО 'УК Профи'" },
      ],
      documents: [
        { id: 1, type: "договор", name: "Договор с ООО 'Сервис Плюс'", link: "#", status: "signed", entityId: 1, date: "2024-01-15", size: "2.4 MB", category: "contracts" },
        { id: 2, type: "акт", name: "Акт выполненных работ за июль 2024", link: "#", status: "pending", entityId: 1, date: "2024-08-01", size: "1.8 MB", category: "acts" },
        { id: 3, type: "лицензия", name: "Лицензия на управление МКД", link: "#", status: "signed", entityId: 1, date: "2023-12-20", size: "3.2 MB", category: "licenses" },
        { id: 4, type: "отчет", name: "Отчет по эксплуатации за 2 квартал 2024", link: "#", status: "signed", entityId: 1, date: "2024-07-15", size: "4.5 MB", category: "reports" },
        { id: 5, type: "смета", name: "Смета на капитальный ремонт", link: "#", status: "pending", entityId: 2, date: "2024-08-10", size: "1.2 MB", category: "estimates" },
      ],
      requisites: [
        { id: 1, type: "bank", bankName: "ПАО Сбербанк", accountNumber: "40702810123450001234", correspondentAccount: "30101810400000000225", bik: "044525225", inn: "7701234567", kpp: "770101001" },
        { id: 2, type: "electronic", paymentSystem: "СБП (Система быстрых платежей)", phone: "+7 (495) 123-45-67", email: "payments@uk-profi.ru", qrCode: "#" },
      ],
      users: [
        { id: 1, name: "Алексей М.", role: "manager", permissions: ["all"] },
        { id: 2, name: "Ирина С.", role: "accountant", permissions: ["payments", "documents"] },
        { id: 3, name: "Дмитрий К.", role: "engineer", permissions: ["buildings", "services"] },
      ],
    };
  }

  function initData() {
    const stored = localStorage.getItem('crmData');
    if (!stored) {
      window.crmData = seedData();
      localStorage.setItem('crmData', JSON.stringify(window.crmData));
      return;
    }
    try {
      window.crmData = JSON.parse(stored);
    } catch (e) {
      console.warn('crmData broken, reseed', e);
      window.crmData = seedData();
      localStorage.setItem('crmData', JSON.stringify(window.crmData));
    }
  }

  function persist() {
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
  }

  // --------------- Navigation -------------
  const PAGES = new Set(['dashboard','buildings','residents','tickets','services','payments','contractors','documents','requisites','profile']);

  function setActiveNav(page) {
    $$('.nav-link').forEach((a) => a.classList.toggle('active', a.getAttribute('data-page') === page));
  }

  function loadPage(page) {
    page = PAGES.has(page) ? page : 'dashboard';
    setActiveNav(page);

    const el = area();
    el.innerHTML = `<div class="loading">Загрузка...</div>`;

    setTimeout(() => {
      safe(() => routes[page](), `route:${page}`);
    }, 80);
  }

  function setupNavigation() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link) return;
      e.preventDefault();
      loadPage(link.getAttribute('data-page'));
    });
  }

  // --------------- Analytics Chart --------
  function destroyDashboardChart() {
    if (window.__dashboardChart && typeof window.__dashboardChart.destroy === 'function') {
      window.__dashboardChart.destroy();
    }
    window.__dashboardChart = null;
  }

  function renderDashboardChart() {
    const canvas = $('#analyticsChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js не подключен');
      return;
    }

    destroyDashboardChart();

    window.__dashboardChart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг'],
        datasets: [
          {
            label: 'Начислено, ₽',
            data: [1850000, 1920000, 1980000, 2050000, 2150000, 2250000, 2350000, 2450780],
            borderColor: '#6912FF',
            backgroundColor: 'rgba(105, 18, 255, 0.10)',
            tension: 0.3,
            fill: true,
            pointRadius: 3,
          },
          {
            label: 'Оплачено, ₽',
            data: [1650000, 1720000, 1780000, 1850000, 1950000, 2050000, 2150000, 1890540],
            borderColor: '#00D1B2',
            backgroundColor: 'rgba(0, 209, 178, 0.10)',
            tension: 0.3,
            fill: true,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // фикс расплывания
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Финансовая динамика (пример)' },
          tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString('ru-RU')} ₽` } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => Number(v).toLocaleString('ru-RU') } },
        },
      },
    });
  }

  // ---------------- Pages -----------------
  function loadDashboard() {
    const totalCharged = (window.crmData.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalPaid = (window.crmData.payments || []).filter((p) => p.status === 'paid').reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalProcessing = (window.crmData.payments || []).filter((p) => p.status === 'processing').reduce((s, p) => s + Number(p.amount || 0), 0);

    const activeTickets = (window.crmData.tickets || []).filter((t) => {
      const st = normalizeTicketStatus(t.status);
      return st === 'open' || st === 'inprogress';
    }).length;

    const resolvedTickets = (window.crmData.tickets || []).filter((t) => normalizeTicketStatus(t.status) === 'resolved').length;

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Аналитика</h2>
        <div class="date-range">
          <button class="btn btn-secondary"><i class="fas fa-calendar-alt"></i> 2024</button>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Начислено</h3><div class="stat-value">${money(totalCharged)} ₽</div><div class="stat-change">+12.5%</div></div>
        <div class="stat-card"><h3>Оплачено</h3><div class="stat-value">${money(totalPaid)} ₽</div><div class="stat-change">+8.3%</div></div>
        <div class="stat-card"><h3>В обработке</h3><div class="stat-value">${money(totalProcessing)} ₽</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Активные обращения</h3><div class="stat-value">${activeTickets}</div><div class="stat-change">Решено: ${resolvedTickets}</div></div>
      </div>

      <style>
        .chart-wrap{height:360px;background:var(--white);border:1px solid var(--gray-200);border-radius:12px;padding:16px;box-sizing:border-box}
        .chart-wrap canvas{width:100%!important;height:100%!important;display:block}
      </style>

      <div class="chart-wrap" style="margin-bottom: 30px;">
        <canvas id="analyticsChart"></canvas>
      </div>

      <div class="table-container">
        <table>
          <thead><tr><th>Дом</th><th>Квартир</th><th>Начислено (оценка)</th><th>Оплачено (оценка)</th><th>Долг (оценка)</th></tr></thead>
          <tbody>
            ${(window.crmData.buildings || []).map((b) => {
              const charged = Number(b.apartments || 0) * 1500;
              const paid = Number(b.apartments || 0) * 1350;
              const debt = charged - paid;
              return `<tr>
                <td>${esc(b.address)}</td>
                <td>${Number(b.apartments || 0)}</td>
                <td>${money(charged)} ₽</td>
                <td>${money(paid)} ₽</td>
                <td>${money(debt)} ₽</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    renderDashboardChart();
  }

  function loadBuildings() {
    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Дома</h2>
        <button class="btn btn-primary" id="addBuildingBtn"><i class="fas fa-plus"></i> Добавить дом</button>
      </div>

      <div class="table-container">
        <table>
          <thead><tr><th>Адрес</th><th>Этажей</th><th>Квартир</th><th>Риски</th><th>Действия</th></tr></thead>
          <tbody>
            ${(window.crmData.buildings || []).map((b) => {
              const risks = (b.risks || []).length ? (b.risks || []).map((r) => {
                let cls = 'risk-low', text = r;
                if (r === 'electrical') { cls = 'risk-high'; text = 'Электрика'; }
                else if (r === 'roof') { cls = 'risk-medium'; text = 'Крыша'; }
                else if (r === 'elevator') { cls = 'risk-high'; text = 'Лифт'; }
                else if (r === 'plumbing') { cls = 'risk-medium'; text = 'Водопровод'; }
                return `<span class="risk-flag ${cls}">${text}</span>`;
              }).join('<br>') : `<span class="risk-flag risk-low">Нет</span>`;

              return `<tr>
                <td><strong>${esc(b.address)}</strong></td>
                <td>${Number(b.floors || 0)}</td>
                <td>${Number(b.apartments || 0)}</td>
                <td>${risks}</td>
                <td>
                  <button class="btn btn-secondary" onclick="viewBuilding(${b.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="editBuilding(${b.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-secondary" onclick="deleteBuilding(${b.id})"><i class="fas fa-trash"></i></button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#addBuildingBtn')?.addEventListener('click', () => openModal('buildingModal'));
  }

  function loadResidents() {
    const totalResidents = (window.crmData.residents || []).length;
    const activeResidents = (window.crmData.residents || []).filter((r) => r.status === 'active').length;
    const debtors = (window.crmData.residents || []).filter((r) => Number(r.balance || 0) < 0).length;
    const totalDebt = (window.crmData.residents || []).filter((r) => Number(r.balance || 0) < 0).reduce((s, r) => s + Math.abs(Number(r.balance || 0)), 0);

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Жильцы</h2>
        <button class="btn btn-primary" id="addResidentBtn"><i class="fas fa-plus"></i> Добавить жильца</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Всего жильцов</h3><div class="stat-value">${totalResidents}</div><div class="stat-change">Домов: ${(window.crmData.buildings || []).length}</div></div>
        <div class="stat-card"><h3>Активные</h3><div class="stat-value">${activeResidents}</div><div class="stat-change">${totalResidents ? ((activeResidents / totalResidents) * 100).toFixed(1) : '0.0'}%</div></div>
        <div class="stat-card"><h3>Должники</h3><div class="stat-value">${debtors}</div><div class="stat-change">${money(totalDebt)} ₽</div></div>
        <div class="stat-card"><h3>Средний долг</h3><div class="stat-value">${debtors ? money(totalDebt / debtors) : '0'} ₽</div><div class="stat-change">на должника</div></div>
      </div>

      <div class="table-container">
        <div style="margin-bottom: 20px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary active" onclick="filterResidents('all')">Все</button>
          <button class="btn btn-secondary" onclick="filterResidents('active')">Активные</button>
          <button class="btn btn-secondary" onclick="filterResidents('inactive')">Неактивные</button>
          <button class="btn btn-secondary" onclick="filterResidents('debtors')">Должники</button>
          <button class="btn btn-secondary" onclick="filterResidents('no-debt')">Без долга</button>
        </div>

        <table id="residentsTable">
          <thead><tr><th>ФИО</th><th>Дом</th><th>Кв.</th><th>Телефон</th><th>Email</th><th>Баланс</th><th>Статус</th><th>Действия</th></tr></thead>
          <tbody id="residentsTableBody">
            ${(window.crmData.residents || []).map((r) => {
              const b = (window.crmData.buildings || []).find((x) => x.id === r.buildingId);
              const buildingName = b ? b.address : '—';

              const bal = Number(r.balance || 0);
              const balanceClass = bal < 0 ? 'status-pending' : 'status-paid';
              const statusClass = r.status === 'active' ? 'status-paid' : 'status-processing';

              return `<tr>
                <td><strong>${esc(r.name)}</strong></td>
                <td>${esc(buildingName)}</td>
                <td>${esc(r.apartment)}</td>
                <td>${esc(r.phone || '')}</td>
                <td>${esc(r.email || '')}</td>
                <td><span class="status-badge ${balanceClass}">${money(bal)} ₽</span></td>
                <td><span class="status-badge ${statusClass}">${r.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
                <td>
                  <button class="btn btn-secondary" onclick="viewResident(${r.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="editResident(${r.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-secondary" onclick="sendNotificationToResident(${r.id})"><i class="fas fa-bell"></i></button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#addResidentBtn')?.addEventListener('click', () => showAddResidentModal());
  }

  function loadTickets() {
    const tickets = window.crmData.tickets || [];
    const totalTickets = tickets.length;
    const openTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'open').length;
    const inProgressTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'inprogress').length;
    const resolvedTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'resolved').length;

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Обращения</h2>
        <button class="btn btn-primary" id="createTicketBtn"><i class="fas fa-plus"></i> Создать обращение</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Всего</h3><div class="stat-value">${totalTickets}</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Открытые</h3><div class="stat-value">${openTickets}</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>В работе</h3><div class="stat-value">${inProgressTickets}</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Решено</h3><div class="stat-value">${resolvedTickets}</div><div class="stat-change">${totalTickets ? ((resolvedTickets / totalTickets) * 100).toFixed(1) : '0'}%</div></div>
      </div>

      <div class="table-container">
        <div style="margin-bottom: 20px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary active" onclick="filterTickets('all')">Все</button>
          <button class="btn btn-secondary" onclick="filterTickets('open')">Открытые</button>
          <button class="btn btn-secondary" onclick="filterTickets('inprogress')">В работе</button>
          <button class="btn btn-secondary" onclick="filterTickets('resolved')">Решено</button>
          <button class="btn btn-secondary" onclick="filterTickets('high')">Высокий приоритет</button>
        </div>

        <table id="ticketsTable">
          <thead><tr><th>ID</th><th>Тема</th><th>Жилец</th><th>Тип</th><th>Приоритет</th><th>Статус</th><th>Дата</th><th>Ответственный</th><th>Действия</th></tr></thead>
          <tbody id="ticketsTableBody">
            ${tickets.length ? tickets.map((t) => {
              const resident = (window.crmData.residents || []).find((r) => r.id === t.residentId);
              const residentName = resident ? resident.name : '—';

              let priorityClass = 'risk-low', priorityText = 'Низкий';
              if (t.priority === 'high') { priorityClass = 'risk-high'; priorityText = 'Высокий'; }
              else if (t.priority === 'medium') { priorityClass = 'risk-medium'; priorityText = 'Средний'; }

              const st = normalizeTicketStatus(t.status);
              let statusClass = 'status-pending', statusText = 'Открыто';
              if (st === 'inprogress') { statusClass = 'status-processing'; statusText = 'В работе'; }
              if (st === 'resolved') { statusClass = 'status-paid'; statusText = 'Решено'; }

              return `<tr>
                <td>#${t.id}</td>
                <td><strong>${esc(t.title)}</strong></td>
                <td>${esc(residentName)}</td>
                <td>${esc(t.type || '')}</td>
                <td><span class="status-badge ${priorityClass}">${priorityText}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${esc(t.createdAt || '')}</td>
                <td>${esc(t.assignedTo || '—')}</td>
                <td>
                  <button class="btn btn-secondary" onclick="viewTicket(${t.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="assignTicket(${t.id})"><i class="fas fa-user-check"></i></button>
                  <button class="btn btn-secondary" onclick="closeTicket(${t.id})"><i class="fas fa-check"></i></button>
                </td>
              </tr>`;
            }).join('') : `<tr><td colspan="9" style="text-align:center;color:var(--gray-700)">Обращений пока нет</td></tr>`}
          </tbody>
        </table>
      </div>
    `;

    $('#createTicketBtn')?.addEventListener('click', () => showCreateTicketModal());
  }

  function loadServices() {
    const services = window.crmData.services || [];
    const totalServices = services.length;
    const mainServices = services.filter((s) => s.type === 'main').length;
    const additionalServices = services.filter((s) => s.type === 'additional').length;
    const totalMonthlyRevenue = services.filter((s) => s.period === 'monthly').reduce((sum, s) => sum + Number(s.tariff || 0), 0);

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Услуги и тарифы</h2>
        <button class="btn btn-primary" id="addServiceBtn"><i class="fas fa-plus"></i> Добавить услугу</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Всего услуг</h3><div class="stat-value">${totalServices}</div><div class="stat-change">${mainServices} осн., ${additionalServices} доп.</div></div>
        <div class="stat-card"><h3>Ежемесячная выручка (пример)</h3><div class="stat-value">${money(totalMonthlyRevenue)} ₽</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Средний тариф</h3><div class="stat-value">${totalServices ? money(services.reduce((s, x) => s + Number(x.tariff || 0), 0) / totalServices) : '0'} ₽</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Подрядчиков</h3><div class="stat-value">${new Set(services.map((s) => s.contractorId).filter(Boolean)).size}</div><div class="stat-change"></div></div>
      </div>

      <div class="tabs" style="margin-bottom: 20px;">
        <button class="tab active" data-tab="all">Все</button>
        <button class="tab" data-tab="main">Основные</button>
        <button class="tab" data-tab="additional">Доп.</button>
        <button class="tab" data-tab="monthly">Ежемесячные</button>
        <button class="tab" data-tab="ondemand">По требованию</button>
      </div>

      <div class="table-container">
        <table id="servicesTable">
          <thead><tr><th>Услуга</th><th>Тип</th><th>Тариф</th><th>Период</th><th>Дом</th><th>Подрядчик</th><th>SLA</th><th>Статус</th><th>Действия</th></tr></thead>
          <tbody id="servicesTableBody">
            ${services.map((s) => {
              const building = (window.crmData.buildings || []).find((b) => b.id === s.buildingId);
              const contractor = (window.crmData.contractors || []).find((c) => c.id === s.contractorId);

              const typeClass = s.type === 'main' ? 'status-paid' : 'status-processing';
              const typeText = s.type === 'main' ? 'Основная' : 'Дополнительная';

              const periodText = s.period === 'monthly' ? 'Ежемесячно' : 'По требованию';
              const periodClass = s.period === 'monthly' ? 'status-paid' : 'status-pending';

              return `<tr>
                <td><strong>${esc(s.name)}</strong></td>
                <td><span class="status-badge ${typeClass}">${typeText}</span></td>
                <td>${money(s.tariff)} ₽</td>
                <td><span class="status-badge ${periodClass}">${periodText}</span></td>
                <td>${esc(building ? building.address : '—')}</td>
                <td>${esc(contractor ? contractor.legalName : '—')}</td>
                <td>${esc(s.sla || '—')}</td>
                <td><span class="status-badge status-paid">Активна</span></td>
                <td>
                  <button class="btn btn-secondary" onclick="viewService(${s.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="editService(${s.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-secondary" onclick="calculateRevenue(${s.id})"><i class="fas fa-calculator"></i></button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $$('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        filterServices(tab.getAttribute('data-tab'));
      });
    });

    $('#addServiceBtn')?.addEventListener('click', () => showAddServiceModal());
  }

  // --- ВОССТАНОВЛЕННЫЕ страницы из твоей логики app-10.js
  function loadPayments() {
    const totalCharged = (window.crmData.payments || []).reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const totalPaid = (window.crmData.payments || []).filter((p) => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const totalProcessing = (window.crmData.payments || []).filter((p) => p.status === 'processing').reduce((sum, p) => sum + Number(p.amount || 0), 0);

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Платежи</h2>
        <button class="btn btn-primary" id="addPaymentBtn"><i class="fas fa-plus"></i> Добавить платеж</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Начислено</h3><div class="stat-value">${money(totalCharged)} ₽</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Оплачено</h3><div class="stat-value">${money(totalPaid)} ₽</div><div class="stat-change">${totalCharged ? ((totalPaid / totalCharged) * 100).toFixed(1) : '0'}%</div></div>
        <div class="stat-card"><h3>В обработке</h3><div class="stat-value">${money(totalProcessing)} ₽</div><div class="stat-change"></div></div>
      </div>

      <div class="table-container">
        <div style="margin-bottom: 20px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary active" data-filter="all">Все</button>
          <button class="btn btn-secondary" data-filter="paid">Оплачено</button>
          <button class="btn btn-secondary" data-filter="processing">В обработке</button>
          <button class="btn btn-secondary" data-filter="charged">Начислено</button>
        </div>

        <table id="paymentsTable">
          <thead><tr><th>ID</th><th>Услуга</th><th>Сумма</th><th>Статус</th><th>Дата</th><th>Плательщик</th></tr></thead>
          <tbody>
            ${(window.crmData.payments || []).map((p) => {
              const service = (window.crmData.services || []).find((s) => s.id === p.serviceId);
              let statusClass = 'status-processing', statusText = 'Неизвестно';
              if (p.status === 'paid') { statusClass = 'status-paid'; statusText = 'Оплачено'; }
              else if (p.status === 'processing') { statusClass = 'status-processing'; statusText = 'В обработке'; }
              else if (p.status === 'charged') { statusClass = 'status-pending'; statusText = 'Начислено'; }
              return `<tr>
                <td>#${p.id}</td>
                <td>${esc(service ? service.name : 'Неизвестно')}</td>
                <td><strong>${money(p.amount)} ₽</strong></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${esc(p.date || '')}</td>
                <td>${esc(p.payer || '')}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#addPaymentBtn')?.addEventListener('click', () => {
      openModal('paymentModal');
      safe(populatePaymentForm, 'populatePaymentForm');
    });

    $$('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-filter]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        filterPayments(btn.getAttribute('data-filter'));
      });
    });
  }

  function loadContractors() {
    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Подрядчики</h2>
        <button class="btn btn-primary" id="addContractorBtn"><i class="fas fa-plus"></i> Добавить подрядчика</button>
      </div>

      <div class="table-container">
        <table>
          <thead><tr><th>Название</th><th>ИНН</th><th>Виды работ</th><th>Статус</th><th>Действия</th></tr></thead>
          <tbody>
            ${(window.crmData.contractors || []).map((c) => {
              let statusClass = 'status-processing';
              let statusText = c.status || '—';
              if (String(c.status).toLowerCase().includes('актив')) statusClass = 'status-paid';
              if (String(c.status).toLowerCase().includes('провер')) statusClass = 'status-pending';

              return `<tr>
                <td><strong>${esc(c.legalName)}</strong></td>
                <td>${esc(c.inn)}</td>
                <td>${esc((c.workTypes || []).join(', '))}</td>
                <td><span class="status-badge ${statusClass}">${esc(statusText)}</span></td>
                <td>
                  <button class="btn btn-secondary" onclick="viewContractor(${c.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="editContractor(${c.id})"><i class="fas fa-edit"></i></button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    $('#addContractorBtn')?.addEventListener('click', () => openModal('contractorModal'));
  }

  function loadDocuments() {
    const docs = window.crmData.documents || [];
    const totalDocuments = docs.length;
    const signedDocuments = docs.filter((d) => d.status === 'signed').length;
    const pendingDocuments = docs.filter((d) => d.status === 'pending').length;
    const contractsCount = docs.filter((d) => d.type === 'договор').length;

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Документы</h2>
        <button class="btn btn-primary" id="uploadDocumentBtn"><i class="fas fa-upload"></i> Загрузить</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card"><h3>Всего</h3><div class="stat-value">${totalDocuments}</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Подписаны</h3><div class="stat-value">${signedDocuments}</div><div class="stat-change">${totalDocuments ? ((signedDocuments / totalDocuments) * 100).toFixed(1) : '0'}%</div></div>
        <div class="stat-card"><h3>На подписании</h3><div class="stat-value">${pendingDocuments}</div><div class="stat-change"></div></div>
        <div class="stat-card"><h3>Договоров</h3><div class="stat-value">${contractsCount}</div><div class="stat-change"></div></div>
      </div>

      <div class="tabs" style="margin-bottom: 20px;">
        <button class="tab active" data-doc-filter="all">Все</button>
        <button class="tab" data-doc-filter="contracts">Договоры</button>
        <button class="tab" data-doc-filter="acts">Акты</button>
        <button class="tab" data-doc-filter="licenses">Лицензии</button>
        <button class="tab" data-doc-filter="reports">Отчеты</button>
        <button class="tab" data-doc-filter="signed">Подписанные</button>
        <button class="tab" data-doc-filter="pending">Ожидают</button>
      </div>

      <div style="margin-bottom: 20px; display:flex; gap:10px;">
        <input type="text" id="documentSearch" placeholder="Поиск по названию..." style="flex:1;padding:10px;border:1px solid var(--gray-200);border-radius:8px;">
        <button class="btn btn-secondary" id="documentSearchBtn"><i class="fas fa-search"></i></button>
      </div>

      <div class="table-container">
        <table id="documentsTable">
          <thead><tr><th>Название</th><th>Тип</th><th>Категория</th><th>Статус</th><th>Дата</th><th>Размер</th><th>Объект</th><th>Действия</th></tr></thead>
          <tbody id="documentsTableBody">
            ${docs.map((d) => {
              let statusClass = 'status-processing', statusText = 'В работе';
              if (d.status === 'signed') { statusClass = 'status-paid'; statusText = 'Подписан'; }
              if (d.status === 'pending') { statusClass = 'status-pending'; statusText = 'Ожидает'; }
              return `<tr>
                <td><strong>${esc(d.name)}</strong></td>
                <td>${esc(d.type)}</td>
                <td>${esc(d.category || '—')}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${esc(d.date || '')}</td>
                <td>${esc(d.size || '')}</td>
                <td>${d.entityId ? `Объект #${d.entityId}` : '—'}</td>
                <td>
                  <button class="btn btn-secondary" onclick="viewDocument(${d.id})"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-secondary" onclick="downloadDocument(${d.id})"><i class="fas fa-download"></i></button>
                  ${d.status === 'pending'
                    ? `<button class="btn btn-secondary" onclick="signDocument(${d.id})"><i class="fas fa-signature"></i></button>`
                    : ``}
                  <button class="btn btn-secondary" onclick="shareDocument(${d.id})"><i class="fas fa-share"></i></button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    // tabs filter
    $$('[data-doc-filter]').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('[data-doc-filter]').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        filterDocuments(tab.getAttribute('data-doc-filter'));
      });
    });

    $('#uploadDocumentBtn')?.addEventListener('click', () => showUploadDocumentModal());
    $('#documentSearchBtn')?.addEventListener('click', () => searchDocuments());
    $('#documentSearch')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchDocuments();
    });
  }

  function loadRequisites() {
    const company = window.crmData.currentCompany || {};
    const bank = (window.crmData.requisites || []).find((r) => r.type === 'bank');
    const electronic = (window.crmData.requisites || []).find((r) => r.type === 'electronic');

    area().innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Реквизиты для оплаты</h2>
        <button class="btn btn-primary" id="editRequisitesBtn"><i class="fas fa-edit"></i> Редактировать</button>
      </div>

      <div class="tabs" style="margin-bottom: 30px;">
        <button class="tab active" data-req-tab="bank">Банковские</button>
        <button class="tab" data-req-tab="electronic">Электронные</button>
        <button class="tab" data-req-tab="qr">QR</button>
        <button class="tab" data-req-tab="instructions">Инструкция</button>
      </div>

      <div id="requisitesContent">
        <div class="tab-content active" id="bankTab">
          <div style="max-width: 800px;">
            <h3 style="margin-bottom: 20px;">Банковские реквизиты</h3>
            <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div><div class="form-group"><label>Получатель</label><div class="form-control" style="background:white;">${esc(company.legalName || '')}</div></div></div>
                <div><div class="form-group"><label>ИНН</label><div class="form-control" style="background:white;">${esc(company.inn || '')}</div></div></div>
                <div><div class="form-group"><label>КПП</label><div class="form-control" style="background:white;">${esc(bank?.kpp || '—')}</div></div></div>
                <div><div class="form-group"><label>ОГРН</label><div class="form-control" style="background:white;">${esc(company.ogrn || '')}</div></div></div>
                <div><div class="form-group"><label>Банк</label><div class="form-control" style="background:white;">${esc(bank?.bankName || '—')}</div></div></div>
                <div><div class="form-group"><label>БИК</label><div class="form-control" style="background:white;">${esc(bank?.bik || '—')}</div></div></div>
                <div><div class="form-group"><label>Р/с</label><div class="form-control" style="background:white;">${esc(bank?.accountNumber || '—')}</div></div></div>
                <div><div class="form-group"><label>К/с</label><div class="form-control" style="background:white;">${esc(bank?.correspondentAccount || '—')}</div></div></div>
              </div>

              <h4 style="margin: 20px 0 10px;">Назначение платежа (пример)</h4>
              <p style="font-family: monospace; background: white; padding: 15px; border-radius: 8px;">
                Оплата ЖКУ за [месяц] [год], лицевой счет: [номер], ФИО: [Фамилия И.О.]
              </p>
            </div>
          </div>
        </div>

        <div class="tab-content" id="electronicTab">
          <div style="max-width: 800px;">
            <h3 style="margin-bottom: 20px;">Электронные способы оплаты</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
              <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-mobile-alt"></i> ${esc(electronic?.paymentSystem || 'СБП')}</h4>
                <div style="margin-top: 15px;">
                  <p><strong>Телефон:</strong></p>
                  <div class="form-control" style="background: white; margin-top: 5px;">${esc(electronic?.phone || company?.contacts?.phone || '')}</div>
                  <p style="margin-top: 15px; font-size: 14px; color: var(--gray-700);">
                    Укажите назначение платежа и лицевой счет, чтобы оплата зачислилась корректно.
                  </p>
                </div>
              </div>

              <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-envelope"></i> Email для квитанций</h4>
                <div style="margin-top: 15px;">
                  <p><strong>Email:</strong></p>
                  <div class="form-control" style="background: white; margin-top: 5px;">${esc(electronic?.email || company?.contacts?.email || '')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="qrTab">
          <div style="text-align:center; max-width: 600px; margin: 0 auto;">
            <h3 style="margin-bottom: 20px;">QR для быстрой оплаты</h3>
            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 30px;">
              <div style="width: 200px; height: 200px; background: #f0f0f0; margin: 0 auto 20px; display:flex; align-items:center; justify-content:center; border-radius: 8px;">
                <i class="fas fa-qrcode" style="font-size: 80px; color: var(--primary);"></i>
              </div>
              <h4>QR-код (демо)</h4>
              <p style="margin-top: 10px; color: var(--gray-700);">Отсканируйте код в приложении банка</p>
            </div>
          </div>
        </div>

        <div class="tab-content" id="instructionsTab">
          <div style="max-width: 800px;">
            <h3 style="margin-bottom: 20px;">Инструкция по оплате</h3>
            <ol style="padding-left: 20px;">
              <li>Выберите способ оплаты: банк/СБП/QR.</li>
              <li>Укажите назначение платежа и лицевой счет.</li>
              <li>Проверьте реквизиты перед оплатой.</li>
            </ol>
            <div style="margin-top: 20px; padding: 20px; background: var(--warning-light); border-radius: 12px; border-left: 4px solid var(--warning);">
              <h4><i class="fas fa-exclamation-triangle"></i> Важно</h4>
              <p style="margin-top: 10px;">При изменении реквизитов уведомляем жильцов по SMS и email.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // tabs behavior
    $$('[data-req-tab]').forEach((t) => {
      t.addEventListener('click', () => {
        $$('[data-req-tab]').forEach((x) => x.classList.remove('active'));
        t.classList.add('active');

        $$('#requisitesContent .tab-content').forEach((c) => c.classList.remove('active'));
        const name = t.getAttribute('data-req-tab');
        const map = { bank: '#bankTab', electronic: '#electronicTab', qr: '#qrTab', instructions: '#instructionsTab' };
        $(map[name])?.classList.add('active');
      });
    });

    $('#editRequisitesBtn')?.addEventListener('click', () => showEditRequisitesModal());
  }

  function loadProfile() {
    const c = window.crmData.currentCompany || {};
    area().innerHTML = `
      <div class="page-header"><h2 class="page-title">Профиль УК</h2></div>
      <div style="display:grid; grid-template-columns: 1fr 2fr; gap: 30px;">
        <div style="background: var(--gray-100); padding: 25px; border-radius: 12px;">
          <h3 style="margin-bottom: 15px;">Компания</h3>
          <p><strong>Название:</strong> ${esc(c.legalName || '—')}</p>
          <p><strong>ИНН:</strong> ${esc(c.inn || '—')}</p>
          <p><strong>ОГРН:</strong> ${esc(c.ogrn || '—')}</p>
          <p><strong>Регион:</strong> ${esc(c.region || '—')}</p>
        </div>
        <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
          <h3 style="margin-bottom: 15px;">Контакты</h3>
          <p><strong>Телефон:</strong> ${esc(c?.contacts?.phone || '—')}</p>
          <p><strong>Email:</strong> ${esc(c?.contacts?.email || '—')}</p>
          <p><strong>Адрес:</strong> ${esc(c?.contacts?.address || '—')}</p>
        </div>
      </div>
    `;
  }

  const routes = {
    dashboard: loadDashboard,
    buildings: loadBuildings,
    residents: loadResidents,
    tickets: loadTickets,
    services: loadServices,
    payments: loadPayments,
    contractors: loadContractors,
    documents: loadDocuments,
    requisites: loadRequisites,
    profile: loadProfile,
  };

  // ---------------- Filtering ----------------
  window.filterResidents = function (filter) {
    const rows = $$('#residentsTableBody tr');
    rows.forEach((row) => {
      const statusText = row.cells[6]?.textContent?.trim() || '';
      const balanceText = row.cells[5]?.textContent?.trim() || '';
      let show = true;

      switch (filter) {
        case 'active': show = statusText.includes('Актив'); break;
        case 'inactive': show = statusText.includes('Неактив'); break;
        case 'debtors': show = balanceText.includes('-'); break;
        case 'no-debt': show = !balanceText.includes('-'); break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.filterTickets = function (filter) {
    const rows = $$('#ticketsTableBody tr');
    rows.forEach((row) => {
      const statusText = row.cells[5]?.textContent?.toLowerCase() || '';
      const priorityText = row.cells[4]?.textContent?.toLowerCase() || '';
      let show = true;

      switch (filter) {
        case 'open': show = statusText.includes('откры'); break;
        case 'inprogress': show = statusText.includes('работ'); break;
        case 'resolved': show = statusText.includes('реш'); break;
        case 'high': show = priorityText.includes('высок'); break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.filterServices = function (filter) {
    const rows = $$('#servicesTableBody tr');
    rows.forEach((row) => {
      const typeText = row.cells[1]?.textContent?.toLowerCase() || '';
      const periodText = row.cells[3]?.textContent?.toLowerCase() || '';
      let show = true;

      switch (filter) {
        case 'main': show = typeText.includes('основ'); break;
        case 'additional': show = typeText.includes('доп'); break;
        case 'monthly': show = periodText.includes('ежем'); break;
        case 'ondemand': show = periodText.includes('треб'); break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.filterPayments = function (filter) {
    const rows = $$('#paymentsTable tbody tr');
    rows.forEach((row) => {
      const badge = row.querySelector('.status-badge');
      const text = badge?.textContent?.toLowerCase() || '';
      let status = 'other';
      if (text.includes('оплач')) status = 'paid';
      else if (text.includes('обработ')) status = 'processing';
      else if (text.includes('начис')) status = 'charged';

      row.style.display = (filter === 'all' || filter === status) ? '' : 'none';
    });
  };

  window.filterDocuments = function (filter) {
    const rows = $$('#documentsTableBody tr');
    rows.forEach((row) => {
      const type = row.cells[1]?.textContent?.toLowerCase() || '';
      const category = row.cells[2]?.textContent?.toLowerCase() || '';
      const status = row.cells[3]?.textContent?.toLowerCase() || '';

      let show = true;
      switch (filter) {
        case 'contracts': show = type.includes('договор') || category.includes('contracts'); break;
        case 'acts': show = type.includes('акт') || category.includes('acts'); break;
        case 'licenses': show = type.includes('лиценз') || category.includes('licenses'); break;
        case 'reports': show = type.includes('отчет') || category.includes('reports'); break;
        case 'signed': show = status.includes('подпис'); break;
        case 'pending': show = status.includes('ожида'); break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.searchDocuments = function () {
    const term = ($('#documentSearch')?.value || '').toLowerCase();
    const rows = $$('#documentsTableBody tr');
    rows.forEach((row) => {
      const name = row.cells[0]?.textContent?.toLowerCase() || '';
      row.style.display = name.includes(term) ? '' : 'none';
    });
  };

  // ---------------- Modals (минимально) ---------------
  function openModal(id) { document.getElementById(id)?.classList.add('active'); }
  function closeAllModals() { $$('.modal').forEach((m) => m.classList.remove('active')); }

  function setupModals() {
    $$('.close-modal').forEach((btn) => btn.addEventListener('click', closeAllModals));
    $$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) closeAllModals(); }));

    const bind = (id, handler) => {
      const f = document.getElementById(id);
      if (!f) return;
      f.addEventListener('submit', (e) => { e.preventDefault(); safe(handler, `form:${id}`); });
    };

    bind('buildingForm', saveBuilding);
    bind('residentForm', saveResident);
    bind('ticketForm', saveTicket);
    bind('serviceForm', saveService);
    bind('paymentForm', savePayment);
    bind('contractorForm', saveContractor);
    bind('documentForm', saveDocument);
    bind('requisitesForm', saveRequisites);
  }

  // ---------------- Save handlers ----------------
  function saveBuilding() {
    const address = $('#buildingAddress')?.value?.trim();
    if (!address) return alert('Укажите адрес дома');

    const floors = parseInt($('#buildingFloors')?.value || '0', 10);
    const apartments = parseInt($('#buildingApartments')?.value || '0', 10);

    const risksSelect = $('#buildingRisks');
    const risks = risksSelect ? Array.from(risksSelect.selectedOptions).map((o) => o.value) : [];

    const nextId = Math.max(0, ...(window.crmData.buildings || []).map((b) => b.id)) + 1;
    window.crmData.buildings.push({ id: nextId, address, floors, apartments, risks, passport: { elevators: [], itp: { type: '', year: new Date().getFullYear() } } });
    persist();

    closeAllModals();
    loadBuildings();
  }

  function saveResident() {
    const name = $('#residentName')?.value?.trim();
    const apartment = $('#residentApartment')?.value?.trim();
    const buildingId = parseInt($('#residentBuilding')?.value || '', 10);
    if (!name || !apartment || !buildingId) return alert('Заполните ФИО, Дом и Квартиру');

    const phone = $('#residentPhone')?.value?.trim() || '';
    const email = $('#residentEmail')?.value?.trim() || '';
    const residentsCount = parseInt($('#residentCount')?.value || '1', 10);
    const status = $('#residentStatus')?.value || 'active';

    const nextId = Math.max(0, ...(window.crmData.residents || []).map((r) => r.id)) + 1;
    window.crmData.residents.push({ id: nextId, name, apartment, buildingId, phone, email, status, balance: 0, residentsCount });
    persist();

    closeAllModals();
    loadResidents();
  }

  function saveTicket() {
    const title = $('#ticketTitle')?.value?.trim();
    const description = $('#ticketDescription')?.value?.trim();
    const type = $('#ticketType')?.value || '';
    const priority = $('#ticketPriority')?.value || 'medium';
    const buildingId = parseInt($('#ticketBuilding')?.value || '', 10);
    const residentId = parseInt($('#ticketResident')?.value || '0', 10);
    const assignedTo = $('#ticketAssignee')?.value || '';

    if (!title || !description || !buildingId) return alert('Заполните тему, описание и дом');

    const nextId = Math.max(0, ...(window.crmData.tickets || []).map((t) => t.id)) + 1;
    const today = new Date().toISOString().split('T')[0];

    window.crmData.tickets.push({
      id: nextId,
      title,
      description,
      type,
      priority,
      buildingId,
      residentId: residentId || null,
      assignedTo,
      status: 'open',
      createdAt: today,
      updatedAt: today,
    });
    persist();

    closeAllModals();
    loadTickets();
  }

  function saveService() {
    const name = $('#serviceName')?.value?.trim();
    const type = $('#serviceType')?.value || 'main';
    const tariff = parseFloat($('#serviceTariff')?.value || '');
    const period = $('#servicePeriod')?.value || 'monthly';
    const buildingId = parseInt($('#serviceBuilding')?.value || '', 10);
    const contractorId = parseInt($('#serviceContractor')?.value || '0', 10);
    const sla = $('#serviceSLA')?.value || '';
    const description = $('#serviceDescription')?.value || '';

    if (!name || !Number.isFinite(tariff) || !buildingId) return alert('Заполните услугу, тариф и дом');

    const nextId = Math.max(0, ...(window.crmData.services || []).map((s) => s.id)) + 1;
    window.crmData.services.push({ id: nextId, name, type, tariff, period, buildingId, contractorId: contractorId || null, sla, description });
    persist();

    closeAllModals();
    loadServices();
  }

  function savePayment() {
    const serviceId = parseInt($('#paymentService')?.value || '', 10);
    const buildingId = parseInt($('#paymentBuilding')?.value || '0', 10); // может быть не нужен, но оставим
    const amount = parseFloat($('#paymentAmount')?.value || '');
    const date = $('#paymentDate')?.value || new Date().toISOString().split('T')[0];

    if (!serviceId || !Number.isFinite(amount)) return alert('Заполните услугу и сумму');

    const nextId = Math.max(0, ...(window.crmData.payments || []).map((p) => p.id)) + 1;
    window.crmData.payments.push({
      id: nextId,
      serviceId,
      buildingId: buildingId || null,
      amount,
      status: 'charged',
      date,
      payer: window.crmData.currentCompany?.legalName || '',
    });
    persist();

    closeAllModals();
    loadPayments();
  }

  function saveContractor() { closeAllModals(); alert('Демо: сохранение подрядчика не реализовано полностью'); }
  function saveDocument() { closeAllModals(); alert('Демо: загрузка документа не реализована полностью'); }
  function saveRequisites() { closeAllModals(); alert('Демо: сохранение реквизитов не реализовано полностью'); }

  // ---------------- Populate forms ----------------
  function populatePaymentForm() {
    const serviceSelect = $('#paymentService');
    const buildingSelect = $('#paymentBuilding');
    if (serviceSelect) {
      serviceSelect.innerHTML = `<option value="">Выберите услугу</option>`;
      (window.crmData.services || []).forEach((s) => {
        const o = document.createElement('option');
        o.value = String(s.id);
        o.textContent = `${s.name} — ${money(s.tariff)} ₽`;
        serviceSelect.appendChild(o);
      });
    }
    if (buildingSelect) {
      buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
      (window.crmData.buildings || []).forEach((b) => {
        const o = document.createElement('option');
        o.value = String(b.id);
        o.textContent = b.address;
        buildingSelect.appendChild(o);
      });
    }
    const dateEl = $('#paymentDate');
    if (dateEl && dateEl.type === 'date') dateEl.valueAsDate = new Date();
  }

  function populateResidentForm() {
    const sel = $('#residentBuilding');
    if (!sel) return;
    sel.innerHTML = `<option value="">Выберите дом</option>`;
    (window.crmData.buildings || []).forEach((b) => {
      const o = document.createElement('option');
      o.value = String(b.id);
      o.textContent = b.address;
      sel.appendChild(o);
    });
  }

  function populateTicketForm() {
    const buildingSelect = $('#ticketBuilding');
    const residentSelect = $('#ticketResident');
    const assigneeSelect = $('#ticketAssignee');

    if (buildingSelect) {
      buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
      (window.crmData.buildings || []).forEach((b) => {
        const o = document.createElement('option');
        o.value = String(b.id);
        o.textContent = b.address;
        buildingSelect.appendChild(o);
      });
    }
    if (residentSelect) {
      residentSelect.innerHTML = `<option value="">Выберите жильца</option>`;
      (window.crmData.residents || []).forEach((r) => {
        const o = document.createElement('option');
        o.value = String(r.id);
        o.textContent = `${r.name} (кв. ${r.apartment})`;
        residentSelect.appendChild(o);
      });
    }
    if (assigneeSelect) {
      assigneeSelect.innerHTML = `<option value="">Выберите ответственного</option>`;
      (window.crmData.users || []).forEach((u) => {
        const o = document.createElement('option');
        o.value = u.name;
        o.textContent = u.name;
        assigneeSelect.appendChild(o);
      });
    }
  }

  function populateServiceForm() {
    const buildingSelect = $('#serviceBuilding');
    const contractorSelect = $('#serviceContractor');

    if (buildingSelect) {
      buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
      (window.crmData.buildings || []).forEach((b) => {
        const o = document.createElement('option');
        o.value = String(b.id);
        o.textContent = b.address;
        buildingSelect.appendChild(o);
      });
    }
    if (contractorSelect) {
      contractorSelect.innerHTML = `<option value="">Выберите подрядчика</option>`;
      (window.crmData.contractors || []).forEach((c) => {
        const o = document.createElement('option');
        o.value = String(c.id);
        o.textContent = c.legalName;
        contractorSelect.appendChild(o);
      });
    }
  }

  // ---------------- UI actions / stubs ----------------
  window.viewBuilding = (id) => alert(`Демо: просмотр дома #${id}`);
  window.editBuilding = (id) => alert(`Демо: редактирование дома #${id}`);
  window.deleteBuilding = (id) => alert(`Демо: удаление дома #${id}`);

  window.viewResident = (id) => alert(`Демо: карточка жильца #${id}`);
  window.editResident = (id) => alert(`Демо: редактирование жильца #${id}`);
  window.sendNotificationToResident = (id) => alert(`Демо: уведомление жильцу #${id}`);

  window.viewTicket = (id) => alert(`Демо: карточка обращения #${id}`);
  window.assignTicket = (id) => alert(`Демо: назначить ответственного #${id}`);
  window.closeTicket = (id) => alert(`Демо: закрыть обращение #${id}`);

  window.viewService = (id) => alert(`Демо: карточка услуги #${id}`);
  window.editService = (id) => alert(`Демо: редактирование услуги #${id}`);
  window.calculateRevenue = (id) => alert(`Демо: расчет выручки по услуге #${id}`);

  window.viewContractor = (id) => alert(`Демо: карточка подрядчика #${id}`);
  window.editContractor = (id) => alert(`Демо: редактирование подрядчика #${id}`);

  window.viewDocument = (id) => alert(`Демо: просмотр документа #${id}`);
  window.downloadDocument = (id) => alert(`Демо: скачать документ #${id}`);
  window.signDocument = (id) => alert(`Демо: подписать документ #${id}`);
  window.shareDocument = (id) => alert(`Демо: поделиться документом #${id}`);

  window.showAddResidentModal = () => { populateResidentForm(); openModal('residentModal'); };
  window.showCreateTicketModal = () => { populateTicketForm(); openModal('ticketModal'); };
  window.showAddServiceModal = () => { populateServiceForm(); openModal('serviceModal'); };
  window.showUploadDocumentModal = () => alert('Демо: загрузка документа (модалка) не подключена');
  window.showEditRequisitesModal = () => alert('Демо: редактирование реквизитов (модалка) не подключено');

  // ---------------- Boot ----------------
  document.addEventListener('DOMContentLoaded', () => {
    safe(() => {
      const el = $('#current-date');
      if (el) el.textContent = new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, 'date');

    safe(initData, 'initData');
    safe(setupNavigation, 'setupNavigation');
    safe(setupModals, 'setupModals');

    safe(() => loadPage('dashboard'), 'loadPage:dashboard');

    window.addEventListener('resize', () => {
      if (window.__dashboardChart && typeof window.__dashboardChart.resize === 'function') window.__dashboardChart.resize();
    });
  });
})();
