// app.js - Основной файл приложения CRM для УК xHouse

// Глобальный объект для хранения данных CRM
window.crmData = window.crmData || null;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты в шапке
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);

    // Инициализация данных
    initializeData();
    
    // Настройка навигации
    setupNavigation();
    
    // Инициализация графиков
    initializeCharts();
    
    // Настройка модальных окон
    setupModals();
    
    // Загрузка начальной страницы
    loadPage('dashboard');
});

// Инициализация тестовых данных в localStorage
function initializeData() {
    const storedData = localStorage.getItem('crmData');
    
    if (!storedData) {
        // Создаем тестовые данные
        window.crmData = {
            currentCompany: {
                id: 1,
                legalName: "ООО 'Управляющая Компания Профи'",
                inn: "7701234567",
                ogrn: "1177745678901",
                region: "Москва",
                contacts: {
                    phone: "+7 (495) 123-45-67",
                    email: "info@uk-profi.ru",
                    address: "ул. Тверская, д. 10"
                },
                licenses: ["Лицензия №12345", "Лицензия №67890"]
            },
            companies: [
                {
                    id: 1,
                    legalName: "ООО 'Управляющая Компания Профи'",
                    inn: "7701234567",
                    ogrn: "1177745678901",
                    region: "Москва",
                    contacts: {
                        phone: "+7 (495) 123-45-67",
                        email: "info@uk-profi.ru",
                        address: "ул. Тверская, д. 10"
                    },
                    licenses: ["Лицензия №12345", "Лицензия №67890"]
                }
            ],
            buildings: [
                {
                    id: 1,
                    address: "ул. Ленина, д. 15",
                    floors: 9,
                    apartments: 72,
                    risks: ["electrical", "elevator"],
                    passport: {
                        elevators: ["Пассажирский №1 - 2005г", "Грузовой - 2005г"],
                        itp: { type: "Индивидуальный", year: 2010 }
                    }
                },
                {
                    id: 2,
                    address: "пр. Победы, д. 42",
                    floors: 5,
                    apartments: 40,
                    risks: ["roof"],
                    passport: {
                        elevators: [],
                        itp: { type: "Центральный", year: 2008 }
                    }
                },
                {
                    id: 3,
                    address: "ул. Садовая, д. 7",
                    floors: 12,
                    apartments: 96,
                    risks: [],
                    passport: {
                        elevators: ["Пассажирский №1 - 2015г", "Пассажирский №2 - 2015г"],
                        itp: { type: "Индивидуальный", year: 2015 }
                    }
                }
            ],
            residents: [
                {
                    id: 1,
                    name: "Иванов Иван Иванович",
                    apartment: "15",
                    buildingId: 1,
                    phone: "+7 (916) 123-45-67",
                    email: "ivanov@mail.ru",
                    status: "active",
                    balance: 1500.50,
                    residentsCount: 3
                },
                {
                    id: 2,
                    name: "Петрова Мария Сергеевна",
                    apartment: "42",
                    buildingId: 1,
                    phone: "+7 (916) 234-56-78",
                    email: "petrova@mail.ru",
                    status: "active",
                    balance: -2300.75,
                    residentsCount: 2
                },
                {
                    id: 3,
                    name: "Сидоров Алексей Петрович",
                    apartment: "7",
                    buildingId: 2,
                    phone: "+7 (916) 345-67-89",
                    email: "sidorov@mail.ru",
                    status: "inactive",
                    balance: 0,
                    residentsCount: 1
                },
                {
                    id: 4,
                    name: "Козлова Елена Владимировна",
                    apartment: "23",
                    buildingId: 3,
                    phone: "+7 (916) 456-78-90",
                    email: "kozlova@mail.ru",
                    status: "active",
                    balance: 5000.25,
                    residentsCount: 4
                }
            ],
            tickets: [
                {
                    id: 1,
                    residentId: 1,
                    buildingId: 1,
                    type: "ремонт",
                    title: "Протечка в ванной комнате",
                    description: "Сильная протечка из потолка в ванной комнате",
                    status: "open",
                    priority: "high",
                    createdAt: "2024-08-01",
                    updatedAt: "2024-08-02",
                    assignedTo: "Дмитрий К."
                },
                {
                    id: 2,
                    residentId: 2,
                    buildingId: 1,
                    type: "электрика",
                    title: "Не работает розетка на кухне",
                    description: "Розетка перестала работать после грозы",
                    status: "in_progress",
                    priority: "medium",
                    createdAt: "2024-08-03",
                    updatedAt: "2024-08-04",
                    assignedTo: "Дмитрий К."
                },
                {
                    id: 3,
                    residentId: 4,
                    buildingId: 3,
                    type: "уборка",
                    title: "Не убран мусор в подъезде",
                    description: "Мусор не вывозится уже 3 дня",
                    status: "resolved",
                    priority: "low",
                    createdAt: "2024-07-28",
                    updatedAt: "2024-07-30",
                    assignedTo: "Алексей М."
                },
                {
                    id: 4,
                    residentId: 3,
                    buildingId: 2,
                    type: "отопление",
                    title: "Холодные батареи",
                    description: "В квартире холодно, батареи еле теплые",
                    status: "open",
                    priority: "high",
                    createdAt: "2024-08-05",
                    updatedAt: "2024-08-05",
                    assignedTo: "Дмитрий К."
                }
            ],
            services: [
                {
                    id: 1,
                    name: "Содержание общего имущества",
                    type: "main",
                    tariff: 25.50,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 1,
                    sla: "24/7",
                    description: "Уборка подъездов, обслуживание лифтов, ремонт общедомового оборудования"
                },
                {
                    id: 2,
                    name: "Вывоз ТКО",
                    type: "main",
                    tariff: 15.30,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 2,
                    sla: "ежедневно",
                    description: "Вывоз твердых коммунальных отходов"
                },
                {
                    id: 3,
                    name: "Ремонт лифтового оборудования",
                    type: "additional",
                    tariff: 1200.00,
                    period: "on-demand",
                    buildingId: 1,
                    contractorId: 3,
                    sla: "4 часа",
                    description: "Экстренный и плановый ремонт лифтов"
                },
                {
                    id: 4,
                    name: "Техническое обслуживание ИТП",
                    type: "main",
                    tariff: 18.75,
                    period: "monthly",
                    buildingId: 3,
                    contractorId: 1,
                    sla: "24 часа",
                    description: "Обслуживание индивидуального теплового пункта"
                }
            ],
            contractors: [
                {
                    id: 1,
                    legalName: "ООО 'Сервис Плюс'",
                    inn: "7712345678",
                    workTypes: ["уборка территории", "текущий ремонт"],
                    bankDetails: "АО 'Альфа-Банк' р/с 40702810123450001234",
                    status: "активен"
                },
                {
                    id: 2,
                    legalName: "ООО 'Эко-Транс'",
                    inn: "7723456789",
                    workTypes: ["вывоз ТКО", "утилизация"],
                    bankDetails: "ПАО 'Сбербанк' р/с 40702810234560002345",
                    status: "активен"
                },
                {
                    id: 3,
                    legalName: "ООО 'Лифт-Сервис'",
                    inn: "7734567890",
                    workTypes: ["ремонт лифтов", "техническое обслуживание"],
                    bankDetails: "АО 'Тинькофф Банк' р/с 40702810345670003456",
                    status: "на проверке"
                }
            ],
            payments: [
                {
                    id: 1,
                    serviceId: 1,
                    amount: 1836.00,
                    status: "paid",
                    date: "2024-08-01",
                    payer: "ООО 'УК Профи'"
                },
                {
                    id: 2,
                    serviceId: 2,
                    amount: 1101.60,
                    status: "paid",
                    date: "2024-08-01",
                    payer: "ООО 'УК Профи'"
                },
                {
                    id: 3,
                    serviceId: 3,
                    amount: 1200.00,
                    status: "processing",
                    date: "2024-08-15",
                    payer: "ООО 'УК Профи'"
                },
                {
                    id: 4,
                    serviceId: 1,
                    amount: 1836.00,
                    status: "charged",
                    date: "2024-09-01",
                    payer: "ООО 'УК Профи'"
                }
            ],
            documents: [
                {
                    id: 1,
                    type: "договор",
                    name: "Договор с ООО 'Сервис Плюс'",
                    link: "#",
                    status: "signed",
                    entityId: 1,
                    date: "2024-01-15",
                    size: "2.4 MB",
                    category: "contracts"
                },
                {
                    id: 2,
                    type: "акт",
                    name: "Акт выполненных работ за июль 2024",
                    link: "#",
                    status: "pending",
                    entityId: 1,
                    date: "2024-08-01",
                    size: "1.8 MB",
                    category: "acts"
                },
                {
                    id: 3,
                    type: "лицензия",
                    name: "Лицензия на управление МКД",
                    link: "#",
                    status: "signed",
                    entityId: 1,
                    date: "2023-12-20",
                    size: "3.2 MB",
                    category: "licenses"
                },
                {
                    id: 4,
                    type: "отчет",
                    name: "Отчет по эксплуатации за 2 квартал 2024",
                    link: "#",
                    status: "signed",
                    entityId: 1,
                    date: "2024-07-15",
                    size: "4.5 MB",
                    category: "reports"
                },
                {
                    id: 5,
                    type: "смета",
                    name: "Смета на капитальный ремонт",
                    link: "#",
                    status: "pending",
                    entityId: 2,
                    date: "2024-08-10",
                    size: "1.2 MB",
                    category: "estimates"
                }
            ],
            requisites: [
                {
                    id: 1,
                    type: "банковские",
                    bankName: "ПАО Сбербанк",
                    accountNumber: "40702810123450001234",
                    correspondentAccount: "30101810400000000225",
                    bik: "044525225",
                    inn: "7701234567",
                    kpp: "770101001"
                },
                {
                    id: 2,
                    type: "электронные",
                    paymentSystem: "СБП (Система быстрых платежей)",
                    phone: "+7 (495) 123-45-67",
                    email: "payments@uk-profi.ru",
                    qrCode: "#"
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Алексей М.",
                    role: "manager",
                    permissions: ["all"]
                },
                {
                    id: 2,
                    name: "Ирина С.",
                    role: "accountant",
                    permissions: ["payments", "documents"]
                },
                {
                    id: 3,
                    name: "Дмитрий К.",
                    role: "engineer",
                    permissions: ["buildings", "services"]
                }
            ]
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
    } else {
        // Загружаем данные из localStorage
        window.crmData = JSON.parse(storedData);
    }
    
    console.log('Данные CRM инициализированы:', window.crmData);
}

// Настройка навигации по страницам
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Загружаем страницу
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
}

