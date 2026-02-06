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
                    entityId: 1
                },
                {
                    id: 2,
                    type: "акт",
                    name: "Акт выполненных работ за июль 2024",
                    link: "#",
                    status: "pending",
                    entityId: 1
                },
                {
                    id: 3,
                    type: "лицензия",
                    name: "Лицензия на управление МКД",
                    link: "#",
                    status: "signed",
                    entityId: 1
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
            ]
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
            verificationRequests: []
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
            ]
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
            purpose: "Оплата услуг ЖКХ"
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
                <div class="stat-value">12</div>
                <div class="stat-change">-5 с прошлой недели</div>
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
        alert('Функция добавления подрядчика будет реализована в следующей версии');
    });
}

// Загрузка других страниц (заглушки)
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
                <div class="stat-change">${((owners/totalResidents)*100).toFixed(0)}% от общего числа</div>
            </div>
            <div class="stat-card">
                <h3>Арендаторы</h3>
                <div class="stat-value">${tenants}</div>
                <div class="stat-change">${((tenants/totalResidents)*100).toFixed(0)}% от общего числа</div>
            </div>
            <div class="stat-card">
                <h3>Запросы на проверку</h3>
                <div class="stat-value">${pendingVerifications}</div>
                <div class="stat-change">ожидают подтверждения</div>
            </div>
        </div>
        
        <div class="tabs" style="margin-top: 30px;">
            <button class="tab active" data-tab="residents-list">Список жильцов</button>
            <button class="tab" data-tab="verification-requests">Запросы на подтверждение <span class="notification-badge">${pendingVerifications}</span></button>
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
                                        <button class="btn btn-secondary" onclick="showVerificationModal(${resident.id})">
                                            <i class="fas fa-check-circle"></i>
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
                '<p>Нет запросов на подтверждение данных.</p>' : 
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
                                        <button class="btn btn-secondary" onclick="requestMoreInfo(${resident.id}, ${request.id})">
                                            Запросить доп. информацию
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
        openResidentModal();
    });
}

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
                <option value="отменено">Отменено</option>
            </select>
            <select class="form-control" style="width: 200px;" id="typeFilter">
                <option value="">Все типы</option>
                <option value="ремонт">Ремонт</option>
                <option value="уборка">Уборка</option>
                <option value="электрика">Электрика</option>
                <option value="сантехника">Сантехника</option>
                <option value="другое">Другое</option>
            </select>
            <select class="form-control" style="width: 200px;" id="priorityFilter">
                <option value="">Все приоритеты</option>
                <option value="высокий">Высокий</option>
                <option value="средний">Средний</option>
                <option value="низкий">Низкий</option>
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
                                    <button class="btn btn-secondary" onclick="updateTicketStatus(${ticket.id})">
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
    
    // Обработчики фильтров
    document.getElementById('applyFilters').addEventListener('click', applyTicketFilters);
    document.getElementById('createTicketBtn').addEventListener('click', () => {
        openTicketModal();
    });
}

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
            <button class="tab" data-tab="tariff-plans">Тарифные планы</button>
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
                            <th>Действия</th>
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
                                    <td>
                                        <button class="btn btn-secondary" onclick="editService(${service.id})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-secondary" onclick="assignServiceToBuilding(${service.id})">
                                            <i class="fas fa-building"></i>
                                        </button>
                                        <button class="btn btn-secondary" onclick="showServiceAnalytics(${service.id})">
                                            <i class="fas fa-chart-bar"></i>
                                        </button>
                                    </td>
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
                            const monthlyAmount = building ? service.tariff * building.apartments : service.tariff * 50; // пример расчета
                            
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
        
        <div class="tab-content" id="tariff-plans">
            <h3>Тарифные планы для домов</h3>
            <div class="tariff-plans" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                ${window.crmData.buildings.map(building => {
                    const buildingServices = window.crmData.services.filter(s => s.buildingId === building.id || !s.buildingId);
                    const monthlyTotal = buildingServices
                        .filter(s => s.type === 'main')
                        .reduce((sum, s) => sum + s.tariff, 0) * building.apartments;
                    
                    return `
                        <div class="tariff-card" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h4>${building.address}</h4>
                            <p><strong>Квартир:</strong> ${building.apartments}</p>
                            <p><strong>Ежемесячный сбор:</strong> ${monthlyTotal.toLocaleString('ru-RU')} ₽</p>
                            <p><strong>Услуги:</strong> ${buildingServices.length}</p>
                            <button class="btn btn-secondary" onclick="editBuildingTariff(${building.id})" style="margin-top: 15px;">
                                Настроить тарифы
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    // Настройка вкладок
    setupTabs();
    
    // Обработчик добавления услуги
    document.getElementById('addServiceBtn').addEventListener('click', () => {
        openServiceModal();
    });
}

function loadDocuments() {
    const contentArea = document.getElementById('content-area');
    
    const signedDocs = window.crmData.documents.filter(d => d.status === 'signed').length;
    const pendingDocs = window.crmData.documents.filter(d => d.status === 'pending').length;
    const rejectedDocs = window.crmData.documents.filter(d => d.status === 'rejected').length;
    
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
            <div class="stat-card">
                <h3>Отклонено</h3>
                <div class="stat-value">${rejectedDocs}</div>
                <div class="stat-change">архивные</div>
            </div>
        </div>
        
        <div class="filters" style="margin: 30px 0; display: flex; gap: 10px; flex-wrap: wrap;">
            <select class="form-control" style="width: 200px;" id="docTypeFilter">
                <option value="">Все типы</option>
                <option value="договор">Договоры</option>
                <option value="акт">Акты</option>
                <option value="лицензия">Лицензии</option>
                <option value="отчет">Отчеты</option>
                <option value="приказ">Приказы</option>
                <option value="реестр">Реестры</option>
            </select>
            <select class="form-control" style="width: 200px;" id="docStatusFilter">
                <option value="">Все статусы</option>
                <option value="signed">Подписано</option>
                <option value="pending">Ожидает подписи</option>
                <option value="rejected">Отклонено</option>
            </select>
            <input type="text" class="form-control" style="width: 250px;" placeholder="Поиск по названию..." id="docSearch">
            <button class="btn btn-secondary" id="applyDocFilters">Применить</button>
            <button class="btn btn-secondary" id="exportDocs">
                <i class="fas fa-download"></i> Экспорт
            </button>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Статус</th>
                        <th>Связанный объект</th>
                        <th>Дата создания</th>
                        <th>Размер</th>
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
                            case 'rejected': statusClass = 'status-processing'; statusText = 'Отклонено'; break;
                        }
                        
                        let entityInfo = '';
                        if (doc.entityId) {
                            // Пытаемся найти связанный объект
                            const contractor = window.crmData.contractors.find(c => c.id === doc.entityId);
                            const building = window.crmData.buildings.find(b => b.id === doc.entityId);
                            const service = window.crmData.services.find(s => s.id === doc.entityId);
                            
                            if (contractor) entityInfo = `Подрядчик: ${contractor.legalName}`;
                            else if (building) entityInfo = `Дом: ${building.address}`;
                            else if (service) entityInfo = `Услуга: ${service.name}`;
                            else entityInfo = `ID: ${doc.entityId}`;
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
                                <td>${entityInfo || 'Общий'}</td>
                                <td>${doc.createdAt || 'Не указана'}</td>
                                <td>2.4 MB</td>
                                <td>
                                    <button class="btn btn-secondary" onclick="viewDocument(${doc.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-secondary" onclick="downloadDocument(${doc.id})">
                                        <i class="fas fa-download"></i>
                                    </button>
                                    ${doc.status === 'pending' ? `
                                        <button class="btn btn-primary" onclick="signDocument(${doc.id})">
                                            <i class="fas fa-signature"></i>
                                        </button>
                                    ` : ''}
                                    <button class="btn btn-secondary" onclick="shareDocument(${doc.id})">
                                        <i class="fas fa-share"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 40px;">
            <h3>Сроки действия документов</h3>
            <div class="document-expiry" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                ${window.crmData.documents.filter(d => d.expiryDate).map(doc => {
                    const expiryDate = new Date(doc.expiryDate);
                    const now = new Date();
                    const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                    let expiryClass = '';
                    
                    if (daysLeft < 0) expiryClass = 'expired';
                    else if (daysLeft < 30) expiryClass = 'warning';
                    else if (daysLeft < 90) expiryClass = 'notice';
                    
                    return `
                        <div class="expiry-card ${expiryClass}" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid ${expiryClass === 'expired' ? '#e74c3c' : expiryClass === 'warning' ? '#f39c12' : '#2ecc71'}">
                            <h4>${doc.name}</h4>
                            <p><strong>Тип:</strong> ${doc.type}</p>
                            <p><strong>Дата окончания:</strong> ${doc.expiryDate}</p>
                            <p><strong>Осталось дней:</strong> ${daysLeft > 0 ? daysLeft : 'Истек'}</p>
                            ${daysLeft < 30 && daysLeft > 0 ? `
                                <button class="btn btn-secondary" onclick="renewDocument(${doc.id})" style="margin-top: 10px;">
                                    Продлить документ
                                </button>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    // Обработчики фильтров
    document.getElementById('applyDocFilters').addEventListener('click', applyDocumentFilters);
    document.getElementById('createDocBtn').addEventListener('click', () => {
        openDocumentModal();
    });
    document.getElementById('uploadDocBtn').addEventListener('click', () => {
        openUploadModal();
    });
    document.getElementById('exportDocs').addEventListener('click', exportDocuments);
}

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
                    <button class="btn btn-secondary" onclick="generatePaymentQR()">
                        <i class="fas fa-qrcode"></i> Создать QR-код
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
                    
                    <div class="info-item">
                        <h4 style="margin-bottom: 10px; color: var(--dark);">Способы оплаты</h4>
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <div class="payment-method" style="text-align: center; padding: 15px; border: 1px solid var(--gray-200); border-radius: 8px; min-width: 120px;">
                                <i class="fas fa-university" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                                <div>Банковский перевод</div>
                            </div>
                            <div class="payment-method" style="text-align: center; padding: 15px; border: 1px solid var(--gray-200); border-radius: 8px; min-width: 120px;">
                                <i class="fas fa-mobile-alt" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                                <div>Мобильный банк</div>
                            </div>
                            <div class="payment-method" style="text-align: center; padding: 15px; border: 1px solid var(--gray-200); border-radius: 8px; min-width: 120px;">
                                <i class="fas fa-qrcode" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                                <div>QR-код</div>
                            </div>
                            <div class="payment-method" style="text-align: center; padding: 15px; border: 1px solid var(--gray-200); border-radius: 8px; min-width: 120px;">
                                <i class="fas fa-wallet" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                                <div>Электронные кошельки</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4 style="margin-bottom: 15px;">История изменений реквизитов</h4>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата изменения</th>
                                    <th>Измененное поле</th>
                                    <th>Старое значение</th>
                                    <th>Новое значение</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>15.08.2024</td>
                                    <td>Расчетный счет</td>
                                    <td>40702810712340001233</td>
                                    <td>40702810712340001234</td>
                                </tr>
                                <tr>
                                    <td>01.07.2024</td>
                                    <td>БИК</td>
                                    <td>044525592</td>
                                    <td>044525593</td>
                                </tr>
                                <tr>
                                    <td>15.05.2024</td>
                                    <td>Название банка</td>
                                    <td>АО «Альфа-Банк»</td>
                                    <td>АО «АЛЬФА-БАНК»</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Обработчик редактирования реквизитов
    document.getElementById('editRequisitesBtn').addEventListener('click', () => {
        openRequisitesModal();
    });
}

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
    // Эта функция может быть расширена для других графиков
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

// Функции для работы с домами (для кнопок действий)
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

function viewContractor(id) {
    const contractor = window.crmData.contractors.find(c => c.id === id);
    
    if (contractor) {
        alert(`Просмотр подрядчика: ${contractor.legalName}\nИНН: ${contractor.inn}\nСтатус: ${contractor.status}`);
    }
}

function editContractor(id) {
    alert(`Редактирование подрядчика с ID ${id}. Функция будет реализована в следующей версии.`);
}

// Экспортируем функции для использования в HTML
window.viewBuilding = viewBuilding;
window.editBuilding = editBuilding;
window.deleteBuilding = deleteBuilding;
window.viewContractor = viewContractor;
window.editContractor = editContractor;

// Вспомогательные функции для новых страниц

// Функции для жильцов
function viewResident(id) {
    const resident = window.crmData.residents.find(r => r.id === id);
    if (resident) {
        alert(`Просмотр жильца: ${resident.name}\nТелефон: ${resident.phone}\nСтатус: ${resident.status}`);
    }
}

function editResident(id) {
    alert(`Редактирование жильца с ID ${id}. Функция будет реализована в следующей версии.`);
}

function showVerificationModal(residentId) {
    const resident = window.crmData.residents.find(r => r.id === residentId);
    if (resident) {
        alert(`Запрос подтверждения данных для: ${resident.name}\nТекущий статус: ${resident.status}`);
    }
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

// Функции для обращений
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
        
        if (ticket.comments && ticket.comments.length > 0) {
            modalContent += `<h4>Комментарии:</h4>`;
            ticket.comments.forEach(comment => {
                modalContent += `<p><strong>${comment.author}:</strong> ${comment.text} (${comment.timestamp})</p>`;
            });
        }
        
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

function updateTicketStatus(id) {
    const ticket = window.crmData.tickets.find(t => t.id === id);
    if (ticket) {
        const newStatus = prompt('Введите новый статус (новое, в обработке, решено, отменено):', ticket.status);
        if (newStatus) {
            ticket.status = newStatus;
            ticket.updatedAt = new Date().toLocaleString('ru-RU');
            localStorage.setItem('crmData', JSON.stringify(window.crmData));
            alert(`Статус обращения #${id} изменен на: ${newStatus}`);
            loadTickets();
        }
    }
}

// Функции для услуг
function editService(id) {
    alert(`Редактирование услуги с ID ${id}. Функция будет реализована в следующей версии.`);
}

function assignServiceToBuilding(id) {
    const service = window.crmData.services.find(s => s.id === id);
    if (service) {
        const buildingId = prompt('Введите ID дома для привязки услуги:');
        if (buildingId) {
            service.buildingId = parseInt(buildingId);
            localStorage.setItem('crmData', JSON.stringify(window.crmData));
            alert(`Услуга привязана к дому ID ${buildingId}`);
            loadServices();
        }
    }
}

// Функции для документов
function viewDocument(id) {
    alert(`Просмотр документа с ID ${id}. Функция будет реализована в следующей версии.`);
}

function downloadDocument(id) {
    const doc = window.crmData.documents.find(d => d.id === id);
    if (doc) {
        alert(`Начата загрузка документа: ${doc.name}`);
        // В реальном приложении здесь будет запрос на сервер для скачивания
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

// Функции для реквизитов
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

function generatePaymentQR() {
    const requisites = window.crmData.requisites[0] || {};
    const qrData = {
        name: requisites.recipient || 'ООО «УК Профи»',
        personalAcc: requisites.accountNumber || '40702810712340001234',
        bankName: requisites.bankName || 'АО «АЛЬФА-БАНК»',
        bic: requisites.BIK || '044525593',
        correspAcc: requisites.correspondentAccount || '30101810200000000593',
        payeeINN: requisites.INN || '7701234567',
        kpp: requisites.KPP || '770101001'
    };
    
    alert('QR-код для оплаты будет сгенерирован в следующей версии.\nДанные для QR:\n' + JSON.stringify(qrData, null, 2));
}

// Функция для настройки вкладок
function setupTabs() {
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

// Применение фильтров для обращений
function applyTicketFilters() {
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;
    const priority = document.getElementById('priorityFilter').value;
    
    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge:nth-child(6)');
        const typeCell = row.cells[3];
        const priorityBadge = row.querySelector('.status-badge:nth-child(5)');
        
        let showRow = true;
        
        if (status && statusBadge && !statusBadge.textContent.includes(status)) {
            showRow = false;
        }
        if (type && typeCell && typeCell.textContent !== type) {
            showRow = false;
        }
        if (priority && priorityBadge && !priorityBadge.textContent.includes(priority)) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Применение фильтров для документов
function applyDocumentFilters() {
    const type = document.getElementById('docTypeFilter').value;
    const status = document.getElementById('docStatusFilter').value;
    const search = document.getElementById('docSearch').value.toLowerCase();
    
    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const typeCell = row.cells[1];
        const statusBadge = row.cells[2].querySelector('.status-badge');
        const nameCell = row.cells[0];
        
        let showRow = true;
        
        if (type && typeCell.textContent !== type) {
            showRow = false;
        }
        if (status && statusBadge) {
            let statusText = '';
            switch(status) {
                case 'signed': statusText = 'Подписано'; break;
                case 'pending': statusText = 'Ожидает подписи'; break;
                case 'rejected': statusText = 'Отклонено'; break;
            }
            if (statusBadge.textContent !== statusText) {
                showRow = false;
            }
        }
        if (search && !nameCell.textContent.toLowerCase().includes(search)) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Экспорт документов
function exportDocuments() {
    const filteredDocs = window.crmData.documents;
    const csv = PapaParse.unparse(filteredDocs.map(doc => ({
        Название: doc.name,
        Тип: doc.type,
        Статус: doc.status === 'signed' ? 'Подписано' : doc.status === 'pending' ? 'Ожидает подписи' : 'Отклонено',
        Дата: doc.createdAt || ''
    })));
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `документы_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}
