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
            services: [
                {
                    id: 1,
                    name: "Содержание общего имущества",
                    type: "main",
                    tariff: 25.50,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 1,
                    sla: "24/7"
                },
                {
                    id: 2,
                    name: "Вывоз ТКО",
                    type: "main",
                    tariff: 15.30,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 2,
                    sla: "ежедневно"
                },
                {
                    id: 3,
                    name: "Ремонт лифтового оборудования",
                    type: "additional",
                    tariff: 1200.00,
                    period: "on-demand",
                    buildingId: 1,
                    contractorId: 3,
                    sla: "4 часа"
                },
                {
                    id: 4,
                    name: "Уборка территории",
                    type: "main",
                    tariff: 8.20,
                    period: "monthly",
                    buildingId: 2,
                    contractorId: 1,
                    sla: "еженедельно"
                },
                {
                    id: 5,
                    name: "Экстренная сантехника",
                    type: "additional",
                    tariff: 850.00,
                    period: "on-demand",
                    buildingId: null,
                    contractorId: 4,
                    sla: "2 часа"
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
                },
                {
                    id: 4,
                    legalName: "ООО 'Аварийная сантехника'",
                    inn: "7745678901",
                    workTypes: ["сантехнические работы", "аварийный ремонт"],
                    bankDetails: "ПАО 'ВТБ' р/с 40702810456780004567",
                    status: "активен"
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
                },
                {
                    id: 5,
                    serviceId: 4,
                    amount: 328.00,
                    status: "paid",
                    date: "2024-08-05",
                    payer: "ООО 'УК Профи'"
                },
                {
                    id: 6,
                    serviceId: 2,
                    amount: 612.00,
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
                    createdAt: "2024-01-15",
                    expiryDate: "2025-01-14"
                },
                {
                    id: 2,
                    type: "акт",
                    name: "Акт выполненных работ за июль 2024",
                    link: "#",
                    status: "pending",
                    entityId: 1,
                    createdAt: "2024-08-05"
                },
                {
                    id: 3,
                    type: "лицензия",
                    name: "Лицензия на управление МКД",
                    link: "#",
                    status: "signed",
                    entityId: 1,
                    createdAt: "2023-11-20",
                    expiryDate: "2028-11-19"
                },
                {
                    id: 4,
                    type: "отчет",
                    name: "Финансовый отчет за II квартал 2024",
                    link: "#",
                    status: "signed",
                    entityId: null,
                    createdAt: "2024-07-15"
                },
                {
                    id: 5,
                    type: "приказ",
                    name: "Приказ об утверждении тарифов на 2024 год",
                    link: "#",
                    status: "signed",
                    entityId: null,
                    createdAt: "2024-01-10"
                },
                {
                    id: 6,
                    type: "реестр",
                    name: "Реестр жильцов дома ул. Ленина, д. 15",
                    link: "#",
                    status: "pending",
                    entityId: 1,
                    createdAt: "2024-08-18"
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
            ],
            residents: [
                {
                    id: 1,
                    buildingId: 1,
                    apartment: 15,
                    name: "Иванов Иван Иванович",
                    phone: "+7 (912) 345-67-89",
                    email: "ivanov@mail.ru",
                    carNumber: "А123БВ 777",
                    status: "собственник",
                    verificationRequests: [
                        {
                            id: 1,
                            type: "адрес",
                            oldValue: "ул. Ленина, д. 15, кв. 15",
                            newValue: "ул. Ленина, д. 15, кв. 15 (подтверждено)",
                            status: "pending",
                            requestedAt: "2024-08-20"
                        },
                        {
                            id: 2,
                            type: "автомобиль",
                            oldValue: "А123БВ 777",
                            newValue: "А123БВ 777 (новые данные от ГИБДД)",
                            status: "pending",
                            requestedAt: "2024-08-21"
                        }
                    ],
                    documents: ["паспорт", "свидетельство о собственности"]
                },
                {
                    id: 2,
                    buildingId: 1,
                    apartment: 42,
                    name: "Петрова Мария Сергеевна",
                    phone: "+7 (923) 456-78-90",
                    email: "petrova@yandex.ru",
                    carNumber: "В456ТУ 178",
                    status: "арендатор",
                    verificationRequests: [],
                    documents: ["паспорт", "договор аренды"]
                },
                {
                    id: 3,
                    buildingId: 2,
                    apartment: 7,
                    name: "Сидоров Алексей Петрович",
                    phone: "+7 (934) 567-89-01",
                    email: "sidorov@gmail.com",
                    carNumber: "С789ОР 198",
                    status: "собственник",
                    verificationRequests: [
                        {
                            id: 3,
                            type: "статус",
                            oldValue: "собственник",
                            newValue: "собственник (документы проверены)",
                            status: "pending",
                            requestedAt: "2024-08-19"
                        }
                    ],
                    documents: ["паспорт", "свидетельство о собственности"]
                },
                {
                    id: 4,
                    buildingId: 3,
                    apartment: 25,
                    name: "Кузнецова Ольга Викторовна",
                    phone: "+7 (945) 678-90-12",
                    email: "kuznetsova@mail.ru",
                    carNumber: "О321ТС 102",
                    status: "арендатор",
                    verificationRequests: [],
                    documents: ["паспорт", "договор аренды"]
                }
            ],
            tickets: [
                {
                    id: 1,
                    residentId: 1,
                    buildingId: 1,
                    type: "ремонт",
                    title: "Протекает кран на кухне",
                    description: "В кухне постоянно капает вода из смесителя. Нужна замена прокладки.",
                    status: "в обработке",
                    priority: "средний",
                    createdAt: "2024-08-15 10:30",
                    updatedAt: "2024-08-16 14:20",
                    assignedTo: "Дмитрий К. (инженер)",
                    comments: [
                        {
                            id: 1,
                            author: "Иванов И.И.",
                            text: "Проблема появилась вчера вечером",
                            timestamp: "2024-08-15 10:30"
                        },
                        {
                            id: 2,
                            author: "Диспетчер",
                            text: "Заявка принята, ожидайте специалиста",
                            timestamp: "2024-08-15 11:15"
                        }
                    ]
                },
                {
                    id: 2,
                    residentId: 2,
                    buildingId: 1,
                    type: "уборка",
                    title: "Не убирается мусор у подъезда",
                    description: "Контейнер переполнен уже 3 дня, запах.",
                    status: "решено",
                    priority: "низкий",
                    createdAt: "2024-08-10 09:15",
                    updatedAt: "2024-08-11 16:45",
                    assignedTo: "Сервис Плюс",
                    comments: []
                },
                {
                    id: 3,
                    residentId: 3,
                    buildingId: 2,
                    type: "электрика",
                    title: "Мигает свет в подъезде",
                    description: "На 3 этаже постоянно мигает освещение.",
                    status: "новое",
                    priority: "высокий",
                    createdAt: "2024-08-20 18:45",
                    updatedAt: "2024-08-20 18:45",
                    assignedTo: null,
                    comments: []
                },
                {
                    id: 4,
                    residentId: 4,
                    buildingId: 3,
                    type: "сантехника",
                    title: "Засор в раковине",
                    description: "В ванной комнате не уходит вода из раковины.",
                    status: "новое",
                    priority: "средний",
                    createdAt: "2024-08-22 09:30",
                    updatedAt: "2024-08-22 09:30",
                    assignedTo: null,
                    comments: []
                }
            ],
            requisites: [
                {
                    id: 1,
                    bankName: "АО «АЛЬФА-БАНК»",
                    accountNumber: "40702810712340001234",
                    correspondentAccount: "30101810200000000593",
                    BIK: "044525593",
                    INN: "7701234567",
                    KPP: "770101001",
                    recipient: "ООО «УК Профи»",
                    purpose: "Оплата услуг ЖКХ",
                    lastUpdated: "2024-08-15"
                }
            ]
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        console.log('Созданы новые тестовые данные');
    } else {
        // Загружаем данные из localStorage
        window.crmData = JSON.parse(storedData);
        console.log('Данные загружены из localStorage');
    }
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
    contentArea.innerHTML = '<div style="text-align: center; padding: 50px; color: var(--gray-700);">Загрузка...</div>';
    
    // Загружаем содержимое страницы
    setTimeout(() => {
        try {
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
        } catch (error) {
            console.error('Ошибка загрузки страницы:', error);
            contentArea.innerHTML = `<div style="color: red; padding: 20px;">Ошибка загрузки: ${error.message}</div>`;
        }
    }, 100);
}

