// app.js - Полностью переработанная версия

// Глобальный объект для хранения данных CRM
window.crmData = window.crmData || null;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем приложение...');
    
    // Установка текущей даты в шапке
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
    
    console.log('Приложение инициализировано');
});

// Инициализация тестовых данных
function initializeData() {
    const storedData = localStorage.getItem('crmData');
    
    if (!storedData) {
        console.log('Создаем тестовые данные...');
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
                }
            ]
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        console.log('Тестовые данные созданы и сохранены');
    } else {
        // Загружаем данные из localStorage
        window.crmData = JSON.parse(storedData);
        console.log('Данные загружены из localStorage');
    }
}

// Настройка навигации - РАБОЧАЯ ВЕРСИЯ
function setupNavigation() {
    console.log('Настраиваем навигацию...');
    
    // Используем делегирование событий для всего сайдбара
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            // Проверяем, кликнули ли по ссылке навигации
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                console.log('Клик по навигации:', navLink.getAttribute('data-page'));
                
                // Удаляем активный класс у всех ссылок
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.remove('active');
                });
                
                // Добавляем активный класс текущей ссылке
                navLink.classList.add('active');
                
                // Загружаем страницу
                const page = navLink.getAttribute('data-page');
                loadPage(page);
            }
        });
    } else {
        console.error('Сайдбар не найден!');
    }
}

// Загрузка страницы
function loadPage(pageName) {
    console.log('Загружаем страницу:', pageName);
    
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error('Область контента не найдена!');
        return;
    }
    
    // Показываем индикатор загрузки
    contentArea.innerHTML = '<div style="padding: 50px; text-align: center; color: var(--gray-700);">Загрузка...</div>';
    
    // Загружаем содержимое страницы
    setTimeout(() => {
        try {
            let pageContent = '';
            
            switch(pageName) {
                case 'dashboard':
                    pageContent = renderDashboard();
                    break;
                case 'buildings':
                    pageContent = renderBuildings();
                    break;
                case 'residents':
                    pageContent = renderResidents();
                    break;
                case 'tickets':
                    pageContent = renderTickets();
                    break;
                case 'services':
                    pageContent = renderServices();
                    break;
                case 'payments':
                    pageContent = renderPayments();
                    break;
                case 'contractors':
                    pageContent = renderContractors();
                    break;
                case 'documents':
                    pageContent = renderDocuments();
                    break;
                case 'requisites':
                    pageContent = renderRequisites();
                    break;
                case 'profile':
                    pageContent = renderProfile();
                    break;
                default:
                    pageContent = renderDashboard();
            }
            
            contentArea.innerHTML = pageContent;
            
            // Инициализируем специфичные для страницы элементы
            initializePage(pageName);
            
            console.log('Страница загружена:', pageName);
        } catch (error) {
            console.error('Ошибка при загрузке страницы:', error);
            contentArea.innerHTML = `
                <div style="padding: 50px; text-align: center; color: var(--danger);">
                    <h3>Ошибка загрузки страницы</h3>
                    <p>${error.message}</p>
                    <button onclick="loadPage('dashboard')" class="btn btn-primary">Вернуться на главную</button>
                </div>
            `;
        }
    }, 100);
}

// Рендеринг страницы Аналитика
function renderDashboard() {
    const totalCharged = window.crmData.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = window.crmData.payments
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);
    const activeTickets = window.crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
    
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
                <div class="stat-change">-5 с прошлой недели</div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <canvas id="analyticsChart" style="height: 400px; width: 100%;"></canvas>
        </div>
    `;
}

// Рендеринг страницы Дома
function renderBuildings() {
    return `
        <div class="page-header">
            <h2 class="page-title">Дома</h2>
            <button class="btn btn-primary" onclick="openModal('buildingModal')">
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