// Загрузка страницы по её названию
function loadPage(pageName) {
    const contentArea = document.getElementById('content-area');
    
    // Показываем индикатор загрузки
    contentArea.innerHTML = '<div class="loading">Загрузка...</div>';
    
    // Загружаем содержимое страницы
    setTimeout(() => {
        switch(pageName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'buildings':
                loadBuildings();
                break;
            case 'residents':
                loadResidents();
                break;
            case 'tickets':
                loadTickets();
                break;
            case 'services':
                loadServices();
                break;
            case 'payments':
                loadPayments();
                break;
            case 'contractors':
                loadContractors();
                break;
            case 'documents':
                loadDocuments();
                break;
            case 'requisites':
                loadRequisites();
                break;
            case 'profile':
                loadProfile();
                break;
            default:
                loadDashboard();
        }
    }, 300);
}

// Загрузка страницы аналитики
function loadDashboard() {
    const contentArea = document.getElementById('content-area');
    
    // Получаем данные для статистики
    const totalCharged = window.crmData.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0);
    const totalProcessing = window.crmData.payments
        .filter(p => p.status === 'processing')
        .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Статистика по обращениям
    const activeTickets = window.crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
    const resolvedTickets = window.crmData.tickets.filter(t => t.status === 'resolved').length;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Аналитика</h2>
            <div class="date-range">
                <button class="btn btn-secondary">
                    <i class="fas fa-calendar-alt"></i> Август 2024
                </button>
            </div>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Начислено за месяц</h3>
                <div class="stat-value">${totalCharged.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">+12.5% с прошлого месяца</div>
            </div>
            <div class="stat-card">
                <h3>Оплачено</h3>
                <div class="stat-value">${totalPaid.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">+8.3% с прошлого месяца</div>
            </div>
            <div class="stat-card">
                <h3>Дома в управлении</h3>
                <div class="stat-value">${window.crmData.buildings.length}</div>
                <div class="stat-change">+2 в этом месяце</div>
            </div>
            <div class="stat-card">
                <h3>Активные обращения</h3>
                <div class="stat-value">${activeTickets}</div>
                <div class="stat-change">Решено: ${resolvedTickets}</div>
            </div>
        </div>
        <div style="margin-bottom: 30px;">
            <canvas id="analyticsChart" style="height: 400px; width: 100%;"></canvas>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Адрес дома</th>
                        <th>Квартиры</th>
                        <th>Начислено</th>
                        <th>Оплачено</th>
                        <th>Задолженность</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.buildings.map(building => `
                        <tr>
                            <td>${building.address}</td>
                            <td>${building.apartments}</td>
                            <td>${(building.apartments * 1500).toLocaleString('ru-RU')} ₽</td>
                            <td>${(building.apartments * 1350).toLocaleString('ru-RU')} ₽</td>
                            <td>${(building.apartments * 150).toLocaleString('ru-RU')} ₽</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Инициализируем график
    initializeChart();
}

// Загрузка страницы домов
function loadBuildings() {
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Дома</h2>
            <button class="btn btn-primary" id="addBuildingBtn">
                <i class="fas fa-plus"></i> Добавить дом
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Адрес</th>
                        <th>Этажи</th>
                        <th>Квартиры</th>
                        <th>Флаги рисков</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.buildings.map(building => `
                        <tr>
                            <td><strong>${building.address}</strong></td>
                            <td>${building.floors}</td>
                            <td>${building.apartments}</td>
                            <td>
                                ${building.risks.map(risk => {
                                    let riskClass, riskText;
                                    switch(risk) {
                                        case 'electrical': riskClass = 'risk-high'; riskText = 'Электрика'; break;
                                        case 'roof': riskClass = 'risk-medium'; riskText = 'Крыша'; break;
                                        case 'elevator': riskClass = 'risk-high'; riskText = 'Лифт'; break;
                                        case 'plumbing': riskClass = 'risk-medium'; riskText = 'Водопровод'; break;
                                        default: riskClass = 'risk-low'; riskText = risk;
                                    }
                                    return `<span class="risk-flag ${riskClass}"></span>${riskText}`;
                                }).join('<br>')}
                                ${building.risks.length === 0 ? '<span class="risk-flag risk-low"></span>Нет рисков' : ''}
                            </td>
                            <td>
                                <button class="btn btn-secondary" onclick="viewBuilding(${building.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-secondary" onclick="editBuilding(${building.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-secondary" onclick="deleteBuilding(${building.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Добавляем обработчик для кнопки добавления дома
    document.getElementById('addBuildingBtn').addEventListener('click', () => {
        openModal('buildingModal');
    });
}

// Загрузка страницы жильцов (реальная реализация вместо заглушки)
function loadResidents() {
    const contentArea = document.getElementById('content-area');
    
    // Рассчитываем статистику по жильцам
    const totalResidents = window.crmData.residents.length;
    const activeResidents = window.crmData.residents.filter(r => r.status === 'active').length;
    const debtors = window.crmData.residents.filter(r => r.balance < 0).length;
    const totalDebt = window.crmData.residents
        .filter(r => r.balance < 0)
        .reduce((sum, r) => sum + Math.abs(r.balance), 0);
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Жильцы</h2>
            <button class="btn btn-primary" id="addResidentBtn">
                <i class="fas fa-plus"></i> Добавить жильца
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего жильцов</h3>
                <div class="stat-value">${totalResidents}</div>
                <div class="stat-change">в ${window.crmData.buildings.length} домах</div>
            </div>
            <div class="stat-card">
                <h3>Активные</h3>
                <div class="stat-value">${activeResidents}</div>
                <div class="stat-change">${((activeResidents / totalResidents) * 100).toFixed(1)}%</div>
            </div>
            <div class="stat-card">
                <h3>Должники</h3>
                <div class="stat-value">${debtors}</div>
                <div class="stat-change">Сумма долга: ${totalDebt.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div class="stat-card">
                <h3>Средний долг</h3>
                <div class="stat-value">${debtors > 0 ? (totalDebt / debtors).toLocaleString('ru-RU', {maximumFractionDigits: 0}) : '0'} ₽</div>
                <div class="stat-change">на должника</div>
            </div>
        </div>
        
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-secondary active" onclick="filterResidents('all')">Все</button>
                <button class="btn btn-secondary" onclick="filterResidents('active')">Активные</button>
                <button class="btn btn-secondary" onclick="filterResidents('inactive')">Неактивные</button>
                <button class="btn btn-secondary" onclick="filterResidents('debtors')">Должники</button>
                <button class="btn btn-secondary" onclick="filterResidents('no-debt')">Без долгов</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Дом</th>
                        <th>Квартира</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody id="residentsTableBody">
                    ${window.crmData.residents.map(resident => {
                        const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
                        const buildingName = building ? building.address : 'Неизвестно';
                        
                        const balanceClass = resident.balance < 0 ? 'status-pending' : 'status-paid';
                        const balanceText = `${resident.balance.toLocaleString('ru-RU')} ₽`;
                        
                        const statusClass = resident.status === 'active' ? 'status-paid' : 'status-processing';
                        const statusText = resident.status === 'active' ? 'Активен' : 'Неактивен';
                        
                        return `
                            <tr>
                                <td><strong>${resident.name}</strong></td>
                                <td>${buildingName}</td>
                                <td>${resident.apartment}</td>
                                <td>${resident.phone || 'Не указан'}</td>
                                <td>${resident.email || 'Не указан'}</td>
                                <td><span class="status-badge ${balanceClass}">${balanceText}</span></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewResidentDetails(${resident.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editResident(${resident.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="sendNotificationToResident(${resident.id})">
                                        <i class="fas fa-bell"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: var(--primary-light); border-radius: 12px;">
            <h4><i class="fas fa-chart-bar"></i> Аналитика по жильцам</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 15px;">
                <div>
                    <strong>Распределение по домам:</strong>
                    ${window.crmData.buildings.map(building => {
                        const residentsInBuilding = window.crmData.residents.filter(r => r.buildingId === building.id).length;
                        return `<div style="margin-top: 5px;">${building.address}: ${residentsInBuilding} чел.</div>`;
                    }).join('')}
                </div>
                <div>
                    <strong>Статистика долгов:</strong>
                    <div style="margin-top: 5px;">Общий долг: ${totalDebt.toLocaleString('ru-RU')} ₽</div>
                    <div style="margin-top: 5px;">Должников: ${debtors}</div>
                    <div style="margin-top: 5px;">Процент должников: ${((debtors / totalResidents) * 100).toFixed(1)}%</div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем обработчик для кнопки добавления жильца
    document.getElementById('addResidentBtn').addEventListener('click', function() {
        showAddResidentModal();
    });
}

// Загрузка страницы обращений (реальная реализация вместо заглушки)
function loadTickets() {
    const contentArea = document.getElementById('content-area');
    
    // Статистика по обращениям
    const totalTickets = window.crmData.tickets ? window.crmData.tickets.length : 0;
    const openTickets = window.crmData.tickets ? window.crmData.tickets.filter(t => t.status === 'open').length : 0;
    const inProgressTickets = window.crmData.tickets ? window.crmData.tickets.filter(t => t.status === 'in_progress').length : 0;
    const resolvedTickets = window.crmData.tickets ? window.crmData.tickets.filter(t => t.status === 'resolved').length : 0;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
            <button class="btn btn-primary" id="createTicketBtn">
                <i class="fas fa-plus"></i> Создать обращение
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего обращений</h3>
                <div class="stat-value">${totalTickets}</div>
                <div class="stat-change">за все время</div>
            </div>
            <div class="stat-card">
                <h3>Открытые</h3>
                <div class="stat-value">${openTickets}</div>
                <div class="stat-change">требуют внимания</div>
            </div>
            <div class="stat-card">
                <h3>В работе</h3>
                <div class="stat-value">${inProgressTickets}</div>
                <div class="stat-change">исполняются</div>
            </div>
            <div class="stat-card">
                <h3>Решённые</h3>
                <div class="stat-value">${resolvedTickets}</div>
                <div class="stat-change">${totalTickets > 0 ? ((resolvedTickets / totalTickets) * 100).toFixed(1) : 0}%</div>
            </div>
        </div>
        
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-secondary active" onclick="filterTickets('all')">Все</button>
                <button class="btn btn-secondary" onclick="filterTickets('open')">Открытые</button>
                <button class="btn btn-secondary" onclick="filterTickets('in_progress')">В работе</button>
                <button class="btn btn-secondary" onclick="filterTickets('resolved')">Решённые</button>
                <button class="btn btn-secondary" onclick="filterTickets('high')">Высокий приоритет</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тема</th>
                        <th>Жилец</th>
                        <th>Тип</th>
                        <th>Приоритет</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Ответственный</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody id="ticketsTableBody">
                    ${window.crmData.tickets ? window.crmData.tickets.map(ticket => {
                        const resident = window.crmData.residents.find(r => r.id === ticket.residentId);
                        const residentName = resident ? resident.name : 'Неизвестно';
                        
                        // Определяем класс приоритета
                        let priorityClass = 'status-paid';
                        let priorityText = 'Низкий';
                        if (ticket.priority === 'high') {
                            priorityClass = 'risk-high';
                            priorityText = 'Высокий';
                        } else if (ticket.priority === 'medium') {
                            priorityClass = 'risk-medium';
                            priorityText = 'Средний';
                        }
                        
                        // Определяем класс статуса
                        let statusClass = 'status-pending';
                        let statusText = 'Открыто';
                        if (ticket.status === 'in_progress') {
                            statusClass = 'status-processing';
                            statusText = 'В работе';
                        } else if (ticket.status === 'resolved') {
                            statusClass = 'status-paid';
                            statusText = 'Решено';
                        }
                        
                        return `
                            <tr>
                                <td>#${ticket.id}</td>
                                <td><strong>${ticket.title}</strong></td>
                                <td>${residentName}</td>
                                <td>${ticket.type}</td>
                                <td><span class="status-badge ${priorityClass}">${priorityText}</span></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${ticket.createdAt}</td>
                                <td>${ticket.assignedTo || 'Не назначен'}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewTicketDetails(${ticket.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="assignTicket(${ticket.id})">
                                        <i class="fas fa-user-check"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="closeTicket(${ticket.id})">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('') : '<tr><td colspan="9" style="text-align: center;">Обращений пока нет</td></tr>'}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-list-ol"></i> Типы обращений</h4>
                <div style="margin-top: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Ремонтные работы</span>
                        <span>${window.crmData.tickets ? window.crmData.tickets.filter(t => t.type === 'ремонт').length : 0}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Электрика</span>
                        <span>${window.crmData.tickets ? window.crmData.tickets.filter(t => t.type === 'электрика').length : 0}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Сантехника</span>
                        <span>${window.crmData.tickets ? window.crmData.tickets.filter(t => t.type === 'сантехника').length : 0}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Уборка</span>
                        <span>${window.crmData.tickets ? window.crmData.tickets.filter(t => t.type === 'уборка').length : 0}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--primary-light); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-clock"></i> Среднее время решения</h4>
                <div style="text-align: center; margin-top: 20px;">
                    <div style="font-size: 36px; font-weight: bold; color: var(--primary);">2.3</div>
                    <div style="font-size: 18px; color: var(--gray-700);">дня</div>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: var(--gray-700);">
                    Среднее время решения обращений за последние 30 дней
                </p>
            </div>
        </div>
    `;
    
    // Добавляем обработчик для кнопки создания обращения
    document.getElementById('createTicketBtn').addEventListener('click', function() {
        showCreateTicketModal();
    });
}

// Загрузка страницы услуг (реальная реализация вместо заглушки)
function loadServices() {
    const contentArea = document.getElementById('content-area');
    
    // Статистика по услугам
    const totalServices = window.crmData.services.length;
    const mainServices = window.crmData.services.filter(s => s.type === 'main').length;
    const additionalServices = window.crmData.services.filter(s => s.type === 'additional').length;
    const totalMonthlyRevenue = window.crmData.services
        .filter(s => s.period === 'monthly')
        .reduce((sum, s) => sum + s.tariff, 0);
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
            <button class="btn btn-primary" id="addServiceBtn">
                <i class="fas fa-plus"></i> Добавить услугу
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего услуг</h3>
                <div class="stat-value">${totalServices}</div>
                <div class="stat-change">${mainServices} основных, ${additionalServices} доп.</div>
            </div>
            <div class="stat-card">
                <h3>Ежемесячный доход</h3>
                <div class="stat-value">${totalMonthlyRevenue.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">от регулярных услуг</div>
            </div>
            <div class="stat-card">
                <h3>Средний тариф</h3>
                <div class="stat-value">${(window.crmData.services.reduce((sum, s) => sum + s.tariff, 0) / totalServices).toLocaleString('ru-RU', {maximumFractionDigits: 2})} ₽</div>
                <div class="stat-change">за услугу</div>
            </div>
            <div class="stat-card">
                <h3>Активные подрядчики</h3>
                <div class="stat-value">${new Set(window.crmData.services.map(s => s.contractorId)).size}</div>
                <div class="stat-change">предоставляют услуги</div>
            </div>
        </div>
        
        <div class="tabs" style="margin-bottom: 20px;">
            <button class="tab active" data-tab="all">Все услуги</button>
            <button class="tab" data-tab="main">Основные</button>
            <button class="tab" data-tab="additional">Дополнительные</button>
            <button class="tab" data-tab="monthly">Ежемесячные</button>
            <button class="tab" data-tab="ondemand">По требованию</button>
        </div>
        
        <div class="table-container">
            <table id="servicesTable">
                <thead>
                    <tr>
                        <th>Название услуги</th>
                        <th>Тип</th>
                        <th>Тариф</th>
                        <th>Период</th>
                        <th>Дом</th>
                        <th>Подрядчик</th>
                        <th>SLA</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.services.map(service => {
                        const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                        const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
                        
                        const typeClass = service.type === 'main' ? 'status-paid' : 'status-processing';
                        const typeText = service.type === 'main' ? 'Основная' : 'Дополнительная';
                        
                        const periodText = service.period === 'monthly' ? 'Ежемесячно' : 'По требованию';
                        const periodClass = service.period === 'monthly' ? 'status-paid' : 'status-pending';
                        
                        return `
                            <tr>
                                <td><strong>${service.name}</strong></td>
                                <td><span class="status-badge ${typeClass}">${typeText}</span></td>
                                <td>${service.tariff.toLocaleString('ru-RU')} ₽</td>
                                <td><span class="status-badge ${periodClass}">${periodText}</span></td>
                                <td>${building ? building.address : 'Не указан'}</td>
                                <td>${contractor ? contractor.legalName : 'Не указан'}</td>
                                <td>${service.sla}</td>
                                <td><span class="status-badge status-paid">Активна</span></td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewServiceDetails(${service.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editService(${service.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="calculateRevenue(${service.id})">
                                        <i class="fas fa-calculator"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: var(--gray-100); border-radius: 12px;">
            <h4><i class="fas fa-info-circle"></i> Информация о тарифах</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                <div>
                    <h5>Основные услуги</h5>
                    <ul style="margin-top: 10px;">
                        <li>Содержание общего имущества</li>
                        <li>Вывоз ТКО</li>
                        <li>Техническое обслуживание</li>
                        <li>Уборка придомовой территории</li>
                    </ul>
                </div>
                <div>
                    <h5>Дополнительные услуги</h5>
                    <ul style="margin-top: 10px;">
                        <li>Ремонт лифтового оборудования</li>
                        <li>Срочные вызовы специалистов</li>
                        <li>Установка дополнительного оборудования</li>
                        <li>Консультационные услуги</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем обработчики для вкладок
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            filterServices(tabType);
        });
    });
    
    // Добавляем обработчик для кнопки добавления услуги
    document.getElementById('addServiceBtn').addEventListener('click', function() {
        showAddServiceModal();
    });
}

// Загрузка страницы платежей
function loadPayments() {
    const contentArea = document.getElementById('content-area');
    
    // Рассчитываем статистику
    const totalCharged = window.crmData.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);
    const totalProcessing = window.crmData.payments
        .filter(p => p.status === 'processing')
        .reduce((sum, p) => sum + p.amount, 0);
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Платежи</h2>
            <button class="btn btn-primary" id="addPaymentBtn">
                <i class="fas fa-plus"></i> Создать начисление
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Начислено всего</h3>
                <div class="stat-value">${totalCharged.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">за все время</div>
            </div>
            <div class="stat-card">
                <h3>Оплачено</h3>
                <div class="stat-value">${totalPaid.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">${((totalPaid / totalCharged) * 100).toFixed(1)}% от начисленного</div>
            </div>
            <div class="stat-card">
                <h3>В обработке</h3>
                <div class="stat-value">${totalProcessing.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">ожидают оплаты</div>
            </div>
        </div>
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" data-filter="all">Все</button>
                <button class="btn btn-secondary" data-filter="paid">Оплаченные</button>
                <button class="btn btn-secondary" data-filter="processing">В обработке</button>
                <button class="btn btn-secondary" data-filter="charged">Начисленные</button>
            </div>
            <table id="paymentsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Услуга</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Плательщик</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.payments.map(payment => {
                        const service = window.crmData.services.find(s => s.id === payment.serviceId);
                        let statusClass, statusText;
                        switch(payment.status) {
                            case 'paid': statusClass = 'status-paid'; statusText = 'Оплачен'; break;
                            case 'processing': statusClass = 'status-processing'; statusText = 'В обработке'; break;
                            case 'charged': statusClass = 'status-pending'; statusText = 'Начислен'; break;
                        }
                        return `
                            <tr>
                                <td>#${payment.id}</td>
                                <td>${service ? service.name : 'Неизвестно'}</td>
                                <td><strong>${payment.amount.toLocaleString('ru-RU')} ₽</strong></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${payment.date}</td>
                                <td>${payment.payer}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Добавляем обработчик для кнопки добавления платежа
    document.getElementById('addPaymentBtn').addEventListener('click', () => {
        openModal('paymentModal');
        populatePaymentForm();
    });
    
    // Добавляем фильтрацию платежей
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterPayments(filter);
        });
    });
}

// Загрузка страницы подрядчиков
function loadContractors() {
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Подрядчики</h2>
            <button class="btn btn-primary" id="addContractorBtn">
                <i class="fas fa-plus"></i> Добавить подрядчика
            </button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>ИНН</th>
                        <th>Виды работ</th>
                        <th>Статус проверки</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.contractors.map(contractor => {
                        let statusClass, statusText;
                        switch(contractor.status) {
                            case 'активен': statusClass = 'status-paid'; statusText = 'Активен'; break;
                            case 'на проверке': statusClass = 'status-pending'; statusText = 'На проверке'; break;
                            case 'приостановлен': statusClass = 'status-processing'; statusText = 'Приостановлен'; break;
                        }
                        return `
                            <tr>
                                <td><strong>${contractor.legalName}</strong></td>
                                <td>${contractor.inn}</td>
                                <td>${contractor.workTypes.join(', ')}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewContractor(${contractor.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editContractor(${contractor.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Обработчик для добавления подрядчика
    document.getElementById('addContractorBtn').addEventListener('click', () => {
        openModal('contractorModal');
    });
}

// Загрузка страницы документов (реальная реализация вместо заглушки)
function loadDocuments() {
    const contentArea = document.getElementById('content-area');
    
    // Статистика по документам
    const totalDocuments = window.crmData.documents.length;
    const signedDocuments = window.crmData.documents.filter(d => d.status === 'signed').length;
    const pendingDocuments = window.crmData.documents.filter(d => d.status === 'pending').length;
    const contractsCount = window.crmData.documents.filter(d => d.type === 'договор').length;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
            <button class="btn btn-primary" id="uploadDocumentBtn">
                <i class="fas fa-upload"></i> Загрузить документ
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего документов</h3>
                <div class="stat-value">${totalDocuments}</div>
                <div class="stat-change">в системе</div>
            </div>
            <div class="stat-card">
                <h3>Подписанные</h3>
                <div class="stat-value">${signedDocuments}</div>
                <div class="stat-change">${((signedDocuments / totalDocuments) * 100).toFixed(1)}% от общего</div>
            </div>
            <div class="stat-card">
                <h3>На подписании</h3>
                <div class="stat-value">${pendingDocuments}</div>
                <div class="stat-change">требуют внимания</div>
            </div>
            <div class="stat-card">
                <h3>Договоры</h3>
                <div class="stat-value">${contractsCount}</div>
                <div class="stat-change">действующих</div>
            </div>
        </div>
        
        <div class="tabs" style="margin-bottom: 20px;">
            <button class="tab active" data-doc-filter="all">Все документы</button>
            <button class="tab" data-doc-filter="contracts">Договоры</button>
            <button class="tab" data-doc-filter="acts">Акты</button>
            <button class="tab" data-doc-filter="licenses">Лицензии</button>
            <button class="tab" data-doc-filter="reports">Отчёты</button>
        </div>
        
        <div style="margin-bottom: 20px; display: flex; gap: 10px;">
            <input type="text" id="documentSearch" placeholder="Поиск по названию..." style="flex: 1; padding: 10px; border: 1px solid var(--gray-200); border-radius: 8px;">
            <button class="btn btn-secondary" onclick="searchDocuments()">
                <i class="fas fa-search"></i> Найти
            </button>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название документа</th>
                        <th>Тип</th>
                        <th>Категория</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Размер</th>
                        <th>Связанный объект</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody id="documentsTableBody">
                    ${window.crmData.documents.map(document => {
                        let statusClass, statusText;
                        switch(document.status) {
                            case 'signed': 
                                statusClass = 'status-paid';
                                statusText = 'Подписан';
                                break;
                            case 'pending': 
                                statusClass = 'status-pending';
                                statusText = 'Ожидает подписи';
                                break;
                            default:
                                statusClass = 'status-processing';
                                statusText = 'В обработке';
                        }
                        
                        return `
                            <tr>
                                <td><strong>${document.name}</strong></td>
                                <td>${document.type}</td>
                                <td>${document.category || 'Не указана'}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${document.date}</td>
                                <td>${document.size || 'Не указан'}</td>
                                <td>${document.entityId ? `Объект #${document.entityId}` : 'Не привязан'}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewDocument(${document.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="downloadDocument(${document.id})">
                                        <i class="fas fa-download"></i>
                                    </button>
                                    ${document.status === 'pending' ? `
                                        <button class="btn btn-secondary" onclick="signDocument(${document.id})">
                                            <i class="fas fa-signature"></i>
                                        </button>
                                    ` : ''}
                                    <button class="btn btn-secondary" onclick="shareDocument(${document.id})">
                                        <i class="fas fa-share"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-folder-open"></i> Категории документов</h4>
                <div style="margin-top: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Договоры</span>
                        <span>${contractsCount}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Акты выполненных работ</span>
                        <span>${window.crmData.documents.filter(d => d.type === 'акт').length}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Лицензии</span>
                        <span>${window.crmData.documents.filter(d => d.type === 'лицензия').length}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Отчёты</span>
                        <span>${window.crmData.documents.filter(d => d.type === 'отчет').length}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--primary-light); padding: 20px; border-radius: 12px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Требуют внимания</h4>
                ${pendingDocuments > 0 ? `
                    <div style="margin-top: 15px;">
                        <p>Документов на подписании: <strong>${pendingDocuments}</strong></p>
                        <p style="margin-top: 10px;">Срок подписания истекает:</p>
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            ${window.crmData.documents
                                .filter(d => d.status === 'pending')
                                .slice(0, 3)
                                .map(doc => `<li>${doc.name}</li>`)
                                .join('')}
                        </ul>
                    </div>
                ` : '<p style="margin-top: 15px;">Все документы подписаны</p>'}
                ${pendingDocuments > 0 ? `
                    <button class="btn btn-primary" style="margin-top: 15px; width: 100%;">
                        <i class="fas fa-signature"></i> Перейти к подписанию
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    // Добавляем обработчики для вкладок документов
    document.querySelectorAll('[data-doc-filter]').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('[data-doc-filter]').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-doc-filter');
            filterDocuments(filter);
        });
    });
    
    // Добавляем обработчик для кнопки загрузки документа
    document.getElementById('uploadDocumentBtn').addEventListener('click', function() {
        showUploadDocumentModal();
    });
    
    // Добавляем обработчик для поиска по Enter
    document.getElementById('documentSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDocuments();
        }
    });
}

// Загрузка страницы реквизитов (реальная реализация вместо заглушки)
function loadRequisites() {
    const contentArea = document.getElementById('content-area');
    const company = window.crmData.currentCompany;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
            <button class="btn btn-primary" id="editRequisitesBtn">
                <i class="fas fa-edit"></i> Редактировать реквизиты
            </button>
        </div>
        
        <div class="tabs" style="margin-bottom: 30px;">
            <button class="tab active" onclick="showRequisitesTab('bank')">Банковские реквизиты</button>
            <button class="tab" onclick="showRequisitesTab('electronic')">Электронные платежи</button>
            <button class="tab" onclick="showRequisitesTab('qr')">QR-коды для оплаты</button>
            <button class="tab" onclick="showRequisitesTab('instructions')">Инструкции для жильцов</button>
        </div>
        
        <div id="requisitesContent">
            <div id="bankRequisites" class="tab-content active">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Банковские реквизиты компании</h3>
                    
                    <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <div class="form-group">
                                    <label>Полное наименование организации</label>
                                    <div class="form-control" style="background: white;">${company.legalName}</div>
                                </div>
                                <div class="form-group">
                                    <label>ИНН</label>
                                    <div class="form-control" style="background: white;">${company.inn}</div>
                                </div>
                                <div class="form-group">
                                    <label>КПП</label>
                                    <div class="form-control" style="background: white;">770101001</div>
                                </div>
                                <div class="form-group">
                                    <label>ОГРН</label>
                                    <div class="form-control" style="background: white;">${company.ogrn}</div>
                                </div>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label>Банк получателя</label>
                                    <div class="form-control" style="background: white;">ПАО Сбербанк</div>
                                </div>
                                <div class="form-group">
                                    <label>БИК</label>
                                    <div class="form-control" style="background: white;">044525225</div>
                                </div>
                                <div class="form-group">
                                    <label>Расчетный счет</label>
                                    <div class="form-control" style="background: white;">40702810123450001234</div>
                                </div>
                                <div class="form-group">
                                    <label>Корр. счет</label>
                                    <div class="form-control" style="background: white;">30101810400000000225</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 style="margin-bottom: 15px;">Назначение платежа</h4>
                    <div style="background: var(--primary-light); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                        <p><strong>Образец заполнения:</strong></p>
                        <p style="margin-top: 10px; font-family: monospace; background: white; padding: 15px; border-radius: 8px;">
                            Оплата за жилищно-коммунальные услуги за [месяц] [год], лицевой счет: [номер счета], ФИО: [Фамилия И.О.]
                        </p>
                    </div>
                </div>
            </div>
            
            <div id="electronicRequisites" class="tab-content">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Электронные платежи</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                            <h4><i class="fas fa-mobile-alt"></i> СБП (Система быстрых платежей)</h4>
                            <div style="margin-top: 15px;">
                                <p><strong>Телефон для перевода:</strong></p>
                                <div class="form-control" style="background: white; margin-top: 5px;">+7 (495) 123-45-67</div>
                                <p style="margin-top: 15px; font-size: 14px; color: var(--gray-700);">
                                    Жильцы могут переводить средства через СБП, указав номер телефона компании
                                </p>
                            </div>
                        </div>
                        
                        <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                            <h4><i class="fas fa-envelope"></i> Электронные кошельки</h4>
                            <div style="margin-top: 15px;">
                                <p><strong>ЮMoney:</strong></p>
                                <div class="form-control" style="background: white; margin-top: 5px;">4100 1234 5678 9012</div>
                                <p><strong style="margin-top: 15px; display: block;">Qiwi Wallet:</strong></p>
                                <div class="form-control" style="background: white; margin-top: 5px;">+7 (495) 123-45-67</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--warning-light); padding: 20px; border-radius: 12px; border-left: 4px solid var(--warning);">
                        <h4><i class="fas fa-exclamation-circle"></i> Важная информация</h4>
                        <p style="margin-top: 10px;">
                            При оплате через электронные системы обязательно указывать назначение платежа и лицевой счет жильца.
                            Без этой информации платеж может быть не зачислен.
                        </p>
                    </div>
                </div>
            </div>
            
            <div id="qrRequisites" class="tab-content">
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h3 style="margin-bottom: 20px;">QR-коды для оплаты</h3>
                    
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 30px;">
                        <div style="width: 200px; height: 200px; background: #f0f0f0; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                            <i class="fas fa-qrcode" style="font-size: 80px; color: var(--primary);"></i>
                        </div>
                        <h4>QR-код для СБП</h4>
                        <p style="margin-top: 10px; color: var(--gray-700);">
                            Отсканируйте код в приложении банка для быстрого перевода
                        </p>
                        <button class="btn btn-primary" style="margin-top: 20px;">
                            <i class="fas fa-download"></i> Скачать QR-код
                        </button>
                    </div>
                    
                    <div style="background: var(--gray-100); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                        <h4>Как использовать QR-код:</h4>
                        <ol style="text-align: left; margin-top: 15px; padding-left: 20px;">
                            <li>Откройте приложение вашего банка</li>
                            <li>Выберите "Оплата по QR-коду"</li>
                            <li>Наведите камеру на код</li>
                            <li>Проверьте данные и подтвердите платеж</li>
                        </ol>
                    </div>
                </div>
            </div>
            
            <div id="instructionsRequisites" class="tab-content">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Инструкции для жильцов</h3>
                    
                    <div style="margin-bottom: 30px;">
                        <h4>Способы оплаты услуг:</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                            <div style="background: var(--gray-100); padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-university"></i> Через банк</h5>
                                <p style="margin-top: 10px; font-size: 14px;">По реквизитам компании в отделении или онлайн-банке</p>
                            </div>
                            <div style="background: var(--gray-100); padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-mobile-alt"></i> Через СБП</h5>
                                <p style="margin-top: 10px; font-size: 14px;">По номеру телефона компании в приложении банка</p>
                            </div>
                            <div style="background: var(--gray-100); padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-qrcode"></i> По QR-коду</h5>
                                <p style="margin-top: 10px; font-size: 14px;">Отсканировать код в приложении банка</p>
                            </div>
                            <div style="background: var(--gray-100); padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-terminal"></i> В терминалах</h5>
                                <p style="margin-top: 10px; font-size: 14px;">Через платёжные терминалы по номеру лицевого счета</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
                        <h4><i class="fas fa-lightbulb"></i> Рекомендации</h4>
                        <ul style="margin-top: 15px; padding-left: 20px;">
                            <li>Сохраняйте чеки об оплате</li>
                            <li>Указывайте правильное назначение платежа</li>
                            <li>Проверяйте актуальность реквизитов</li>
                            <li>При проблемах с оплатой обращайтесь в службу поддержки</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: var(--warning-light); border-radius: 12px; border-left: 4px solid var(--warning);">
            <h4><i class="fas fa-exclamation-triangle"></i> Внимание!</h4>
            <p style="margin-top: 10px;">
                Реквизиты для оплаты могут меняться. Всегда проверяйте актуальность информации на этой странице перед совершением платежа.
                При изменении реквизитов мы уведомляем всех жильцов по SMS и email.
            </p>
        </div>
    `;
    
    // Добавляем обработчик для кнопки редактирования реквизитов
    document.getElementById('editRequisitesBtn').addEventListener('click', function() {
        showEditRequisitesModal();
    });
}

// Дополнительные вспомогательные функции
function showRequisitesTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
// Инициализация графиков
function initializeChart() {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    
    // Удаляем старый график, если он существует
    if (window.analyticsChart) {
        window.analyticsChart.destroy();
    }
    
    window.analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг'],
            datasets: [
                {
                    label: 'Начислено',
                    data: [1850000, 1920000, 1980000, 2050000, 2150000, 2250000, 2350000, 2450780],
                    borderColor: '#6912FF',
                    backgroundColor: 'rgba(105, 18, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Оплачено',
                    data: [1650000, 1720000, 1780000, 1850000, 1950000, 2050000, 2150000, 1890540],
                    borderColor: '#00D1B2',
                    backgroundColor: 'rgba(0, 209, 178, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Динамика платежей за 2024 год'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('ru-RU') + ' ₽';
                        }
                    }
                }
            }
        }
    });
}

function initializeCharts() {
    // Инициализация графика будет выполнена при загрузке дашборда
}

// Настройка модальных окон
function setupModals() {
    // Закрытие модальных окон при клике на крестик или вне окна
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Закрытие при клике вне модального окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });
    
    // Обработка формы добавления дома
    document.getElementById('buildingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveBuilding();
    });
    
    // Обработка формы добавления платежа
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        savePayment();
    });
    
    // Обработка формы добавления жильца
    document.getElementById('residentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveResident();
    });
    
    // Обработка формы создания обращения
    document.getElementById('ticketForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTicket();
    });
    
    // Обработка формы добавления услуги
    document.getElementById('serviceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveService();
    });
    
    // Обработка формы добавления подрядчика
    document.getElementById('contractorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveContractor();
    });
    
    // Обработка формы добавления документа
    document.getElementById('documentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveDocument();
    });
    
    // Обработка формы редактирования реквизитов
    document.getElementById('requisitesForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveRequisites();
    });
}