// Загрузка страницы аналитики с графиками
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
    const totalResidents = window.crmData.residents.length;
    const activeTickets = window.crmData.tickets.filter(t => t.status !== 'решено').length;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Аналитика</h2>
            <div class="date-range">
                <select class="form-control" style="width: 200px;" id="timePeriod">
                    <option value="month">Август 2024</option>
                    <option value="quarter">3 квартал 2024</option>
                    <option value="year">2024 год</option>
                </select>
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
                <div class="stat-change">-5 с прошлой недели</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
                <canvas id="paymentsChart" style="height: 300px; width: 100%;"></canvas>
            </div>
            <div>
                <canvas id="buildingsChart" style="height: 300px; width: 100%;"></canvas>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
                <canvas id="servicesChart" style="height: 300px; width: 100%;"></canvas>
            </div>
            <div>
                <canvas id="ticketsChart" style="height: 300px; width: 100%;"></canvas>
            </div>
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
                    ${window.crmData.buildings.map(building => {
                        const buildingPayments = window.crmData.payments.filter(p => {
                            const service = window.crmData.services.find(s => s.id === p.serviceId);
                            return service && service.buildingId === building.id;
                        });
                        
                        const charged = buildingPayments.reduce((sum, p) => sum + p.amount, 0);
                        const paid = buildingPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
                        const debt = charged - paid;
                        
                        return `
                            <tr>
                                <td>${building.address}</td>
                                <td>${building.apartments}</td>
                                <td>${charged.toLocaleString('ru-RU')} ₽</td>
                                <td>${paid.toLocaleString('ru-RU')} ₽</td>
                                <td style="color: ${debt > 0 ? 'var(--danger)' : 'var(--success)'}">${debt.toLocaleString('ru-RU')} ₽</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Инициализируем графики
    setTimeout(() => {
        initializeDashboardCharts();
    }, 100);
}

// Инициализация графиков на дашборде
function initializeDashboardCharts() {
    try {
        // График платежей
        const paymentsCtx = document.getElementById('paymentsChart');
        if (paymentsCtx) {
            new Chart(paymentsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Оплачено', 'В обработке', 'Начислено'],
                    datasets: [{
                        data: [
                            window.crmData.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
                            window.crmData.payments.filter(p => p.status === 'processing').reduce((sum, p) => sum + p.amount, 0),
                            window.crmData.payments.filter(p => p.status === 'charged').reduce((sum, p) => sum + p.amount, 0)
                        ],
                        backgroundColor: ['#23D160', '#FFDD57', '#FF3860']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Статус платежей' },
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // График распределения жильцов по домам
        const buildingsCtx = document.getElementById('buildingsChart');
        if (buildingsCtx) {
            new Chart(buildingsCtx, {
                type: 'bar',
                data: {
                    labels: window.crmData.buildings.map(b => b.address.split(',')[0]),
                    datasets: [{
                        label: 'Количество квартир',
                        data: window.crmData.buildings.map(b => b.apartments),
                        backgroundColor: '#6912FF'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Распределение квартир по домам' }
                    },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }

        // График услуг
        const servicesCtx = document.getElementById('servicesChart');
        if (servicesCtx) {
            new Chart(servicesCtx, {
                type: 'pie',
                data: {
                    labels: ['Основные услуги', 'Дополнительные услуги'],
                    datasets: [{
                        data: [
                            window.crmData.services.filter(s => s.type === 'main').length,
                            window.crmData.services.filter(s => s.type === 'additional').length
                        ],
                        backgroundColor: ['#00D1B2', '#6912FF']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Распределение услуг' },
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // График обращений
        const ticketsCtx = document.getElementById('ticketsChart');
        if (ticketsCtx) {
            const ticketTypes = ['ремонт', 'уборка', 'электрика', 'сантехника'];
            const ticketCounts = ticketTypes.map(type => 
                window.crmData.tickets.filter(t => t.type === type).length
            );
            
            new Chart(ticketsCtx, {
                type: 'polarArea',
                data: {
                    labels: ticketTypes,
                    datasets: [{
                        data: ticketCounts,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { title: { display: true, text: 'Обращения по типам' } }
                }
            });
        }
    } catch (error) {
        console.error('Ошибка инициализации графиков:', error);
    }
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
    
    // Считаем статистику
    const totalResidents = window.crmData.residents.length;
    const owners = window.crmData.residents.filter(r => r.status === 'собственник').length;
    const tenants = window.crmData.residents.filter(r => r.status === 'арендатор').length;
    const pendingVerifications = window.crmData.residents.reduce((sum, resident) => 
        sum + resident.verificationRequests.filter(v => v.status === 'pending').length, 0);
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Жильцы</h2>
            <button class="btn btn-primary" id="addResidentBtn">
                <i class="fas fa-user-plus"></i> Добавить жильца
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего жильцов</h3>
                <div class="stat-value">${totalResidents}</div>
                <div class="stat-change">в ${window.crmData.buildings.length} домах</div>
            </div>
            <div class="stat-card">
                <h3>Собственники</h3>
                <div class="stat-value">${owners}</div>
                <div class="stat-change">${totalResidents > 0 ? ((owners/totalResidents)*100).toFixed(0) : 0}%</div>
            </div>
            <div class="stat-card">
                <h3>Арендаторы</h3>
                <div class="stat-value">${tenants}</div>
                <div class="stat-change">${totalResidents > 0 ? ((tenants/totalResidents)*100).toFixed(0) : 0}%</div>
            </div>
            <div class="stat-card">
                <h3>Запросы на проверку</h3>
                <div class="stat-value">${pendingVerifications}</div>
                <div class="stat-change">ожидают подтверждения</div>
            </div>
        </div>
        
        <div class="tabs" style="margin-top: 30px;">
            <button class="tab active" data-tab="residents-list">Список жильцов</button>
            <button class="tab" data-tab="verification-requests">Запросы на подтверждение ${pendingVerifications > 0 ? `<span class="notification-badge">${pendingVerifications}</span>` : ''}</button>
        </div>
        
        <div class="tab-content active" id="residents-list">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th>Автомобиль</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.crmData.residents.map(resident => {
                            const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
                            return `
                                <tr>
                                    <td><strong>${resident.name}</strong></td>
                                    <td>${building ? building.address : 'Неизвестно'}, кв. ${resident.apartment}</td>
                                    <td>${resident.phone}</td>
                                    <td>${resident.carNumber || 'Не указан'}</td>
                                    <td>
                                        <span class="status-badge ${resident.status === 'собственник' ? 'status-paid' : 'status-processing'}">
                                            ${resident.status}
                                        </span>
                                    </td>
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
        </div>
        
        <div class="tab-content" id="verification-requests">
            ${pendingVerifications === 0 ? 
                '<p style="text-align: center; padding: 40px; color: var(--gray-700);">Нет запросов на подтверждение данных.</p>' : 
                window.crmData.residents.filter(r => r.verificationRequests.some(v => v.status === 'pending')).map(resident => {
                    const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
                    return `
                        <div class="verification-card" style="background: var(--gray-100); padding: 20px; margin-bottom: 15px; border-radius: 12px;">
                            <h4>${resident.name}</h4>
                            <p>${building ? building.address : ''}, кв. ${resident.apartment}</p>
                            ${resident.verificationRequests.filter(v => v.status === 'pending').map(request => `
                                <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 8px;">
                                    <p><strong>Тип запроса:</strong> ${request.type}</p>
                                    <p><strong>Текущие данные:</strong> ${request.oldValue}</p>
                                    <p><strong>Новые данные от системы:</strong> ${request.newValue}</p>
                                    <p><strong>Дата запроса:</strong> ${request.requestedAt}</p>
                                    <div style="margin-top: 15px;">
                                        <button class="btn btn-primary" onclick="approveVerification(${resident.id}, ${request.id})">
                                            Подтвердить
                                        </button>
                                        <button class="btn btn-secondary" onclick="rejectVerification(${resident.id}, ${request.id})">
                                            Отклонить
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }).join('')}
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
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Обработчик добавления жильца
    document.getElementById('addResidentBtn').addEventListener('click', () => {
        alert('Функция добавления жильца будет реализована в следующей версии');
    });
}

// Загрузка страницы обращений
function loadTickets() {
    const contentArea = document.getElementById('content-area');
    
    const totalTickets = window.crmData.tickets.length;
    const newTickets = window.crmData.tickets.filter(t => t.status === 'новое').length;
    const inProgress = window.crmData.tickets.filter(t => t.status === 'в обработке').length;
    const resolved = window.crmData.tickets.filter(t => t.status === 'решено').length;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Обращения жильцов</h2>
            <button class="btn btn-primary" id="createTicketBtn">
                <i class="fas fa-plus"></i> Создать обращение
            </button>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего обращений</h3>
                <div class="stat-value">${totalTickets}</div>
                <div class="stat-change">за последние 30 дней</div>
            </div>
            <div class="stat-card">
                <h3>Новые</h3>
                <div class="stat-value">${newTickets}</div>
                <div class="stat-change">требуют внимания</div>
            </div>
            <div class="stat-card">
                <h3>В обработке</h3>
                <div class="stat-value">${inProgress}</div>
                <div class="stat-change">активные обращения</div>
            </div>
            <div class="stat-card">
                <h3>Решено</h3>
                <div class="stat-value">${resolved}</div>
                <div class="stat-change">${totalTickets > 0 ? ((resolved/totalTickets)*100).toFixed(0) : 0}% решено</div>
            </div>
        </div>
        
        <div class="filters" style="margin: 30px 0; display: flex; gap: 10px; flex-wrap: wrap;">
            <select class="form-control" style="width: 200px;" id="statusFilter">
                <option value="">Все статусы</option>
                <option value="новое">Новые</option>
                <option value="в обработке">В обработке</option>
                <option value="решено">Решено</option>
            </select>
            <select class="form-control" style="width: 200px;" id="typeFilter">
                <option value="">Все типы</option>
                <option value="ремонт">Ремонт</option>
                <option value="уборка">Уборка</option>
                <option value="электрика">Электрика</option>
                <option value="сантехника">Сантехника</option>
            </select>
            <button class="btn btn-secondary" id="applyFilters">Применить</button>
        </div>
        
        <div class="table-container">
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
                <tbody>
                    ${window.crmData.tickets.map(ticket => {
                        const resident = window.crmData.residents.find(r => r.id === ticket.residentId);
                        let priorityClass = '';
                        switch(ticket.priority) {
                            case 'высокий': priorityClass = 'status-pending'; break;
                            case 'средний': priorityClass = 'status-processing'; break;
                            case 'низкий': priorityClass = 'status-paid'; break;
                        }
                        
                        let statusClass = '';
                        switch(ticket.status) {
                            case 'новое': statusClass = 'status-pending'; break;
                            case 'в обработке': statusClass = 'status-processing'; break;
                            case 'решено': statusClass = 'status-paid'; break;
                        }
                        
                        return `
                            <tr>
                                <td>#${ticket.id}</td>
                                <td><strong>${ticket.title}</strong></td>
                                <td>${resident ? resident.name : 'Неизвестно'}</td>
                                <td>${ticket.type}</td>
                                <td><span class="status-badge ${priorityClass}">${ticket.priority}</span></td>
                                <td><span class="status-badge ${statusClass}">${ticket.status}</span></td>
                                <td>${ticket.createdAt}</td>
                                <td>${ticket.assignedTo || 'Не назначен'}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewTicket(${ticket.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="assignTicket(${ticket.id})">
                                        <i class="fas fa-user-tag"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Обработчики фильтров
    document.getElementById('applyFilters').addEventListener('click', applyTicketFilters);
    document.getElementById('createTicketBtn').addEventListener('click', () => {
        alert('Функция создания обращения будет реализована в следующей версии');
    });
}

// Загрузка страницы услуг и тарифов
function loadServices() {
    const contentArea = document.getElementById('content-area');
    
    const mainServices = window.crmData.services.filter(s => s.type === 'main').length;
    const additionalServices = window.crmData.services.filter(s => s.type === 'additional').length;
    const totalMonthly = window.crmData.services
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
                <div class="stat-value">${window.crmData.services.length}</div>
                <div class="stat-change">в системе</div>
            </div>
            <div class="stat-card">
                <h3>Основные услуги</h3>
                <div class="stat-value">${mainServices}</div>
                <div class="stat-change">ежемесячные</div>
            </div>
            <div class="stat-card">
                <h3>Дополнительные</h3>
                <div class="stat-value">${additionalServices}</div>
                <div class="stat-change">по требованию</div>
            </div>
            <div class="stat-card">
                <h3>Сумма тарифов</h3>
                <div class="stat-value">${totalMonthly.toLocaleString('ru-RU')} ₽</div>
                <div class="stat-change">в месяц</div>
            </div>
        </div>
        
        <div class="tabs" style="margin-top: 30px;">
            <button class="tab active" data-tab="services-list">Все услуги</button>
            <button class="tab" data-tab="main-services">Основные услуги</button>
            <button class="tab" data-tab="additional-services">Дополнительные</button>
        </div>
        
        <div class="tab-content active" id="services-list">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Тариф</th>
                            <th>Период</th>
                            <th>Дом</th>
                            <th>Подрядчик</th>
                            <th>SLA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.crmData.services.map(service => {
                            const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                            const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
                            
                            return `
                                <tr>
                                    <td><strong>${service.name}</strong></td>
                                    <td>
                                        <span class="status-badge ${service.type === 'main' ? 'status-paid' : 'status-processing'}">
                                            ${service.type === 'main' ? 'Основная' : 'Дополнительная'}
                                        </span>
                                    </td>
                                    <td>${service.tariff.toLocaleString('ru-RU')} ₽/${service.period === 'monthly' ? 'мес' : 'услуга'}</td>
                                    <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                                    <td>${building ? building.address : 'Все дома'}</td>
                                    <td>${contractor ? contractor.legalName : 'Не назначен'}</td>
                                    <td>${service.sla}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="tab-content" id="main-services">
            <h3>Основные (ежемесячные) услуги</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тариф</th>
                            <th>Дом</th>
                            <th>Начислено в месяц</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.crmData.services.filter(s => s.type === 'main').map(service => {
                            const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                            const monthlyAmount = building ? service.tariff * building.apartments : service.tariff * 50;
                            
                            return `
                                <tr>
                                    <td>${service.name}</td>
                                    <td>${service.tariff.toLocaleString('ru-RU')} ₽/мес</td>
                                    <td>${building ? building.address : 'Все дома'}</td>
                                    <td><strong>${monthlyAmount.toLocaleString('ru-RU')} ₽</strong></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="tab-content" id="additional-services">
            <h3>Дополнительные услуги (по требованию)</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тариф</th>
                            <th>Подрядчик</th>
                            <th>SLA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${window.crmData.services.filter(s => s.type === 'additional').map(service => {
                            const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
                            return `
                                <tr>
                                    <td>${service.name}</td>
                                    <td>${service.tariff.toLocaleString('ru-RU')} ₽/услуга</td>
                                    <td>${contractor ? contractor.legalName : 'Не назначен'}</td>
                                    <td>${service.sla}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
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
            document.getElementById(tabName).classList.add('active');
        });
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
                <div class="stat-change">${totalCharged > 0 ? ((totalPaid / totalCharged) * 100).toFixed(1) : 0}% от начисленного</div>
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
        alert('Функция добавления подрядчика будет реализована в следующей версии');
    });
}

// Загрузка страницы документов
function loadDocuments() {
    const contentArea = document.getElementById('content-area');
    
    const signedDocs = window.crmData.documents.filter(d => d.status === 'signed').length;
    const pendingDocs = window.crmData.documents.filter(d => d.status === 'pending').length;
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-secondary" id="uploadDocBtn">
                    <i class="fas fa-upload"></i> Загрузить документ
                </button>
                <button class="btn btn-primary" id="createDocBtn">
                    <i class="fas fa-plus"></i> Создать документ
                </button>
            </div>
        </div>
        
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего документов</h3>
                <div class="stat-value">${window.crmData.documents.length}</div>
                <div class="stat-change">в хранилище</div>
            </div>
            <div class="stat-card">
                <h3>Подписано</h3>
                <div class="stat-value">${signedDocs}</div>
                <div class="stat-change">активные документы</div>
            </div>
            <div class="stat-card">
                <h3>Ожидают подписи</h3>
                <div class="stat-value">${pendingDocs}</div>
                <div class="stat-change">требуют внимания</div>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.documents.map(doc => {
                        let statusClass = '';
                        let statusText = '';
                        switch(doc.status) {
                            case 'signed': statusClass = 'status-paid'; statusText = 'Подписано'; break;
                            case 'pending': statusClass = 'status-pending'; statusText = 'Ожидает подписи'; break;
                        }
                        
                        return `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center;">
                                        <i class="fas fa-file-pdf" style="color: #e74c3c; margin-right: 10px; font-size: 20px;"></i>
                                        <strong>${doc.name}</strong>
                                    </div>
                                </td>
                                <td>${doc.type}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                                <td>${doc.createdAt || 'Не указана'}</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="downloadDocument(${doc.id})">
                                        <i class="fas fa-download"></i>
                                    </button>
                                    ${doc.status === 'pending' ? `
                                        <button class="btn btn-primary" onclick="signDocument(${doc.id})">
                                            <i class="fas fa-signature"></i>
                                        </button>
                                    ` : ''}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Загрузка страницы реквизитов
function loadRequisites() {
    const contentArea = document.getElementById('content-area');
    const requisites = window.crmData.requisites[0] || {};
    
    contentArea.innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
            <button class="btn btn-primary" id="editRequisitesBtn">
                <i class="fas fa-edit"></i> Редактировать реквизиты
            </button>
        </div>
        
        <div class="requisites-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div>
                <h3 style="margin-bottom: 25px; color: var(--primary);">Банковские реквизиты</h3>
                
                <div class="requisites-card" style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <div class="requisites-item" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-200);">
                        <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">Получатель</div>
                        <div style="font-size: 18px; font-weight: 600;">${requisites.recipient || 'ООО «УК Профи»'}</div>
                    </div>
                    
                    <div class="requisites-item" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-200);">
                        <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">Банк получателя</div>
                        <div style="font-size: 18px; font-weight: 600;">${requisites.bankName || 'АО «АЛЬФА-БАНК»'}</div>
                    </div>
                    
                    <div class="requisites-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="requisites-item">
                            <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">Расчетный счет</div>
                            <div style="font-size: 16px; font-weight: 600; font-family: monospace;">${requisites.accountNumber || '40702810712340001234'}</div>
                        </div>
                        
                        <div class="requisites-item">
                            <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">Корр. счет</div>
                            <div style="font-size: 16px; font-weight: 600; font-family: monospace;">${requisites.correspondentAccount || '30101810200000000593'}</div>
                        </div>
                    </div>
                    
                    <div class="requisites-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                        <div class="requisites-item">
                            <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">БИК</div>
                            <div style="font-size: 16px; font-weight: 600; font-family: monospace;">${requisites.BIK || '044525593'}</div>
                        </div>
                        
                        <div class="requisites-item">
                            <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">ИНН</div>
                            <div style="font-size: 16px; font-weight: 600; font-family: monospace;">${requisites.INN || '7701234567'}</div>
                        </div>
                    </div>
                    
                    <div class="requisites-item" style="margin-top: 20px;">
                        <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 8px;">КПП</div>
                        <div style="font-size: 16px; font-weight: 600; font-family: monospace;">${requisites.KPP || '770101001'}</div>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <button class="btn btn-secondary" onclick="copyRequisitesToClipboard()" style="margin-right: 10px;">
                        <i class="fas fa-copy"></i> Скопировать реквизиты
                    </button>
                </div>
            </div>
            
            <div>
                <h3 style="margin-bottom: 25px; color: var(--primary);">Информация для плательщиков</h3>
                
                <div class="payment-info" style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <div class="info-item" style="margin-bottom: 25px;">
                        <h4 style="margin-bottom: 10px; color: var(--dark);">Назначение платежа</h4>
                        <div style="background: var(--gray-100); padding: 15px; border-radius: 8px; font-family: monospace;">
                            ${requisites.purpose || 'Оплата услуг ЖКХ'} 
                        </div>
                        <p style="font-size: 14px; color: var(--gray-700); margin-top: 10px;">
                            Обязательно указывайте в назначении платежа:<br>
                            1. Адрес дома<br>
                            2. Номер квартиры<br>
                            3. ФИО плательщика
                        </p>
                    </div>
                    
                    <div class="info-item" style="margin-bottom: 25px;">
                        <h4 style="margin-bottom: 10px; color: var(--dark);">Шаблон для квитанции</h4>
                        <div style="background: var(--gray-100); padding: 15px; border-radius: 8px;">
                            <p><strong>Для: </strong>${requisites.recipient || 'ООО «УК Профи»'}</p>
                            <p><strong>Назначение: </strong>${requisites.purpose || 'Оплата услуг ЖКХ'} по адресу: [Адрес дома], кв. [Номер квартиры]</p>
                            <p><strong>Плательщик: </strong>[ФИО]</p>
                            <p><strong>Сумма: </strong>[Сумма] рублей</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Загрузка страницы профиля УК
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
            <ul>
                ${company.licenses.map(license => `<li>${license}</li>`).join('')}
            </ul>
        </div>
    `;
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

// Заполнение формы платежа данными
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

// Фильтрация платежей
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

// Применение фильтров для обращений
function applyTicketFilters() {
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;
    
    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge:nth-child(6)');
        const typeCell = row.cells[3];
        
        let showRow = true;
        
        if (status && statusBadge && !statusBadge.textContent.includes(status)) {
            showRow = false;
        }
        if (type && typeCell && typeCell.textContent !== type) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Функции для работы с домами
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

// Функции для работы с жильцами
function viewResident(id) {
    const resident = window.crmData.residents.find(r => r.id === id);
    if (resident) {
        const building = window.crmData.buildings.find(b => b.id === resident.buildingId);
        
        let modalContent = `
            <h3>${resident.name}</h3>
            <p><strong>Адрес:</strong> ${building ? building.address : 'Неизвестно'}, кв. ${resident.apartment}</p>
            <p><strong>Телефон:</strong> ${resident.phone}</p>
            <p><strong>Email:</strong> ${resident.email}</p>
            <p><strong>Автомобиль:</strong> ${resident.carNumber || 'Не указан'}</p>
            <p><strong>Статус:</strong> ${resident.status}</p>
        `;
        
        alert(modalContent);
    }
}

function editResident(id) {
    alert(`Редактирование жильца с ID ${id}. Функция будет реализована в следующей версии.`);
}

function approveVerification(residentId, requestId) {
    const resident = window.crmData.residents.find(r => r.id === residentId);
    const request = resident.verificationRequests.find(r => r.id === requestId);
    
    if (request) {
        request.status = 'approved';
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        alert('Запрос подтвержден!');
        loadResidents();
    }
}

function rejectVerification(residentId, requestId) {
    if (confirm('Вы уверены, что хотите отклонить запрос на подтверждение?')) {
        const resident = window.crmData.residents.find(r => r.id === residentId);
        const request = resident.verificationRequests.find(r => r.id === requestId);
        
        if (request) {
            request.status = 'rejected';
            localStorage.setItem('crmData', JSON.stringify(window.crmData));
            alert('Запрос отклонен!');
            loadResidents();
        }
    }
}

// Функции для работы с обращениями
function viewTicket(id) {
    const ticket = window.crmData.tickets.find(t => t.id === id);
    if (ticket) {
        const resident = window.crmData.residents.find(r => r.id === ticket.residentId);
        const building = window.crmData.buildings.find(b => b.id === ticket.buildingId);
        
        let modalContent = `
            <h3>Обращение #${ticket.id}</h3>
            <p><strong>Тема:</strong> ${ticket.title}</p>
            <p><strong>Жилец:</strong> ${resident ? resident.name : 'Неизвестно'}</p>
            <p><strong>Адрес:</strong> ${building ? building.address : 'Неизвестно'}</p>
            <p><strong>Тип:</strong> ${ticket.type}</p>
            <p><strong>Приоритет:</strong> ${ticket.priority}</p>
            <p><strong>Статус:</strong> ${ticket.status}</p>
            <p><strong>Описание:</strong> ${ticket.description}</p>
            <p><strong>Создано:</strong> ${ticket.createdAt}</p>
            <p><strong>Ответственный:</strong> ${ticket.assignedTo || 'Не назначен'}</p>
        `;
        
        alert(modalContent);
    }
}

function assignTicket(id) {
    const ticket = window.crmData.tickets.find(t => t.id === id);
    if (ticket) {
        const assignee = prompt('Введите имя ответственного (например: "Иванов И.И." или "ООО Сервис"):');
        if (assignee) {
            ticket.assignedTo = assignee;
            ticket.status = 'в обработке';
            localStorage.setItem('crmData', JSON.stringify(window.crmData));
            alert(`Обращение #${id} назначено на: ${assignee}`);
            loadTickets();
        }
    }
}

// Функции для работы с подрядчиками
function viewContractor(id) {
    const contractor = window.crmData.contractors.find(c => c.id === id);
    
    if (contractor) {
        alert(`Просмотр подрядчика: ${contractor.legalName}\nИНН: ${contractor.inn}\nСтатус: ${contractor.status}`);
    }
}

function editContractor(id) {
    alert(`Редактирование подрядчика с ID ${id}. Функция будет реализована в следующей версии.`);
}

// Функции для работы с документами
function downloadDocument(id) {
    const doc = window.crmData.documents.find(d => d.id === id);
    if (doc) {
        alert(`Начата загрузка документа: ${doc.name}`);
    }
}

function signDocument(id) {
    if (confirm('Вы подтверждаете подписание этого документа?')) {
        const doc = window.crmData.documents.find(d => d.id === id);
        if (doc) {
            doc.status = 'signed';
            localStorage.setItem('crmData', JSON.stringify(window.crmData));
            alert(`Документ "${doc.name}" подписан!`);
            loadDocuments();
        }
    }
}

// Функции для работы с реквизитами
function copyRequisitesToClipboard() {
    const requisites = window.crmData.requisites[0] || {};
    const text = `
Получатель: ${requisites.recipient || 'ООО «УК Профи»'}
Банк: ${requisites.bankName || 'АО «АЛЬФА-БАНК»'}
Расчетный счет: ${requisites.accountNumber || '40702810712340001234'}
Корр. счет: ${requisites.correspondentAccount || '30101810200000000593'}
БИК: ${requisites.BIK || '044525593'}
ИНН: ${requisites.INN || '7701234567'}
КПП: ${requisites.KPP || '770101001'}
Назначение платежа: ${requisites.purpose || 'Оплата услуг ЖКХ'}
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Реквизиты скопированы в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        alert('Не удалось скопировать реквизиты');
    });
}

// Экспортируем функции для использования в HTML
window.viewBuilding = viewBuilding;
window.viewResident = viewResident;
window.editResident = editResident;
window.approveVerification = approveVerification;
window.rejectVerification = rejectVerification;
window.viewTicket = viewTicket;
window.assignTicket = assignTicket;
window.viewContractor = viewContractor;
window.editContractor = editContractor;
window.downloadDocument = downloadDocument;
window.signDocument = signDocument;
window.copyRequisitesToClipboard = copyRequisitesToClipboard;