// Рендеринг страницы Жильцы
function renderResidents() {
    const totalResidents = window.crmData.residents.length;
    const activeResidents = window.crmData.residents.filter(r => r.status === 'active').length;
    const debtors = window.crmData.residents.filter(r => r.balance < 0).length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Жильцы</h2>
            <button class="btn btn-primary" onclick="openModal('residentModal'); populateResidentForm()">
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
                <div class="stat-change">${((debtors / totalResidents) * 100).toFixed(1)}% от всех</div>
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

// Рендеринг страницы Обращения
function renderTickets() {
    const totalTickets = window.crmData.tickets.length;
    const openTickets = window.crmData.tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = window.crmData.tickets.filter(t => t.status === 'in_progress').length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
            <button class="btn btn-primary" onclick="openModal('ticketModal'); populateTicketForm()">
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

// Рендеринг страницы Услуги и тарифы
function renderServices() {
    return `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
            <button class="btn btn-primary" onclick="openModal('serviceModal'); populateServiceForm()">
                <i class="fas fa-plus"></i> Добавить услугу
            </button>
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
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.services.map(service => {
                        const building = window.crmData.buildings.find(b => b.id === service.buildingId);
                        const contractor = window.crmData.contractors.find(c => c.id === service.contractorId);
                        
                        return `
                            <tr>
                                <td><strong>${service.name}</strong></td>
                                <td>${service.type === 'main' ? 'Основная' : 'Дополнительная'}</td>
                                <td>${service.tariff.toLocaleString('ru-RU')} ₽</td>
                                <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                                <td>${building ? building.address : 'Не указан'}</td>
                                <td>${contractor ? contractor.legalName : 'Не указан'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Рендеринг страницы Платежи
function renderPayments() {
    const totalCharged = window.crmData.payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = window.crmData.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    
    return `
        <div class="page-header">
            <h2 class="page-title">Платежи</h2>
            <button class="btn btn-primary" onclick="openModal('paymentModal'); populatePaymentForm()">
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

// Рендеринг страницы Подрядчики
function renderContractors() {
    return `
        <div class="page-header">
            <h2 class="page-title">Подрядчики</h2>
            <button class="btn btn-primary" onclick="openModal('contractorModal')">
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

// Рендеринг страницы Документы
function renderDocuments() {
    return `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
            <button class="btn btn-primary" onclick="openModal('documentModal')">
                <i class="fas fa-upload"></i> Загрузить документ
            </button>
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

// Рендеринг страницы Реквизиты
function renderRequisites() {
    const company = window.crmData.currentCompany;
    const bankRequisites = window.crmData.requisites.find(r => r.type === 'банковские');
    
    return `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
            <button class="btn btn-primary" onclick="openModal('requisitesModal'); populateRequisitesForm()">
                <i class="fas fa-edit"></i> Редактировать реквизиты
            </button>
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

// Рендеринг страницы Профиль УК
function renderProfile() {
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

// Инициализация страницы после рендеринга
function initializePage(pageName) {
    console.log('Инициализируем страницу:', pageName);
    
    if (pageName === 'dashboard') {
        // Инициализируем график на дашборде
        setTimeout(() => {
            initializeDashboardChart();
        }, 200);
    }
}

// Инициализация графика для дашборда
function initializeDashboardChart() {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) {
        console.log('График не найден на странице');
        return;
    }
    
    try {
        // Удаляем старый график, если он существует
        if (window.analyticsChart) {
            window.analyticsChart.destroy();
        }
        
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
        
        console.log('График инициализирован');
    } catch (error) {
        console.error('Ошибка при создании графика:', error);
    }
}

// Настройка модальных окон
function setupModals() {
    console.log('Настраиваем модальные окна...');
    
    // Закрытие модальных окон
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
    
    // Обработка форм
    const buildingForm = document.getElementById('buildingForm');
    if (buildingForm) {
        buildingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBuilding();
        });
    }
    
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePayment();
        });
    }
    
    const residentForm = document.getElementById('residentForm');
    if (residentForm) {
        residentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveResident();
        });
    }
    
    console.log('Модальные окна настроены');
}

