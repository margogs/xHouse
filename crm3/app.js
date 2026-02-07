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
    
    // Настройка модальных окон
    setupModals();
    
    // Загрузка начальной страницы
    loadPage('dashboard');
});

// ==================== ФУНКЦИИ ИНИЦИАЛИЗАЦИИ ====================

function initializeData() {
    const storedData = localStorage.getItem('crmData');
    
    if (!storedData) {
        window.crmData = getDefaultData();
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
    } else {
        window.crmData = JSON.parse(storedData);
    }
    
    console.log('Данные CRM инициализированы:', window.crmData);
}

function getDefaultData() {
    return {
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
        ]
    };
}

// ==================== НАВИГАЦИЯ ====================

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

function loadPage(pageName) {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea) {
        console.error('Элемент content-area не найден');
        return;
    }
    
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
    }, 100);
}

// ==================== СТРАНИЦЫ ====================

function loadDashboard() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
    const totalCharged = window.crmData.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0);
    
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
        <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 20px;">Статистика по домам</h3>
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
        </div>
    `;
}

function loadBuildings() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
    setTimeout(() => {
        const addBtn = document.getElementById('addBuildingBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                alert('Форма добавления дома будет открыта в модальном окне');
            });
        }
    }, 100);
}

function loadResidents() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
    `;
}

function loadTickets() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
    const totalTickets = window.crmData.tickets.length;
    const openTickets = window.crmData.tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = window.crmData.tickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = window.crmData.tickets.filter(t => t.status === 'resolved').length;
    
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
                    ${window.crmData.tickets.map(ticket => {
                        const resident = window.crmData.residents.find(r => r.id === ticket.residentId);
                        const residentName = resident ? resident.name : 'Неизвестно';
                        
                        let priorityClass = 'status-paid';
                        let priorityText = 'Низкий';
                        if (ticket.priority === 'high') {
                            priorityClass = 'risk-high';
                            priorityText = 'Высокий';
                        } else if (ticket.priority === 'medium') {
                            priorityClass = 'risk-medium';
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
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadServices() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
    `;
}

function loadPayments() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
                            default: statusClass = 'status-pending'; statusText = 'Начислен';
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
}

function loadContractors() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
                            default: statusClass = 'status-pending'; statusText = 'На проверке';
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
}

function loadDocuments() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
    `;
}

function loadRequisites() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
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
            <button class="tab" onclick="showRequisitesTab('instructions')">Инструкции для жильцов</button>
        </div>
        
        <div id="requisitesContent">
            <div id="bankRequisites" class="tab-content active">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Банковские реквизиты компании</h3>
                    
                    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Полное наименование организации</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">${company.legalName}</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">ИНН</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">${company.inn}</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">КПП</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">770101001</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">ОГРН</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">${company.ogrn}</div>
                                </div>
                            </div>
                            <div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Банк получателя</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">ПАО Сбербанк</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">БИК</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">044525225</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Расчетный счет</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">40702810123450001234</div>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">Корр. счет</label>
                                    <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">30101810400000000225</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 style="margin-bottom: 15px;">Назначение платежа</h4>
                    <div style="background: #e6f7ff; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                        <p><strong>Образец заполнения:</strong></p>
                        <p style="margin-top: 10px; font-family: monospace; background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
                            Оплата за жилищно-коммунальные услуги за [месяц] [год], лицевой счет: [номер счета], ФИО: [Фамилия И.О.]
                        </p>
                    </div>
                </div>
            </div>
            
            <div id="electronicRequisites" class="tab-content">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Электронные платежи</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
                            <h4><i class="fas fa-mobile-alt"></i> СБП (Система быстрых платежей)</h4>
                            <div style="margin-top: 15px;">
                                <p><strong>Телефон для перевода:</strong></p>
                                <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ddd; margin-top: 5px;">+7 (495) 123-45-67</div>
                                <p style="margin-top: 15px; font-size: 14px; color: #666;">
                                    Жильцы могут переводить средства через СБП, указав номер телефона компании
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="instructionsRequisites" class="tab-content">
                <div style="max-width: 800px;">
                    <h3 style="margin-bottom: 20px;">Инструкции для жильцов</h3>
                    
                    <div style="margin-bottom: 30px;">
                        <h4>Способы оплаты услуг:</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 15px;">
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-university"></i> Через банк</h5>
                                <p style="margin-top: 10px; font-size: 14px;">По реквизитам компании в отделении или онлайн-банке</p>
                            </div>
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <h5><i class="fas fa-mobile-alt"></i> Через СБП</h5>
                                <p style="margin-top: 10px; font-size: 14px;">По номеру телефона компании в приложении банка</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Инициализируем вкладки
    setTimeout(() => {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('onclick').match(/'(.+?)'/)[1];
                showRequisitesTab(tabName);
            });
        });
    }, 100);
}