// Открытие модального окна
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Закрытие всех модальных окон
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Сохранение дома
function saveBuilding() {
    const address = document.getElementById('buildingAddress').value;
    const floors = parseInt(document.getElementById('buildingFloors').value) || 0;
    const apartments = parseInt(document.getElementById('buildingApartments').value) || 0;
    const year = parseInt(document.getElementById('buildingYear').value) || new Date().getFullYear();
    
    const risksSelect = document.getElementById('buildingRisks');
    const risks = Array.from(risksSelect.selectedOptions).map(option => option.value);
    
    // Создаем новый объект дома
    const newBuilding = {
        id: window.crmData.buildings.length + 1,
        address,
        floors,
        apartments,
        risks,
        passport: {
            elevators: [],
            itp: { type: "Не указано", year: year }
        }
    };
    
    // Добавляем дом в данные
    window.crmData.buildings.push(newBuilding);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Дом успешно добавлен!');
    
    // Перезагружаем страницу домов
    loadBuildings();
}

// Сохранение платежа
function savePayment() {
    const serviceId = parseInt(document.getElementById('paymentService').value);
    const buildingId = parseInt(document.getElementById('paymentBuilding').value);
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const date = document.getElementById('paymentDate').value || new Date().toISOString().split('T')[0];
    
    // Получаем услугу для получения названия
    const service = window.crmData.services.find(s => s.id === serviceId);
    const building = window.crmData.buildings.find(b => b.id === buildingId);
    
    // Создаем новый платеж
    const newPayment = {
        id: window.crmData.payments.length + 1,
        serviceId,
        amount,
        status: 'charged',
        date,
        payer: window.crmData.currentCompany.legalName
    };
    
    // Добавляем платеж в данные
    window.crmData.payments.push(newPayment);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert(`Начисление на сумму ${amount.toLocaleString('ru-RU')} ₽ успешно создано!`);
    
    // Перезагружаем страницу платежей
    loadPayments();
}

