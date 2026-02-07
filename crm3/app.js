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

// Загрузка страницы жильцов
function loadResidents() {
    const contentArea = document.getElementById('content-area');
    
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
                <div class="stat-value">${window.crmData.residents.length}</div>
                <div class="stat-change">в ${window.crmData.buildings.length} домах</div>
            </div>
            <div class="stat-card">
                <h3>Активные</h3>
                <div class="stat-value">${window.crmData.residents.filter(r => r.status === 'active').length}</div>
                <div class="stat-change">${((window.crmData.residents.filter(r => r.status === 'active').length / window.crmData.residents.length) * 100).toFixed(1)}%</div>
            </div>
            <div class="stat-card">
                <h3>Средний долг</h3>
                <div class="stat-value">${(window.crmData.residents.reduce((sum, r) => r.balance < 0 ? sum + Math.abs(r.balance) : sum, 0) / window.crmData.residents.filter(r => r.balance < 0).length || 0).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽</div>
                <div class="stat-change">${window.crmData.residents.filter(r => r.balance < 0).length} должников</div>
            </div>
        </div>
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" data-filter="all">Все</button>
                <button class="btn btn-secondary" data-filter="active">Активные</button>
                <button class="btn btn-secondary" data-filter="debtors">Должники</button>
            </div>
            <table id="residentsTable">
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Адрес</th>
                        <th>Квартира</th>
                        <th>Телефон</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.residents.map(resident => {
                        const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
                        let statusClass, statusText;
                        switch(resident.status) {
                            case 'active': statusClass = 'status-paid'; statusText = 'Активен'; break;
                            case 'inactive': statusClass = 'status-processing'; statusText = 'Неактивен'; break;
                        }
                        const balanceClass = resident.balance < 0 ? 'status-pending' : 'status-paid';
                        const balanceText = resident.balance.toLocaleString('ru-RU') + ' ₽';
                        
                        return `
                            <tr>
                                <td><strong>${resident.name}</strong></td>
                                <td>${building ? building.address : 'Неизвестно'}</td>
                                <td>${resident.apartment}</td>
                                <td>${resident.phone}</td>
                                <td><span class="status-badge ${balanceClass}">${balanceText}</span></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewResident(${resident.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editResident(${resident.id})">
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
    
    // Добавляем обработчик для кнопки добавления жильца
    document.getElementById('addResidentBtn').addEventListener('click', () => {
        openModal('residentModal');
        populateResidentForm();
    });
    
    // Добавляем фильтрацию жильцов
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterResidents(filter);
        });
    });
}

// Загрузка страницы обращений
function loadTickets() {
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
            <button class="btn btn-primary" id="addTicketBtn">
                <i class="fas fa-plus"></i> Создать обращение
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего обращений</h3>
                <div class="stat-value">${window.crmData.tickets.length}</div>
                <div class="stat-change">за все время</div>
            </div>
            <div class="stat-card">
                <h3>В работе</h3>
                <div class="stat-value">${window.crmData.tickets.filter(t => t.status === 'in_progress').length}</div>
                <div class="stat-change">${((window.crmData.tickets.filter(t => t.status === 'in_progress').length / window.crmData.tickets.length) * 100).toFixed(1)}%</div>
            </div>
            <div class="stat-card">
                <h3>Среднее время решения</h3>
                <div class="stat-value">2.3 дня</div>
                <div class="stat-change">-0.5 дня за месяц</div>
            </div>
            <div class="stat-card">
                <h3>Открытые</h3>
                <div class="stat-value">${window.crmData.tickets.filter(t => t.status === 'open').length}</div>
                <div class="stat-change">требуют внимания</div>
            </div>
        </div>
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" data-filter="all">Все</button>
                <button class="btn btn-secondary" data-filter="open">Открытые</button>
                <button class="btn btn-secondary" data-filter="in_progress">В работе</button>
                <button class="btn btn-secondary" data-filter="resolved">Решенные</button>
            </div>
            <table id="ticketsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тип</th>
                        <th>Название</th>
                        <th>Приоритет</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Ответственный</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.tickets.map(ticket => {
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
                        
                        return `
                            <tr>
                                <td>#${ticket.id}</td>
                                <td><span class="status-badge ${priorityClass}">${ticket.type}</span></td>
                                <td><strong>${ticket.title}</strong></td>
                                <td><span class="risk-flag ${priorityClass}"></span>${priorityText}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${ticket.createdAt}</td>
                                <td>${ticket.assignedTo}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewTicket(${ticket.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editTicket(${ticket.id})">
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
    
    // Добавляем обработчик для кнопки создания обращения
    document.getElementById('addTicketBtn').addEventListener('click', () => {
        openModal('ticketModal');
        populateTicketForm();
    });
    
    // Добавляем фильтрацию обращений
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterTickets(filter);
        });
    });
}

// Загрузка страницы услуг
function loadServices() {
    const contentArea = document.getElementById('content-area');
    
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
                <div class="stat-value">${window.crmData.services.length}</div>
                <div class="stat-change">${window.crmData.services.filter(s => s.type === 'main').length} основных</div>
            </div>
            <div class="stat-card">
                <h3>Средний тариф</h3>
                <div class="stat-value">${(window.crmData.services.reduce((sum, s) => sum + s.tariff, 0) / window.crmData.services.length).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽</div>
                <div class="stat-change">за услугу</div>
            </div>
            <div class="stat-card">
                <h3>Подрядчики</h3>
                <div class="stat-value">${new Set(window.crmData.services.map(s => s.contractorId)).size}</div>
                <div class="stat-change">активных</div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название услуги</th>
                        <th>Тип</th>
                        <th>Тариф</th>
                        <th>Период</th>
                        <th>Дом</th>
                        <th>Подрядчик</th>
                        <th>SLA</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.services.map(service => {
                        const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                        const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
                        const typeClass = service.type === 'main' ? 'status-paid' : 'status-processing';
                        
                        return `
                            <tr>
                                <td><strong>${service.name}</strong></td>
                                <td><span class="status-badge ${typeClass}">${service.type === 'main' ? 'Основная' : 'Дополнительная'}</span></td>
                                <td>${service.tariff.toLocaleString('ru-RU')} ₽</td>
                                <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                                <td>${building ? building.address : 'Неизвестно'}</td>
                                <td>${contractor ? contractor.legalName : 'Неизвестно'}</td>
                                <td>${service.sla}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewService(${service.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="editService(${service.id})">
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
    
    // Добавляем обработчик для кнопки добавления услуги
    document.getElementById('addServiceBtn').addEventListener('click', () => {
        openModal('serviceModal');
        populateServiceForm();
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

// Загрузка страницы документов
function loadDocuments() {
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
            <button class="btn btn-primary" id="addDocumentBtn">
                <i class="fas fa-plus"></i> Добавить документ
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего документов</h3>
                <div class="stat-value">${window.crmData.documents.length}</div>
                <div class="stat-change">в системе</div>
            </div>
            <div class="stat-card">
                <h3>Подписанные</h3>
                <div class="stat-value">${window.crmData.documents.filter(d => d.status === 'signed').length}</div>
                <div class="stat-change">${((window.crmData.documents.filter(d => d.status === 'signed').length / window.crmData.documents.length) * 100).toFixed(1)}%</div>
            </div>
            <div class="stat-card">
                <h3>На подписании</h3>
                <div class="stat-value">${window.crmData.documents.filter(d => d.status === 'pending').length}</div>
                <div class="stat-change">ожидают действий</div>
            </div>
        </div>
        <div class="table-container">
            <div style="margin-bottom: 20px; display: flex; gap: 10px;">
                <button class="btn btn-secondary" data-filter="all">Все</button>
                <button class="btn btn-secondary" data-filter="signed">Подписанные</button>
                <button class="btn btn-secondary" data-filter="pending">На подписании</button>
                <button class="btn btn-secondary" data-filter="contracts">Договоры</button>
            </div>
            <table id="documentsTable">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Размер</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.documents.map(document => {
                        let statusClass, statusText;
                        switch(document.status) {
                            case 'signed': statusClass = 'status-paid'; statusText = 'Подписан'; break;
                            case 'pending': statusClass = 'status-pending'; statusText = 'Ожидает'; break;
                        }
                        
                        return `
                            <tr>
                                <td><strong>${document.name}</strong></td>
                                <td><span class="status-badge ${statusClass}">${document.type}</span></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${document.date}</td>
                                <td>${document.size}</td>
                                <td>${document.category}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewDocument(${document.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="downloadDocument(${document.id})">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Добавляем обработчик для кнопки добавления документа
    document.getElementById('addDocumentBtn').addEventListener('click', () => {
        openModal('documentModal');
    });
    
    // Добавляем фильтрацию документов
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterDocuments(filter);
        });
    });
}

// Загрузка страницы реквизитов
function loadRequisites() {
    const contentArea = document.getElementById('content-area');
    const requisites = window.crmData.requisites;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
            <button class="btn btn-primary" id="editRequisitesBtn">
                <i class="fas fa-edit"></i> Редактировать реквизиты
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Основные реквизиты</h3>
                <div class="stat-value">${requisites.find(r => r.type === 'банковские') ? 'Настроены' : 'Не настроены'}</div>
                <div class="stat-change">банковские реквизиты</div>
            </div>
            <div class="stat-card">
                <h3>Электронные платежи</h3>
                <div class="stat-value">${requisites.find(r => r.type === 'электронные') ? 'Доступны' : 'Недоступны'}</div>
                <div class="stat-change">СБП, QR-коды</div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px;">
            <div>
                <h3 style="margin-bottom: 20px;">Банковские реквизиты</h3>
                ${requisites.filter(r => r.type === 'банковские').map(bank => `
                    <div class="form-group">
                        <label>Банк</label>
                        <div class="form-control" style="background: var(--gray-100);">${bank.bankName}</div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Расчетный счет</label>
                            <div class="form-control" style="background: var(--gray-100);">${bank.accountNumber}</div>
                        </div>
                        <div class="form-group">
                            <label>БИК</label>
                            <div class="form-control" style="background: var(--gray-100);">${bank.bik}</div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Корр. счет</label>
                            <div class="form-control" style="background: var(--gray-100);">${bank.correspondentAccount}</div>
                        </div>
                        <div class="form-group">
                            <label>КПП</label>
                            <div class="form-control" style="background: var(--gray-100);">${bank.kpp}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div>
                <h3 style="margin-bottom: 20px;">Электронные платежи</h3>
                ${requisites.filter(r => r.type === 'электронные').map(electronic => `
                    <div class="form-group">
                        <label>Система оплаты</label>
                        <div class="form-control" style="background: var(--gray-100);">${electronic.paymentSystem}</div>
                    </div>
                    <div class="form-group">
                        <label>Телефон для СБП</label>
                        <div class="form-control" style="background: var(--gray-100);">${electronic.phone}</div>
                    </div>
                    <div class="form-group">
                        <label>Email для квитанций</label>
                        <div class="form-control" style="background: var(--gray-100);">${electronic.email}</div>
                    </div>
                    <div class="form-group">
                        <label>QR-код для оплаты</label>
                        <div class="form-control" style="background: var(--gray-100); text-align: center;">
                            <i class="fas fa-qrcode" style="font-size: 40px; color: var(--primary);"></i>
                            <div style="margin-top: 10px;">Сканируйте для оплаты</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div style="margin-top: 30px; padding: 20px; background: var(--primary-light); border-radius: 12px;">
            <h4><i class="fas fa-info-circle"></i> Информация для жильцов</h4>
            <p>Жильцы могут оплачивать услуги через банковское приложение, указав реквизиты УК, или отсканировав QR-код в приложении банка.</p>
        </div>
    `;
    
    // Обработчик для редактирования реквизитов
    document.getElementById('editRequisitesBtn').addEventListener('click', () => {
        openModal('requisitesModal');
        populateRequisitesForm();
    });
}

// Загрузка страницы профиля
function loadProfile() {
    const company = window.crmData.currentCompany;
    
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Профиль УК</h2>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <h3 style="margin-bottom: 20px;">Юридические данные</h3>
                <div class="form-group">
                    <label>Название</label>
                    <div class="form-control" style="background: var(--gray-100);">${company.legalName}</div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>ИНН</label>
                        <div class="form-control" style="background: var(--gray-100);">${company.inn}</div>
                    </div>
                    <div class="form-group">
                        <label>ОГРН</label>
                        <div class="form-control" style="background: var(--gray-100);">${company.ogrn}</div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Регион</label>
                    <div class="form-control" style="background: var(--gray-100);">${company.region}</div>
                </div>
            </div>
            <div>
                <h3 style="margin-bottom: 20px;">Контакты</h3>
                <div class="form-group">
                    <label>Телефон</label>
                    <div class="form-control" style="background: var(--gray-100);">${company.contacts.phone}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <div class="form-control" style="background: var(--gray-100);">${company.contacts.email}</div>
                </div>
                <div class="form-group">
                    <label>Адрес</label>
                    <div class="form-control" style="background: var(--gray-100);">${company.contacts.address}</div>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <h3>Лицензии</h3>
            <ul style="list-style: none; padding: 0;">
                ${company.licenses.map(license => `
                    <li style="padding: 10px; background: var(--gray-100); margin-bottom: 10px; border-radius: 8px;">
                        <i class="fas fa-file-certificate" style="color: var(--primary); margin-right: 10px;"></i>
                        ${license}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

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
