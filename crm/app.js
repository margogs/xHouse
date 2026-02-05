// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация данных xHouse CRM
    if (!window.xHouseData) {
        window.xHouseData = {
            currentCompany: {
                id: 1,
                legalName: "ООО 'Управляющая компания xHouse'",
                inn: "7701234567",
                ogrn: "1177745678901",
                form: "УК",
                region: "Москва",
                managedSince: "2020-01-15",
                contacts: {
                    dispatcher: "+7 (495) 123-45-67",
                    emergency: "+7 (495) 987-65-43",
                    accounting: "account@xhouse.ru",
                    reception: "ул. Примерная, д. 10, офис 45",
                    hours: "9:00-18:00 (Пн-Пт), 10:00-16:00 (Сб)"
                },
                licenses: ["Лицензия №12345", "Свидетельство №67890"],
                paymentDetails: {
                    bank: "Тинькофф Банк",
                    account: "40702810000000012345",
                    correspondent: "30101810100000000743",
                    bic: "044525743",
                    inn: "7701234567",
                    kpp: "770101001"
                }
            },
            buildings: [],
            services: [],
            contractors: [],
            payments: [],
            documents: [],
            residents: [],
            requests: [],
            users: []
        };
        
        // Инициализация тестовыми данными
        initializeTestData();
        
        // Сохранение в localStorage
        saveToLocalStorage();
    } else {
        loadFromLocalStorage();
    }
    
    // Инициализация приложения
    initApp();
    
    function initializeTestData() {
        // Тестовые дома
        xHouseData.buildings = [
            {
                id: 1,
                address: "ул. Ленина, д. 10",
                floors: 5,
                apartments: 60,
                totalArea: "4500 м²",
                yearBuilt: 1985,
                systems: ["lift", "itp", "intercom"],
                risks: ["recurrent_issues", "overdue_work"],
                passport: {
                    elevators: [{id: 1, type: "Пассажирский", lastCheck: "2024-01-15"}],
                    itp: {type: "Индивидуальный", power: "150 кВт"},
                    electricity: {voltage: "380 В", lastCheck: "2024-02-01"}
                },
                notes: "Требуется замена лифтов",
                residentsCount: 143
            },
            {
                id: 2,
                address: "пр. Мира, д. 25",
                floors: 9,
                apartments: 108,
                totalArea: "8200 м²",
                yearBuilt: 2005,
                systems: ["lift", "itp", "security", "intercom"],
                risks: ["frequent_accidents"],
                passport: {
                    elevators: [
                        {id: 1, type: "Пассажирский", lastCheck: "2024-02-10"},
                        {id: 2, type: "Грузовой", lastCheck: "2024-02-10"}
                    ],
                    itp: {type: "Блочный", power: "250 кВт"},
                    electricity: {voltage: "380 В", lastCheck: "2024-02-15"}
                },
                notes: "Новый дом, в хорошем состоянии",
                residentsCount: 256
            },
            {
                id: 3,
                address: "ул. Садовая, д. 5",
                floors: 3,
                apartments: 24,
                totalArea: "1800 м²",
                yearBuilt: 1960,
                systems: [],
                risks: ["recurrent_issues", "frequent_accidents", "overdue_work"],
                passport: {
                    elevators: [],
                    itp: {type: "Центральный", power: "80 кВт"},
                    electricity: {voltage: "220 В", lastCheck: "2023-12-20"}
                },
                notes: "Аварийный дом, требуется капитальный ремонт",
                residentsCount: 58
            }
        ];
        
        // Тестовые услуги
        xHouseData.services = [
            {
                id: 1,
                name: "Содержание общего имущества",
                type: "main",
                tariff: "25 ₽/м²",
                period: "monthly",
                buildingId: 1,
                contractorId: null,
                sla: "24/7",
                description: "Содержание и уборка мест общего пользования"
            },
            {
                id: 2,
                name: "Капитальный ремонт",
                type: "main",
                tariff: "15 ₽/м²",
                period: "monthly",
                buildingId: 2,
                contractorId: 1,
                sla: "По графику",
                description: "Работы по капитальному ремонту МКД"
            },
            {
                id: 3,
                name: "Вывоз ТКО",
                type: "main",
                tariff: "120 ₽/чел",
                period: "monthly",
                buildingId: 1,
                contractorId: 2,
                sla: "Ежедневно",
                description: "Вывоз твёрдых коммунальных отходов"
            },
            {
                id: 4,
                name: "Установка домофона",
                type: "additional",
                tariff: "5000 ₽",
                period: "once",
                buildingId: 3,
                contractorId: 3,
                sla: "14 дней",
                description: "Установка видеодомофона с индивидуальными панелями"
            }
        ];
        
        // Тестовые подрядчики
        xHouseData.contractors = [
            {
                id: 1,
                legalName: "ООО 'СтройМонтаж'",
                inn: "7712345678",
                workTypes: ["Капремонт", "Строительные работы"],
                bankDetails: "р/с 40702810000000012345 в Тинькофф Банке",
                status: "verified",
                contact: "+7 (495) 111-22-33",
                email: "info@stroymontag.ru",
                rating: 4.8,
                activeProjects: 3
            },
            {
                id: 2,
                legalName: "ООО 'ЭкоТранс'",
                inn: "7723456789",
                workTypes: ["Вывоз мусора", "Утилизация"],
                bankDetails: "р/с 40702810000000023456 в Сбербанке",
                status: "verified",
                contact: "+7 (495) 222-33-44",
                email: "contact@ecotrans.ru",
                rating: 4.5,
                activeProjects: 1
            },
            {
                id: 3,
                legalName: "ИП Сидоров А.В.",
                inn: "7734567890",
                workTypes: ["Электромонтаж", "Сантехника"],
                bankDetails: "р/с 40802810000000034567 в Альфа-Банке",
                status: "pending",
                contact: "+7 (495) 333-44-55",
                email: "sidorov@mail.ru",
                rating: 4.2,
                activeProjects: 2
            }
        ];
        
        // Тестовые платежи
        xHouseData.payments = [
            {
                id: 1,
                serviceId: 1,
                buildingId: 1,
                amount: 112500,
                status: "paid",
                date: "2024-03-15",
                period: "2024-03",
                payer: "ЖСК 'Ленина 10'",
                notes: "Оплата за март"
            },
            {
                id: 2,
                serviceId: 2,
                buildingId: 2,
                amount: 123000,
                status: "processing",
                date: "2024-03-16",
                period: "2024-03",
                payer: "ТСЖ 'Мира 25'",
                notes: "Частичная оплата"
            },
            {
                id: 3,
                serviceId: 3,
                buildingId: 1,
                amount: 7200,
                status: "charged",
                date: "2024-03-10",
                period: "2024-03",
                payer: "ЖСК 'Ленина 10'",
                notes: ""
            },
            {
                id: 4,
                serviceId: 4,
                buildingId: 3,
                amount: 5000,
                status: "paid",
                date: "2024-03-05",
                period: "2024-03",
                payer: "УК 'xHouse'",
                notes: "Предоплата 100%"
            },
            {
                id: 5,
                serviceId: 1,
                buildingId: 2,
                amount: 205000,
                status: "paid",
                date: "2024-03-12",
                period: "2024-03",
                payer: "ТСЖ 'Мира 25'",
                notes: "Оплата по договору"
            }
        ];
        
        // Тестовые жильцы
        xHouseData.residents = [
            {
                id: 1,
                name: "Иванов Иван Иванович",
                phone: "+7 (916) 123-45-67",
                email: "ivanov@mail.ru",
                buildingId: 1,
                apartment: "45",
                debt: 0,
                status: "active"
            },
            {
                id: 2,
                name: "Петрова Мария Сергеевна",
                phone: "+7 (903) 987-65-43",
                email: "petrova@yandex.ru",
                buildingId: 2,
                apartment: "12",
                debt: 12500,
                status: "active"
            },
            {
                id: 3,
                name: "Сидоров Алексей Петрович",
                phone: "+7 (985) 456-78-90",
                email: "sidorov@gmail.com",
                buildingId: 3,
                apartment: "3",
                debt: 32000,
                status: "debtor"
            }
        ];
        
        // Тестовые обращения
        xHouseData.requests = [
            {
                id: 1,
                residentId: 1,
                buildingId: 1,
                type: "repair",
                description: "Протекает кран на кухне",
                status: "completed",
                date: "2024-03-10",
                priority: "medium"
            },
            {
                id: 2,
                residentId: 2,
                buildingId: 2,
                type: "electricity",
                description: "Не работает розетка в прихожей",
                status: "in_progress",
                date: "2024-03-15",
                priority: "high"
            },
            {
                id: 3,
                residentId: 3,
                buildingId: 3,
                type: "common",
                description: "Грязно в подъезде",
                status: "new",
                date: "2024-03-18",
                priority: "low"
            }
        ];
        
        // Тестовые документы
        xHouseData.documents = [
            {
                id: 1,
                type: "license",
                name: "Лицензия на управление МКД",
                link: "#",
                status: "signed",
                entityId: 1,
                date: "2023-12-01"
            },
            {
                id: 2,
                type: "contract",
                name: "Договор с ООО 'СтройМонтаж'",
                link: "#",
                status: "signed",
                entityId: 1,
                date: "2024-01-15"
            },
            {
                id: 3,
                type: "act",
                name: "Акт выполненных работ №45",
                link: "#",
                status: "pending",
                entityId: 2,
                date: "2024-03-10"
            }
        ];
        
        // Тестовые пользователи (сотрудники УК)
        xHouseData.users = [
            {
                id: 1,
                name: "Иванов Петр Сергеевич",
                role: "admin",
                permissions: ["all"],
                email: "admin@xhouse.ru",
                phone: "+7 (495) 111-22-33"
            },
            {
                id: 2,
                name: "Сидорова Мария Ивановна",
                role: "accountant",
                permissions: ["payments", "documents"],
                email: "accountant@xhouse.ru",
                phone: "+7 (495) 222-33-44"
            },
            {
                id: 3,
                name: "Петров Алексей Владимирович",
                role: "engineer",
                permissions: ["buildings", "services", "requests"],
                email: "engineer@xhouse.ru",
                phone: "+7 (495) 333-44-55"
            }
        ];
    }
    
    function saveToLocalStorage() {
        try {
            localStorage.setItem('xHouseData', JSON.stringify(xHouseData));
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }
    
    function loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('xHouseData');
            if (data) {
                window.xHouseData = JSON.parse(data);
            }
        } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
        }
    }
    
    function initApp() {
        // Инициализация навигации
        initNavigation();
        
        // Инициализация аналитики (дашборда)
        initAnalytics();
        
        // Инициализация модальных окон
        initModals();
        
        // Инициализация графиков
        initCharts();
        
        // Загрузка данных в таблицы
        loadRecentPayments();
        loadRiskyBuildings();
        
        // Обновление счетчиков
        updateCounters();
    }
    
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Удаляем активный класс у всех элементов
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Добавляем активный класс текущему элементу
                this.classList.add('active');
                
                // Получаем секцию для отображения
                const section = this.getAttribute('data-section');
                loadSection(section);
            });
        });
        
        // Обработчик для кнопки быстрого добавления
        document.getElementById('quickAddBtn').addEventListener('click', function() {
            showQuickAddMenu();
        });
        
        // Загружаем аналитику по умолчанию
        loadSection('analytics');
    }
    
    function showQuickAddMenu() {
        // Создаем контекстное меню
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            top: 80px;
            right: 32px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 16px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            min-width: 200px;
        `;
        
        menu.innerHTML = `
            <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 12px; font-weight: 600;">
                <i class="fas fa-plus-circle" style="margin-right: 8px;"></i>
                Быстрое добавление
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="quick-add-item" data-type="building">
                    <i class="fas fa-building"></i> Новый дом
                </button>
                <button class="quick-add-item" data-type="payment">
                    <i class="fas fa-credit-card"></i> Новый платёж
                </button>
                <button class="quick-add-item" data-type="request">
                    <i class="fas fa-comment"></i> Новое обращение
                </button>
                <button class="quick-add-item" data-type="resident">
                    <i class="fas fa-user-plus"></i> Новый жилец
                </button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Добавляем стили для кнопок меню
        const style = document.createElement('style');
        style.textContent = `
            .quick-add-item {
                padding: 12px 16px;
                background: transparent;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius-sm);
                color: var(--text-secondary);
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
            }
            .quick-add-item:hover {
                background: rgba(105, 18, 255, 0.1);
                color: var(--text-primary);
                border-color: var(--primary-purple);
                transform: translateX(5px);
            }
        `;
        document.head.appendChild(style);
        
        // Обработчики для пунктов меню
        menu.querySelectorAll('.quick-add-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                switch(type) {
                    case 'building':
                        document.getElementById('buildingModal').classList.add('active');
                        break;
                    case 'payment':
                        document.getElementById('paymentModal').classList.add('active');
                        break;
                    case 'request':
                        showNotification('Добавление обращения - функция в разработке', 'info');
                        break;
                    case 'resident':
                        showNotification('Добавление жильца - функция в разработке', 'info');
                        break;
                }
                document.body.removeChild(menu);
                document.head.removeChild(style);
            });
        });
        
        // Закрытие меню при клике вне его
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target) && e.target.id !== 'quickAddBtn') {
                    document.body.removeChild(menu);
                    document.head.removeChild(style);
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 100);
    }
    
    function loadSection(section) {
        const contentArea = document.getElementById('content-area');
        
        // Показываем анимацию загрузки
        contentArea.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 400px;">
                <div style="text-align: center;">
                    <div style="width: 50px; height: 50px; border: 3px solid var(--border-color); border-top-color: var(--primary-purple); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <div style="color: var(--text-secondary);">Загрузка ${getSectionTitle(section)}...</div>
                </div>
            </div>
        `;
        
        // Добавляем CSS для анимации спиннера
        if (!document.querySelector('#spinner-animation')) {
            const style = document.createElement('style');
            style.id = 'spinner-animation';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Загружаем контент с задержкой для имитации загрузки
        setTimeout(() => {
            switch(section) {
                case 'analytics':
                    contentArea.innerHTML = getAnalyticsHTML();
                    initAnalytics();
                    break;
                case 'buildings':
                    contentArea.innerHTML = getBuildingsHTML();
                    initBuildings();
                    break;
                case 'residents':
                    contentArea.innerHTML = getResidentsHTML();
                    initResidents();
                    break;
                case 'requests':
                    contentArea.innerHTML = getRequestsHTML();
                    initRequests();
                    break;
                case 'services':
                    contentArea.innerHTML = getServicesHTML();
                    initServices();
                    break;
                case 'payments':
                    contentArea.innerHTML = getPaymentsHTML();
                    initPayments();
                    break;
                case 'contractors':
                    contentArea.innerHTML = getContractorsHTML();
                    initContractors();
                    break;
                case 'documents':
                    contentArea.innerHTML = getDocumentsHTML();
                    initDocuments();
                    break;
                case 'payment-details':
                    contentArea.innerHTML = getPaymentDetailsHTML();
                    initPaymentDetails();
                    break;
                case 'company-profile':
                    contentArea.innerHTML = getCompanyProfileHTML();
                    initCompanyProfile();
                    break;
            }
            
            // После загрузки контента обновляем компоненты
            updateCounters();
        }, 300);
    }
    
    function getSectionTitle(section) {
        const titles = {
            'analytics': 'Аналитики',
            'buildings': 'Домов',
            'residents': 'Жильцов',
            'requests': 'Обращений',
            'services': 'Услуг',
            'payments': 'Платежей',
            'contractors': 'Подрядчиков',
            'documents': 'Документов',
            'payment-details': 'Реквизитов',
            'company-profile': 'Профиля УК'
        };
        return titles[section] || 'раздела';
    }
    
    function getAnalyticsHTML() {
        return `
            <div class="dashboard-grid">
                <div class="card animate-in" style="animation-delay: 0.1s">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon">
                                <i class="fas fa-building"></i>
                            </div>
                            Домов под управлением
                        </div>
                    </div>
                    <div class="card-value" id="buildings-count">${xHouseData.buildings.length}</div>
                    <div class="card-change">
                        <i class="fas fa-arrow-up"></i> +3 за месяц
                    </div>
                </div>
                
                <div class="card animate-in" style="animation-delay: 0.2s">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            Жильцов
                        </div>
                    </div>
                    <div class="card-value" id="residents-count">${xHouseData.residents.length}<span> чел</span></div>
                    <div class="card-change">
                        <i class="fas fa-arrow-up"></i> +12 за месяц
                    </div>
                </div>
                
                <div class="card animate-in" style="animation-delay: 0.3s">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            Собрано платежей
                        </div>
                    </div>
                    <div class="card-value" id="payments-total">${formatCurrencyShort(calculateTotalPayments())}</div>
                    <div class="card-change">
                        <i class="fas fa-arrow-up"></i> +18% к прошлому месяцу
                    </div>
                </div>
                
                <div class="card animate-in" style="animation-delay: 0.4s">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="card-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            Текущая задолженность
                        </div>
                    </div>
                    <div class="card-value" id="debt-total">${formatCurrencyShort(calculateTotalDebt())}</div>
                    <div class="card-change">
                        <i class="fas fa-arrow-down"></i> -15% за месяц
                    </div>
                </div>
            </div>
            
            <div class="form-row gap-3 mb-4">
                <div class="card" style="flex: 2;">
                    <div class="chart-header">
                        <div class="chart-title">
                            <i class="fas fa-chart-bar"></i> Динамика платежей
                        </div>
                        <select class="form-control" style="width: 200px;" id="chartPeriod">
                            <option value="6">За последние 6 месяцев</option>
                            <option value="12">За последний год</option>
                        </select>
                    </div>
                    <canvas id="paymentsChart" height="250"></canvas>
                </div>
                
                <div class="card" style="flex: 1;">
                    <div class="chart-header">
                        <div class="chart-title">
                            <i class="fas fa-exclamation-circle"></i> Дома с рисками
                        </div>
                    </div>
                    <div id="risky-buildings-list" style="padding: 20px;">
                    </div>
                </div>
            </div>
            
            <div class="table-container animate-in" style="animation-delay: 0.5s">
                <div class="table-header">
                    <div class="table-title">
                        <i class="fas fa-history"></i> Последние платежи
                    </div>
                    <div class="table-actions">
                        <button class="btn btn-secondary" onclick="showFilterModal()">Фильтры</button>
                        <button class="btn btn-teal" id="addPaymentBtn">
                            <i class="fas fa-plus"></i> Новый платёж
                        </button>
                    </div>
                </div>
                <table id="recent-payments-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Услуга</th>
                            <th>Дом</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody id="payments-table-body">
                    </tbody>
                </table>
            </div>
        `;
    }
    
    function initAnalytics() {
        loadRecentPayments();
        loadRiskyBuildings();
        updateCounters();
        initCharts();
        
        // Обработчик изменения периода графика
        const chartPeriod = document.getElementById('chartPeriod');
        if (chartPeriod) {
            chartPeriod.addEventListener('change', initCharts);
        }
    }
    
    function updateCounters() {
        document.getElementById('buildings-count').textContent = xHouseData.buildings.length;
        document.getElementById('residents-count').textContent = xHouseData.residents.length;
        document.getElementById('payments-total').textContent = formatCurrencyShort(calculateTotalPayments());
        document.getElementById('debt-total').textContent = formatCurrencyShort(calculateTotalDebt());
    }
    
    function calculateTotalPayments() {
        return xHouseData.payments
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0);
    }
    
    function calculateTotalDebt() {
        return xHouseData.payments
            .filter(p => p.status === 'charged')
            .reduce((sum, p) => sum + p.amount, 0);
    }
    
    function loadRecentPayments() {
        const tableBody = document.getElementById('payments-table-body') || 
                         document.querySelector('#recent-payments-table tbody');
        
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        // Берем последние 6 платежей
        const recentPayments = [...xHouseData.payments]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6);
        
        recentPayments.forEach(payment => {
            const service = xHouseData.services.find(s => s.id === payment.serviceId);
            const building = xHouseData.buildings.find(b => b.id === payment.buildingId);
            
            const row = document.createElement('tr');
            row.className = 'animate-in';
            row.innerHTML = `
                <td><strong>#${payment.id}</strong></td>
                <td>${service ? service.name : 'Неизвестно'}</td>
                <td>${building ? building.address : 'Неизвестно'}</td>
                <td><strong>${formatCurrency(payment.amount)}</strong></td>
                <td><span class="status-badge status-${payment.status}">
                    <i class="fas ${getStatusIcon(payment.status)}"></i>
                    ${getStatusText(payment.status)}
                </span></td>
                <td>${formatDate(payment.date)}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    function loadRiskyBuildings() {
        const container = document.getElementById('risky-buildings-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        const riskyBuildings = xHouseData.buildings.filter(b => b.risks && b.risks.length > 0);
        
        if (riskyBuildings.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 48px; color: var(--secondary-teal); margin-bottom: 16px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div style="color: var(--text-secondary); font-size: 16px;">
                        Все дома в норме
                    </div>
                    <div style="color: var(--text-muted); font-size: 14px; margin-top: 8px;">
                        Нет домов с повышенными рисками
                    </div>
                </div>
            `;
            return;
        }
        
        riskyBuildings.forEach((building, index) => {
            const riskCount = building.risks.length;
            const buildingEl = document.createElement('div');
            buildingEl.className = 'animate-in';
            buildingEl.style.animationDelay = `${index * 0.1}s`;
            buildingEl.style.cssText = `
                background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05));
                border: 1px solid rgba(255, 107, 107, 0.2);
                border-radius: var(--border-radius-sm);
                padding: 20px;
                margin-bottom: 16px;
            `;
            
            buildingEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div>
                        <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">${building.address}</div>
                        <div style="font-size: 13px; color: var(--text-secondary);">
                            ${building.apartments} квартир, ${building.floors} подъездов
                        </div>
                    </div>
                    <div style="background: rgba(255, 107, 107, 0.2); color: var(--warning-red); padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                        ${riskCount} рисков
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                    ${building.risks.map(risk => `
                        <div class="risk-flag">
                            <i class="fas ${getRiskIcon(risk)}"></i>
                            ${getRiskText(risk)}
                        </div>
                    `).join('')}
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 13px;" onclick="viewBuildingDetail(${building.id})">
                        <i class="fas fa-eye"></i> Подробнее
                    </button>
                    <button class="btn btn-teal" style="padding: 8px 16px; font-size: 13px;" onclick="createRequestForBuilding(${building.id})">
                        <i class="fas fa-plus"></i> Создать задачу
                    </button>
                </div>
            `;
            container.appendChild(buildingEl);
        });
    }
    
    function initCharts() {
        const ctx = document.getElementById('paymentsChart');
        if (!ctx) return;
        
        const period = document.getElementById('chartPeriod') ? 
            parseInt(document.getElementById('chartPeriod').value) : 6;
        
        // Генерируем данные за последние N месяцев
        const months = [];
        const now = new Date();
        for (let i = period - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push(formatMonth(date));
        }
        
        // Заполняем данные платежей
        const paidData = months.map(month => {
            return Math.floor(Math.random() * 500000) + 200000; // Тестовые данные
        });
        
        const chargedData = months.map(month => {
            return Math.floor(Math.random() * 300000) + 100000; // Тестовые данные
        });
        
        // Уничтожаем предыдущий график, если существует
        if (window.paymentsChartInstance) {
            window.paymentsChartInstance.destroy();
        }
        
        window.paymentsChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Оплачено',
                        data: paidData,
                        borderColor: 'var(--secondary-teal)',
                        backgroundColor: 'rgba(0, 212, 170, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Начислено',
                        data: chargedData,
                        borderColor: 'var(--primary-purple)',
                        backgroundColor: 'rgba(105, 18, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'var(--text-primary)',
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--bg-card)',
                        titleColor: 'var(--text-primary)',
                        bodyColor: 'var(--text-primary)',
                        borderColor: 'var(--border-color)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-secondary)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            callback: function(value) {
                                return formatCurrencyShort(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    function initModals() {
        // Модальное окно для добавления дома
        const buildingModal = document.getElementById('buildingModal');
        const closeBuildingModal = document.getElementById('closeBuildingModal');
        const cancelBuildingBtn = document.getElementById('cancelBuildingBtn');
        const buildingForm = document.getElementById('buildingForm');
        
        if (closeBuildingModal) {
            closeBuildingModal.addEventListener('click', () => {
                buildingModal.classList.remove('active');
            });
        }
        
        if (cancelBuildingBtn) {
            cancelBuildingBtn.addEventListener('click', () => {
                buildingModal.classList.remove('active');
            });
        }
        
        if (buildingForm) {
            buildingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newBuilding = {
                    id: xHouseData.buildings.length > 0 ? 
                        Math.max(...xHouseData.buildings.map(b => b.id)) + 1 : 1,
                    address: document.getElementById('address').value,
                    floors: parseInt(document.getElementById('floors').value),
                    apartments: parseInt(document.getElementById('apartments').value),
                    totalArea: document.getElementById('totalArea').value,
                    yearBuilt: document.getElementById('yearBuilt').value,
                    systems: Array.from(document.querySelectorAll('input[name="systems"]:checked'))
                                .map(cb => cb.value),
                    risks: [],
                    passport: {
                        elevators: [],
                        itp: {type: "", power: ""},
                        electricity: {voltage: "", lastCheck: ""}
                    },
                    notes: document.getElementById('notes').value,
                    residentsCount: 0
                };
                
                xHouseData.buildings.push(newBuilding);
                saveToLocalStorage();
                updateCounters();
                loadRecentPayments();
                loadRiskyBuildings();
                
                buildingModal.classList.remove('active');
                buildingForm.reset();
                
                showNotification('Новый дом успешно добавлен', 'success');
                
                // Если мы находимся в разделе домов, обновляем таблицу
                if (document.querySelector('.nav-item[data-section="buildings"]').classList.contains('active')) {
                    initBuildings();
                }
            });
        }
        
        // Модальное окно для добавления платежа
        const paymentModal = document.getElementById('paymentModal');
        const addPaymentBtn = document.getElementById('addPaymentBtn');
        const closePaymentModal = document.getElementById('closePaymentModal');
        const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
        const paymentForm = document.getElementById('paymentForm');
        
        if (addPaymentBtn) {
            addPaymentBtn.addEventListener('click', () => {
                // Заполняем выпадающие списки
                const serviceSelect = document.getElementById('paymentService');
                const buildingSelect = document.getElementById('paymentBuilding');
                
                serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
                buildingSelect.innerHTML = '<option value="">Выберите дом</option>';
                
                xHouseData.services.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = `${service.name} (${service.tariff})`;
                    serviceSelect.appendChild(option);
                });
                
                xHouseData.buildings.forEach(building => {
                    const option = document.createElement('option');
                    option.value = building.id;
                    option.textContent = building.address;
                    buildingSelect.appendChild(option);
                });
                
                paymentModal.classList.add('active');
            });
        }
        
        if (closePaymentModal) {
            closePaymentModal.addEventListener('click', () => {
                paymentModal.classList.remove('active');
            });
        }
        
        if (cancelPaymentBtn) {
            cancelPaymentBtn.addEventListener('click', () => {
                paymentModal.classList.remove('active');
            });
        }
        
        if (paymentForm) {
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newPayment = {
                    id: xHouseData.payments.length > 0 ? 
                        Math.max(...xHouseData.payments.map(p => p.id)) + 1 : 1,
                    serviceId: parseInt(document.getElementById('paymentService').value),
                    buildingId: parseInt(document.getElementById('paymentBuilding').value),
                    amount: parseInt(document.getElementById('paymentAmount').value),
                    status: document.getElementById('paymentStatus').value,
                    date: new Date().toISOString().split('T')[0],
                    period: document.getElementById('paymentPeriod').value,
                    payer: "Начисление от УК",
                    notes: document.getElementById('paymentNotes').value
                };
                
                xHouseData.payments.push(newPayment);
                saveToLocalStorage();
                updateCounters();
                loadRecentPayments();
                
                if (document.getElementById('paymentsChart')) {
                    initCharts();
                }
                
                paymentModal.classList.remove('active');
                paymentForm.reset();
                
                showNotification('Начисление успешно создано', 'success');
                
                // Если мы находимся в разделе платежей, обновляем таблицу
                if (document.querySelector('.nav-item[data-section="payments"]').classList.contains('active')) {
                    initPayments();
                }
            });
        }
        
        // Закрытие модальных окон по клику вне окна
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.remove('active');
            }
        });
    }
    
    // Вспомогательные функции
    function formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    function formatCurrencyShort(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1).replace('.', ',') + ' млн ₽';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' тыс ₽';
        }
        return formatCurrency(amount);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
    
    function formatMonth(date) {
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        if (typeof date === 'string') {
            const [year, month] = date.split('-');
            return `${months[parseInt(month) - 1]} ${year}`;
        }
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    function getStatusText(status) {
        const statusMap = {
            'charged': 'Начислено',
            'paid': 'Оплачено',
            'processing': 'В обработке'
        };
        return statusMap[status] || status;
    }
    
    function getStatusIcon(status) {
        const iconMap = {
            'charged': 'fa-clock',
            'paid': 'fa-check-circle',
            'processing': 'fa-sync-alt'
        };
        return iconMap[status] || 'fa-circle';
    }
    
    function getRiskText(risk) {
        const riskMap = {
            'recurrent_issues': 'Повторные обращения',
            'frequent_accidents': 'Частые аварии',
            'overdue_work': 'Просроченные работы'
        };
        return riskMap[risk] || risk;
    }
    
    function getRiskIcon(risk) {
        const iconMap = {
            'recurrent_issues': 'fa-redo',
            'frequent_accidents': 'fa-bolt',
            'overdue_work': 'fa-calendar-times'
        };
        return iconMap[risk] || 'fa-exclamation-triangle';
    }
    
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'var(--secondary-teal)' : 
                       type === 'error' ? 'var(--warning-red)' : 'var(--primary-purple)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${bgColor};
            color: white;
            border-radius: var(--border-radius-sm);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const icon = type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}" style="font-size: 20px;"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Добавляем CSS анимации
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Удаляем через 4 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // HTML для других разделов
    function getBuildingsHTML() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">
                        <i class="fas fa-building"></i> Дома под управлением
                    </div>
                    <div class="table-actions">
                        <button class="btn btn-primary" id="addNewBuildingBtn">
                            <i class="fas fa-plus"></i> Добавить дом
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i> Экспорт
                        </button>
                    </div>
                </div>
                <table id="buildings-table">
                    <thead>
                        <tr>
                            <th>Адрес</th>
                            <th>Квартиры</th>
                            <th>Подъезды</th>
                            <th>Жильцы</th>
                            <th>Риски</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="buildings-table-body">
                    </tbody>
                </table>
            </div>
            
            <div class="card mt-4">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-map-marked-alt"></i> Карта домов
                    </div>
                </div>
                <div style="padding: 24px; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-map" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <div>Интеграция с картами доступна в расширенной версии</div>
                </div>
            </div>
        `;
    }
    
    function initBuildings() {
        const tableBody = document.getElementById('buildings-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        xHouseData.buildings.forEach((building, index) => {
            const row = document.createElement('tr');
            row.className = 'animate-in';
            row.style.animationDelay = `${index * 0.05}s`;
            
            row.innerHTML = `
                <td>
                    <div style="font-weight: 700; font-size: 16px;">${building.address}</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">
                        ${building.yearBuilt || 'Не указан'} г.
                    </div>
                </td>
                <td style="font-weight: 600;">${building.apartments}</td>
                <td>${building.floors}</td>
                <td>${building.residentsCount || 0}</td>
                <td>
                    ${building.risks && building.risks.length > 0 ? 
                        `<span style="color: var(--warning-red); font-weight: 600;">${building.risks.length}</span>` : 
                        '<span style="color: var(--secondary-teal);">Нет</span>'}
                </td>
                <td>
                    <span class="status-badge ${building.risks && building.risks.length > 2 ? 'status-charged' : 'status-paid'}">
                        <i class="fas ${building.risks && building.risks.length > 2 ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
                        ${building.risks && building.risks.length > 2 ? 'Требует внимания' : 'Норма'}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary" style="padding: 8px 12px;" onclick="viewBuildingDetail(${building.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-secondary" style="padding: 8px 12px;" onclick="editBuilding(${building.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Обработчик для кнопки добавления дома
        const addBtn = document.getElementById('addNewBuildingBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                document.getElementById('buildingModal').classList.add('active');
            });
        }
    }
    
    function getResidentsHTML() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">
                        <i class="fas fa-users"></i> Жильцы
                    </div>
                    <div class="table-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-user-plus"></i> Добавить жильца
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-filter"></i> Фильтры
                        </button>
                    </div>
                </div>
                <table id="residents-table">
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Телефон</th>
                            <th>Дом</th>
                            <th>Квартира</th>
                            <th>Задолженность</th>
                            <th>Статус</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="residents-table-body">
                    </tbody>
                </table>
            </div>
            
            <div class="form-row gap-3 mt-4">
                <div class="card" style="flex: 1;">
                    <div class="chart-header">
                        <div class="chart-title">
                            <i class="fas fa-chart-pie"></i> Статистика по задолженностям
                        </div>
                    </div>
                    <div style="padding: 20px;">
                        <canvas id="debtChart" height="200"></canvas>
                    </div>
                </div>
                
                <div class="card" style="flex: 1;">
                    <div class="chart-header">
                        <div class="card-title">
                            <i class="fas fa-exclamation-circle"></i> Крупные должники
                        </div>
                    </div>
                    <div id="top-debtors" style="padding: 20px;">
                        <!-- Данные будут загружены через JS -->
                    </div>
                </div>
            </div>
        `;
    }
    
    function initResidents() {
        // Заглушка для реализации
        showNotification('Раздел "Жильцы" находится в разработке', 'info');
    }
    
    function getRequestsHTML() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">
                        <i class="fas fa-comments"></i> Обращения жильцов
                    </div>
                    <div class="table-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i> Новое обращение
                        </button>
                        <div style="display: flex; gap: 12px;">
                            <button class="btn btn-secondary">Все</button>
                            <button class="btn btn-secondary" style="background: rgba(255, 107, 107, 0.1); color: var(--warning-red);">
                                Новые (3)
                            </button>
                            <button class="btn btn-secondary" style="background: rgba(255, 209, 102, 0.1); color: var(--warning-yellow);">
                                В работе (5)
                            </button>
                        </div>
                    </div>
                </div>
                <table id="requests-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тип</th>
                            <th>Описание</th>
                            <th>Жилец</th>
                            <th>Приоритет</th>
                            <th>Статус</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody id="requests-table-body">
                    </tbody>
                </table>
            </div>
            
            <div class="card mt-4">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-chart-line"></i> Статистика обращений
                    </div>
                </div>
                <div style="padding: 24px; text-align: center; color: var(--text-secondary);">
                    <div class="form-row">
                        <div class="card" style="flex: 1; text-align: center; padding: 20px;">
                            <div style="font-size: 32px; font-weight: 800; color: var(--primary-purple);">24</div>
                            <div style="color: var(--text-secondary);">Обращений за месяц</div>
                        </div>
                        <div class="card" style="flex: 1; text-align: center; padding: 20px;">
                            <div style="font-size: 32px; font-weight: 800; color: var(--secondary-teal);">4.2</div>
                            <div style="color: var(--text-secondary);">Средняя оценка</div>
                        </div>
                        <div class="card" style="flex: 1; text-align: center; padding: 20px;">
                            <div style="font-size: 32px; font-weight: 800; color: var(--warning-red);">3</div>
                            <div style="color: var(--text-secondary);">Просрочено</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function initRequests() {
        // Заглушка для реализации
        showNotification('Раздел "Обращения" находится в разработке', 'info');
    }
    
    // HTML для остальных разделов (заглушки)
    function getServicesHTML() {
        return '<div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-concierge-bell"></i> Услуги и тарифы</div></div><div class="modal-body"><p>Раздел в разработке</p></div></div>';
    }
    
    function getPaymentsHTML() {
        return '<div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-credit-card"></i> Платежи</div></div><div class="modal-body"><p>Раздел в разработке</p></div></div>';
    }
    
    function getContractorsHTML() {
        return '<div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-handshake"></i> Подрядчики</div></div><div class="modal-body"><p>Раздел в разработке</p></div></div>';
    }
    
    function getDocumentsHTML() {
        return '<div class="card"><div class="card-header"><div class="card-title"><i class="fas fa-folder"></i> Документы</div></div><div class="modal-body"><p>Раздел в разработке</p></div></div>';
    }
    
    function getPaymentDetailsHTML() {
        return `<div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="fas fa-university"></i> Реквизиты для оплаты
                </div>
            </div>
            <div class="modal-body">
                <h3 style="margin-bottom: 20px;">Банковские реквизиты УК</h3>
                <div style="background: rgba(105, 18, 255, 0.05); padding: 24px; border-radius: var(--border-radius-sm);">
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; margin-bottom: 16px;">
                        <div style="color: var(--text-secondary);">Банк:</div>
                        <div style="font-weight: 600;">${xHouseData.currentCompany.paymentDetails.bank}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; margin-bottom: 16px;">
                        <div style="color: var(--text-secondary);">Расчётный счёт:</div>
                        <div style="font-weight: 600; font-family: monospace;">${xHouseData.currentCompany.paymentDetails.account}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; margin-bottom: 16px;">
                        <div style="color: var(--text-secondary);">БИК:</div>
                        <div style="font-weight: 600;">${xHouseData.currentCompany.paymentDetails.bic}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px; margin-bottom: 16px;">
                        <div style="color: var(--text-secondary);">ИНН:</div>
                        <div style="font-weight: 600;">${xHouseData.currentCompany.paymentDetails.inn}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 200px 1fr; gap: 16px;">
                        <div style="color: var(--text-secondary);">КПП:</div>
                        <div style="font-weight: 600;">${xHouseData.currentCompany.paymentDetails.kpp}</div>
                    </div>
                </div>
                <div class="mt-4">
                    <button class="btn btn-primary">
                        <i class="fas fa-copy"></i> Копировать реквизиты
                    </button>
                    <button class="btn btn-secondary" style="margin-left: 12px;">
                        <i class="fas fa-print"></i> Печать
                    </button>
                </div>
            </div>
        </div>`;
    }
    
    function initPaymentDetails() {
        // Инициализация раздела реквизитов
        const copyBtn = document.querySelector('.btn-primary');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const details = `
Банк: ${xHouseData.currentCompany.paymentDetails.bank}
Р/с: ${xHouseData.currentCompany.paymentDetails.account}
БИК: ${xHouseData.currentCompany.paymentDetails.bic}
ИНН: ${xHouseData.currentCompany.paymentDetails.inn}
КПП: ${xHouseData.currentCompany.paymentDetails.kpp}
                `;
                navigator.clipboard.writeText(details).then(() => {
                    showNotification('Реквизиты скопированы в буфер обмена', 'success');
                });
            });
        }
    }
    
    function getCompanyProfileHTML() {
        return `<div class="card">
            <div class="card-header">
                <div class="card-title">
                    <i class="fas fa-id-card"></i> Профиль управляющей компании
                </div>
                <button class="btn btn-primary" id="editProfileBtn">
                    <i class="fas fa-edit"></i> Редактировать
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 32px;">
                    <div style="font-size: 24px; font-weight: 800; margin-bottom: 8px; background: linear-gradient(90deg, var(--primary-purple), var(--secondary-teal)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        ${xHouseData.currentCompany.legalName}
                    </div>
                    <div style="color: var(--text-secondary);">Управляющая компания</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px;">
                    <div>
                        <div style="color: var(--text-secondary); margin-bottom: 8px;">Юридическая информация</div>
                        <div style="background: var(--bg-dark); padding: 20px; border-radius: var(--border-radius-sm);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <div style="color: var(--text-secondary);">ИНН:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.inn}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <div style="color: var(--text-secondary);">ОГРН:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.ogrn}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <div style="color: var(--text-secondary);">Форма:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.form}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div style="color: var(--text-secondary); margin-bottom: 8px;">Контактная информация</div>
                        <div style="background: var(--bg-dark); padding: 20px; border-radius: var(--border-radius-sm);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <div style="color: var(--text-secondary);">Диспетчерская:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.contacts.dispatcher}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                                <div style="color: var(--text-secondary);">Аварийная:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.contacts.emergency}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <div style="color: var(--text-secondary);">Приёмная:</div>
                                <div style="font-weight: 600;">${xHouseData.currentCompany.contacts.reception}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div style="color: var(--text-secondary); margin-bottom: 16px;">Часы работы</div>
                    <div style="background: linear-gradient(135deg, var(--primary-purple), var(--secondary-teal)); padding: 20px; border-radius: var(--border-radius-sm); color: white; font-weight: 600;">
                        ${xHouseData.currentCompany.contacts.hours}
                    </div>
                </div>
            </div>
        </div>`;
    }
    
    function initCompanyProfile() {
        const editBtn = document.getElementById('editProfileBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                showNotification('Редактирование профиля доступно в расширенной версии', 'info');
            });
        }
    }
    
    // Глобальные функции для использования в HTML
    window.viewBuildingDetail = function(buildingId) {
        showNotification(`Просмотр дома #${buildingId} (функция в разработке)`, 'info');
    };
    
    window.editBuilding = function(buildingId) {
        showNotification(`Редактирование дома #${buildingId} (функция в разработке)`, 'info');
    };
    
    window.createRequestForBuilding = function(buildingId) {
        showNotification(`Создание задачи для дома #${buildingId} (функция в разработке)`, 'info');
    };
    
    window.showFilterModal = function() {
        showNotification('Фильтрация данных доступна в расширенной версии', 'info');
    };
    
    // Инициализация остальных разделов
    function initServices() {}
    function initPayments() {}
    function initContractors() {}
    function initDocuments() {}
});