function loadProfile() {
    const contentArea = document.getElementById('content-area');
    
    if (!contentArea || !window.crmData) return;
    
    const company = window.crmData.currentCompany;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Профиль компании</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
            <div>
                <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="margin-bottom: 15px;">Основная информация</h3>
                    <p><strong>Название:</strong> ${company.legalName}</p>
                    <p><strong>ИНН:</strong> ${company.inn}</p>
                    <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                    <p><strong>Регион:</strong> ${company.region}</p>
                </div>
                
                <div style="background: #e6f7ff; padding: 25px; border-radius: 12px;">
                    <h3 style="margin-bottom: 15px;">Контакты</h3>
                    <p><strong>Телефон:</strong> ${company.contacts.phone}</p>
                    <p><strong>Email:</strong> ${company.contacts.email}</p>
                    <p><strong>Адрес:</strong> ${company.contacts.address}</p>
                </div>
            </div>
            
            <div>
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom: 20px;">Статистика</h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #6912FF;">
                                ${window.crmData.buildings.length}
                            </div>
                            <div>Домов</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #6912FF;">
                                ${window.crmData.residents.length}
                            </div>
                            <div>Жильцов</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #6912FF;">
                                ${window.crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                            </div>
                            <div>Активных обращений</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #6912FF;">
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

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function showRequisitesTab(tabName) {
    // Убираем активный класс со всех вкладок контента
    document.querySelectorAll('#requisitesContent .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Убираем активный класс со всех кнопок вкладок
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    const contentElement = document.getElementById(tabName + 'Requisites');
    if (contentElement) {
        contentElement.classList.add('active');
    }
    
    // Активируем соответствующую кнопку
    const tabButtons = document.querySelectorAll(`.tab[onclick*="${tabName}"]`);
    tabButtons.forEach(btn => btn.classList.add('active'));
}

function filterResidents(filter) {
    const rows = document.querySelectorAll('#residentsTableBody tr');
    const buttons = document.querySelectorAll('.btn[onclick^="filterResidents"]');
    
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
                show = balanceText.includes('-');
                break;
            case 'no-debt':
                show = !balanceText.includes('-');
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

// ==================== ФУНКЦИИ ДЛЯ КНОПОК ====================

function viewBuilding(id) {
    const building = window.crmData.buildings.find(b => b.id === id);
    if (building) {
        alert(`Просмотр дома: ${building.address}\nЭтажи: ${building.floors}\nКвартиры: ${building.apartments}`);
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

function viewResidentDetails(id) {
    alert(`Просмотр деталей жильца #${id}. В полной версии будет открыта страница с подробной информацией.`);
}

function editResident(id) {
    alert(`Редактирование жильца #${id}. В полной версии будет открыта форма редактирования.`);
}

function sendNotificationToResident(id) {
    alert(`Отправка уведомления жильцу #${id}. В полной версии будет открыта форма отправки SMS/email.`);
}

function viewTicketDetails(id) {
    alert(`Просмотр деталей обращения #${id}. В полной версии будет открыта страница с историей и комментариями.`);
}

function assignTicket(id) {
    alert(`Назначение ответственного на обращение #${id}. В полной версии будет открыта форма назначения.`);
}

function closeTicket(id) {
    if (confirm('Вы уверены, что хотите закрыть это обращение?')) {
        alert(`Обращение #${id} закрыто. В полной версии статус будет изменен в базе данных.`);
    }
}

function viewServiceDetails(id) {
    alert(`Просмотр деталей услуги #${id}. В полной версии будет показана статистика и история платежей.`);
}

function editService(id) {
    alert(`Редактирование услуги #${id}. В полной версии будет открыта форма редактирования.`);
}

function calculateRevenue(id) {
    alert(`Расчет доходов по услуге #${id}. В полной версии будет показана детальная аналитика.`);
}

function viewContractor(id) {
    const contractor = window.crmData.contractors.find(c => c.id === id);
    if (contractor) {
        alert(`Просмотр подрядчика: ${contractor.legalName}\nИНН: ${contractor.inn}\nСтатус: ${contractor.status}`);
    }
}

function editContractor(id) {
    alert(`Редактирование подрядчика с ID ${id}. Функция будет реализована в следующей версии.`);
}

function viewDocument(id) {
    alert(`Просмотр документа #${id}. В полной версии будет открыт предпросмотр документа.`);
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

// ==================== НАСТРОЙКА МОДАЛЬНЫХ ОКОН ====================

function setupModals() {
    // Закрытие модальных окон при клике на крестик
    const closeButtons = document.querySelectorAll('.close-modal');
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });
    }
    
    // Закрытие при клике вне модального окна
    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ==================== ЭКСПОРТ ФУНКЦИЙ ====================

window.loadDashboard = loadDashboard;
window.loadBuildings = loadBuildings;
window.loadResidents = loadResidents;
window.loadTickets = loadTickets;
window.loadServices = loadServices;
window.loadPayments = loadPayments;
window.loadContractors = loadContractors;
window.loadDocuments = loadDocuments;
window.loadRequisites = loadRequisites;
window.loadProfile = loadProfile;

window.filterResidents = filterResidents;
window.filterTickets = filterTickets;

window.viewBuilding = viewBuilding;
window.editBuilding = editBuilding;
window.deleteBuilding = deleteBuilding;

window.viewResidentDetails = viewResidentDetails;
window.editResident = editResident;
window.sendNotificationToResident = sendNotificationToResident;

window.viewTicketDetails = viewTicketDetails;
window.assignTicket = assignTicket;
window.closeTicket = closeTicket;

window.viewServiceDetails = viewServiceDetails;
window.editService = editService;
window.calculateRevenue = calculateRevenue;

window.viewContractor = viewContractor;
window.editContractor = editContractor;

window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.signDocument = signDocument;
window.shareDocument = shareDocument;

window.showRequisitesTab = showRequisitesTab;
