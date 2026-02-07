// app.js - Исправленная версия с работающей навигацией

// Глобальный объект для хранения данных CRM
window.crmData = window.crmData || null;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты в шапке
    const currentDateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (currentDateElement) {
        currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }

    // Инициализация данных
    initializeData();
    
    // Настройка навигации
    setupNavigation();
    
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
                    legalName: "ООО 'Лифт-Sервис'",
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
}

// Настройка навигации по страницам - ИСПРАВЛЕННАЯ ВЕРСИЯ
function setupNavigation() {
    // Используем делегирование событий для обработки кликов по навигации
    document.addEventListener('click', function(e) {
        // Проверяем, был ли клик по навигационной ссылке
        if (e.target.closest('.nav-link')) {
            e.preventDefault();
            const navLink = e.target.closest('.nav-link');
            
            // Удаляем активный класс у всех ссылок
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс текущей ссылке
            navLink.classList.add('active');
            
            // Загружаем страницу
            const page = navLink.getAttribute('data-page');
            loadPage(page);
        }
    });
}

// Загрузка страницы по её названию
function loadPage(pageName) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;
    
    // Показываем индикатор загрузки
    contentArea.innerHTML = '<div style="padding: 50px; text-align: center; color: var(--gray-700);">Загрузка...</div>';
    
    // Загружаем содержимое страницы
    setTimeout(() => {
        let pageHTML = '';
        switch(pageName) {
            case 'dashboard':
                pageHTML = getDashboardHTML();
                break;
            case 'buildings':
                pageHTML = getBuildingsHTML();
                break;
            case 'residents':
                pageHTML = getResidentsHTML();
                break;
            case 'tickets':
                pageHTML = getTicketsHTML();
                break;
            case 'services':
                pageHTML = getServicesHTML();
                break;
            case 'payments':
                pageHTML = getPaymentsHTML();
                break;
            case 'contractors':
                pageHTML = getContractorsHTML();
                break;
            case 'documents':
                pageHTML = getDocumentsHTML();
                break;
            case 'requisites':
                pageHTML = getRequisitesHTML();
                break;
            case 'profile':
                pageHTML = getProfileHTML();
                break;
            default:
                pageHTML = getDashboardHTML();
        }
        
        contentArea.innerHTML = pageHTML;
        
        // Инициализируем специфичные для страницы элементы
        initializePage(pageName);
    }, 100);
}

// Получение HTML для каждой страницы
function getDashboardHTML() {
    // Получаем данные для статистики
    const totalCharged = window.crmData.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0);
    
    // Статистика по обращениям
    const activeTickets = window.crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
    const resolvedTickets = window.crmData.tickets.filter(t => t.status === 'resolved').length;
    
    return `
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
    `;
}