// Сохранение жильца
function saveResident() {
    const name = document.getElementById('residentName').value;
    const apartment = document.getElementById('residentApartment').value;
    const buildingId = parseInt(document.getElementById('residentBuilding').value);
    const phone = document.getElementById('residentPhone').value;
    const email = document.getElementById('residentEmail').value;
    const residentsCount = parseInt(document.getElementById('residentCount').value) || 1;
    const status = document.getElementById('residentStatus').value;
    
    // Создаем нового жильца
    const newResident = {
        id: window.crmData.residents.length + 1,
        name,
        apartment,
        buildingId,
        phone,
        email,
        status,
        balance: 0,
        residentsCount
    };
    
    // Добавляем жильца в данные
    window.crmData.residents.push(newResident);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Жилец успешно добавлен!');
    
    // Перезагружаем страницу жильцов
    loadResidents();
}

// Сохранение обращения
function saveTicket() {
    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('ticketDescription').value;
    const type = document.getElementById('ticketType').value;
    const priority = document.getElementById('ticketPriority').value;
    const buildingId = parseInt(document.getElementById('ticketBuilding').value);
    const residentId = parseInt(document.getElementById('ticketResident').value);
    const assignedTo = document.getElementById('ticketAssignee').value;
    
    // Создаем новое обращение
    const newTicket = {
        id: window.crmData.tickets.length + 1,
        title,
        description,
        type,
        priority,
        buildingId,
        residentId,
        assignedTo,
        status: 'open',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    };
    
    // Добавляем обращение в данные
    window.crmData.tickets.push(newTicket);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Обращение успешно создано!');
    
    // Перезагружаем страницу обращений
    loadTickets();
}

