// app.js
(() => {
  "use strict";

  /**
   * xHouse CRM (SPA, no frameworks)
   * - localStorage key: "xhouse.crmData"
   * - runtime: window.crmData
   * - modules rendered into #content-area via innerHTML + binders
   */

  const LS_KEY = "xhouse.crmData";

  // ---------------------------
  // Utils
  // ---------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const uid = (prefix = "id") => `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
  const escapeHtml = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const fmtMoney = (n) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(
      Number(n || 0)
    );

  const fmtDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d) ? String(iso) : d.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  // ---------------------------
  // Storage
  // ---------------------------
  function loadData() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  function saveData() {
    localStorage.setItem(LS_KEY, JSON.stringify(window.crmData));
  }

  // ---------------------------
  // Seed (test data)
  // ---------------------------
  function seedData() {
    const companyId = uid("company");
    const b1 = uid("bld");
    const b2 = uid("bld");
    const c1 = uid("ctr");
    const c2 = uid("ctr");

    const s1 = uid("svc");
    const s2 = uid("svc");
    const s3 = uid("svc");

    const uManager = uid("usr");
    const uAcc = uid("usr");

    const today = new Date();
    const iso = (d) => d.toISOString().slice(0, 10);

    return {
      currentCompany: {
        id: companyId,
        legalName: "ООО «xHouse Управление»",
        inn: "7708123456",
        ogrn: "1157746123456",
        region: "Центральная Россия",
        contacts: { phone: "+7 (495) 000-00-00", email: "office@xhouse.local" },
        licenses: [{ number: "ЛК-77-000001", issued: "2019-03-14", validTo: "2029-03-14" }],
        requisites: {
          payee: "ООО «xHouse Управление»",
          inn: "7708123456",
          kpp: "770801001",
          bank: "АО «Банк»",
          bik: "044525000",
          account: "40702810900000000001",
          corrAccount: "30101810400000000000",
        }
      },

      companies: [
        { id: companyId, legalName: "ООО «xHouse Управление»", inn: "7708123456", ogrn: "1157746123456", region: "Центральная Россия", contacts: { phone: "+7 (495) 000-00-00", email: "office@xhouse.local" }, licenses: [] }
      ],

      buildings: [
        {
          id: b1,
          address: "г. Калуга, ул. Примерная, д. 10",
          floors: 17,
          apartments: 312,
          risks: ["elevators", "leaks"],
          passport: {
            elevators: [{ brand: "OTIS", count: 2, lastCheck: "2025-11-10" }],
            itp: { type: "ИТП", year: 2018, vendor: "Danfoss" }
          },
          incidents: [
            { date: "2025-09-12", type: "Протечка", note: "Подвал, контур ГВС" },
            { date: "2025-12-02", type: "Лифт", note: "Остановка кабины, восстановлено" }
          ]
        },
        {
          id: b2,
          address: "г. Обнинск, пр-т Мира, д. 25",
          floors: 9,
          apartments: 144,
          risks: ["fire"],
          passport: {
            elevators: [{ brand: "ЩЛЗ", count: 1, lastCheck: "2025-10-03" }],
            itp: { type: "ЦТП", year: 2012, vendor: "—" }
          },
          incidents: [{ date: "2025-08-21", type: "Пожарная сигнализация", note: "Ложное срабатывание" }]
        }
      ],

      services: [
        { id: s1, name: "Содержание и ремонт", type: "main", tariff: 52.5, period: "month", buildingId: b1, contractorId: c1, sla: "24/7, реакция до 2ч" },
        { id: s2, name: "Лифтовое хозяйство", type: "main", tariff: 8.9, period: "month", buildingId: b1, contractorId: c2, sla: "Реакция до 1ч" },
        { id: s3, name: "Клининг (доп.)", type: "additional", tariff: 16.0, period: "month", buildingId: b2, contractorId: c1, sla: "Ежедневно 06:00–10:00" }
      ],

      contractors: [
        { id: c1, legalName: "ООО «СтройСервис»", inn: "4027123456", workTypes: ["Содержание", "Клининг", "Сантехника"], bankDetails: { bank: "АО «Банк»", bik: "044525225", account: "40702810000000000002" }, status: "verified" },
        { id: c2, legalName: "АО «ЛифтТех»", inn: "7705123456", workTypes: ["Лифты", "Диспетчеризация"], bankDetails: { bank: "ПАО «Банк 2»", bik: "044525999", account: "40702810000000000003" }, status: "pending" }
      ],

      payments: [
        { id: uid("pay"), serviceId: s1, amount: 1250000, status: "paid", date: iso(new Date(today.getTime() - 12 * 86400000)), payer: "Жильцы / ЕПД" },
        { id: uid("pay"), serviceId: s1, amount: 980000, status: "processing", date: iso(new Date(today.getTime() - 4 * 86400000)), payer: "Жильцы / ЕПД" },
        { id: uid("pay"), serviceId: s2, amount: 540000, status: "charged", date: iso(new Date(today.getTime() - 2 * 86400000)), payer: "Жильцы / ЕПД" },
        { id: uid("pay"), serviceId: s3, amount: 220000, status: "paid", date: iso(new Date(today.getTime() - 18 * 86400000)), payer: "Юр.лицо (аренда)" },
      ],

      documents: [
        { id: uid("doc"), type: "contract", name: "Договор: ЛифтТех", link: "#", status: "pending", entityId: c2 },
        { id: uid("doc"), type: "act", name: "Акт: Клининг (январь)", link: "#", status: "signed", entityId: s3 },
        { id: uid("doc"), type: "license", name: "Лицензия УК", link: "#", status: "signed", entityId: companyId }
      ],

      users: [
        { id: uManager, name: "Текущий пользователь", role: "manager", permissions: ["*"] },
        { id: uAcc, name: "Бухгалтер", role: "accountant", permissions: ["payments:read", "payments:write", "docs:read"] }
      ],

      // Extra blocks requested (simple placeholders)
      residents: [
        { id: uid("res"), buildingId: b1, name: "Иванов И.И.", apartment: "12", phone: "+7 900 000-00-01", status: "active" },
        { id: uid("res"), buildingId: b2, name: "Петрова А.А.", apartment: "44", phone: "+7 900 000-00-02", status: "active" },
      ],
      tickets: [
        { id: uid("tkt"), buildingId: b1, category: "Сантехника", status: "open", createdAt: "2026-01-29", title: "Протечка под раковиной" },
        { id: uid("tkt"), buildingId: b2, category: "Электрика", status: "processing", createdAt: "2026-02-02", title: "Не горит свет на лестнице" }
      ],

      currentUserId: uManager
    };
  }

  // ---------------------------
  // Modal (global)
  // ---------------------------
  const Modal = (() => {
    const backdrop = $("#modal-backdrop");
    const titleEl = $("#modal-title");
    const subtitleEl = $("#modal-subtitle");
    const bodyEl = $("#modal-body");
    const footerEl = $("#modal-footer");
    const closeBtn = $("#modal-close");

    function open({ title, subtitle = "", bodyHTML = "", footerHTML = "" }) {
      titleEl.textContent = title || "Окно";
      subtitleEl.textContent = subtitle || "";
      bodyEl.innerHTML = bodyHTML;
      footerEl.innerHTML = footerHTML;
      backdrop.classList.add("show");
      backdrop.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", onEsc);
    }

    function close() {
      backdrop.classList.remove("show");
      backdrop.setAttribute("aria-hidden", "true");
      bodyEl.innerHTML = "";
      footerEl.innerHTML = "";
      document.removeEventListener("keydown", onEsc);
    }

    function onEsc(e) { if (e.key === "Escape") close(); }

    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });

    return { open, close };
  })();

  // ---------------------------
  // Navigation (all blocks clickable)
  // ---------------------------
  const NAV = [
    { id: "analytics", label: "Аналитика", sub: "Дашборд и KPI", ico: "⦿" },
    { id: "buildings", label: "Дома", sub: "Реестр и паспорт", ico: "⌂" },
    { id: "residents", label: "Жильцы", sub: "Реестр жителей", ico: "👥" },
    { id: "tickets", label: "Обращения", sub: "Заявки и статусы", ico: "⚑" },
    { id: "services", label: "Услуги и тарифы", sub: "Каталог и привязки", ico: "⎔" },
    { id: "payments", label: "Платежи", sub: "Начисления и оплата", ico: "₽" },
    { id: "contractors", label: "Подрядчики", sub: "Реестр и проверки", ico: "⛭" },
    { id: "documents", label: "Документы", sub: "Хранилище", ico: "⧉" },
    { id: "requisites", label: "Реквизиты для оплаты", sub: "Банк и счета", ico: "⌁" },
    { id: "profile", label: "Профиль УК", sub: "Юрданные и контакты", ico: "⎈" },
    { id: "users", label: "Пользователи", sub: "Роли и доступы", ico: "⚙" },
  ];

  // ---------------------------
  // App
  // ---------------------------
  const App = (() => {
    let currentView = "analytics";
    let chartInstance = null;

    function init() {
      const existing = loadData();
      window.crmData = existing || seedData();
      if (!existing) saveData();

      renderTopUser();
      renderSidebar();

      // simple hash router: #view or #view?query
      window.addEventListener("hashchange", () => {
        const { viewId } = parseHash();
        route(viewId || "analytics");
      });

      const { viewId } = parseHash();
      route(viewId || "analytics");
    }

    function parseHash() {
      const raw = (location.hash || "").replace("#", "");
      if (!raw) return { viewId: "analytics", qs: new URLSearchParams() };
      const [viewId, query] = raw.split("?");
      return { viewId, qs: new URLSearchParams(query || "") };
    }

    function setHash(viewId, qs = null) {
      const q = qs ? qs.toString() : "";
      location.hash = q ? `${viewId}?${q}` : viewId;
    }

    function getCurrentUser() {
      return window.crmData.users.find(u => u.id === window.crmData.currentUserId) || window.crmData.users[0];
    }

    function renderTopUser() {
      const u = getCurrentUser();
      $("#current-user-name").textContent = u?.name || "Пользователь";
      $("#current-user-role").textContent = `роль: ${u?.role || "—"}`;
    }

    function renderSidebar() {
      const navRoot = $("#sidebar-nav");
      navRoot.innerHTML = "";

      const u = getCurrentUser();
      const canSeeUsers = u?.role === "manager";

      NAV.forEach(item => {
        if (item.id === "users" && !canSeeUsers) return;

        const a = document.createElement("a");
        a.className = "nav-item";
        a.dataset.view = item.id;
        a.href = `#${item.id}`;
        a.innerHTML = `
          <div class="ico">${escapeHtml(item.ico)}</div>
          <div class="label">
            <b>${escapeHtml(item.label)}</b>
            <span>${escapeHtml(item.sub)}</span>
          </div>
        `;
        a.addEventListener("click", (e) => {
          e.preventDefault();
          setHash(item.id);
          route(item.id);
        });

        navRoot.appendChild(a);
      });

      setActiveNav(currentView);
    }

    function setActiveNav(viewId) {
      currentView = viewId;
      $$(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.view === viewId));
    }

    // ---------------------------
    // KPIs / aggregations
    // ---------------------------
    function calcPaymentKpis(payments = window.crmData.payments) {
      const sumBy = (st) => payments.filter(p => p.status === st).reduce((a, p) => a + Number(p.amount || 0), 0);
      return {
        charged: sumBy("charged"),
        processing: sumBy("processing"),
        paid: sumBy("paid"),
      };
    }

    function groupPaymentsByDay(payments) {
      const m = new Map();
      for (const p of payments) {
        const day = p.date || "unknown";
        m.set(day, (m.get(day) || 0) + Number(p.amount || 0));
      }
      return Array.from(m.entries())
        .map(([day, amount]) => ({ day, amount }))
        .sort((a, b) => String(a.day).localeCompare(String(b.day)));
    }

    // ---------------------------
    // Routing
    // ---------------------------
    function route(viewId) {
      const u = getCurrentUser();
      if (viewId === "users" && u?.role !== "manager") viewId = "analytics";

      setActiveNav(viewId);

      // Destroy Chart.js instances when leaving analytics
      if (chartInstance) {
        try { chartInstance.destroy(); } catch {}
        chartInstance = null;
      }

      const content = $("#content-area");

      const views = {
        analytics: renderAnalytics,
        buildings: renderBuildings,
        residents: renderResidents,
        tickets: renderTickets,
        services: renderServices,
        payments: renderPayments,
        contractors: renderContractors,
        documents: renderDocuments,
        requisites: renderRequisites,
        profile: renderProfile,
        users: renderUsers,
      };

      content.innerHTML = (views[viewId] || renderAnalytics)();
      bindView(viewId);

      if (viewId === "analytics") initAnalyticsChart();
    }

    // ---------------------------
    // Views (HTML)
    // ---------------------------
    function renderAnalytics() {
      const kpi = calcPaymentKpis();
      const buildingsCount = window.crmData.buildings.length;
      const residentsCount = (window.crmData.residents || []).length;
      const openTickets = (window.crmData.tickets || []).filter(t => t.status === "open").length;

      return `
        <div class="page-head">
          <div>
            <h1>Аналитика</h1>
            <p>Сводные показатели по УК, платежам и операционным блокам.</p>
          </div>
          <div class="actions">
            <button class="btn" id="btn-export-json">Экспорт JSON</button>
            <button class="btn" id="btn-reset">Сбросить тестовые данные</button>
          </div>
        </div>

        <div class="grid">
          <div class="card tile" style="grid-column:span 3" data-go="payments">
            <div class="kpi">
              <div><div class="muted">Оплачено</div><div class="v">${fmtMoney(kpi.paid)}</div></div>
              <div class="pill"><span class="dot ok"></span>paid</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 3" data-go="payments">
            <div class="kpi">
              <div><div class="muted">В обработке</div><div class="v">${fmtMoney(kpi.processing)}</div></div>
              <div class="pill"><span class="dot warn"></span>processing</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 3" data-go="payments">
            <div class="kpi">
              <div><div class="muted">Начислено</div><div class="v">${fmtMoney(kpi.charged)}</div></div>
              <div class="pill"><span class="dot bad"></span>charged</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 3" data-go="buildings">
            <div class="kpi">
              <div><div class="muted">Дома</div><div class="v">${buildingsCount}</div></div>
              <div class="pill"><span class="dot"></span>assets</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 4" data-go="residents">
            <div class="kpi">
              <div><div class="muted">Жильцы</div><div class="v">${residentsCount}</div></div>
              <div class="pill"><span class="dot"></span>registry</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 4" data-go="tickets">
            <div class="kpi">
              <div><div class="muted">Открытые обращения</div><div class="v">${openTickets}</div></div>
              <div class="pill"><span class="dot warn"></span>open</div>
            </div>
          </div>

          <div class="card tile" style="grid-column:span 4" data-go="documents">
            <div class="kpi">
              <div><div class="muted">Документы (ожидают)</div><div class="v">${window.crmData.documents.filter(d => d.status === "pending").length}</div></div>
              <div class="pill"><span class="dot warn"></span>pending</div>
            </div>
          </div>

          <div class="card" style="grid-column:span 12">
            <h3>Платежи по дням (пример)</h3>
            <div class="muted" style="margin-bottom:10px;">Chart.js — агрегация по дням (все статусы).</div>
            <canvas id="payments-chart" height="90"></canvas>
          </div>
        </div>
      `;
    }

    function renderBuildings() {
      const rows = window.crmData.buildings.map(b => {
        const risks = (b.risks || []).map(r => `<span class="pill" style="margin-right:6px;"><span class="dot bad"></span>${escapeHtml(r)}</span>`).join("");
        return `
          <tr>
            <td>${escapeHtml(b.address)}</td>
            <td>${escapeHtml(b.apartments)}</td>
            <td>${risks || "<span class='muted'>—</span>"}</td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="view-building" data-id="${b.id}">Просмотр</button>
                <button class="btn" data-act="edit-building" data-id="${b.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-building" data-id="${b.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Дома</h1>
            <p>Таблица домов, паспорт, риски и история аварий.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-building">Добавить дом</button>
          </div>
        </div>

        <div class="card">
          <h3>Список домов</h3>
          <div class="table-wrap" style="margin-top:10px;">
            <table>
              <thead>
                <tr>
                  <th>Адрес</th>
                  <th>Квартиры</th>
                  <th>Флаги рисков</th>
                  <th style="width:280px;">Действия</th>
                </tr>
              </thead>
              <tbody>
                ${rows || `<tr><td colspan="4" class="muted">Нет данных</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderResidents() {
      const rows = (window.crmData.residents || []).map(r => {
        const b = window.crmData.buildings.find(x => x.id === r.buildingId);
        return `
          <tr>
            <td>${escapeHtml(r.name)}</td>
            <td>${escapeHtml(b?.address || "—")}</td>
            <td>${escapeHtml(r.apartment)}</td>
            <td>${escapeHtml(r.phone)}</td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="edit-resident" data-id="${r.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-resident" data-id="${r.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Жильцы</h1>
            <p>Реестр жильцов (минимальный модуль).</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-resident">Добавить жильца</button>
          </div>
        </div>

        <div class="card">
          <h3>Список жильцов</h3>
          <div class="table-wrap" style="margin-top:10px;">
            <table>
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Дом</th>
                  <th>Квартира</th>
                  <th>Телефон</th>
                  <th style="width:240px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="5" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderTickets() {
      const rows = (window.crmData.tickets || []).map(t => {
        const b = window.crmData.buildings.find(x => x.id === t.buildingId);
        const dot = t.status === "open" ? "warn" : (t.status === "processing" ? "ok" : "");
        return `
          <tr>
            <td>${escapeHtml(t.title)}</td>
            <td>${escapeHtml(b?.address || "—")}</td>
            <td>${escapeHtml(t.category)}</td>
            <td><span class="pill"><span class="dot ${dot}"></span>${escapeHtml(t.status)}</span></td>
            <td>${escapeHtml(fmtDate(t.createdAt))}</td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="edit-ticket" data-id="${t.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-ticket" data-id="${t.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Обращения</h1>
            <p>Заявки, категории, статусы (минимальный модуль).</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-ticket">Создать обращение</button>
          </div>
        </div>

        <div class="card">
          <h3>Список обращений</h3>
          <div class="table-wrap" style="margin-top:10px;">
            <table>
              <thead>
                <tr>
                  <th>Тема</th>
                  <th>Дом</th>
                  <th>Категория</th>
                  <th>Статус</th>
                  <th>Дата</th>
                  <th style="width:240px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="6" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderServices() {
      const { qs } = parseHash();
      const type = qs.get("type") || "all";
      const buildingId = qs.get("buildingId") || "all";

      const filtered = window.crmData.services.filter(s => {
        const okType = type === "all" || s.type === type;
        const okB = buildingId === "all" || s.buildingId === buildingId;
        return okType && okB;
      });

      const buildingOptions = ['<option value="all">Все дома</option>']
        .concat(window.crmData.buildings.map(b => `<option value="${b.id}" ${b.id===buildingId?"selected":""}>${escapeHtml(b.address)}</option>`))
        .join("");

      const rows = filtered.map(s => {
        const b = window.crmData.buildings.find(x => x.id === s.buildingId);
        const c = window.crmData.contractors.find(x => x.id === s.contractorId);
        return `
          <tr>
            <td>${escapeHtml(s.name)}</td>
            <td><span class="pill"><span class="dot"></span>${escapeHtml(s.type)}</span></td>
            <td>${escapeHtml(b?.address || "—")}</td>
            <td>${escapeHtml(c?.legalName || "—")}</td>
            <td>${escapeHtml(s.tariff)} ₽/${escapeHtml(s.period)}</td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="edit-service" data-id="${s.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-service" data-id="${s.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Услуги и тарифы</h1>
            <p>Каталог с фильтром по типу и привязкой к дому.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-service">Добавить услугу</button>
          </div>
        </div>

        <div class="card">
          <div class="row" style="align-items:end;">
            <div class="field">
              <label>Тип услуги</label>
              <select id="filter-service-type">
                <option value="all" ${type==="all"?"selected":""}>Все</option>
                <option value="main" ${type==="main"?"selected":""}>main</option>
                <option value="additional" ${type==="additional"?"selected":""}>additional</option>
              </select>
            </div>
            <div class="field">
              <label>Дом</label>
              <select id="filter-service-building">${buildingOptions}</select>
            </div>
          </div>

          <div class="table-wrap" style="margin-top:12px;">
            <table>
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Тип</th>
                  <th>Дом</th>
                  <th>Подрядчик</th>
                  <th>Тариф</th>
                  <th style="width:240px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="6" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderPayments() {
      const { qs } = parseHash();
      const status = qs.get("status") || "all";
      const from = qs.get("from") || "";
      const to = qs.get("to") || "";

      const filtered = window.crmData.payments.filter(p => {
        const okS = status === "all" || p.status === status;
        const d = p.date ? new Date(p.date) : null;
        const okFrom = !from || (d && d >= new Date(from));
        const okTo = !to || (d && d <= new Date(to));
        return okS && okFrom && okTo;
      });

      const kpi = calcPaymentKpis(filtered);

      const rows = filtered.map(p => {
        const svc = window.crmData.services.find(x => x.id === p.serviceId);
        const b = svc ? window.crmData.buildings.find(x => x.id === svc.buildingId) : null;
        const dot = p.status === "paid" ? "ok" : (p.status === "processing" ? "warn" : "bad");

        return `
          <tr>
            <td>${escapeHtml(fmtDate(p.date))}</td>
            <td>${escapeHtml(svc?.name || "—")}</td>
            <td>${escapeHtml(b?.address || "—")}</td>
            <td>${escapeHtml(p.payer || "—")}</td>
            <td>${fmtMoney(p.amount)}</td>
            <td><span class="pill"><span class="dot ${dot}"></span>${escapeHtml(p.status)}</span></td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="edit-payment" data-id="${p.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-payment" data-id="${p.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Платежи</h1>
            <p>Фильтры, сводные KPI и создание начислений.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-charge">Создать начисление</button>
          </div>
        </div>

        <div class="grid">
          <div class="card" style="grid-column:span 4">
            <div class="kpi">
              <div><div class="muted">Оплачено</div><div class="v">${fmtMoney(kpi.paid)}</div></div>
              <div class="pill"><span class="dot ok"></span>paid</div>
            </div>
          </div>
          <div class="card" style="grid-column:span 4">
            <div class="kpi">
              <div><div class="muted">В обработке</div><div class="v">${fmtMoney(kpi.processing)}</div></div>
              <div class="pill"><span class="dot warn"></span>processing</div>
            </div>
          </div>
          <div class="card" style="grid-column:span 4">
            <div class="kpi">
              <div><div class="muted">Начислено</div><div class="v">${fmtMoney(kpi.charged)}</div></div>
              <div class="pill"><span class="dot bad"></span>charged</div>
            </div>
          </div>

          <div class="card" style="grid-column:span 12">
            <h3>Фильтры</h3>
            <div class="row" style="align-items:end; margin-top:8px;">
              <div class="field">
                <label>Статус</label>
                <select id="filter-pay-status">
                  <option value="all" ${status==="all"?"selected":""}>Все</option>
                  <option value="charged" ${status==="charged"?"selected":""}>charged</option>
                  <option value="processing" ${status==="processing"?"selected":""}>processing</option>
                  <option value="paid" ${status==="paid"?"selected":""}>paid</option>
                </select>
              </div>
              <div class="field">
                <label>Дата с</label>
                <input type="date" id="filter-pay-from" value="${escapeHtml(from)}" />
              </div>
              <div class="field">
                <label>Дата по</label>
                <input type="date" id="filter-pay-to" value="${escapeHtml(to)}" />
              </div>
              <div class="field" style="grid-column:span 2">
                <button class="btn" id="btn-apply-pay-filters">Применить</button>
              </div>
            </div>

            <div class="table-wrap" style="margin-top:12px;">
              <table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Услуга</th>
                    <th>Дом</th>
                    <th>Плательщик</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th style="width:240px;">Действия</th>
                  </tr>
                </thead>
                <tbody>${rows || `<tr><td colspan="7" class="muted">Нет данных</td></tr>`}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    function renderContractors() {
      const rows = window.crmData.contractors.map(c => {
        const works = (c.workTypes || []).map(w => `<span class="pill" style="margin-right:6px;"><span class="dot"></span>${escapeHtml(w)}</span>`).join("");
        const dot = c.status === "verified" ? "ok" : (c.status === "pending" ? "warn" : "bad");

        return `
          <tr>
            <td>${escapeHtml(c.legalName)}</td>
            <td>${works || "<span class='muted'>—</span>"}</td>
            <td><span class="pill"><span class="dot ${dot}"></span>${escapeHtml(c.status)}</span></td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="view-contractor" data-id="${c.id}">Просмотр</button>
                <button class="btn" data-act="edit-contractor" data-id="${c.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-contractor" data-id="${c.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Подрядчики</h1>
            <p>Реестр подрядчиков, проверка, связанные услуги и документы.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-contractor">Добавить подрядчика</button>
          </div>
        </div>

        <div class="card">
          <h3>Список подрядчиков</h3>
          <div class="table-wrap" style="margin-top:10px;">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Виды работ</th>
                  <th>Статус проверки</th>
                  <th style="width:320px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="4" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderDocuments() {
      const { qs } = parseHash();
      const type = qs.get("type") || "all";
      const status = qs.get("status") || "all";

      const filtered = window.crmData.documents.filter(d => {
        const okT = type === "all" || d.type === type;
        const okS = status === "all" || d.status === status;
        return okT && okS;
      });

      const rows = filtered.map(d => {
        const dot = d.status === "signed" ? "ok" : (d.status === "pending" ? "warn" : "bad");
        return `
          <tr>
            <td>${escapeHtml(d.type)}</td>
            <td>${escapeHtml(d.name)}</td>
            <td><a class="muted" href="${escapeHtml(d.link || "#")}" target="_blank" rel="noreferrer">Открыть</a></td>
            <td><span class="pill"><span class="dot ${dot}"></span>${escapeHtml(d.status)}</span></td>
            <td>
              <div class="td-actions">
                <button class="btn" data-act="edit-doc" data-id="${d.id}">Редактировать</button>
                <button class="btn danger" data-act="delete-doc" data-id="${d.id}">Удалить</button>
              </div>
            </td>
          </tr>
        `;
      }).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Документы</h1>
            <p>Хранилище документов с фильтрами по типу и статусу.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-doc">Добавить документ</button>
          </div>
        </div>

        <div class="card">
          <div class="row" style="align-items:end;">
            <div class="field">
              <label>Тип</label>
              <select id="filter-doc-type">
                <option value="all" ${type==="all"?"selected":""}>Все</option>
                <option value="contract" ${type==="contract"?"selected":""}>contract</option>
                <option value="act" ${type==="act"?"selected":""}>act</option>
                <option value="license" ${type==="license"?"selected":""}>license</option>
                <option value="other" ${type==="other"?"selected":""}>other</option>
              </select>
            </div>
            <div class="field">
              <label>Статус</label>
              <select id="filter-doc-status">
                <option value="all" ${status==="all"?"selected":""}>Все</option>
                <option value="pending" ${status==="pending"?"selected":""}>pending</option>
                <option value="signed" ${status==="signed"?"selected":""}>signed</option>
                <option value="rejected" ${status==="rejected"?"selected":""}>rejected</option>
              </select>
            </div>
          </div>

          <div class="table-wrap" style="margin-top:12px;">
            <table>
              <thead>
                <tr>
                  <th>Тип</th>
                  <th>Название</th>
                  <th>Ссылка</th>
                  <th>Статус</th>
                  <th style="width:240px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="5" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderRequisites() {
      const r = window.crmData.currentCompany?.requisites || {};
      return `
        <div class="page-head">
          <div>
            <h1>Реквизиты для оплаты</h1>
            <p>Платежные реквизиты УК (для квитанций и договоров).</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-edit-requisites">Редактировать</button>
          </div>
        </div>

        <div class="card">
          <h3>Реквизиты</h3>
          <div class="row" style="margin-top:10px;">
            <div class="field"><label>Получатель</label><input disabled value="${escapeHtml(r.payee || "")}"></div>
            <div class="field"><label>Банк</label><input disabled value="${escapeHtml(r.bank || "")}"></div>
            <div class="field"><label>ИНН</label><input disabled value="${escapeHtml(r.inn || "")}"></div>
            <div class="field"><label>КПП</label><input disabled value="${escapeHtml(r.kpp || "")}"></div>
            <div class="field"><label>БИК</label><input disabled value="${escapeHtml(r.bik || "")}"></div>
            <div class="field"><label>Р/с</label><input disabled value="${escapeHtml(r.account || "")}"></div>
            <div class="field"><label>К/с</label><input disabled value="${escapeHtml(r.corrAccount || "")}"></div>
          </div>
        </div>
      `;
    }

    function renderProfile() {
      const c = window.crmData.currentCompany || {};
      return `
        <div class="page-head">
          <div>
            <h1>Профиль УК</h1>
            <p>Юридические данные, контакты и лицензии.</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-edit-company">Редактировать профиль</button>
          </div>
        </div>

        <div class="grid">
          <div class="card" style="grid-column:span 8">
            <h3>Юридические данные</h3>
            <div class="row" style="margin-top:10px;">
              <div class="field"><label>Наименование</label><input disabled value="${escapeHtml(c.legalName || "")}"></div>
              <div class="field"><label>Регион</label><input disabled value="${escapeHtml(c.region || "")}"></div>
              <div class="field"><label>ИНН</label><input disabled value="${escapeHtml(c.inn || "")}"></div>
              <div class="field"><label>ОГРН</label><input disabled value="${escapeHtml(c.ogrn || "")}"></div>
            </div>
          </div>

          <div class="card" style="grid-column:span 4">
            <h3>Контакты</h3>
            <div class="row" style="margin-top:10px; grid-template-columns:1fr;">
              <div class="field"><label>Телефон</label><input disabled value="${escapeHtml(c.contacts?.phone || "")}"></div>
              <div class="field"><label>Email</label><input disabled value="${escapeHtml(c.contacts?.email || "")}"></div>
            </div>
          </div>

          <div class="card" style="grid-column:span 12">
            <h3>Документы</h3>
            <div class="muted">Перейдите в «Документы» для статусов подписания и фильтрации.</div>
          </div>
        </div>
      `;
    }

    function renderUsers() {
      const rows = window.crmData.users.map(u => `
        <tr>
          <td>${escapeHtml(u.name)}</td>
          <td><span class="pill"><span class="dot"></span>${escapeHtml(u.role)}</span></td>
          <td>${escapeHtml((u.permissions || []).join(", ") || "—")}</td>
          <td>
            <div class="td-actions">
              <button class="btn" data-act="edit-user" data-id="${u.id}">Редактировать</button>
              <button class="btn danger" data-act="delete-user" data-id="${u.id}">Удалить</button>
            </div>
          </td>
        </tr>
      `).join("");

      return `
        <div class="page-head">
          <div>
            <h1>Пользователи</h1>
            <p>Управление ролями (доступно только manager).</p>
          </div>
          <div class="actions">
            <button class="btn primary" id="btn-add-user">Добавить пользователя</button>
          </div>
        </div>

        <div class="card">
          <h3>Список пользователей</h3>
          <div class="table-wrap" style="margin-top:10px;">
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Роль</th>
                  <th>Разрешения</th>
                  <th style="width:240px;">Действия</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td colspan="4" class="muted">Нет данных</td></tr>`}</tbody>
            </table>
          </div>
        </div>
      `;
    }

    // ---------------------------
    // Binders (events)
    // ---------------------------
    function bindView(viewId) {
      const binders = {
        analytics: bindAnalytics,
        buildings: bindBuildings,
        residents: bindResidents,
        tickets: bindTickets,
        services: bindServices,
        payments: bindPayments,
        contractors: bindContractors,
        documents: bindDocuments,
        requisites: bindRequisites,
        profile: bindProfile,
        users: bindUsers,
      };
      (binders[viewId] || (() => {}))();
    }

    function bindAnalytics() {
      // Clickable tiles -> open module
      $$(".tile[data-go]").forEach(el => el.addEventListener("click", () => setHash(el.dataset.go)));

      $("#btn-reset")?.addEventListener("click", () => {
        localStorage.removeItem(LS_KEY);
        window.crmData = seedData();
        saveData();
        renderTopUser();
        renderSidebar();
        route("analytics");
      });

      $("#btn-export-json")?.addEventListener("click", () => {
        const data = JSON.stringify(window.crmData, null, 2);
        Modal.open({
          title: "Экспорт данных (JSON)",
          subtitle: "Данные хранятся в localStorage. Можно копировать и переносить.",
          bodyHTML: `<div class="field"><label>crmData</label><textarea style="min-height:280px;" readonly>${escapeHtml(data)}</textarea></div>`,
          footerHTML: `<button class="btn" id="btn-close-export">Закрыть</button>`
        });
        $("#btn-close-export")?.addEventListener("click", Modal.close);
      });
    }

    function initAnalyticsChart() {
      const canvas = $("#payments-chart");
      if (!canvas) return;
      const series = groupPaymentsByDay(window.crmData.payments);
      const labels = series.map(x => x.day);
      const data = series.map(x => x.amount);

      chartInstance = new Chart(canvas, {
        type: "line",
        data: { labels, datasets: [{ label: "Сумма платежей", data, tension: 0.25 }] },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: "#EDEBFF" } } },
          scales: {
            x: { ticks: { color: "#A8A3C7" }, grid: { color: "rgba(35,35,68,.45)" } },
            y: { ticks: { color: "#A8A3C7" }, grid: { color: "rgba(35,35,68,.45)" } }
          }
        }
      });
    }

    // CRUD + detail views are implemented for: buildings, payments, contractors, documents, services, residents, tickets, users, requisites, profile.
    // For brevity: use compact, reliable forms + save + reroute.

    function bindBuildings() {
      $("#btn-add-building")?.addEventListener("click", () => openBuildingForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const b = window.crmData.buildings.find(x => x.id === id);
          if (!b) return;

          if (act === "view-building") openBuildingView(b);
          if (act === "edit-building") openBuildingForm({ mode: "edit", building: b });
          if (act === "delete-building") confirmDelete({
            title: "Удалить дом?",
            subtitle: b.address,
            onConfirm: () => {
              window.crmData.buildings = window.crmData.buildings.filter(x => x.id !== id);
              // cascade minimal
              window.crmData.services = window.crmData.services.filter(s => s.buildingId !== id);
              window.crmData.residents = (window.crmData.residents || []).filter(r => r.buildingId !== id);
              window.crmData.tickets = (window.crmData.tickets || []).filter(t => t.buildingId !== id);
              saveData();
              route("buildings");
            }
          });
        });
      });
    }

    function bindResidents() {
      $("#btn-add-resident")?.addEventListener("click", () => openResidentForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const arr = window.crmData.residents || [];
          const r = arr.find(x => x.id === id);
          if (!r) return;

          if (act === "edit-resident") openResidentForm({ mode: "edit", resident: r });
          if (act === "delete-resident") confirmDelete({
            title: "Удалить жильца?",
            subtitle: r.name,
            onConfirm: () => {
              window.crmData.residents = arr.filter(x => x.id !== id);
              saveData();
              route("residents");
            }
          });
        });
      });
    }

    function bindTickets() {
      $("#btn-add-ticket")?.addEventListener("click", () => openTicketForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const arr = window.crmData.tickets || [];
          const t = arr.find(x => x.id === id);
          if (!t) return;

          if (act === "edit-ticket") openTicketForm({ mode: "edit", ticket: t });
          if (act === "delete-ticket") confirmDelete({
            title: "Удалить обращение?",
            subtitle: t.title,
            onConfirm: () => {
              window.crmData.tickets = arr.filter(x => x.id !== id);
              saveData();
              route("tickets");
            }
          });
        });
      });
    }

    function bindServices() {
      const typeSel = $("#filter-service-type");
      const bSel = $("#filter-service-building");

      const apply = () => {
        const qs = new URLSearchParams();
        qs.set("type", typeSel.value);
        qs.set("buildingId", bSel.value);
        setHash("services", qs);
      };

      typeSel?.addEventListener("change", apply);
      bSel?.addEventListener("change", apply);

      $("#btn-add-service")?.addEventListener("click", () => openServiceForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const s = window.crmData.services.find(x => x.id === id);
          if (!s) return;

          if (act === "edit-service") openServiceForm({ mode: "edit", service: s });
          if (act === "delete-service") confirmDelete({
            title: "Удалить услугу?",
            subtitle: s.name,
            onConfirm: () => {
              window.crmData.services = window.crmData.services.filter(x => x.id !== id);
              window.crmData.payments = window.crmData.payments.filter(p => p.serviceId !== id);
              saveData();
              route("services");
            }
          });
        });
      });
    }

    function bindPayments() {
      $("#btn-add-charge")?.addEventListener("click", () => openPaymentForm({ mode: "create" }));

      $("#btn-apply-pay-filters")?.addEventListener("click", () => {
        const qs = new URLSearchParams();
        const status = $("#filter-pay-status").value;
        const from = $("#filter-pay-from").value;
        const to = $("#filter-pay-to").value;
        if (status && status !== "all") qs.set("status", status);
        if (from) qs.set("from", from);
        if (to) qs.set("to", to);
        setHash("payments", qs);
      });

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const p = window.crmData.payments.find(x => x.id === id);
          if (!p) return;

          if (act === "edit-payment") openPaymentForm({ mode: "edit", payment: p });
          if (act === "delete-payment") confirmDelete({
            title: "Удалить платеж?",
            subtitle: `${fmtMoney(p.amount)} • ${fmtDate(p.date)}`,
            onConfirm: () => {
              window.crmData.payments = window.crmData.payments.filter(x => x.id !== id);
              saveData();
              route("payments");
            }
          });
        });
      });
    }

    function bindContractors() {
      $("#btn-add-contractor")?.addEventListener("click", () => openContractorForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const c = window.crmData.contractors.find(x => x.id === id);
          if (!c) return;

          if (act === "view-contractor") openContractorView(c);
          if (act === "edit-contractor") openContractorForm({ mode: "edit", contractor: c });
          if (act === "delete-contractor") confirmDelete({
            title: "Удалить подрядчика?",
            subtitle: c.legalName,
            onConfirm: () => {
              window.crmData.contractors = window.crmData.contractors.filter(x => x.id !== id);
              window.crmData.services = window.crmData.services.map(s => s.contractorId === id ? { ...s, contractorId: null } : s);
              saveData();
              route("contractors");
            }
          });
        });
      });
    }

    function bindDocuments() {
      const apply = () => {
        const qs = new URLSearchParams();
        const type = $("#filter-doc-type").value;
        const status = $("#filter-doc-status").value;
        if (type && type !== "all") qs.set("type", type);
        if (status && status !== "all") qs.set("status", status);
        setHash("documents", qs);
      };

      $("#filter-doc-type")?.addEventListener("change", apply);
      $("#filter-doc-status")?.addEventListener("change", apply);

      $("#btn-add-doc")?.addEventListener("click", () => openDocForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const d = window.crmData.documents.find(x => x.id === id);
          if (!d) return;

          if (act === "edit-doc") openDocForm({ mode: "edit", doc: d });
          if (act === "delete-doc") confirmDelete({
            title: "Удалить документ?",
            subtitle: d.name,
            onConfirm: () => {
              window.crmData.documents = window.crmData.documents.filter(x => x.id !== id);
              saveData();
              route("documents");
            }
          });
        });
      });
    }

    function bindRequisites() {
      $("#btn-edit-requisites")?.addEventListener("click", openRequisitesForm);
    }

    function bindProfile() {
      $("#btn-edit-company")?.addEventListener("click", openCompanyForm);
    }

    function bindUsers() {
      $("#btn-add-user")?.addEventListener("click", () => openUserForm({ mode: "create" }));

      $$("#content-area [data-act][data-id]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const act = btn.dataset.act;
          const u = window.crmData.users.find(x => x.id === id);
          if (!u) return;

          if (act === "edit-user") openUserForm({ mode: "edit", user: u });
          if (act === "delete-user") confirmDelete({
            title: "Удалить пользователя?",
            subtitle: u.name,
            onConfirm: () => {
              window.crmData.users = window.crmData.users.filter(x => x.id !== id);
              if (window.crmData.currentUserId === id) window.crmData.currentUserId = window.crmData.users[0]?.id;
              saveData();
              renderTopUser();
              renderSidebar();
              route("users");
            }
          });
        });
      });
    }

    // ---------------------------
    // Generic confirm delete
    // ---------------------------
    function confirmDelete({ title, subtitle, onConfirm }) {
      Modal.open({
        title,
        subtitle,
        bodyHTML: `<div class="muted">Действие необратимо. Подтвердите удаление.</div>`,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn danger" id="btn-confirm">Удалить</button>
        `
      });
      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-confirm")?.addEventListener("click", () => { Modal.close(); onConfirm?.(); });
    }

    // ---------------------------
    // Buildings: view + form
    // ---------------------------
    function openBuildingView(b) {
      Modal.open({
        title: "Дом: просмотр",
        subtitle: b.address,
        bodyHTML: `
          <div class="tabs">
            <div class="tab active" data-tab="tab-general">Общая информация</div>
            <div class="tab" data-tab="tab-passport">Паспорт дома</div>
            <div class="tab" data-tab="tab-incidents">История аварий</div>
          </div>

          <div id="tab-general">
            <div class="row">
              <div class="field"><label>Адрес</label><input disabled value="${escapeHtml(b.address)}"></div>
              <div class="field"><label>Этажность</label><input disabled value="${escapeHtml(b.floors)}"></div>
              <div class="field"><label>Квартиры</label><input disabled value="${escapeHtml(b.apartments)}"></div>
              <div class="field"><label>Риски</label><input disabled value="${escapeHtml((b.risks||[]).join(", "))}"></div>
            </div>
          </div>

          <div id="tab-passport" style="display:none;">
            <div class="field">
              <label>Паспорт (JSON)</label>
              <textarea readonly style="min-height:220px;">${escapeHtml(JSON.stringify(b.passport || {}, null, 2))}</textarea>
            </div>
          </div>

          <div id="tab-incidents" style="display:none;">
            <div class="table-wrap">
              <table style="min-width:520px;">
                <thead><tr><th>Дата</th><th>Тип</th><th>Комментарий</th></tr></thead>
                <tbody>
                  ${(b.incidents||[]).map(i =>
                    `<tr><td>${escapeHtml(fmtDate(i.date))}</td><td>${escapeHtml(i.type)}</td><td>${escapeHtml(i.note)}</td></tr>`
                  ).join("") || `<tr><td colspan="3" class="muted">Нет аварий</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-close">Закрыть</button>
          <button class="btn primary" id="btn-edit">Редактировать</button>
        `
      });

      // tabs
      $$(".tab").forEach(t => {
        t.addEventListener("click", () => {
          $$(".tab").forEach(x => x.classList.remove("active"));
          t.classList.add("active");
          ["tab-general","tab-passport","tab-incidents"].forEach(id => {
            const el = $("#" + id);
            if (el) el.style.display = (id === t.dataset.tab) ? "block" : "none";
          });
        });
      });

      $("#btn-close")?.addEventListener("click", Modal.close);
      $("#btn-edit")?.addEventListener("click", () => { Modal.close(); openBuildingForm({ mode: "edit", building: b }); });
    }

    function openBuildingForm({ mode, building }) {
      const isEdit = mode === "edit";
      const b = building || { id: uid("bld"), address: "", floors: 0, apartments: 0, risks: [], passport: { elevators: [], itp: {} }, incidents: [] };

      Modal.open({
        title: isEdit ? "Дом: редактирование" : "Дом: создание",
        subtitle: "Риски — через запятую. Паспорт — JSON.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Адрес</label><input id="b-address" value="${escapeHtml(b.address)}" placeholder="г. ..., ул. ..., д. ..."></div>
            <div class="field"><label>Этажность</label><input id="b-floors" type="number" min="0" value="${escapeHtml(b.floors)}"></div>
            <div class="field"><label>Квартиры</label><input id="b-apts" type="number" min="0" value="${escapeHtml(b.apartments)}"></div>
            <div class="field"><label>Флаги рисков (через запятую)</label><input id="b-risks" value="${escapeHtml((b.risks||[]).join(", "))}" placeholder="elevators, leaks, fire"></div>
          </div>
          <div style="height:12px;"></div>
          <div class="field"><label>Паспорт дома (JSON)</label><textarea id="b-passport">${escapeHtml(JSON.stringify(b.passport || {}, null, 2))}</textarea></div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const address = $("#b-address").value.trim();
        if (!address) return alert("Адрес обязателен");

        let passport = {};
        try { passport = JSON.parse($("#b-passport").value || "{}"); }
        catch { return alert("Паспорт дома: некорректный JSON"); }

        const updated = {
          ...b,
          address,
          floors: Number($("#b-floors").value || 0),
          apartments: Number($("#b-apts").value || 0),
          risks: $("#b-risks").value.split(",").map(x => x.trim()).filter(Boolean),
          passport
        };

        if (isEdit) window.crmData.buildings = window.crmData.buildings.map(x => x.id === b.id ? updated : x);
        else window.crmData.buildings.push(updated);

        saveData();
        Modal.close();
        route("buildings");
      });
    }

    // ---------------------------
    // Residents: form
    // ---------------------------
    function openResidentForm({ mode, resident }) {
      const isEdit = mode === "edit";
      const r = resident || { id: uid("res"), buildingId: window.crmData.buildings[0]?.id, name: "", apartment: "", phone: "", status: "active" };

      const bOptions = window.crmData.buildings
        .map(b => `<option value="${b.id}" ${b.id===r.buildingId?"selected":""}>${escapeHtml(b.address)}</option>`)
        .join("");

      Modal.open({
        title: isEdit ? "Жилец: редактирование" : "Жилец: создание",
        subtitle: "Минимальный профиль жильца.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>ФИО</label><input id="r-name" value="${escapeHtml(r.name)}"></div>
            <div class="field"><label>Дом</label><select id="r-building">${bOptions}</select></div>
            <div class="field"><label>Квартира</label><input id="r-apt" value="${escapeHtml(r.apartment)}"></div>
            <div class="field"><label>Телефон</label><input id="r-phone" value="${escapeHtml(r.phone)}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const name = $("#r-name").value.trim();
        if (!name) return alert("ФИО обязательно");

        const updated = {
          ...r,
          name,
          buildingId: $("#r-building").value,
          apartment: $("#r-apt").value.trim(),
          phone: $("#r-phone").value.trim()
        };

        window.crmData.residents = window.crmData.residents || [];
        if (isEdit) window.crmData.residents = window.crmData.residents.map(x => x.id === r.id ? updated : x);
        else window.crmData.residents.push(updated);

        saveData();
        Modal.close();
        route("residents");
      });
    }

    // ---------------------------
    // Tickets: form
    // ---------------------------
    function openTicketForm({ mode, ticket }) {
      const isEdit = mode === "edit";
      const t = ticket || { id: uid("tkt"), buildingId: window.crmData.buildings[0]?.id, category: "Общее", status: "open", createdAt: new Date().toISOString().slice(0,10), title: "" };

      const bOptions = window.crmData.buildings
        .map(b => `<option value="${b.id}" ${b.id===t.buildingId?"selected":""}>${escapeHtml(b.address)}</option>`)
        .join("");

      Modal.open({
        title: isEdit ? "Обращение: редактирование" : "Обращение: создание",
        subtitle: "Базовые поля заявки.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Тема</label><input id="t-title" value="${escapeHtml(t.title)}" placeholder="Коротко о проблеме"></div>
            <div class="field"><label>Дом</label><select id="t-building">${bOptions}</select></div>
            <div class="field"><label>Категория</label><input id="t-cat" value="${escapeHtml(t.category)}"></div>
            <div class="field">
              <label>Статус</label>
              <select id="t-status">
                <option value="open" ${t.status==="open"?"selected":""}>open</option>
                <option value="processing" ${t.status==="processing"?"selected":""}>processing</option>
                <option value="closed" ${t.status==="closed"?"selected":""}>closed</option>
              </select>
            </div>
            <div class="field"><label>Дата</label><input id="t-date" type="date" value="${escapeHtml(t.createdAt)}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const title = $("#t-title").value.trim();
        if (!title) return alert("Тема обязательна");

        const updated = {
          ...t,
          title,
          buildingId: $("#t-building").value,
          category: $("#t-cat").value.trim() || "Общее",
          status: $("#t-status").value,
          createdAt: $("#t-date").value || t.createdAt
        };

        window.crmData.tickets = window.crmData.tickets || [];
        if (isEdit) window.crmData.tickets = window.crmData.tickets.map(x => x.id === t.id ? updated : x);
        else window.crmData.tickets.push(updated);

        saveData();
        Modal.close();
        route("tickets");
      });
    }

    // ---------------------------
    // Services: form
    // ---------------------------
    function openServiceForm({ mode, service }) {
      const isEdit = mode === "edit";
      const s = service || {
        id: uid("svc"),
        name: "",
        type: "main",
        tariff: 0,
        period: "month",
        buildingId: window.crmData.buildings[0]?.id,
        contractorId: window.crmData.contractors[0]?.id,
        sla: ""
      };

      const bOptions = window.crmData.buildings.map(b => `<option value="${b.id}" ${b.id===s.buildingId?"selected":""}>${escapeHtml(b.address)}</option>`).join("");
      const cOptions = ['<option value="">— не задано —</option>'].concat(
        window.crmData.contractors.map(c => `<option value="${c.id}" ${c.id===s.contractorId?"selected":""}>${escapeHtml(c.legalName)}</option>`)
      ).join("");

      Modal.open({
        title: isEdit ? "Услуга: редактирование" : "Услуга: создание",
        subtitle: "Привязка к дому и подрядчику.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Название</label><input id="s-name" value="${escapeHtml(s.name)}"></div>
            <div class="field">
              <label>Тип</label>
              <select id="s-type">
                <option value="main" ${s.type==="main"?"selected":""}>main</option>
                <option value="additional" ${s.type==="additional"?"selected":""}>additional</option>
              </select>
            </div>
            <div class="field"><label>Дом</label><select id="s-building">${bOptions}</select></div>
            <div class="field"><label>Подрядчик</label><select id="s-contractor">${cOptions}</select></div>
            <div class="field"><label>Тариф (₽)</label><input id="s-tariff" type="number" min="0" step="0.1" value="${escapeHtml(s.tariff)}"></div>
            <div class="field">
              <label>Период</label>
              <select id="s-period">
                <option value="month" ${s.period==="month"?"selected":""}>month</option>
                <option value="quarter" ${s.period==="quarter"?"selected":""}>quarter</option>
                <option value="year" ${s.period==="year"?"selected":""}>year</option>
              </select>
            </div>
          </div>
          <div style="height:12px;"></div>
          <div class="field"><label>SLA</label><textarea id="s-sla">${escapeHtml(s.sla || "")}</textarea></div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const name = $("#s-name").value.trim();
        if (!name) return alert("Название обязательно");

        const updated = {
          ...s,
          name,
          type: $("#s-type").value,
          buildingId: $("#s-building").value,
          contractorId: $("#s-contractor").value || null,
          tariff: Number($("#s-tariff").value || 0),
          period: $("#s-period").value,
          sla: $("#s-sla").value.trim()
        };

        if (isEdit) window.crmData.services = window.crmData.services.map(x => x.id === s.id ? updated : x);
        else window.crmData.services.push(updated);

        saveData();
        Modal.close();
        route("services");
      });
    }

    // ---------------------------
    // Payments: form
    // ---------------------------
    function openPaymentForm({ mode, payment }) {
      const isEdit = mode === "edit";
      const p = payment || {
        id: uid("pay"),
        serviceId: window.crmData.services[0]?.id,
        amount: 0,
        status: "charged",
        date: new Date().toISOString().slice(0, 10),
        payer: "Жильцы / ЕПД"
      };

      const svcOptions = window.crmData.services.map(s => {
        const b = window.crmData.buildings.find(x => x.id === s.buildingId);
        return `<option value="${s.id}" ${s.id===p.serviceId?"selected":""}>${escapeHtml(s.name)} • ${escapeHtml(b?.address || "—")}</option>`;
      }).join("");

      Modal.open({
        title: isEdit ? "Платеж: редактирование" : "Создать начисление",
        subtitle: "Начисление привязывается к услуге (услуга привязана к дому).",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Услуга</label><select id="p-service">${svcOptions}</select></div>
            <div class="field"><label>Сумма (₽)</label><input id="p-amount" type="number" min="0" step="1" value="${escapeHtml(p.amount)}"></div>
            <div class="field"><label>Дата</label><input id="p-date" type="date" value="${escapeHtml(p.date)}"></div>
            <div class="field">
              <label>Статус</label>
              <select id="p-status">
                <option value="charged" ${p.status==="charged"?"selected":""}>charged</option>
                <option value="processing" ${p.status==="processing"?"selected":""}>processing</option>
                <option value="paid" ${p.status==="paid"?"selected":""}>paid</option>
              </select>
            </div>
            <div class="field" style="grid-column:span 2"><label>Плательщик</label><input id="p-payer" value="${escapeHtml(p.payer || "")}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const updated = {
          ...p,
          serviceId: $("#p-service").value,
          amount: Number($("#p-amount").value || 0),
          date: $("#p-date").value || p.date,
          status: $("#p-status").value,
          payer: $("#p-payer").value.trim()
        };

        if (isEdit) window.crmData.payments = window.crmData.payments.map(x => x.id === p.id ? updated : x);
        else window.crmData.payments.push(updated);

        saveData();
        Modal.close();
        route("payments");
      });
    }

    // ---------------------------
    // Contractors: view + form
    // ---------------------------
    function openContractorView(c) {
      const relatedServices = window.crmData.services.filter(s => s.contractorId === c.id);
      const relatedDocs = window.crmData.documents.filter(d => d.entityId === c.id);

      Modal.open({
        title: "Подрядчик: просмотр",
        subtitle: c.legalName,
        bodyHTML: `
          <div class="row">
            <div class="field"><label>ИНН</label><input disabled value="${escapeHtml(c.inn)}"></div>
            <div class="field"><label>Статус</label><input disabled value="${escapeHtml(c.status)}"></div>
            <div class="field" style="grid-column:span 2"><label>Виды работ</label><input disabled value="${escapeHtml((c.workTypes||[]).join(", "))}"></div>
            <div class="field"><label>Банк</label><input disabled value="${escapeHtml(c.bankDetails?.bank || "")}"></div>
            <div class="field"><label>БИК</label><input disabled value="${escapeHtml(c.bankDetails?.bik || "")}"></div>
            <div class="field" style="grid-column:span 2"><label>Счет</label><input disabled value="${escapeHtml(c.bankDetails?.account || "")}"></div>
          </div>

          <div style="height:12px;"></div>
          <div class="field">
            <label>Связанные услуги</label>
            <textarea readonly style="min-height:90px;">${escapeHtml(relatedServices.map(s => s.name).join(" • ") || "—")}</textarea>
          </div>
          <div style="height:10px;"></div>
          <div class="field">
            <label>Документы</label>
            <textarea readonly style="min-height:90px;">${escapeHtml(relatedDocs.map(d => `${d.type}:${d.name}`).join(" • ") || "—")}</textarea>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-close">Закрыть</button>
          <button class="btn primary" id="btn-edit">Редактировать</button>
        `
      });

      $("#btn-close")?.addEventListener("click", Modal.close);
      $("#btn-edit")?.addEventListener("click", () => { Modal.close(); openContractorForm({ mode: "edit", contractor: c }); });
    }

    function openContractorForm({ mode, contractor }) {
      const isEdit = mode === "edit";
      const c = contractor || {
        id: uid("ctr"),
        legalName: "",
        inn: "",
        workTypes: [],
        bankDetails: { bank: "", bik: "", account: "" },
        status: "pending"
      };

      Modal.open({
        title: isEdit ? "Подрядчик: редактирование" : "Подрядчик: создание",
        subtitle: "Юридические и банковские данные.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Название (юр.)</label><input id="c-name" value="${escapeHtml(c.legalName)}"></div>
            <div class="field"><label>ИНН</label><input id="c-inn" value="${escapeHtml(c.inn)}"></div>
            <div class="field" style="grid-column:span 2"><label>Виды работ (через запятую)</label><input id="c-works" value="${escapeHtml((c.workTypes||[]).join(", "))}"></div>
            <div class="field"><label>Статус проверки</label>
              <select id="c-status">
                <option value="pending" ${c.status==="pending"?"selected":""}>pending</option>
                <option value="verified" ${c.status==="verified"?"selected":""}>verified</option>
                <option value="rejected" ${c.status==="rejected"?"selected":""}>rejected</option>
              </select>
            </div>
            <div></div>
            <div class="field"><label>Банк</label><input id="c-bank" value="${escapeHtml(c.bankDetails?.bank || "")}"></div>
            <div class="field"><label>БИК</label><input id="c-bik" value="${escapeHtml(c.bankDetails?.bik || "")}"></div>
            <div class="field" style="grid-column:span 2"><label>Счет</label><input id="c-account" value="${escapeHtml(c.bankDetails?.account || "")}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const legalName = $("#c-name").value.trim();
        if (!legalName) return alert("Название обязательно");

        const updated = {
          ...c,
          legalName,
          inn: $("#c-inn").value.trim(),
          workTypes: $("#c-works").value.split(",").map(x => x.trim()).filter(Boolean),
          status: $("#c-status").value,
          bankDetails: {
            bank: $("#c-bank").value.trim(),
            bik: $("#c-bik").value.trim(),
            account: $("#c-account").value.trim()
          }
        };

        if (isEdit) window.crmData.contractors = window.crmData.contractors.map(x => x.id === c.id ? updated : x);
        else window.crmData.contractors.push(updated);

        saveData();
        Modal.close();
        route("contractors");
      });
    }

    // ---------------------------
    // Documents: form
    // ---------------------------
    function openDocForm({ mode, doc }) {
      const isEdit = mode === "edit";
      const d = doc || { id: uid("doc"), type: "other", name: "", link: "#", status: "pending", entityId: "" };

      Modal.open({
        title: isEdit ? "Документ: редактирование" : "Документ: создание",
        subtitle: "Тип/статус/ссылка/привязка (entityId).",
        bodyHTML: `
          <div class="row">
            <div class="field">
              <label>Тип</label>
              <select id="d-type">
                <option value="contract" ${d.type==="contract"?"selected":""}>contract</option>
                <option value="act" ${d.type==="act"?"selected":""}>act</option>
                <option value="license" ${d.type==="license"?"selected":""}>license</option>
                <option value="other" ${d.type==="other"?"selected":""}>other</option>
              </select>
            </div>
            <div class="field">
              <label>Статус</label>
              <select id="d-status">
                <option value="pending" ${d.status==="pending"?"selected":""}>pending</option>
                <option value="signed" ${d.status==="signed"?"selected":""}>signed</option>
                <option value="rejected" ${d.status==="rejected"?"selected":""}>rejected</option>
              </select>
            </div>
            <div class="field" style="grid-column:span 2"><label>Название</label><input id="d-name" value="${escapeHtml(d.name)}"></div>
            <div class="field" style="grid-column:span 2"><label>Ссылка</label><input id="d-link" value="${escapeHtml(d.link || "#")}"></div>
            <div class="field" style="grid-column:span 2"><label>Entity ID (id подрядчика/услуги/УК)</label><input id="d-entity" value="${escapeHtml(d.entityId || "")}" placeholder="например: contractorId"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const name = $("#d-name").value.trim();
        if (!name) return alert("Название обязательно");

        const updated = {
          ...d,
          type: $("#d-type").value,
          status: $("#d-status").value,
          name,
          link: $("#d-link").value.trim() || "#",
          entityId: $("#d-entity").value.trim()
        };

        if (isEdit) window.crmData.documents = window.crmData.documents.map(x => x.id === d.id ? updated : x);
        else window.crmData.documents.push(updated);

        saveData();
        Modal.close();
        route("documents");
      });
    }

    // ---------------------------
    // Company profile: form
    // ---------------------------
    function openCompanyForm() {
      const c = window.crmData.currentCompany || {};
      Modal.open({
        title: "Профиль УК: редактирование",
        subtitle: "Юридические данные и контакты.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Наименование</label><input id="co-name" value="${escapeHtml(c.legalName || "")}"></div>
            <div class="field"><label>Регион</label><input id="co-region" value="${escapeHtml(c.region || "")}"></div>
            <div class="field"><label>ИНН</label><input id="co-inn" value="${escapeHtml(c.inn || "")}"></div>
            <div class="field"><label>ОГРН</label><input id="co-ogrn" value="${escapeHtml(c.ogrn || "")}"></div>
            <div class="field"><label>Телефон</label><input id="co-phone" value="${escapeHtml(c.contacts?.phone || "")}"></div>
            <div class="field"><label>Email</label><input id="co-email" value="${escapeHtml(c.contacts?.email || "")}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        window.crmData.currentCompany = {
          ...window.crmData.currentCompany,
          legalName: $("#co-name").value.trim(),
          region: $("#co-region").value.trim(),
          inn: $("#co-inn").value.trim(),
          ogrn: $("#co-ogrn").value.trim(),
          contacts: {
            phone: $("#co-phone").value.trim(),
            email: $("#co-email").value.trim()
          }
        };
        saveData();
        Modal.close();
        route("profile");
      });
    }

    // ---------------------------
    // Requisites: form
    // ---------------------------
    function openRequisitesForm() {
      const r = window.crmData.currentCompany?.requisites || {};
      Modal.open({
        title: "Реквизиты: редактирование",
        subtitle: "Поля для оплат и договоров.",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Получатель</label><input id="rq-payee" value="${escapeHtml(r.payee || "")}"></div>
            <div class="field"><label>Банк</label><input id="rq-bank" value="${escapeHtml(r.bank || "")}"></div>
            <div class="field"><label>ИНН</label><input id="rq-inn" value="${escapeHtml(r.inn || "")}"></div>
            <div class="field"><label>КПП</label><input id="rq-kpp" value="${escapeHtml(r.kpp || "")}"></div>
            <div class="field"><label>БИК</label><input id="rq-bik" value="${escapeHtml(r.bik || "")}"></div>
            <div class="field"><label>Р/с</label><input id="rq-account" value="${escapeHtml(r.account || "")}"></div>
            <div class="field"><label>К/с</label><input id="rq-corr" value="${escapeHtml(r.corrAccount || "")}"></div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        window.crmData.currentCompany.requisites = {
          payee: $("#rq-payee").value.trim(),
          bank: $("#rq-bank").value.trim(),
          inn: $("#rq-inn").value.trim(),
          kpp: $("#rq-kpp").value.trim(),
          bik: $("#rq-bik").value.trim(),
          account: $("#rq-account").value.trim(),
          corrAccount: $("#rq-corr").value.trim(),
        };
        saveData();
        Modal.close();
        route("requisites");
      });
    }

    // ---------------------------
    // Users: form
    // ---------------------------
    function openUserForm({ mode, user }) {
      const isEdit = mode === "edit";
      const u = user || { id: uid("usr"), name: "", role: "dispatcher", permissions: [] };

      Modal.open({
        title: isEdit ? "Пользователь: редактирование" : "Пользователь: создание",
        subtitle: "Роль и список permissions (через запятую).",
        bodyHTML: `
          <div class="row">
            <div class="field"><label>Имя</label><input id="u-name" value="${escapeHtml(u.name)}"></div>
            <div class="field">
              <label>Роль</label>
              <select id="u-role">
                <option value="dispatcher" ${u.role==="dispatcher"?"selected":""}>dispatcher</option>
                <option value="engineer" ${u.role==="engineer"?"selected":""}>engineer</option>
                <option value="accountant" ${u.role==="accountant"?"selected":""}>accountant</option>
                <option value="manager" ${u.role==="manager"?"selected":""}>manager</option>
              </select>
            </div>
            <div class="field" style="grid-column:span 2">
              <label>Permissions (через запятую)</label>
              <input id="u-perms" value="${escapeHtml((u.permissions || []).join(", "))}" placeholder="payments:read, docs:read, *">
            </div>
          </div>
        `,
        footerHTML: `
          <button class="btn" id="btn-cancel">Отмена</button>
          <button class="btn primary" id="btn-save">Сохранить</button>
        `
      });

      $("#btn-cancel")?.addEventListener("click", Modal.close);
      $("#btn-save")?.addEventListener("click", () => {
        const name = $("#u-name").value.trim();
        if (!name) return alert("Имя обязательно");

        const updated = {
          ...u,
          name,
          role: $("#u-role").value,
          permissions: $("#u-perms").value.split(",").map(x => x.trim()).filter(Boolean)
        };

        if (isEdit) window.crmData.users = window.crmData.users.map(x => x.id === u.id ? updated : x);
        else window.crmData.users.push(updated);

        saveData();
        Modal.close();
        renderTopUser();
        renderSidebar();
        route("users");
      });
    }

    // ---------------------------
    // CSV import helpers (PapaParse ready)
    // NOTE: not wired into UI in this starter; use when you add import buttons.
    // ---------------------------
    function parseCsvToObjects(file, cb) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (res) => cb(null, res.data),
        error: (err) => cb(err)
      });
    }

    return { init };
  })();

  // Boot
  document.addEventListener("DOMContentLoaded", App.init);
})();