// Открытие модального окна
function openModal(modalId) {
    console.log('Открываем модальное окно:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error('Модальное окно не найдено:', modalId);
    }
}

// Закрытие всех модальных окон
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Заполнение форм
function populatePaymentForm() {
    const serviceSelect = document.getElementById('paymentService');
    const buildingSelect = document.getElementById('paymentBuilding');
    
    if (serviceSelect && buildingSelect) {
        serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
        buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
        
        window.crmData.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - ${service.tariff} ₽/${service.period === 'monthly' ? 'мес' : 'услуга'}`;
            serviceSelect.appendChild(option);
        });
        
        window.crmData.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.address;
            buildingSelect.appendChild(option);
        });
        
        document.getElementById('paymentDate').valueAsDate = new Date();
    }
}

function populateResidentForm() {
    const buildingSelect = document.getElementById('residentBuilding');
    if (buildingSelect) {
        buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
        window.crmData.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.address;
            buildingSelect.appendChild(option);
        });
    }
}

function populateTicketForm() {
    const buildingSelect = document.getElementById('ticketBuilding');
    const residentSelect = document.getElementById('ticketResident');
    
    if (buildingSelect && residentSelect) {
        buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
        residentSelect.innerHTML = '<option value="">Выберите жильца</option>';
        
        window.crmData.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.address;
            buildingSelect.appendChild(option);
        });
        
        window.crmData.residents.forEach(resident => {
            const option = document.createElement('option');
            option.value = resident.id;
            option.textContent = `${resident.name} (кв. ${resident.apartment})`;
            residentSelect.appendChild(option);
        });
    }
}

function populateServiceForm() {
    const buildingSelect = document.getElementById('serviceBuilding');
    const contractorSelect = document.getElementById('serviceContractor');
    
    if (buildingSelect && contractorSelect) {
        buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
        contractorSelect.innerHTML = '<option value="">Выберите подрядчика</option>';
        
        window.crmData.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.address;
            buildingSelect.appendChild(option);
        });
        
        window.crmData.contractors.forEach(contractor => {
            const option = document.createElement('option');
            option.value = contractor.id;
            option.textContent = contractor.legalName;
            contractorSelect.appendChild(option);
        });
    }
}

function populateRequisitesForm() {
    const bankRequisites = window.crmData.requisites.find(r => r.type === 'банковские');
    
    if (bankRequisites) {
        const requisitesBank = document.getElementById('requisitesBank');
        const requisitesAccount = document.getElementById('requisitesAccount');
        const requisitesCorrAccount = document.getElementById('requisitesCorrAccount');
        const requisitesBIK = document.getElementById('requisitesBIK');
        const requisitesINN = document.getElementById('requisitesINN');
        const requisitesKPP = document.getElementById('requisitesKPP');
        
        if (requisitesBank) requisitesBank.value = bankRequisites.bankName || '';
        if (requisitesAccount) requisitesAccount.value = bankRequisites.accountNumber || '';
        if (requisitesCorrAccount) requisitesCorrAccount.value = bankRequisites.correspondentAccount || '';
        if (requisitesBIK) requisitesBIK.value = bankRequisites.bik || '';
        if (requisitesINN) requisitesINN.value = bankRequisites.inn || '';
        if (requisitesKPP) requisitesKPP.value = bankRequisites.kpp || '';
    }
}

// Экспортируем функции для использования в HTML
window.openModal = openModal;
window.closeAllModals = closeAllModals;
window.loadPage = loadPage;
window.viewBuilding = function(id) { alert(`Просмотр дома с ID ${id}`); };
window.editBuilding = function(id) { alert(`Редактирование дома с ID ${id}`); };
window.deleteBuilding = function(id) { 
    if (confirm('Удалить дом?')) {
        window.crmData.buildings = window.crmData.buildings.filter(b => b.id !== id);
        localStorage.setItem('crmData', JSON.stringify(window.crmData));
        loadPage('buildings');
        alert('Дом удален!');
    }
};