// Сохранение услуги
function saveService() {
    const name = document.getElementById('serviceName').value;
    const type = document.getElementById('serviceType').value;
    const tariff = parseFloat(document.getElementById('serviceTariff').value);
    const period = document.getElementById('servicePeriod').value;
    const buildingId = parseInt(document.getElementById('serviceBuilding').value);
    const contractorId = parseInt(document.getElementById('serviceContractor').value);
    const sla = document.getElementById('serviceSLA').value;
    const description = document.getElementById('serviceDescription').value;
    
    // Создаем новую услугу
    const newService = {
        id: window.crmData.services.length + 1,
        name,
        type,
        tariff,
        period,
        buildingId,
        contractorId,
        sla,
        description
    };
    
    // Добавляем услугу в данные
    window.crmData.services.push(newService);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Услуга успешно добавлена!');
    
    // Перезагружаем страницу услуг
    loadServices();
}

// Сохранение подрядчика
function saveContractor() {
    const legalName = document.getElementById('contractorName').value;
    const inn = document.getElementById('contractorINN').value;
    const workTypes = document.getElementById('contractorWorkTypes').value.split(',').map(item => item.trim());
    const bankDetails = document.getElementById('contractorBankDetails').value;
    const status = document.getElementById('contractorStatus').value;
    
    // Создаем нового подрядчика
    const newContractor = {
        id: window.crmData.contractors.length + 1,
        legalName,
        inn,
        workTypes,
        bankDetails,
        status
    };
    
    // Добавляем подрядчика в данные
    window.crmData.contractors.push(newContractor);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Подрядчик успешно добавлен!');
    
    // Перезагружаем страницу подрядчиков
    loadContractors();
}

