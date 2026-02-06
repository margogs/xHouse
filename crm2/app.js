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
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Жильцы</h2>
        </div>
        <p>Страница находится в разработке. Здесь будет управление жильцами и их данными.</p>
    `;
}

function loadTickets() {
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
        </div>
        <p>Страница находится в разработке. Здесь будет управление обращениями жильцов.</p>
    `;
}

function loadServices() {
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
        </div>
        <p>Страница находится в разработке. Здесь будет управление услугами и тарифами.</p>
    `;
}

function loadDocuments() {
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
        </div>
        <p>Страница находится в разработке. Здесь будет управление документами.</p>
    `;
}

function loadRequisites() {
    document.getElementById('content-area').innerHTML = `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
        </div>
        <p>Страница находится в разработке. Здесь будут реквизиты для оплаты услуг.</p>
    `;
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
