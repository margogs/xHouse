// app.js - Главный модуль приложения CRM
const CRM = (function() {
    // Структура данных
    let crmData = {
        currentCompany: {
            id: 1,
            legalName: 'ООО "Центр-ЖилСервис"',
            inn: '7712345678',
            ogrn: '1127712345678',
            region: 'Москва',
            contacts: {
                phone: '+7 (495) 123-45-67',
                email: 'info@zhilservice.ru',
                address: 'г. Москва, ул. Примерная, д. 1'
            },
            licenses: ['Лицензия №12345', 'СРО-П-123456']
        },
        companies: [],
        buildings: [],
        services: [],
        contractors: [],
        payments: [],
        documents: [],
        users: [
            { id: 1, name: 'Иванов Иван', role: 'manager', permissions: ['all'] },
            { id: 2, name: 'Петрова Мария', role: 'accountant', permissions: ['payments', 'documents'] }
        ],
        tenants: [],
        requests: []
    };

    // Инициализация приложения
    function init() {
        loadData();
        setupNavigation();
        loadModule('dashboard');
        setupEventListeners();
    }

    // Загрузка данных из localStorage
    function loadData() {
        const savedData = localStorage.getItem('crmData');
        if (savedData) {
            crmData = JSON.parse(savedData);
        } else {
            // Инициализация тестовыми данными
            initializeTestData();
            saveData();
        }
    }

    // Сохранение данных в localStorage
    function saveData() {
        localStorage.setItem('crmData', JSON.stringify(crmData));
    }

    // Инициализация тестовыми данными
    function initializeTestData() {
        crmData.buildings = [
            {
                id: 1,
                address: 'ул. Ленина, д. 15',
                floors: 9,
                apartments: 72,
                risks: ['старые коммуникации', 'ветхий лифт'],
                passport: {
                    elevators: [{ type: 'пассажирский', year: 1995 }],
                    itp: { type: 'индивидуальный', year: 2010 }
                }
            },
            {
                id: 2,
                address: 'пр. Мира, д. 42',
                floors: 12,
                apartments: 96,
                risks: [],
                passport: {
                    elevators: [{ type: 'пассажирский', year: 2018 }],
                    itp: { type: 'центральный', year: 2015 }
                }
            }
        ];

        crmData.services = [
            {
                id: 1,
                name: 'Содержание общедомового имущества',
                type: 'main',
                tariff: 25.50,
                period: 'monthly',
                buildingId: 1,
                contractorId: 1,
                sla: '24/7'
            },
            {
                id: 2,
                name: 'Вывоз ТКО',
                type: 'main',
                tariff: 12.30,
                period: 'monthly',
                buildingId: 1,
                contractorId: 2,
                sla: 'ежедневно'
            }
        ];

        crmData.contractors = [
            {
                id: 1,
                legalName: 'ООО "ЖилКомСервис"',
                inn: '7711223344',
                workTypes: ['техническое обслуживание', 'ремонт'],
                bankDetails: 'АО "Сбербанк" р/с 40702810123456789012',
                status: 'активен'
            },
            {
                id: 2,
                legalName: 'ООО "ЭкоТранс"',
                inn: '7722334455',
                workTypes: ['вывоз мусора', 'уборка территории'],
                bankDetails: 'ПАО "ВТБ" р/с 40702810987654321098',
                status: 'активен'
            }
        ];

        crmData.payments = [
            {
                id: 1,
                serviceId: 1,
                amount: 1836.00,
                status: 'paid',
                date: '2024-01-15',
                payer: 'ЖСК "Ленина 15"'
            },
            {
                id: 2,
                serviceId: 2,
                amount: 885.60,
                status: 'processing',
                date: '2024-01-16',
                payer: 'ЖСК "Ленина 15"'
            }
        ];

        crmData.documents = [
            {
                id: 1,
                type: 'договор',
                name: 'Договор управления МКД',
                link: '#',
                status: 'signed',
                entityId: 1
            },
            {
                id: 2,
                type: 'акт',
                name: 'Акт выполненных работ за январь',
                link: '#',
                status: 'pending',
                entityId: 2
            }
        ];

        crmData.tenants = [
            { id: 1, name: 'Сидоров А.П.', apartment: '15', phone: '+7 999 123-45-67', balance: 1250.50 },
            { id: 2, name: 'Козлова М.И.', apartment: '42', phone: '+7 999 765-43-21', balance: -320.00 }
        ];

        crmData.requests = [
            { id: 1, type: 'ремонт', description: 'Протекает кран на кухне', status: 'в работе', date: '2024-01-15' },
            { id: 2, type: 'консультация', description: 'Вопрос по квитанции', status: 'решено', date: '2024-01-14' }
        ];
    }

    // Настройка навигации
    function setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                const module = this.dataset.module;
                loadModule(module);
            });
        });
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Закрытие модальных окон
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Форма добавления дома
        document.getElementById('building-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const building = {
                id: Date.now(),
                address: formData.get('address'),
                floors: parseInt(formData.get('floors')),
                apartments: parseInt(formData.get('apartments')),
                risks: [],
                passport: { elevators: [], itp: {} }
            };
            crmData.buildings.push(building);
            saveData();
            closeModal();
            loadModule('buildings');
        });

        // Форма добавления платежа
        document.getElementById('payment-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const payment = {
                id: Date.now(),
                serviceId: parseInt(formData.get('serviceId')),
                amount: parseFloat(formData.get('amount')),
                date: formData.get('date'),
                status: 'charged',
                payer: crmData.currentCompany.legalName
            };
            crmData.payments.push(payment);
            saveData();
            closeModal();
            loadModule('payments');
        });
    }

    // Загрузка модуля
    function loadModule(moduleName) {
        const contentArea = document.getElementById('content-area');
        
        switch(moduleName) {
            case 'dashboard':
                loadDashboard(contentArea);
                break;
            case 'buildings':
                loadBuildings(contentArea);
                break;
            case 'tenants':
                loadTenants(contentArea);
                break;
            case 'requests':
                loadRequests(contentArea);
                break;
            case 'services':
                loadServices(contentArea);
                break;
            case 'payments':
                loadPayments(contentArea);
                break;
            case 'contractors':
                loadContractors(contentArea);
                break;
            case 'documents':
                loadDocuments(contentArea);
                break;
            case 'requisites':
                loadRequisites(contentArea);
                break;
            case 'profile':
                loadProfile(contentArea);
                break;
            default:
                contentArea.innerHTML = '<h2>Модуль в разработке</h2>';
        }
    }

    // Модуль: Дашборд
    function loadDashboard(container) {
        const totalPayments = crmData.payments.reduce((sum, p) => sum + p.amount, 0);
        const paidPayments = crmData.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
        const pendingPayments = crmData.payments.filter(p => p.status === 'processing').reduce((sum, p) => sum + p.amount, 0);
        
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Аналитика</h1>
                <div>Сегодня: ${new Date().toLocaleDateString('ru-RU')}</div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-title">Общая сумма начислений</div>
                    <div class="stat-value">${totalPayments.toLocaleString('ru-RU')} ₽</div>
                    <div class="stat-trend">+12.5% за месяц</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Оплачено</div>
                    <div class="stat-value">${paidPayments.toLocaleString('ru-RU')} ₽</div>
                    <div class="stat-trend">85% от начислений</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">В обработке</div>
                    <div class="stat-value">${pendingPayments.toLocaleString('ru-RU')} ₽</div>
                    <div class="stat-trend">3 платежа</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Количество домов</div>
                    <div class="stat-value">${crmData.buildings.length}</div>
                    <div class="stat-trend">${crmData.buildings.reduce((sum, b) => sum + b.apartments, 0)} квартир</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px;">
                <div style="background: var(--card-bg); padding: 20px; border-radius: 12px;">
                    <h3 style="margin-bottom: 20px;">Последние платежи</h3>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Услуга</th>
                                    <th>Сумма</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${crmData.payments.slice(-5).map(payment => {
                                    const service = crmData.services.find(s => s.id === payment.serviceId);
                                    return `
                                        <tr>
                                            <td>${payment.date}</td>
                                            <td>${service?.name || 'Неизвестно'}</td>
                                            <td>${payment.amount.toLocaleString('ru-RU')} ₽</td>
                                            <td><span class="status-badge status-${payment.status === 'paid' ? 'paid' : payment.status === 'processing' ? 'pending' : 'overdue'}">
                                                ${payment.status === 'paid' ? 'Оплачено' : payment.status === 'processing' ? 'В обработке' : 'Просрочено'}
                                            </span></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style="background: var(--card-bg); padding: 20px; border-radius: 12px;">
                    <h3 style="margin-bottom: 20px;">Статус объектов</h3>
                    <canvas id="buildingsChart" width="300" height="200"></canvas>
                </div>
            </div>
        `;

        // Инициализация графика
        setTimeout(() => {
            const ctx = document.getElementById('buildingsChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Без рисков', 'С рисками'],
                    datasets: [{
                        data: [
                            crmData.buildings.filter(b => b.risks.length === 0).length,
                            crmData.buildings.filter(b => b.risks.length > 0).length
                        ],
                        backgroundColor: [var('--accent'), var('--accent-red')]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }, 100);
    }

    // Модуль: Дома
    function loadBuildings(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Дома</h1>
                <button class="btn btn-primary" onclick="CRM.openBuildingModal()">Добавить дом</button>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Адрес</th>
                            <th>Этажи</th>
                            <th>Квартиры</th>
                            <th>Риски</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.buildings.map(building => `
                            <tr>
                                <td>${building.address}</td>
                                <td>${building.floors}</td>
                                <td>${building.apartments}</td>
                                <td>${building.risks.length > 0 ? building.risks.map(r => `<span style="color: var(--accent-red); margin-right: 4px;">⚠️ ${r}</span>`).join('') : 'Нет'}</td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: 6px 12px; margin-right: 8px;" onclick="CRM.viewBuilding(${building.id})">Просмотр</button>
                                    <button class="btn btn-secondary" style="padding: 6px 12px;" onclick="CRM.editBuilding(${building.id})">Редактировать</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Жильцы
    function loadTenants(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Жильцы</h1>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Квартира</th>
                            <th>Телефон</th>
                            <th>Баланс</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.tenants.map(tenant => `
                            <tr>
                                <td>${tenant.name}</td>
                                <td>${tenant.apartment}</td>
                                <td>${tenant.phone}</td>
                                <td>${tenant.balance.toLocaleString('ru-RU')} ₽</td>
                                <td>
                                    <span class="status-badge ${tenant.balance >= 0 ? 'status-paid' : 'status-overdue'}">
                                        ${tenant.balance >= 0 ? 'Платежеспособен' : 'Задолженность'}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Обращения
    function loadRequests(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Обращения</h1>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Описание</th>
                            <th>Дата</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.requests.map(request => `
                            <tr>
                                <td>${request.type}</td>
                                <td>${request.description}</td>
                                <td>${request.date}</td>
                                <td>
                                    <span class="status-badge ${request.status === 'решено' ? 'status-paid' : request.status === 'в работе' ? 'status-pending' : 'status-overdue'}">
                                        ${request.status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: 6px 12px;">Закрыть</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Услуги и тарифы
    function loadServices(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Услуги и тарифы</h1>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Тариф</th>
                            <th>Период</th>
                            <th>Подрядчик</th>
                            <th>SLA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.services.map(service => {
                            const building = crmData.buildings.find(b => b.id === service.buildingId);
                            const contractor = crmData.contractors.find(c => c.id === service.contractorId);
                            return `
                                <tr>
                                    <td>${service.name}</td>
                                    <td>
                                        <span class="status-badge ${service.type === 'main' ? 'status-paid' : 'status-pending'}">
                                            ${service.type === 'main' ? 'Основная' : 'Дополнительная'}
                                        </span>
                                    </td>
                                    <td>${service.tariff.toLocaleString('ru-RU')} ₽</td>
                                    <td>${service.period === 'monthly' ? 'Ежемесячно' : service.period}</td>
                                    <td>${contractor?.legalName || 'Не указан'}</td>
                                    <td>${service.sla}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Платежи
    function loadPayments(container) {
        const totalCharged = crmData.payments.reduce((sum, p) => sum + p.amount, 0);
        const totalPaid = crmData.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
        const totalProcessing = crmData.payments.filter(p => p.status === 'processing').reduce((sum, p) => sum + p.amount, 0);
        
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Платежи</h1>
                <button class="btn btn-primary" onclick="CRM.openPaymentModal()">Создать начисление</button>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-title">Начислено</div>
                    <div class="stat-value">${totalCharged.toLocaleString('ru-RU')} ₽</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Оплачено</div>
                    <div class="stat-value">${totalPaid.toLocaleString('ru-RU')} ₽</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">В обработке</div>
                    <div class="stat-value">${totalProcessing.toLocaleString('ru-RU')} ₽</div>
                </div>
            </div>

            <div class="tabs" style="margin-top: 24px;">
                <div class="tab active" onclick="CRM.switchPaymentTab('all')">Все</div>
                <div class="tab" onclick="CRM.switchPaymentTab('paid')">Оплаченные</div>
                <div class="tab" onclick="CRM.switchPaymentTab('processing')">В обработке</div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Услуга</th>
                            <th>Плательщик</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody id="payments-table-body">
                        ${crmData.payments.map(payment => {
                            const service = crmData.services.find(s => s.id === payment.serviceId);
                            return `
                                <tr>
                                    <td>${payment.date}</td>
                                    <td>${service?.name || 'Неизвестно'}</td>
                                    <td>${payment.payer}</td>
                                    <td>${payment.amount.toLocaleString('ru-RU')} ₽</td>
                                    <td>
                                        <span class="status-badge status-${payment.status === 'paid' ? 'paid' : payment.status === 'processing' ? 'pending' : 'overdue'}">
                                            ${payment.status === 'paid' ? 'Оплачено' : payment.status === 'processing' ? 'В обработке' : 'Просрочено'}
                                        </span>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Подрядчики
    function loadContractors(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Подрядчики</h1>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>ИНН</th>
                            <th>Виды работ</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.contractors.map(contractor => `
                            <tr>
                                <td>${contractor.legalName}</td>
                                <td>${contractor.inn}</td>
                                <td>${contractor.workTypes.join(', ')}</td>
                                <td>
                                    <span class="status-badge ${contractor.status === 'активен' ? 'status-paid' : 'status-overdue'}">
                                        ${contractor.status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: 6px 12px;">Подробнее</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Документы
    function loadDocuments(container) {
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Документы</h1>
            </div>

            <div class="tabs">
                <div class="tab active" onclick="CRM.switchDocumentTab('all')">Все</div>
                <div class="tab" onclick="CRM.switchDocumentTab('pending')">Ожидают подписи</div>
                <div class="tab" onclick="CRM.switchDocumentTab('signed')">Подписанные</div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Название</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${crmData.documents.map(doc => `
                            <tr>
                                <td>${doc.type}</td>
                                <td>${doc.name}</td>
                                <td>
                                    <span class="status-badge ${doc.status === 'signed' ? 'status-paid' : doc.status === 'pending' ? 'status-pending' : 'status-overdue'}">
                                        ${doc.status === 'signed' ? 'Подписан' : doc.status === 'pending' ? 'Ожидает' : 'Отклонен'}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: 6px 12px;">Скачать</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Модуль: Реквизиты для оплаты
    function loadRequisites(container) {
        const company = crmData.currentCompany;
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Реквизиты для оплаты</h1>
            </div>

            <div style="background: var(--card-bg); padding: 24px; border-radius: 12px; max-width: 600px;">
                <h3 style="margin-bottom: 20px;">Банковские реквизиты</h3>
                <div style="display: grid; gap: 16px;">
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">Получатель</div>
                        <div style="font-size: 18px;">${company.legalName}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">ИНН</div>
                        <div style="font-size: 18px;">${company.inn}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">ОГРН</div>
                        <div style="font-size: 18px;">${company.ogrn}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">Банк</div>
                        <div style="font-size: 18px;">ПАО "Сбербанк"</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">Расчетный счет</div>
                        <div style="font-size: 18px;">40702810123456789012</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 14px;">БИК</div>
                        <div style="font-size: 18px;">044525225</div>
                    </div>
                </div>
                <div style="margin-top: 24px;">
                    <button class="btn btn-primary">Скачать реквизиты (PDF)</button>
                </div>
            </div>
        `;
    }

    // Модуль: Профиль УК
    function loadProfile(container) {
        const company = crmData.currentCompany;
        container.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Профиль управляющей компании</h1>
                <button class="btn btn-primary">Редактировать</button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                <div style="background: var(--card-bg); padding: 24px; border-radius: 12px;">
                    <h3 style="margin-bottom: 20px;">Основная информация</h3>
                    <div style="display: grid; gap: 16px;">
                        <div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Юридическое название</div>
                            <div style="font-size: 18px;">${company.legalName}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Регион</div>
                            <div style="font-size: 18px;">${company.region}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Контакты</div>
                            <div style="font-size: 18px;">${company.contacts.phone}</div>
                            <div style="font-size: 18px;">${company.contacts.email}</div>
                            <div style="font-size: 18px;">${company.contacts.address}</div>
                        </div>
                    </div>
                </div>

                <div style="background: var(--card-bg); padding: 24px; border-radius: 12px;">
                    <h3 style="margin-bottom: 20px;">Лицензии и допуски</h3>
                    <div style="display: grid; gap: 12px;">
                        ${company.licenses.map(license => `
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 24px; height: 24px; background: var(--primary); border-radius: 4px; display: flex; align-items: center; justify-content: center;">✓</div>
                                <div>${license}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Открытие модального окна для добавления дома
    function openBuildingModal() {
        document.getElementById('modal-building').classList.add('active');
    }

    // Открытие модального окна для добавления платежа
    function openPaymentModal() {
        const select = document.querySelector('#payment-form select[name="serviceId"]');
        select.innerHTML = crmData.services.map(service => 
            `<option value="${service.id}">${service.name} - ${service.tariff} ₽</option>`
        ).join('');
        document.getElementById('modal-payment').classList.add('active');
    }

    // Закрытие модального окна
    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.querySelectorAll('form').forEach(form => form.reset());
    }

    // Просмотр дома
    function viewBuilding(id) {
        const building = crmData.buildings.find(b => b.id === id);
        if (building) {
            alert(`Детальная информация по дому:\nАдрес: ${building.address}\nЭтажи: ${building.floors}\nКвартиры: ${building.apartments}\nРиски: ${building.risks.join(', ') || 'нет'}`);
        }
    }

    // Редактирование дома
    function editBuilding(id) {
        openBuildingModal();
        // Заполнение формы данными дома для редактирования
        const building = crmData.buildings.find(b => b.id === id);
        if (building) {
            const form = document.getElementById('building-form');
            form.querySelector('[name="address"]').value = building.address;
            form.querySelector('[name="floors"]').value = building.floors;
            form.querySelector('[name="apartments"]').value = building.apartments;
        }
    }

    // Переключение вкладок платежей
    function switchPaymentTab(tab) {
        // В реальном приложении здесь была бы фильтрация таблицы
        document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Переключение вкладок документов
    function switchDocumentTab(tab) {
        document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Получение CSS переменной
    function var(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name);
    }

    // Публичные методы
    return {
        init,
        loadModule,
        openBuildingModal,
        openPaymentModal,
        closeModal,
        viewBuilding,
        editBuilding,
        switchPaymentTab,
        switchDocumentTab
    };
})();

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', CRM.init);