// Сохранение документа
function saveDocument() {
    const name = document.getElementById('documentName').value;
    const type = document.getElementById('documentType').value;
    const category = document.getElementById('documentCategory').value;
    const status = document.getElementById('documentStatus').value;
    const date = document.getElementById('documentDate').value || new Date().toISOString().split('T')[0];
    
    // Создаем новый документ
    const newDocument = {
        id: window.crmData.documents.length + 1,
        name,
        type,
        category,
        status,
        date,
        size: "0.0 MB",
        link: "#",
        entityId: 1
    };
    
    // Добавляем документ в данные
    window.crmData.documents.push(newDocument);
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Документ успешно добавлен!');
    
    // Перезагружаем страницу документов
    loadDocuments();
}

// Сохранение реквизитов
function saveRequisites() {
    const bankName = document.getElementById('requisitesBank').value;
    const accountNumber = document.getElementById('requisitesAccount').value;
    const correspondentAccount = document.getElementById('requisitesCorrAccount').value;
    const bik = document.getElementById('requisitesBIK').value;
    const inn = document.getElementById('requisitesINN').value;
    const kpp = document.getElementById('requisitesKPP').value;
    
    // Находим банковские реквизиты
    const bankRequisites = window.crmData.requisites.find(r => r.type === 'банковские');
    
    if (bankRequisites) {
        // Обновляем существующие
        bankRequisites.bankName = bankName;
        bankRequisites.accountNumber = accountNumber;
        bankRequisites.correspondentAccount = correspondentAccount;
        bankRequisites.bik = bik;
        bankRequisites.inn = inn;
        bankRequisites.kpp = kpp;
    } else {
        // Создаем новые
        window.crmData.requisites.push({
            id: window.crmData.requisites.length + 1,
            type: 'банковские',
            bankName,
            accountNumber,
            correspondentAccount,
            bik,
            inn,
            kpp
        });
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
    
    // Закрываем модальное окно
    closeAllModals();
    
    // Показываем уведомление
    alert('Реквизиты успешно обновлены!');
    
    // Перезагружаем страницу реквизитов
    loadRequisites();
}

// Заполнение форм данными
function populatePaymentForm() {
    const serviceSelect = document.getElementById('paymentService');
    const buildingSelect = document.getElementById('paymentBuilding');
    
    // Очищаем предыдущие опции
    serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
    buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
    
    // Заполняем услуги
    window.crmData.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - ${service.tariff} ₽/${service.period === 'monthly' ? 'мес' : 'услуга'}`;
        serviceSelect.appendChild(option);
    });
    
    // Заполняем дома
    window.crmData.buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.id;
        option.textContent = building.address;
        buildingSelect.appendChild(option);
    });
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    document.getElementById('paymentDate').valueAsDate = new Date();
}

function populateResidentForm() {
    const buildingSelect = document.getElementById('residentBuilding');
    
    // Очищаем предыдущие опции
    buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
    
    // Заполняем дома
    window.crmData.buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.id;
        option.textContent = building.address;
        buildingSelect.appendChild(option);
    });
}

function populateTicketForm() {
    const buildingSelect = document.getElementById('ticketBuilding');
    const residentSelect = document.getElementById('ticketResident');
    
    // Очищаем предыдущие опции
    buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
    residentSelect.innerHTML = '<option value="">Выберите жильца</option>';
    
    // Заполняем дома
    window.crmData.buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.id;
        option.textContent = building.address;
        buildingSelect.appendChild(option);
    });
    
    // Заполняем жильцов
    window.crmData.residents.forEach(resident => {
        const option = document.createElement('option');
        option.value = resident.id;
        option.textContent = `${resident.name} (кв. ${resident.apartment})`;
        residentSelect.appendChild(option);
    });
    
    // Заполняем ответственных
    const assigneeSelect = document.getElementById('ticketAssignee');
    assigneeSelect.innerHTML = '<option value="">Выберите ответственного</option>';
    window.crmData.users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.name;
        option.textContent = user.name;
        assigneeSelect.appendChild(option);
    });
}

function populateServiceForm() {
    const buildingSelect = document.getElementById('serviceBuilding');
    const contractorSelect = document.getElementById('serviceContractor');
    
    // Очищаем предыдущие опции
    buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
    contractorSelect.innerHTML = '<option value="">Выберите подрядчика</option>';
    
    // Заполняем дома
    window.crmData.buildings.forEach(building => {
        const option = document.createElement('option');
        option.value = building.id;
        option.textContent = building.address;
        buildingSelect.appendChild(option);
    });
    
    // Заполняем подрядчиков
    window.crmData.contractors.forEach(contractor => {
        const option = document.createElement('option');
        option.value = contractor.id;
        option.textContent = contractor.legalName;
        contractorSelect.appendChild(option);
    });
}

function populateRequisitesForm() {
    const bankRequisites = window.crmData.requisites.find(r => r.type === 'банковские');
    
    if (bankRequisites) {
        document.getElementById('requisitesBank').value = bankRequisites.bankName || '';
        document.getElementById('requisitesAccount').value = bankRequisites.accountNumber || '';
        document.getElementById('requisitesCorrAccount').value = bankRequisites.correspondentAccount || '';
        document.getElementById('requisitesBIK').value = bankRequisites.bik || '';
        document.getElementById('requisitesINN').value = bankRequisites.inn || '';
        document.getElementById('requisitesKPP').value = bankRequisites.kpp || '';
    }
}

// Фильтрация данных
function filterPayments(filter) {
    const rows = document.querySelectorAll('#paymentsTable tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        let status = '';
        
        if (statusBadge.classList.contains('status-paid')) status = 'paid';
        else if (statusBadge.classList.contains('status-processing')) status = 'processing';
        else if (statusBadge.classList.contains('status-pending')) status = 'charged';
        
        if (filter === 'all' || filter === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterResidents(filter) {
    const rows = document.querySelectorAll('#residentsTable tbody tr');
    
    rows.forEach(row => {
        const balanceBadge = row.querySelector('.status-badge');
        const statusBadge = row.querySelectorAll('.status-badge')[1];
        let show = true;
        
        if (filter === 'debtors') {
            show = balanceBadge.classList.contains('status-pending');
        } else if (filter === 'active') {
            show = statusBadge.classList.contains('status-paid');
        } else if (filter !== 'all') {
            show = false;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function filterTickets(filter) {
    const rows = document.querySelectorAll('#ticketsTable tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelectorAll('.status-badge')[1];
        let status = '';
        
        if (statusBadge.classList.contains('status-pending')) status = 'open';
        else if (statusBadge.classList.contains('status-processing')) status = 'in_progress';
        else if (statusBadge.classList.contains('status-paid')) status = 'resolved';
        
        if (filter === 'all' || filter === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterDocuments(filter) {
    const rows = document.querySelectorAll('#documentsTable tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelectorAll('.status-badge')[1];
        const categoryCell = row.cells[5];
        let show = true;
        
        if (filter === 'signed') {
            show = statusBadge.classList.contains('status-paid');
        } else if (filter === 'pending') {
            show = statusBadge.classList.contains('status-pending');
        } else if (filter === 'contracts') {
            show = categoryCell.textContent.toLowerCase().includes('договор') || 
                   row.cells[1].textContent.toLowerCase().includes('договор');
        } else if (filter !== 'all') {
            show = false;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

// Функции для работы с данными
function viewBuilding(id) {
    const building = window.crmData.buildings.find(b => b.id === id);
    
    if (building) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">${building.address}</h2>
                <button class="btn btn-secondary" onclick="loadBuildings()">
                    <i class="fas fa-arrow-left"></i> Назад к списку
                </button>
            </div>
            <div class="tabs">
                <button class="tab active" data-tab="info">Общая информация</button>
                <button class="tab" data-tab="passport">Паспорт дома</button>
                <button class="tab" data-tab="history">История аварий</button>
            </div>
            <div id="tabContent">
                <div class="tab-content active" id="infoTab">
                    <h3>Основная информация</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
                        <div>
                            <p><strong>Адрес:</strong> ${building.address}</p>
                            <p><strong>Этажей:</strong> ${building.floors}</p>
                            <p><strong>Квартир:</strong> ${building.apartments}</p>
                        </div>
                        <div>
                            <h4>Флаги рисков</h4>
                            ${building.risks.map(risk => {
                                let riskClass, riskText;
                                switch(risk) {
                                    case 'electrical': riskClass = 'risk-high'; riskText = 'Старая электропроводка'; break;
                                    case 'roof': riskClass = 'risk-medium'; riskText = 'Протекающая крыша'; break;
                                    case 'elevator': riskClass = 'risk-high'; riskText = 'Неисправный лифт'; break;
                                    case 'plumbing': riskClass = 'risk-medium'; riskText = 'Износ водопровода'; break;
                                }
                                return `<p><span class="risk-flag ${riskClass}"></span> ${riskText}</p>`;
                            }).join('')}
                            ${building.risks.length === 0 ? '<p><span class="risk-flag risk-low"></span> Нет активных рисков</p>' : ''}
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="passportTab">
                    <h3>Паспорт дома</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
                        <div>
                            <h4>Лифты</h4>
                            ${building.passport.elevators.length > 0 
                                ? building.passport.elevators.map(elevator => `<p>${elevator}</p>`).join('')
                                : '<p>Лифты отсутствуют</p>'}
                        </div>
                        <div>
                            <h4>ИТП (Индивидуальный тепловой пункт)</h4>
                            <p><strong>Тип:</strong> ${building.passport.itp.type}</p>
                            <p><strong>Год ввода:</strong> ${building.passport.itp.year}</p>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="historyTab">
                    <h3>История аварий</h3>
                    <p>За последние 12 месяцев аварийных ситуаций не зафиксировано.</p>
                </div>
            </div>
        `;
        
        // Настройка вкладок
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const tabName = this.getAttribute('data-tab');
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabName + 'Tab').classList.add('active');
            });
        });
    }
}

