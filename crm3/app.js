/* app.js - xHouse CRM (переписано)
   Цели:
   - 100% рабочая навигация сайдбара (включая Жильцы/Обращения/Услуги)
   - устойчивость к ошибкам (страница не должна ломать весь JS)
   - нормальный график на Аналитике (без бесконечного растягивания)
*/
(function () {
  'use strict';

  // --------------------------
  // Utils
  // --------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const safe = (fn, label = 'safe') => {
    try {
      return fn();
    } catch (e) {
      console.error(`[${label}]`, e);
      return undefined;
    }
  };

  const toMoney = (n) => {
    const v = Number(n || 0);
    return v.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
  };

  const escapeHtml = (s) =>
    String(s ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const normalizeTicketStatus = (status) => {
    const s = String(status || '').trim().toLowerCase();
    if (s === 'open') return 'open';
    if (s === 'resolved' || s === 'closed') return 'resolved';
    if (s === 'inprogress' || s === 'in_progress' || s === 'in progress' || s === 'in-progress') return 'inprogress';
    return 'open';
  };

  const ensureContentArea = () => {
    const area = $('#content-area');
    if (!area) throw new Error('Не найден #content-area');
    return area;
  };

  // --------------------------
  // Data
  // --------------------------
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
        {
          id: 1,
          address: "ул. Ленина, д. 15",
          floors: 9,
          apartments: 72,
          risks: ["electrical", "elevator"],
          passport: { elevators: ["Пассажирский №1 - 2005г", "Грузовой - 2005г"], itp: { type: "Индивидуальный", year: 2010 } },
        },
        {
          id: 2,
          address: "пр. Победы, д. 42",
          floors: 5,
          apartments: 40,
          risks: ["roof"],
          passport: { elevators: [], itp: { type: "Центральный", year: 2008 } },
        },
        {
          id: 3,
          address: "ул. Садовая, д. 7",
          floors: 12,
          apartments: 96,
          risks: [],
          passport: { elevators: ["Пассажирский №1 - 2015г", "Пассажирский №2 - 2015г"], itp: { type: "Индивидуальный", year: 2015 } },
        },
      ],
      residents: [
        { id: 1, name: "Иванов Иван Иванович", apartment: "15", buildingId: 1, phone: "+7 (916) 123-45-67", email: "ivanov@mail.ru", status: "active", balance: 1500.5, residentsCount: 3 },
        { id: 2, name: "Петрова Мария Сергеевна", apartment: "42", buildingId: 1, phone: "+7 (916) 234-56-78", email: "petrova@mail.ru", status: "active", balance: -2300.75, residentsCount: 2 },
        { id: 3, name: "Сидоров Алексей Петрович", apartment: "7", buildingId: 2, phone: "+7 (916) 345-67-89", email: "sidorov@mail.ru", status: "inactive", balance: 0, residentsCount: 1 },
        { id: 4, name: "Козлова Елена Владимировна", apartment: "23", buildingId: 3, phone: "+7 (916) 456-78-90", email: "kozlova@mail.ru", status: "active", balance: 5000.25, residentsCount: 4 },
      ],
      tickets: [
        { id: 1, residentId: 1, buildingId: 1, type: "ремонт", title: "Протечка в ванной комнате", description: "Сильная протечка из потолка в ванной комнате", status: "open", priority: "high", createdAt: "2024-08-01", updatedAt: "2024-08-02", assignedTo: "Дмитрий К." },
        { id: 2, residentId: 2, buildingId: 1, type: "электрика", title: "Не работает розетка на кухне", description: "Розетка перестала работать после грозы", status: "inprogress", priority: "medium", createdAt: "2024-08-03", updatedAt: "2024-08-04", assignedTo: "Дмитрий К." },
        { id: 3, residentId: 4, buildingId: 3, type: "уборка", title: "Не убран мусор в подъезде", description: "Мусор не вывозится уже 3 дня", status: "resolved", priority: "low", createdAt: "2024-07-28", updatedAt: "2024-07-30", assignedTo: "Алексей М." },
        { id: 4, residentId: 3, buildingId: 2, type: "отопление", title: "Холодные батареи", description: "В квартире холодно, батареи еле теплые", status: "open", priority: "high", createdAt: "2024-08-05", updatedAt: "2024-08-05", assignedTo: "Дмитрий К." },
      ],
      services: [
        { id: 1, name: "Содержание общего имущества", type: "main", tariff: 25.5, period: "monthly", buildingId: 1, contractorId: 1, sla: "24/7", description: "Уборка подъездов, обслуживание лифтов, ремонт общедомового оборудования" },
        { id: 2, name: "Вывоз ТКО", type: "main", tariff: 15.3, period: "monthly", buildingId: 1, contractorId: 2, sla: "ежедневно", description: "Вывоз твердых коммунальных отходов" },
        { id: 3, name: "Ремонт лифтового оборудования", type: "additional", tariff: 1200.0, period: "on-demand", buildingId: 1, contractorId: 3, sla: "4 часа", description: "Экстренный и плановый ремонт лифтов" },
        { id: 4, name: "Техническое обслуживание ИТП", type: "main", tariff: 18.75, period: "monthly", buildingId: 3, contractorId: 1, sla: "24 часа", description: "Обслуживание индивидуального теплового пункта" },
      ],
      contractors: [
        { id: 1, legalName: "ООО 'Сервис Плюс'", inn: "7712345678", workTypes: ["уборка территории", "текущий ремонт"], bankDetails: "АО 'Альфа-Банк' р/с 40702810123450001234", status: "активен" },
        { id: 2, legalName: "ООО 'Эко-Транс'", inn: "7723456789", workTypes: ["вывоз ТКО", "утилизация"], bankDetails: "ПАО 'Сбербанк' р/с 40702810234560002345", status: "активен" },
        { id: 3, legalName: "ООО 'Лифт-Сервис'", inn: "7734567890", workTypes: ["ремонт лифтов", "техническое обслуживание"], bankDetails: "АО 'Тинькофф Банк' р/с 40702810345670003456", status: "на проверке" },
      ],
      payments: [
        { id: 1, serviceId: 1, amount: 1836.0, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" },
        { id: 2, serviceId: 2, amount: 1101.6, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" },
        { id: 3, serviceId: 3, amount: 1200.0, status: "processing", date: "2024-08-15", payer: "ООО 'УК Профи'" },
        { id: 4, serviceId: 1, amount: 1836.0, status: "charged", date: "2024-09-01", payer: "ООО 'УК Профи'" },
      ],
      documents: [],
      requisites: [
        { id: 1, type: "bank", bankName: "ПАО 'Сбербанк'", accountNumber: "40702810123450001234", correspondentAccount: "30101810400000000225", bik: "044525225", inn: "7701234567", kpp: "770101001" },
        { id: 2, type: "electronic", paymentSystem: "Qiwi", phone: "+7 (495) 123-45-67", email: "payments@uk-profi.ru", qrCode: "" },
      ],
      users: [
        { id: 1, name: "Алексей М.", role: "manager", permissions: "all" },
        { id: 2, name: "Ирина С.", role: "accountant", permissions: "payments,documents" },
        { id: 3, name: "Дмитрий К.", role: "engineer", permissions: "buildings,services" },
      ],
    };
  }

  function initializeData() {
    const stored = localStorage.getItem('crmData');
    if (!stored) {
      window.crmData = seedData();
      localStorage.setItem('crmData', JSON.stringify(window.crmData));
      return;
    }
    try {
      window.crmData = JSON.parse(stored);
    } catch (e) {
      console.warn('crmData corrupted, reseed', e);
      window.crmData = seedData();
      localStorage.setItem('crmData', JSON.stringify(window.crmData));
    }
  }

  // --------------------------
  // Navigation / Router
  // --------------------------
  const PAGES = new Set([
    'dashboard',
    'buildings',
    'residents',
    'tickets',
    'services',
    'payments',
    'contractors',
    'documents',
    'requisites',
    'profile',
  ]);

  function setActiveNav(pageName) {
    $$('.nav-link').forEach((a) => {
      const p = a.getAttribute('data-page');
      a.classList.toggle('active', p === pageName);
    });
  }

  function loadPage(pageName) {
    const page = PAGES.has(pageName) ? pageName : 'dashboard';
    setActiveNav(page);

    const area = ensureContentArea();
    area.innerHTML = `<div class="loading">Загрузка...</div>`;

    // небольшой async для UX + чтобы кнопки успели "отпустить" event loop
    setTimeout(() => {
      safe(() => {
        switch (page) {
          case 'dashboard': return loadDashboard();
          case 'buildings': return loadBuildings();
          case 'residents': return loadResidents();
          case 'tickets': return loadTickets();
          case 'services': return loadServices();
          case 'payments': return loadPayments();
          case 'contractors': return loadContractors();
          case 'documents': return loadDocuments();
          case 'requisites': return loadRequisites();
          case 'profile': return loadProfile();
          default: return loadDashboard();
        }
      }, `loadPage:${page}`);
    }, 120);
  }

  function setupNavigation() {
    // Делегирование: клики по .nav-link ловим на документе
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link) return;

      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (!page) return;
      loadPage(page);
    });
  }

  // --------------------------
  // Dashboard (Analytics)
  // --------------------------
  function destroyAnalyticsChart() {
    if (window.__analyticsChart && typeof window.__analyticsChart.destroy === 'function') {
      window.__analyticsChart.destroy();
    }
    window.__analyticsChart = null;
  }

  function renderAnalyticsChart() {
    const canvas = $('#analyticsChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded');
      return;
    }

    // фикс: чтобы не плодить инстансы при повторной загрузке страницы
    destroyAnalyticsChart();

    const ctx = canvas.getContext('2d');

    // Пример данных (можешь заменить на реальные)
    const labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг'];
    const charged = [1850000, 1920000, 1980000, 2050000, 2150000, 2250000, 2350000, 2450780];
    const paid = [1650000, 1720000, 1780000, 1850000, 1950000, 2050000, 2150000, 1890540];

    window.__analyticsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Начислено, ₽',
            data: charged,
            borderColor: '#6912FF',
            backgroundColor: 'rgba(105, 18, 255, 0.10)',
            tension: 0.3,
            fill: true,
            pointRadius: 3,
          },
          {
            label: 'Оплачено, ₽',
            data: paid,
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
        // Ключевой фикс "расплывания":
        // график подстраивается под высоту родителя (.chart-wrap), а не пытается соблюдать пропорции.
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Финансовая динамика (пример)' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString('ru-RU')} ₽`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => Number(value).toLocaleString('ru-RU'),
            },
          },
        },
      },
    });
  }

  // --------------------------
  // Pages
  // --------------------------
  function loadDashboard() {
    const area = ensureContentArea();

    const totalCharged = (window.crmData.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalPaid = (window.crmData.payments || []).filter((p) => p.status === 'paid').reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalProcessing = (window.crmData.payments || []).filter((p) => p.status === 'processing').reduce((s, p) => s + Number(p.amount || 0), 0);

    const activeTickets = (window.crmData.tickets || []).filter((t) => {
      const st = normalizeTicketStatus(t.status);
      return st === 'open' || st === 'inprogress';
    }).length;

    const resolvedTickets = (window.crmData.tickets || []).filter((t) => normalizeTicketStatus(t.status) === 'resolved').length;

    area.innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Аналитика</h2>
        <div class="date-range">
          <button class="btn btn-secondary"><i class="fas fa-calendar-alt"></i> 2024</button>
        </div>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>Начислено</h3>
          <div class="stat-value">${toMoney(totalCharged)} ₽</div>
          <div class="stat-change">+12.5%</div>
        </div>
        <div class="stat-card">
          <h3>Оплачено</h3>
          <div class="stat-value">${toMoney(totalPaid)} ₽</div>
          <div class="stat-change">+8.3%</div>
        </div>
        <div class="stat-card">
          <h3>Дома</h3>
          <div class="stat-value">${(window.crmData.buildings || []).length}</div>
          <div class="stat-change">+2</div>
        </div>
        <div class="stat-card">
          <h3>Активные обращения</h3>
          <div class="stat-value">${activeTickets}</div>
          <div class="stat-change">Решено: ${resolvedTickets}</div>
        </div>
      </div>

      <style>
        /* Фикс "расплывания" графика: у контейнера фиксированная высота */
        .chart-wrap{
          height: 360px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 16px;
          box-sizing: border-box;
        }
        .chart-wrap canvas{ width: 100% !important; height: 100% !important; display:block; }
      </style>

      <div class="chart-wrap" style="margin-bottom: 30px;">
        <canvas id="analyticsChart"></canvas>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Дом</th>
              <th>Квартир</th>
              <th>Начислено (оценка)</th>
              <th>Оплачено (оценка)</th>
              <th>Долг (оценка)</th>
            </tr>
          </thead>
          <tbody>
            ${(window.crmData.buildings || [])
              .map((b) => {
                const charged = Number(b.apartments || 0) * 1500;
                const paid = Number(b.apartments || 0) * 1350;
                const debt = charged - paid;
                return `
                  <tr>
                    <td>${escapeHtml(b.address)}</td>
                    <td>${Number(b.apartments || 0)}</td>
                    <td>${toMoney(charged)} ₽</td>
                    <td>${toMoney(paid)} ₽</td>
                    <td>${toMoney(debt)} ₽</td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    // Рендер графика после вставки DOM
    renderAnalyticsChart();
  }

  function loadBuildings() {
    const area = ensureContentArea();
    area.innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Дома</h2>
        <button class="btn btn-primary" id="addBuildingBtn"><i class="fas fa-plus"></i> Добавить дом</button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Адрес</th><th>Этажей</th><th>Квартир</th><th>Риски</th><th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${(window.crmData.buildings || [])
              .map((b) => {
                const risks = (b.risks || []).length
                  ? (b.risks || [])
                      .map((r) => {
                        let cls = 'risk-low', text = r;
                        if (r === 'electrical') { cls = 'risk-high'; text = 'Старая проводка'; }
                        else if (r === 'roof') { cls = 'risk-medium'; text = 'Крыша'; }
                        else if (r === 'elevator') { cls = 'risk-high'; text = 'Лифт'; }
                        else if (r === 'plumbing') { cls = 'risk-medium'; text = 'Водопровод'; }
                        return `<span class="risk-flag ${cls}">${text}</span>`;
                      })
                      .join('<br>')
                  : `<span class="risk-flag risk-low">Нет</span>`;

                return `
                  <tr>
                    <td><strong>${escapeHtml(b.address)}</strong></td>
                    <td>${Number(b.floors || 0)}</td>
                    <td>${Number(b.apartments || 0)}</td>
                    <td>${risks}</td>
                    <td>
                      <button class="btn btn-secondary" onclick="viewBuilding(${b.id})"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-secondary" onclick="editBuilding(${b.id})"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-secondary" onclick="deleteBuilding(${b.id})"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    const btn = $('#addBuildingBtn');
    if (btn) btn.addEventListener('click', () => openModal('buildingModal'));
  }

  // --- Гарантируем, что Жильцы точно открываются
  function loadResidents() {
    const area = ensureContentArea();

    const totalResidents = (window.crmData.residents || []).length;
    const activeResidents = (window.crmData.residents || []).filter((r) => r.status === 'active').length;
    const debtors = (window.crmData.residents || []).filter((r) => Number(r.balance || 0) < 0).length;
    const totalDebt = (window.crmData.residents || [])
      .filter((r) => Number(r.balance || 0) < 0)
      .reduce((s, r) => s + Math.abs(Number(r.balance || 0)), 0);

    area.innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Жильцы</h2>
        <button class="btn btn-primary" id="addResidentBtn"><i class="fas fa-plus"></i> Добавить жильца</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>Всего жильцов</h3>
          <div class="stat-value">${totalResidents}</div>
          <div class="stat-change">Домов: ${(window.crmData.buildings || []).length}</div>
        </div>
        <div class="stat-card">
          <h3>Активные</h3>
          <div class="stat-value">${activeResidents}</div>
          <div class="stat-change">${totalResidents ? ((activeResidents / totalResidents) * 100).toFixed(1) : '0.0'}%</div>
        </div>
        <div class="stat-card">
          <h3>Должники</h3>
          <div class="stat-value">${debtors}</div>
          <div class="stat-change">${toMoney(totalDebt)} ₽</div>
        </div>
        <div class="stat-card">
          <h3>Средний долг</h3>
          <div class="stat-value">${debtors ? toMoney(totalDebt / debtors) : '0'} ₽</div>
          <div class="stat-change">на должника</div>
        </div>
      </div>

      <div class="table-container">
        <div style="margin-bottom: 20px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-secondary" data-res-filter="all">Все</button>
          <button class="btn btn-secondary" data-res-filter="active">Активные</button>
          <button class="btn btn-secondary" data-res-filter="inactive">Неактивные</button>
          <button class="btn btn-secondary" data-res-filter="debtors">Должники</button>
          <button class="btn btn-secondary" data-res-filter="no-debt">Без долга</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ФИО</th><th>Дом</th><th>Кв.</th><th>Телефон</th><th>Email</th><th>Баланс</th><th>Статус</th><th>Действия</th>
            </tr>
          </thead>
          <tbody id="residentsTableBody">
            ${(window.crmData.residents || [])
              .map((r) => {
                const b = (window.crmData.buildings || []).find((x) => x.id === r.buildingId);
                const buildingName = b ? b.address : '—';

                const bal = Number(r.balance || 0);
                const balanceClass = bal < 0 ? 'status-pending' : 'status-paid';
                const statusClass = r.status === 'active' ? 'status-paid' : 'status-processing';

                return `
                  <tr data-status="${escapeHtml(r.status)}" data-balance="${bal}">
                    <td><strong>${escapeHtml(r.name)}</strong></td>
                    <td>${escapeHtml(buildingName)}</td>
                    <td>${escapeHtml(r.apartment)}</td>
                    <td>${escapeHtml(r.phone || '')}</td>
                    <td>${escapeHtml(r.email || '')}</td>
                    <td><span class="status-badge ${balanceClass}">${toMoney(bal)} ₽</span></td>
                    <td><span class="status-badge ${statusClass}">${r.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
                    <td>
                      <button class="btn btn-secondary" onclick="viewResident(${r.id})"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-secondary" onclick="editResident(${r.id})"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-secondary" onclick="sendNotificationToResident(${r.id})"><i class="fas fa-bell"></i></button>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    const addBtn = $('#addResidentBtn');
    if (addBtn) addBtn.addEventListener('click', () => showAddResidentModal());

    // Фильтры (устойчивые, без onclick в HTML)
    $$('[data-res-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-res-filter');
        filterResidents(f);
        $$('[data-res-filter]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    // по умолчанию выделим "Все"
    const first = $('[data-res-filter="all"]');
    if (first) first.classList.add('active');
  }

  // --- Гарантируем, что Обращения точно открываются
  function loadTickets() {
    const area = ensureContentArea();

    const tickets = window.crmData.tickets || [];
    const totalTickets = tickets.length;
    const openTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'open').length;
    const inProgressTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'inprogress').length;
    const resolvedTickets = tickets.filter((t) => normalizeTicketStatus(t.status) === 'resolved').length;

    area.innerHTML = `
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
          <button class="btn btn-secondary" data-ticket-filter="all">Все</button>
          <button class="btn btn-secondary" data-ticket-filter="open">Открытые</button>
          <button class="btn btn-secondary" data-ticket-filter="inprogress">В работе</button>
          <button class="btn btn-secondary" data-ticket-filter="resolved">Решено</button>
          <button class="btn btn-secondary" data-ticket-filter="high">Высокий приоритет</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Тема</th><th>Жилец</th><th>Тип</th><th>Приоритет</th><th>Статус</th><th>Создано</th><th>Ответственный</th><th>Действия</th>
            </tr>
          </thead>
          <tbody id="ticketsTableBody">
            ${tickets.length
              ? tickets
                  .map((t) => {
                    const resident = (window.crmData.residents || []).find((r) => r.id === t.residentId);
                    const residentName = resident ? resident.name : '—';

                    let priorityClass = 'risk-low', priorityText = 'Низкий';
                    if (t.priority === 'high') { priorityClass = 'risk-high'; priorityText = 'Высокий'; }
                    else if (t.priority === 'medium') { priorityClass = 'risk-medium'; priorityText = 'Средний'; }

                    const st = normalizeTicketStatus(t.status);
                    let statusClass = 'status-pending', statusText = 'Открыто';
                    if (st === 'inprogress') { statusClass = 'status-processing'; statusText = 'В работе'; }
                    if (st === 'resolved') { statusClass = 'status-paid'; statusText = 'Решено'; }

                    return `
                      <tr data-status="${st}" data-priority="${escapeHtml(t.priority)}">
                        <td>#${t.id}</td>
                        <td><strong>${escapeHtml(t.title)}</strong></td>
                        <td>${escapeHtml(residentName)}</td>
                        <td>${escapeHtml(t.type)}</td>
                        <td><span class="status-badge ${priorityClass}">${priorityText}</span></td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${escapeHtml(t.createdAt)}</td>
                        <td>${escapeHtml(t.assignedTo || '—')}</td>
                        <td>
                          <button class="btn btn-secondary" onclick="viewTicket(${t.id})"><i class="fas fa-eye"></i></button>
                          <button class="btn btn-secondary" onclick="assignTicket(${t.id})"><i class="fas fa-user-check"></i></button>
                          <button class="btn btn-secondary" onclick="closeTicket(${t.id})"><i class="fas fa-check"></i></button>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')
              : `<tr><td colspan="9" style="text-align:center; color: var(--gray-700);">Обращений не найдено</td></tr>`}
          </tbody>
        </table>
      </div>
    `;

    const btn = $('#createTicketBtn');
    if (btn) btn.addEventListener('click', () => showCreateTicketModal());

    $$('[data-ticket-filter]').forEach((b) => {
      b.addEventListener('click', () => {
        const f = b.getAttribute('data-ticket-filter');
        filterTickets(f);
        $$('[data-ticket-filter]').forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
      });
    });
    const first = $('[data-ticket-filter="all"]');
    if (first) first.classList.add('active');
  }

  // --- Гарантируем, что Услуги и тарифы точно открываются
  function loadServices() {
    const area = ensureContentArea();

    const services = window.crmData.services || [];
    const totalServices = services.length;
    const mainServices = services.filter((s) => s.type === 'main').length;
    const additionalServices = services.filter((s) => s.type === 'additional').length;
    const totalMonthlyRevenue = services.filter((s) => s.period === 'monthly').reduce((sum, s) => sum + Number(s.tariff || 0), 0);

    area.innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Услуги и тарифы</h2>
        <button class="btn btn-primary" id="addServiceBtn"><i class="fas fa-plus"></i> Добавить услугу</button>
      </div>

      <div class="stats-cards">
        <div class="stat-card">
          <h3>Всего услуг</h3>
          <div class="stat-value">${totalServices}</div>
          <div class="stat-change">${mainServices} осн., ${additionalServices} доп.</div>
        </div>
        <div class="stat-card">
          <h3>Ежемесячная выручка (пример)</h3>
          <div class="stat-value">${toMoney(totalMonthlyRevenue)} ₽</div>
          <div class="stat-change"></div>
        </div>
        <div class="stat-card">
          <h3>Средний тариф</h3>
          <div class="stat-value">${totalServices ? toMoney(services.reduce((s, x) => s + Number(x.tariff || 0), 0) / totalServices) : '0'} ₽</div>
          <div class="stat-change"></div>
        </div>
        <div class="stat-card">
          <h3>Подрядчиков</h3>
          <div class="stat-value">${new Set(services.map((s) => s.contractorId).filter(Boolean)).size}</div>
          <div class="stat-change"></div>
        </div>
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
          <thead>
            <tr>
              <th>Услуга</th><th>Тип</th><th>Тариф</th><th>Период</th><th>Дом</th><th>Подрядчик</th><th>SLA</th><th>Статус</th><th>Действия</th>
            </tr>
          </thead>
          <tbody id="servicesTableBody">
            ${services
              .map((s) => {
                const building = (window.crmData.buildings || []).find((b) => b.id === s.buildingId);
                const contractor = (window.crmData.contractors || []).find((c) => c.id === s.contractorId);

                const typeClass = s.type === 'main' ? 'status-paid' : 'status-processing';
                const typeText = s.type === 'main' ? 'Основная' : 'Дополнительная';

                const periodText = s.period === 'monthly' ? 'Ежемесячно' : 'По требованию';
                const periodClass = s.period === 'monthly' ? 'status-paid' : 'status-pending';

                return `
                  <tr data-type="${escapeHtml(s.type)}" data-period="${escapeHtml(s.period)}">
                    <td><strong>${escapeHtml(s.name)}</strong></td>
                    <td><span class="status-badge ${typeClass}">${typeText}</span></td>
                    <td>${toMoney(s.tariff)} ₽</td>
                    <td><span class="status-badge ${periodClass}">${periodText}</span></td>
                    <td>${escapeHtml(building ? building.address : '—')}</td>
                    <td>${escapeHtml(contractor ? contractor.legalName : '—')}</td>
                    <td>${escapeHtml(s.sla || '—')}</td>
                    <td><span class="status-badge status-paid">Активна</span></td>
                    <td>
                      <button class="btn btn-secondary" onclick="viewService(${s.id})"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-secondary" onclick="editService(${s.id})"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-secondary" onclick="calculateRevenue(${s.id})"><i class="fas fa-calculator"></i></button>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    const btn = $('#addServiceBtn');
    if (btn) btn.addEventListener('click', () => showAddServiceModal());

    // табы фильтра
    $$('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        filterServices(tab.getAttribute('data-tab'));
      });
    });
  }

  function loadPayments() {
    const area = ensureContentArea();
    area.innerHTML = `<div class="page-header"><h2 class="page-title">Платежи</h2></div><div style="color:var(--gray-700)">Страница в демо</div>`;
  }
  function loadContractors() {
    const area = ensureContentArea();
    area.innerHTML = `<div class="page-header"><h2 class="page-title">Подрядчики</h2></div><div style="color:var(--gray-700)">Страница в демо</div>`;
  }
  function loadDocuments() {
    const area = ensureContentArea();
    area.innerHTML = `<div class="page-header"><h2 class="page-title">Документы</h2></div><div style="color:var(--gray-700)">Страница в демо</div>`;
  }
  function loadRequisites() {
    const area = ensureContentArea();
    area.innerHTML = `<div class="page-header"><h2 class="page-title">Реквизиты для оплаты</h2></div><div style="color:var(--gray-700)">Страница в демо</div>`;
  }
  function loadProfile() {
    const area = ensureContentArea();
    const c = window.crmData.currentCompany || {};
    area.innerHTML = `
      <div class="page-header"><h2 class="page-title">Профиль УК</h2></div>
      <div style="background:var(--gray-100); padding:20px; border-radius:12px;">
        <div><strong>${escapeHtml(c.legalName || '—')}</strong></div>
        <div>ИНН: ${escapeHtml(c.inn || '—')}</div>
        <div>ОГРН: ${escapeHtml(c.ogrn || '—')}</div>
        <div>Регион: ${escapeHtml(c.region || '—')}</div>
      </div>
    `;
  }

  // --------------------------
  // Filters
  // --------------------------
  window.filterResidents = function filterResidents(filter) {
    const rows = $$('#residentsTableBody tr');
    rows.forEach((row) => {
      const status = row.getAttribute('data-status');
      const bal = Number(row.getAttribute('data-balance') || 0);

      let show = true;
      switch (filter) {
        case 'active': show = status === 'active'; break;
        case 'inactive': show = status === 'inactive'; break;
        case 'debtors': show = bal < 0; break;
        case 'no-debt': show = bal >= 0; break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.filterTickets = function filterTickets(filter) {
    const rows = $$('#ticketsTableBody tr');
    rows.forEach((row) => {
      const st = row.getAttribute('data-status');
      const pr = row.getAttribute('data-priority');

      let show = true;
      switch (filter) {
        case 'open': show = st === 'open'; break;
        case 'inprogress': show = st === 'inprogress'; break;
        case 'resolved': show = st === 'resolved'; break;
        case 'high': show = pr === 'high'; break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  window.filterServices = function filterServices(filter) {
    const rows = $$('#servicesTableBody tr');
    rows.forEach((row) => {
      const type = row.getAttribute('data-type');
      const period = row.getAttribute('data-period');

      let show = true;
      switch (filter) {
        case 'main': show = type === 'main'; break;
        case 'additional': show = type === 'additional'; break;
        case 'monthly': show = period === 'monthly'; break;
        case 'ondemand': show = period === 'on-demand'; break;
        case 'all':
        default: show = true;
      }
      row.style.display = show ? '' : 'none';
    });
  };

  // --------------------------
  // Modals + actions (минимально, чтобы страницы не падали)
  // --------------------------
  function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
  }
  function closeAllModals() {
    $$('.modal').forEach((m) => m.classList.remove('active'));
  }

  function setupModals() {
    $$('.close-modal').forEach((btn) => btn.addEventListener('click', closeAllModals));
    $$('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAllModals();
      });
    });

    // формы (если есть в HTML)
    const bind = (id, handler) => {
      const f = document.getElementById(id);
      if (!f) return;
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        safe(handler, `form:${id}`);
      });
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

  function persist() {
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
  }

  function saveBuilding() {
    const address = $('#buildingAddress')?.value?.trim();
    if (!address) return alert('Укажите адрес дома');

    const floors = parseInt($('#buildingFloors')?.value || '0', 10);
    const apartments = parseInt($('#buildingApartments')?.value || '0', 10);
    const year = parseInt($('#buildingYear')?.value || String(new Date().getFullYear()), 10);

    const risksSelect = $('#buildingRisks');
    const risks = risksSelect ? Array.from(risksSelect.selectedOptions).map((o) => o.value) : [];

    const nextId = Math.max(0, ...(window.crmData.buildings || []).map((b) => b.id)) + 1;
    window.crmData.buildings.push({ id: nextId, address, floors, apartments, risks, passport: { elevators: [], itp: { type: '', year } } });

    persist();
    closeAllModals();
    loadBuildings();
  }

  function saveResident() {
    const name = $('#residentName')?.value?.trim();
    const buildingId = parseInt($('#residentBuilding')?.value || '', 10);
    const apartment = $('#residentApartment')?.value?.trim();
    if (!name || !buildingId || !apartment) return alert('Заполните ФИО, Дом и Квартиру');

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
    const type = $('#ticketType')?.value || 'другое';
    const priority = $('#ticketPriority')?.value || 'medium';
    const buildingId = parseInt($('#ticketBuilding')?.value || '', 10);
    const residentId = parseInt($('#ticketResident')?.value || '', 10) || null;
    const assignedTo = $('#ticketAssignee')?.value || '';

    if (!title || !description || !buildingId) return alert('Заполните название, описание и дом');

    const nextId = Math.max(0, ...(window.crmData.tickets || []).map((t) => t.id)) + 1;
    const today = new Date().toISOString().split('T')[0];

    window.crmData.tickets.push({
      id: nextId,
      title,
      description,
      type,
      priority,
      buildingId,
      residentId,
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
    const contractorId = parseInt($('#serviceContractor')?.value || '', 10) || null;
    const sla = $('#serviceSLA')?.value?.trim() || '';
    const description = $('#serviceDescription')?.value?.trim() || '';

    if (!name || !Number.isFinite(tariff) || !buildingId) return alert('Заполните услугу, тариф и дом');

    const nextId = Math.max(0, ...(window.crmData.services || []).map((s) => s.id)) + 1;
    window.crmData.services.push({ id: nextId, name, type, tariff, period, buildingId, contractorId, sla, description });

    persist();
    closeAllModals();
    loadServices();
  }

  function savePayment() { closeAllModals(); alert('Демо: платеж сохранен (логика упрощена)'); }
  function saveContractor() { closeAllModals(); alert('Демо: подрядчик сохранен (логика упрощена)'); }
  function saveDocument() { closeAllModals(); alert('Демо: документ добавлен (логика упрощена)'); }
  function saveRequisites() { closeAllModals(); alert('Демо: реквизиты сохранены (логика упрощена)'); }

  // --------------------------
  // "Вью" действия (заглушки, чтобы не падало при кликах)
  // --------------------------
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

  // Модальные “показать”
  window.showAddResidentModal = () => {
    safe(() => {
      populateResidentForm();
      openModal('residentModal');
    }, 'showAddResidentModal');
  };
  window.showCreateTicketModal = () => {
    safe(() => {
      populateTicketForm();
      openModal('ticketModal');
    }, 'showCreateTicketModal');
  };
  window.showAddServiceModal = () => {
    safe(() => {
      populateServiceForm();
      openModal('serviceModal');
    }, 'showAddServiceModal');
  };

  function populateResidentForm() {
    const buildingSelect = $('#residentBuilding');
    if (!buildingSelect) return;
    buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
    (window.crmData.buildings || []).forEach((b) => {
      const opt = document.createElement('option');
      opt.value = String(b.id);
      opt.textContent = b.address;
      buildingSelect.appendChild(opt);
    });
  }

  function populateTicketForm() {
    const buildingSelect = $('#ticketBuilding');
    const residentSelect = $('#ticketResident');
    const assigneeSelect = $('#ticketAssignee');

    if (buildingSelect) {
      buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
      (window.crmData.buildings || []).forEach((b) => {
        const opt = document.createElement('option');
        opt.value = String(b.id);
        opt.textContent = b.address;
        buildingSelect.appendChild(opt);
      });
    }
    if (residentSelect) {
      residentSelect.innerHTML = `<option value="">Выберите жильца</option>`;
      (window.crmData.residents || []).forEach((r) => {
        const opt = document.createElement('option');
        opt.value = String(r.id);
        opt.textContent = `${r.name} (кв. ${r.apartment})`;
        residentSelect.appendChild(opt);
      });
    }
    if (assigneeSelect) {
      assigneeSelect.innerHTML = `<option value="">Выберите ответственного</option>`;
      (window.crmData.users || []).forEach((u) => {
        const opt = document.createElement('option');
        opt.value = u.name;
        opt.textContent = u.name;
        assigneeSelect.appendChild(opt);
      });
    }
  }

  function populateServiceForm() {
    const buildingSelect = $('#serviceBuilding');
    const contractorSelect = $('#serviceContractor');

    if (buildingSelect) {
      buildingSelect.innerHTML = `<option value="">Выберите дом</option>`;
      (window.crmData.buildings || []).forEach((b) => {
        const opt = document.createElement('option');
        opt.value = String(b.id);
        opt.textContent = b.address;
        buildingSelect.appendChild(opt);
      });
    }
    if (contractorSelect) {
      contractorSelect.innerHTML = `<option value="">Выберите подрядчика</option>`;
      (window.crmData.contractors || []).forEach((c) => {
        const opt = document.createElement('option');
        opt.value = String(c.id);
        opt.textContent = c.legalName;
        contractorSelect.appendChild(opt);
      });
    }
  }

  // --------------------------
  // Charts init (если нужно где-то глобально)
  // --------------------------
  function initializeCharts() {
    // На старте ничего не создаем — график создается при заходе на dashboard
    // Это убирает проблемы с canvas, которого нет в DOM.
  }

  // --------------------------
  // Boot
  // --------------------------
  document.addEventListener('DOMContentLoaded', function () {
    safe(() => {
      const el = $('#current-date');
      if (el) {
        const now = new Date();
        el.textContent = now.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }
    }, 'date');

    safe(initializeData, 'initializeData');
    safe(setupNavigation, 'setupNavigation');
    safe(initializeCharts, 'initializeCharts');
    safe(setupModals, 'setupModals');

    // стартовая страница
    safe(() => loadPage('dashboard'), 'loadPage:dashboard');

    // дополнительный фикс: при ресайзе, если открыта аналитика — обновим график
    window.addEventListener('resize', () => {
      // Chart.js сам ресайзит, но если контейнеры меняются — иногда нужно принудительно
      if (window.__analyticsChart && typeof window.__analyticsChart.resize === 'function') {
        window.__analyticsChart.resize();
      }
    });
  });
})();