function getBuildingsHTML() {
    return `
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
}

function getResidentsHTML() {
    // Рассчитываем статистику по жильцам
    const totalResidents = window.crmData.residents.length;
    const activeResidents = window.crmData.residents.filter(r => r.status === 'active').length;
    const debtors = window.crmData.residents.filter(r => r.balance < 0).length;
    const totalDebt = window.crmData.residents
        .filter(r => r.balance < 0)
        .reduce((sum, r) => sum + Math.abs(r.balance), 0);
    
    return `
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
        </div>
        
        <div class="table-container">
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
                    </tr>
                </thead>
                <tbody>
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
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getTicketsHTML() {
    return `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тема</th>
                        <th>Тип</th>
                        <th>Приоритет</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.tickets.map(ticket => {
                        let priorityClass = 'status-paid';
                        let priorityText = 'Низкий';
                        if (ticket.priority === 'high') {
                            priorityClass = 'status-pending';
                            priorityText = 'Высокий';
                        } else if (ticket.priority === 'medium') {
                            priorityClass = 'status-processing';
                            priorityText = 'Средний';
                        }
                        
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
                                <td>${ticket.type}</td>
                                <td><span class="status-badge ${priorityClass}">${priorityText}</span></td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${ticket.createdAt}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getServicesHTML() {
    return `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
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
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.services.map(service => {
                        const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                        
                        return `
                            <tr>
                                <td><strong>${service.name}</strong></td>
                                <td>${service.type === 'main' ? 'Основная' : 'Дополнительная'}</td>
                                <td>${service.tariff.toLocaleString('ru-RU')} ₽</td>
                                <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                                <td>${building ? building.address : 'Не указан'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getPaymentsHTML() {
    // Рассчитываем статистику
    const totalCharged = window.crmData.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);
    
    return `
        <div class="page-header">
            <h2 class="page-title">Платежи</h2>
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
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Услуга</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Дата</th>
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
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getContractorsHTML() {
    return `
        <div class="page-header">
            <h2 class="page-title">Подрядчики</h2>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>ИНН</th>
                        <th>Виды работ</th>
                        <th>Статус проверки</th>
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
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getDocumentsHTML() {
    return `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название документа</th>
                        <th>Тип</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Размер</th>
                    </tr>
                </thead>
                <tbody>
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
                        }
                        
                        return `
                            <tr>
                                <td><strong>${document.name}</strong></td>
                                <td>${document.type}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${document.date}</td>
                                <td>${document.size}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getRequisitesHTML() {
    const company = window.crmData.currentCompany;
    const bankRequisites = window.crmData.requisites.find(r => r.type === 'банковские');
    
    return `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
        </div>
        
        <div style="max-width: 800px;">
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
                            <div class="form-control" style="background: white;">${bankRequisites ? bankRequisites.kpp : '770101001'}</div>
                        </div>
                        <div class="form-group">
                            <label>ОГРН</label>
                            <div class="form-control" style="background: white;">${company.ogrn}</div>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <label>Банк получателя</label>
                            <div class="form-control" style="background: white;">${bankRequisites ? bankRequisites.bankName : 'ПАО Сбербанк'}</div>
                        </div>
                        <div class="form-group">
                            <label>БИК</label>
                            <div class="form-control" style="background: white;">${bankRequisites ? bankRequisites.bik : '044525225'}</div>
                        </div>
                        <div class="form-group">
                            <label>Расчетный счет</label>
                            <div class="form-control" style="background: white;">${bankRequisites ? bankRequisites.accountNumber : '40702810123450001234'}</div>
                        </div>
                        <div class="form-group">
                            <label>Корр. счет</label>
                            <div class="form-control" style="background: white;">${bankRequisites ? bankRequisites.correspondentAccount : '30101810400000000225'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getProfileHTML() {
    const company = window.crmData.currentCompany;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Профиль компании</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
            <div>
                <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="margin-bottom: 15px;">Основная информация</h3>
                    <p><strong>Название:</strong> ${company.legalName}</p>
                    <p><strong>ИНН:</strong> ${company.inn}</p>
                    <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                    <p><strong>Регион:</strong> ${company.region}</p>
                </div>
                
                <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
                    <h3 style="margin-bottom: 15px;">Контакты</h3>
                    <p><strong>Телефон:</strong> ${company.contacts.phone}</p>
                    <p><strong>Email:</strong> ${company.contacts.email}</p>
                    <p><strong>Адрес:</strong> ${company.contacts.address}</p>
                </div>
            </div>
            
            <div>
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom: 20px;">Статистика</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">
                                ${window.crmData.buildings.length}
                            </div>
                            <div>Домов</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">
                                ${window.crmData.residents.length}
                            </div>
                            <div>Жильцов</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">
                                ${window.crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                            </div>
                            <div>Активных обращений</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">
                                ${window.crmData.services.length}
                            </div>
                            <div>Услуг</div>
                        </div>
                    </div>
                    
                    <h4 style="margin-bottom: 15px;">Лицензии</h4>
                    <ul style="padding-left: 20px;">
                        ${company.licenses.map(license => `<li>${license}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Инициализация специфичных для страницы элементов
function initializePage(pageName) {
    switch(pageName) {
        case 'dashboard':
            setTimeout(() => {
                initializeDashboardChart();
            }, 100);
            break;
        case 'buildings':
            // Добавляем обработчик для кнопки добавления дома
            const addBuildingBtn = document.getElementById('addBuildingBtn');
            if (addBuildingBtn) {
                addBuildingBtn.addEventListener('click', () => {
                    openModal('buildingModal');
                });
            }
            break;
        case 'residents':
            // Добавляем обработчик для кнопки добавления жильца
            const addResidentBtn = document.getElementById('addResidentBtn');
            if (addResidentBtn) {
                addResidentBtn.addEventListener('click', () => {
                    openModal('residentModal');
                    populateResidentForm();
                });
            }
            break;
    }
}

// Инициализация графика для дашборда
function initializeDashboardChart() {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;
    
    // Удаляем старый график, если он существует
    if (window.analyticsChart) {
        window.analyticsChart.destroy();
    }
    
    try {
        window.analyticsChart = new Chart(ctx.getContext('2d'), {
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
    } catch (error) {
        console.error('Ошибка при создании графика:', error);
    }
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
    const buildingForm = document.getElementById('buildingForm');
    if (buildingForm) {
        buildingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBuilding();
        });
    }
}

// Открытие модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
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
    loadPage('buildings');
}

// Заполнение форм данными
function populateResidentForm() {
    const buildingSelect = document.getElementById('residentBuilding');
    if (!buildingSelect) return;
    
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

// Функции для работы с данными
function viewBuilding(id) {
    const building = window.crmData.buildings.find(b => b.id === id);
    
    if (building) {
        alert(`Просмотр дома: ${building.address}\nЭтажи: ${building.floors}\nКвартиры: ${building.apartments}\nРиски: ${building.risks.join(', ')}`);
    }
}

function editBuilding(id) {
    alert(`Редактирование дома с ID ${id}. Функция будет реализована в следующей версии.`);
}

function deleteBuilding(id) {
    if (confirm('Вы уверены, что хотите удалить этот дом?')) {
        window.crmData.buildings = window.crmData.buildings.filter(b => b.id !== id);
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        loadPage('buildings');
        alert('Дом успешно удален!');
    }
}

// Экспортируем функции для использования в HTML
window.viewBuilding = viewBuilding;
window.editBuilding = editBuilding;
window.deleteBuilding = deleteBuilding;
window.loadPage = loadPage;