function viewResident(id) {
    const resident = window.crmData.residents.find(r => r.id === id);
    
    if (resident) {
        const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
        const tickets = window.crmData.tickets.filter(t => t.residentId === id);
        
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">${resident.name}</h2>
                <button class="btn btn-secondary" onclick="loadResidents()">
                    <i class="fas fa-arrow-left"></i> Назад к списку
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                <div>
                    <h3>Основная информация</h3>
                    <div style="margin-top: 20px;">
                        <p><strong>Адрес:</strong> ${building ? building.address : 'Неизвестно'}, кв. ${resident.apartment}</p>
                        <p><strong>Телефон:</strong> ${resident.phone}</p>
                        <p><strong>Email:</strong> ${resident.email}</p>
                        <p><strong>Количество жильцов:</strong> ${resident.residentsCount}</p>
                        <p><strong>Статус:</strong> <span class="status-badge ${resident.status === 'active' ? 'status-paid' : 'status-processing'}">${resident.status === 'active' ? 'Активен' : 'Неактивен'}</span></p>
                    </div>
                </div>
                <div>
                    <h3>Финансовая информация</h3>
                    <div style="margin-top: 20px; text-align: center;">
                        <div style="font-size: 36px; font-weight: 800; color: ${resident.balance < 0 ? 'var(--danger)' : 'var(--success)'};">
                            ${resident.balance.toLocaleString('ru-RU')} ₽
                        </div>
                        <p style="margin-top: 10px; color: var(--gray-700);">
                            ${resident.balance < 0 ? 'Задолженность' : 'Переплата'}
                        </p>
                        ${resident.balance < 0 ? 
                            '<button class="btn btn-primary" style="margin-top: 20px;">Напоминание о долге</button>' : 
                            ''}
                    </div>
                </div>
            </div>
            <h3>История обращений (${tickets.length})</h3>
            <div class="table-container" style="margin-top: 20px;">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тема</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tickets.map(ticket => {
                            let statusClass, statusText;
                            switch(ticket.status) {
                                case 'open': statusClass = 'status-pending'; statusText = 'Открыто'; break;
                                case 'in_progress': statusClass = 'status-processing'; statusText = 'В работе'; break;
                                case 'resolved': statusClass = 'status-paid'; statusText = 'Решено'; break;
                            }
                            return `
                                <tr>
                                    <td>#${ticket.id}</td>
                                    <td>${ticket.title}</td>
                                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                    <td>${ticket.createdAt}</td>
                                </tr>
                            `;
                        }).join('')}
                        ${tickets.length === 0 ? 
                            '<tr><td colspan="4" style="text-align: center;">Обращений не найдено</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        `;
    }
}

function viewTicket(id) {
    const ticket = window.crmData.tickets.find(t => t.id === id);
    
    if (ticket) {
        const resident = window.crmData.residents.find(r => r.id === ticket.residentId);
        const building = window.crmData.buildings.find(b => b.id === ticket.buildingId);
        
        let priorityClass, priorityText;
        switch(ticket.priority) {
            case 'high': priorityClass = 'risk-high'; priorityText = 'Высокий'; break;
            case 'medium': priorityClass = 'risk-medium'; priorityText = 'Средний'; break;
            case 'low': priorityClass = 'risk-low'; priorityText = 'Низкий'; break;
        }
        
        let statusClass, statusText;
        switch(ticket.status) {
            case 'open': statusClass = 'status-pending'; statusText = 'Открыто'; break;
            case 'in_progress': statusClass = 'status-processing'; statusText = 'В работе'; break;
            case 'resolved': statusClass = 'status-paid'; statusText = 'Решено'; break;
        }
        
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">Обращение #${ticket.id}</h2>
                <button class="btn btn-secondary" onclick="loadTickets()">
                    <i class="fas fa-arrow-left"></i> Назад к списку
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <div>
                    <h3>${ticket.title}</h3>
                    <div style="margin: 20px 0; padding: 20px; background: var(--gray-100); border-radius: 12px;">
                        <p><strong>Описание:</strong></p>
                        <p>${ticket.description}</p>
                    </div>
                    <div>
                        <h4>История обновлений</h4>
                        <div style="margin-top: 15px;">
                            <p><strong>Создано:</strong> ${ticket.createdAt}</p>
                            <p><strong>Последнее обновление:</strong> ${ticket.updatedAt}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                        <h4>Детали обращения</h4>
                        <div style="margin-top: 15px;">
                            <p><strong>Тип:</strong> ${ticket.type}</p>
                            <p><strong>Приоритет:</strong> <span class="risk-flag ${priorityClass}"></span>${priorityText}</p>
                            <p><strong>Статус:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
                            <p><strong>Ответственный:</strong> ${ticket.assignedTo}</p>
                            <hr style="margin: 20px 0;">
                            <p><strong>Жилец:</strong> ${resident ? resident.name : 'Неизвестно'}</p>
                            <p><strong>Адрес:</strong> ${building ? building.address : 'Неизвестно'}</p>
                            <p><strong>Телефон:</strong> ${resident ? resident.phone : 'Неизвестно'}</p>
                        </div>
                        <div style="margin-top: 20px;">
                            <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;">Изменить статус</button>
                            <button class="btn btn-secondary" style="width: 100%;">Добавить комментарий</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function viewService(id) {
    const service = window.crmData.services.find(s => s.id === id);
    
    if (service) {
        const building = window.crmData.buildings.find(b => b.id === service.buildingId);
        const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
        
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">${service.name}</h2>
                <button class="btn btn-secondary" onclick="loadServices()">
                    <i class="fas fa-arrow-left"></i> Назад к списку
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <h3>Основная информация</h3>
                    <div style="margin-top: 20px;">
                        <p><strong>Тип услуги:</strong> <span class="status-badge ${service.type === 'main' ? 'status-paid' : 'status-processing'}">${service.type === 'main' ? 'Основная' : 'Дополнительная'}</span></p>
                        <p><strong>Тариф:</strong> ${service.tariff.toLocaleString('ru-RU')} ₽</p>
                        <p><strong>Период оплаты:</strong> ${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</p>
                        <p><strong>SLA:</strong> ${service.sla}</p>
                        <p><strong>Дом:</strong> ${building ? building.address : 'Неизвестно'}</p>
                    </div>
                    <div style="margin-top: 30px;">
                        <h4>Описание</h4>
                        <p>${service.description}</p>
                    </div>
                </div>
                <div>
                    <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                        <h4>Подрядчик</h4>
                        ${contractor ? `
                            <div style="margin-top: 15px;">
                                <p><strong>Название:</strong> ${contractor.legalName}</p>
                                <p><strong>ИНН:</strong> ${contractor.inn}</p>
                                <p><strong>Виды работ:</strong> ${contractor.workTypes.join(', ')}</p>
                                <p><strong>Статус:</strong> <span class="status-badge ${contractor.status === 'активен' ? 'status-paid' : contractor.status === 'на проверке' ? 'status-pending' : 'status-processing'}">${contractor.status}</span></p>
                                <hr style="margin: 20px 0;">
                                <p><strong>Банковские реквизиты:</strong></p>
                                <p style="font-size: 12px; color: var(--gray-700);">${contractor.bankDetails}</p>
                            </div>
                        ` : '<p>Подрядчик не найден</p>'}
                    </div>
                    <div style="margin-top: 20px; background: var(--primary-light); padding: 20px; border-radius: 12px;">
                        <h4>Статистика платежей</h4>
                        <div style="margin-top: 15px;">
                            <p>Платежей по услуге: ${window.crmData.payments.filter(p => p.serviceId === id).length}</p>
                            <p>Общая сумма: ${window.crmData.payments.filter(p => p.serviceId === id).reduce((sum, p) => sum + p.amount, 0).toLocaleString('ru-RU')} ₽</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function viewDocument(id) {
    const document = window.crmData.documents.find(d => d.id === id);
    
    if (document) {
        let statusClass, statusText;
        switch(document.status) {
            case 'signed': statusClass = 'status-paid'; statusText = 'Подписан'; break;
            case 'pending': statusClass = 'status-pending'; statusText = 'Ожидает подписи'; break;
        }
        
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">${document.name}</h2>
                <button class="btn btn-secondary" onclick="loadDocuments()">
                    <i class="fas fa-arrow-left"></i> Назад к списку
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <div>
                    <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; padding: 30px; text-align: center; min-height: 400px;">
                        <i class="fas fa-file-pdf" style="font-size: 60px; color: var(--danger); margin-bottom: 20px;"></i>
                        <h3>Предпросмотр документа</h3>
                        <p style="margin: 20px 0; color: var(--gray-700);">Для просмотра полного документа необходимо скачать файл</p>
                        <button class="btn btn-primary" onclick="downloadDocument(${document.id})">
                            <i class="fas fa-download"></i> Скачать документ (${document.size})
                        </button>
                    </div>
                </div>
                <div>
                    <div style="background: var(--gray-100); padding: 20px; border-radius: 12px;">
                        <h4>Информация о документе</h4>
                        <div style="margin-top: 15px;">
                            <p><strong>Тип:</strong> ${document.type}</p>
                            <p><strong>Категория:</strong> ${document.category}</p>
                            <p><strong>Статус:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
                            <p><strong>Дата создания:</strong> ${document.date}</p>
                            <p><strong>Размер:</strong> ${document.size}</p>
                        </div>
                        <hr style="margin: 20px 0;">
                        <h4>Действия</h4>
                        <div style="margin-top: 15px;">
                            ${document.status === 'pending' ? 
                                `<button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;">Подписать документ</button>` : ''}
                            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 10px;">Отправить на почту</button>
                            <button class="btn btn-secondary" style="width: 100%;">Изменить статус</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function editBuilding(id) {
    alert(`Редактирование дома с ID ${id}. Функция будет реализована в следующей версии.`);
}

function deleteBuilding(id) {
    if (confirm('Вы уверены, что хотите удалить этот дом?')) {
        window.crmData.buildings = window.crmData.buildings.filter(b => b.id !== id);
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        loadBuildings();
        alert('Дом успешно удален!');
    }
}

function editResident(id) {
    alert(`Редактирование жильца с ID ${id}. Функция будет реализована в следующей версии.`);
}

function editTicket(id) {
    alert(`Редактирование обращения с ID ${id}. Функция будет реализована в следующей версии.`);
}

function editService(id) {
    alert(`Редактирование услуги с ID ${id}. Функция будет реализована в следующей версии.`);
}

function viewContractor(id) {
    const contractor = window.crmData.contractors.find(c => c.id === id);
    
    if (contractor) {
        const services = window.crmData.services.filter(s => s.contractorId === id);
        
        alert(`Просмотр подрядчика: ${contractor.legalName}\nИНН: ${contractor.inn}\nСтатус: ${contractor.status}\n\nОказывает услуги: ${services.length}`);
    }
}

function editContractor(id) {
    alert(`Редактирование подрядчика с ID ${id}. Функция будет реализована в следующей версии.`);
}

function downloadDocument(id) {
    alert(`Скачивание документа с ID ${id}. В реальном приложении здесь был бы скачан файл.`);
}

// Экспортируем функции для использования в HTML
window.viewBuilding = viewBuilding;
window.editBuilding = editBuilding;
window.deleteBuilding = deleteBuilding;
window.viewResident = viewResident;
window.editResident = editResident;
window.viewTicket = viewTicket;
window.editTicket = editTicket;
window.viewService = viewService;
window.editService = editService;
window.viewContractor = viewContractor;
window.editContractor = editContractor;
window.downloadDocument = downloadDocument;
window.filterResidents = filterResidents;
window.filterTickets = filterTickets;
window.filterPayments = filterPayments;
window.filterDocuments = filterDocuments;

// Дополнительные вспомогательные функции
function showRequisitesTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Убираем активный класс со всех кнопок вкладок
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(tabName + 'Requisites').classList.add('active');
    
    // Активируем соответствующую кнопку
    document.querySelector(`.tab[onclick="showRequisitesTab('${tabName}')"]`).classList.add('active');
}

function filterResidents(filter) {
    const rows = document.querySelectorAll('#residentsTableBody tr');
    const buttons = document.querySelectorAll('.btn[onclick^="filterResidents"]');
    
    // Обновляем активную кнопку
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${filter}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    rows.forEach(row => {
        const statusCell = row.cells[6];
        const balanceCell = row.cells[5];
        const statusText = statusCell.textContent.trim();
        const balanceText = balanceCell.textContent.trim();
        
        let show = true;
        
        switch(filter) {
            case 'active':
                show = statusText === 'Активен';
                break;
            case 'inactive':
                show = statusText === 'Неактивен';
                break;
            case 'debtors':
                show = balanceText.includes('-') || balanceText === 'Долг';
                break;
            case 'no-debt':
                show = !balanceText.includes('-') && balanceText !== 'Долг';
                break;
            case 'all':
            default:
                show = true;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function filterTickets(filter) {
    const rows = document.querySelectorAll('#ticketsTableBody tr');
    const buttons = document.querySelectorAll('.btn[onclick^="filterTickets"]');
    
    // Обновляем активную кнопку
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${filter}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    rows.forEach(row => {
        const statusCell = row.cells[5];
        const priorityCell = row.cells[4];
        const statusText = statusCell.textContent.trim();
        const priorityText = priorityCell.textContent.trim();
        
        let show = true;
        
        switch(filter) {
            case 'open':
                show = statusText === 'Открыто';
                break;
            case 'in_progress':
                show = statusText === 'В работе';
                break;
            case 'resolved':
                show = statusText === 'Решено';
                break;
            case 'high':
                show = priorityText === 'Высокий';
                break;
            case 'all':
            default:
                show = true;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function filterServices(filter) {
    const rows = document.querySelectorAll('#servicesTable tbody tr');
    
    rows.forEach(row => {
        const typeCell = row.cells[1];
        const periodCell = row.cells[3];
        const typeText = typeCell.textContent.trim();
        const periodText = periodCell.textContent.trim();
        
        let show = true;
        
        switch(filter) {
            case 'main':
                show = typeText === 'Основная';
                break;
            case 'additional':
                show = typeText === 'Дополнительная';
                break;
            case 'monthly':
                show = periodText === 'Ежемесячно';
                break;
            case 'ondemand':
                show = periodText === 'По требованию';
                break;
            case 'all':
            default:
                show = true;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function filterDocuments(filter) {
    const rows = document.querySelectorAll('#documentsTableBody tr');
    
    rows.forEach(row => {
        const typeCell = row.cells[1];
        const typeText = typeCell.textContent.trim().toLowerCase();
        
        let show = true;
        
        switch(filter) {
            case 'contracts':
                show = typeText === 'договор' || typeText.includes('договор');
                break;
            case 'acts':
                show = typeText === 'акт' || typeText.includes('акт');
                break;
            case 'licenses':
                show = typeText === 'лицензия' || typeText.includes('лицензия');
                break;
            case 'reports':
                show = typeText === 'отчет' || typeText.includes('отчёт');
                break;
            case 'all':
            default:
                show = true;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function searchDocuments() {
    const searchTerm = document.getElementById('documentSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#documentsTableBody tr');
    
    rows.forEach(row => {
        const nameCell = row.cells[0];
        const nameText = nameCell.textContent.toLowerCase();
        
        if (nameText.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Простые модальные функции для демонстрации
function showAddResidentModal() {
    alert('Форма добавления жильца будет открыта в модальном окне. В демо-версии показано уведомление.');
}

function showCreateTicketModal() {
    alert('Форма создания обращения будет открыта в модальном окне. В демо-версии показано уведомление.');
}

function showAddServiceModal() {
    alert('Форма добавления услуги будет открыта в модальном окне. В демо-версии показано уведомление.');
}

function showUploadDocumentModal() {
    alert('Форма загрузки документа будет открыта в модальном окне. В демо-версии показано уведомление.');
}

function showEditRequisitesModal() {
    alert('Форма редактирования реквизитов будет открыта в модальном окне. В демо-версии показано уведомление.');
}

// Функции просмотра деталей
function viewResidentDetails(id) {
    alert(`Просмотр деталей жильца #${id}. В полной версии будет открыта страница с подробной информацией.`);
}

function viewTicketDetails(id) {
    alert(`Просмотр деталей обращения #${id}. В полной версии будет открыта страница с историей и комментариями.`);
}

function viewServiceDetails(id) {
    alert(`Просмотр деталей услуги #${id}. В полной версии будет показана статистика и история платежей.`);
}

function viewDocument(id) {
    alert(`Просмотр документа #${id}. В полной версии будет открыт предпросмотр документа.`);
}

// Другие функции действий
function editResident(id) {
    alert(`Редактирование жильца #${id}. В полной версии будет открыта форма редактирования.`);
}

function editService(id) {
    alert(`Редактирование услуги #${id}. В полной версии будет открыта форма редактирования.`);
}

function sendNotificationToResident(id) {
    alert(`Отправка уведомления жильцу #${id}. В полной версии будет открыта форма отправки SMS/email.`);
}

function assignTicket(id) {
    alert(`Назначение ответственного на обращение #${id}. В полной версии будет открыта форма назначения.`);
}

function closeTicket(id) {
    if (confirm('Вы уверены, что хотите закрыть это обращение?')) {
        alert(`Обращение #${id} закрыто. В полной версии статус будет изменен в базе данных.`);
    }
}

function calculateRevenue(id) {
    alert(`Расчет доходов по услуге #${id}. В полной версии будет показана детальная аналитика.`);
}

function downloadDocument(id) {
    alert(`Скачивание документа #${id}. В полной версии будет скачан файл.`);
}

function signDocument(id) {
    if (confirm('Подписать этот документ?')) {
        alert(`Документ #${id} подписан. В полной версии статус будет обновлен.`);
    }
}

function shareDocument(id) {
    alert(`Отправка документа #${id}. В полной версии будет открыта форма отправки по email.`);
}
