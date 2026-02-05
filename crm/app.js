// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация данных CRM
    if (!window.crmData) {
        window.crmData = {
            currentCompany: {
                id: 1,
                legalName: "ООО 'Жилфонд Сервис'",
                inn: "7701234567",
                ogrn: "1177745678901",
                form: "УК",
                region: "Москва",
                managedSince: "2020-01-15",
                contacts: {
                    dispatcher: "+7 (495) 123-45-67",
                    emergency: "+7 (495) 987-65-43",
                    accounting: "account@uk-crm.ru",
                    reception: "ул. Примерная, д. 10",
                    hours: "9:00-18:00 (Пн-Пт)"
                },
                licenses: ["Лицензия №12345", "Свидетельство №67890"]
            },
            companies: [],
            buildings: [],
            services: [],
            contractors: [],
            payments: [],
            documents: [],
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
        crmData.buildings = [
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
                notes: "Требуется замена лифтов"
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
                notes: "Новый дом, в хорошем состоянии"
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
                notes: "Аварийный дом, требуется капитальный ремонт"
            }
        ];
        
        // Тестовые услуги
        crmData.services = [
            {
                id: 1,
                name: "Содержание общего имущества",
                type: "main",
                tariff: "25 ₽/м²",
                period: "monthly",
                buildingId: 1,
                contractorId: null,
                sla: "24/7"
            },
            {
                id: 2,
                name: "Капитальный ремонт",
                type: "main",
                tariff: "15 ₽/м²",
                period: "monthly",
                buildingId: 2,
                contractorId: 1,
                sla: "По графику"
            },
            {
                id: 3,
                name: "Вывоз ТКО",
                type: "main",
                tariff: "120 ₽/чел",
                period: "monthly",
                buildingId: 1,
                contractorId: 2,
                sla: "Ежедневно"
            },
            {
                id: 4,
                name: "Установка домофона",
                type: "additional",
                tariff: "5000 ₽",
                period: "once",
                buildingId: 3,
                contractorId: 3,
                sla: "14 дней"
            }
        ];
        
        // Тестовые подрядчики
        crmData.contractors = [
            {
                id: 1,
                legalName: "ООО 'СтройМонтаж'",
                inn: "7712345678",
                workTypes: ["Капремонт", "Строительные работы"],
                bankDetails: "р/с 40702810000000012345",
                status: "verified",
                contact: "+7 (495) 111-22-33",
                email: "info@stroymontag.ru"
            },
            {
                id: 2,
                legalName: "ООО 'ЭкоТранс'",
                inn: "7723456789",
                workTypes: ["Вывоз мусора", "Утилизация"],
                bankDetails: "р/с 40702810000000023456",
                status: "verified",
                contact: "+7 (495) 222-33-44",
                email: "contact@ecotrans.ru"
            },
            {
                id: 3,
                legalName: "ИП Сидоров А.В.",
                inn: "7734567890",
                workTypes: ["Электромонтаж", "Сантехника"],
                bankDetails: "р/с 40802810000000034567",
                status: "pending",
                contact: "+7 (495) 333-44-55",
                email: "sidorov@mail.ru"
            }
        ];
        
        // Тестовые платежи
        crmData.payments = [
            {
                id: 1,
                serviceId: 1,
                buildingId: 1,
                amount: 112500,
                status: "paid",
                date: "2024-03-15",
                period: "2024-03",
                payer: "ЖСК 'Ленина 10'"
            },
            {
                id: 2,
                serviceId: 2,
                buildingId: 2,
                amount: 123000,
                status: "processing",
                date: "2024-03-16",
                period: "2024-03",
                payer: "ТСЖ 'Мира 25'"
            },
            {
                id: 3,
                serviceId: 3,
                buildingId: 1,
                amount: 7200,
                status: "charged",
                date: "2024-03-10",
                period: "2024-03",
                payer: "ЖСК 'Ленина 10'"
            },
            {
                id: 4,
                serviceId: 4,
                buildingId: 3,
                amount: 5000,
                status: "paid",
                date: "2024-03-05",
                period: "2024-03",
                payer: "УК 'Жилфонд Сервис'"
            }
        ];
        
        // Тестовые документы
        crmData.documents = [
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
        
        // Тестовые пользователи
        crmData.users = [
            {
                id: 1,
                name: "Иванов Петр Сергеевич",
                role: "manager",
                permissions: ["all"],
                email: "ivanov@uk-crm.ru"
            },
            {
                id: 2,
                name: "Сидорова Мария Ивановна",
                role: "accountant",
                permissions: ["payments", "documents"],
                email: "sidorova@uk-crm.ru"
            },
            {
                id: 3,
                name: "Петров Алексей Владимирович",
                role: "engineer",
                permissions: ["buildings", "services"],
                email: "petrov@uk-crm.ru"
            }
        ];
    }
    
    function saveToLocalStorage() {
        try {
            localStorage.setItem('crmData', JSON.stringify(crmData));
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }
    
    function loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('crmData');
            if (data) {
                window.crmData = JSON.parse(data);
            }
        } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
        }
    }
    
    function initApp() {
        // Инициализация навигации
        initNavigation();
        
        // Инициализация дашборда
        initDashboard();
        
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
        
        // Загружаем дашборд по умолчанию
        loadSection('dashboard');
    }
    
    function loadSection(section) {
        const contentArea = document.getElementById('content-area');
        
        switch(section) {
            case 'dashboard':
                contentArea.innerHTML = getDashboardHTML();
                initDashboard();
                break;
            case 'profile':
                contentArea.innerHTML = getProfileHTML();
                initProfile();
                break;
            case 'buildings':
                contentArea.innerHTML = getBuildingsHTML();
                initBuildings();
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
            case 'users':
                contentArea.innerHTML = getUsersHTML();
                initUsers();
                break;
        }
        
        // После загрузки контента инициализируем компоненты
        setTimeout(() => {
            updateCounters();
            if (section === 'payments') {
                initPaymentChart();
            }
        }, 100);
    }
    
    function getDashboardHTML() {
        return `
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Домов под управлением</div>
                        <i class="fas fa-building" style="color: var(--primary-blue);"></i>
                    </div>
                    <div class="card-value" id="buildings-count">0</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-up"></i> 12% за месяц
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Собрано платежей</div>
                        <i class="fas fa-money-bill" style="color: var(--accent-teal);"></i>
                    </div>
                    <div class="card-value" id="payments-total">0 ₽</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-up"></i> 8% за месяц
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Активных подрядчиков</div>
                        <i class="fas fa-handshake" style="color: var(--warning-yellow);"></i>
                    </div>
                    <div class="card-value" id="contractors-count">0</div>
                    <div class="card-change negative">
                        <i class="fas fa-arrow-down"></i> 2% за месяц
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Задолженность</div>
                        <i class="fas fa-exclamation-triangle" style="color: var(--warning-red);"></i>
                    </div>
                    <div class="card-value" id="debt-total">0 ₽</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-down"></i> 5% за месяц
                    </div>
                </div>
            </div>
            
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">Последние платежи</div>
                    <div class="table-actions">
                        <button class="btn btn-secondary btn-sm" onclick="filterPayments()">Фильтр</button>
                        <button class="btn btn-secondary btn-sm" onclick="sortPayments()">Сортировка</button>
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
            
            <div class="d-flex gap-2 mb-3">
                <div class="card" style="flex: 1;">
                    <div class="card-header">
                        <div class="card-title">Статистика платежей</div>
                    </div>
                    <div style="padding: 20px;">
                        <canvas id="paymentsChart" height="250"></canvas>
                    </div>
                </div>
                
                <div class="card" style="flex: 1;">
                    <div class="card-header">
                        <div class="card-title">Дома с рисками</div>
                    </div>
                    <div style="padding: 20px;">
                        <div id="risky-buildings-list">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function initDashboard() {
        loadRecentPayments();
        loadRiskyBuildings();
        updateCounters();
        initCharts();
    }
    
    function updateCounters() {
        document.getElementById('buildings-count').textContent = crmData.buildings.length;
        
        const paidAmount = crmData.payments
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0);
        document.getElementById('payments-total').textContent = formatCurrency(paidAmount);
        
        const verifiedContractors = crmData.contractors.filter(c => c.status === 'verified').length;
        document.getElementById('contractors-count').textContent = verifiedContractors;
        
        const debtAmount = crmData.payments
            .filter(p => p.status === 'charged')
            .reduce((sum, p) => sum + p.amount, 0);
        document.getElementById('debt-total').textContent = formatCurrency(debtAmount);
    }
    
    function loadRecentPayments() {
        const tableBody = document.getElementById('payments-table-body') || 
                         document.querySelector('#recent-payments-table tbody');
        
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        // Берем последние 5 платежей
        const recentPayments = [...crmData.payments]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        recentPayments.forEach(payment => {
            const service = crmData.services.find(s => s.id === payment.serviceId);
            const building = crmData.buildings.find(b => b.id === payment.buildingId);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${payment.id}</td>
                <td>${service ? service.name : 'Неизвестно'}</td>
                <td>${building ? building.address : 'Неизвестно'}</td>
                <td>${formatCurrency(payment.amount)}</td>
                <td><span class="status-badge status-${payment.status}">${getStatusText(payment.status)}</span></td>
                <td>${formatDate(payment.date)}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    function loadRiskyBuildings() {
        const container = document.getElementById('risky-buildings-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        const riskyBuildings = crmData.buildings.filter(b => b.risks && b.risks.length > 0);
        
        if (riskyBuildings.length === 0) {
            container.innerHTML = '<p class="text-muted">Нет домов с рисками</p>';
            return;
        }
        
        riskyBuildings.forEach(building => {
            const riskCount = building.risks.length;
            const riskLevel = riskCount >= 3 ? 'high' : riskCount === 2 ? 'medium' : 'low';
            
            const buildingEl = document.createElement('div');
            buildingEl.className = 'd-flex justify-between align-center mb-2';
            buildingEl.innerHTML = `
                <div>
                    <div style="font-weight: 600;">${building.address}</div>
                    <div style="font-size: 13px; color: var(--text-light);">
                        ${building.apartments} кв., ${building.floors} подъездов
                    </div>
                    <div>
                        ${building.risks.map(risk => {
                            const riskText = getRiskText(risk);
                            const color = riskText.includes('аварий') ? 'var(--warning-red)' : 
                                         riskText.includes('повтор') ? 'var(--warning-yellow)' : 'var(--primary-blue)';
                            return `<span class="risk-flag" style="background-color: ${color}20; color: ${color};">${riskText}</span>`;
                        }).join('')}
                    </div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="viewBuilding(${building.id})">
                    <i class="fas fa-eye"></i>
                </button>
            `;
            container.appendChild(buildingEl);
        });
    }
    
    function initCharts() {
        const ctx = document.getElementById('paymentsChart');
        if (!ctx) return;
        
        // Группируем платежи по месяцам
        const paymentsByMonth = {};
        crmData.payments.forEach(payment => {
            const month = payment.date.substring(0, 7); // YYYY-MM
            if (!paymentsByMonth[month]) {
                paymentsByMonth[month] = { charged: 0, paid: 0, processing: 0 };
            }
            paymentsByMonth[month][payment.status] += payment.amount;
        });
        
        const months = Object.keys(paymentsByMonth).sort();
        const chargedData = months.map(m => paymentsByMonth[m].charged);
        const paidData = months.map(m => paymentsByMonth[m].paid);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months.map(m => formatMonth(m)),
                datasets: [
                    {
                        label: 'Начислено',
                        data: chargedData,
                        backgroundColor: 'rgba(255, 107, 107, 0.7)',
                        borderColor: 'var(--warning-red)',
                        borderWidth: 1
                    },
                    {
                        label: 'Оплачено',
                        data: paidData,
                        backgroundColor: 'rgba(0, 212, 170, 0.7)',
                        borderColor: 'var(--accent-teal)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
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
        const addBuildingBtn = document.getElementById('addBuildingBtn');
        const closeBuildingModal = document.getElementById('closeBuildingModal');
        const cancelBuildingBtn = document.getElementById('cancelBuildingBtn');
        const buildingForm = document.getElementById('buildingForm');
        
        if (addBuildingBtn) {
            addBuildingBtn.addEventListener('click', () => {
                buildingModal.classList.add('active');
            });
        }
        
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
                    id: crmData.buildings.length > 0 ? 
                        Math.max(...crmData.buildings.map(b => b.id)) + 1 : 1,
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
                    notes: document.getElementById('notes').value
                };
                
                crmData.buildings.push(newBuilding);
                saveToLocalStorage();
                updateCounters();
                loadRecentPayments();
                loadRiskyBuildings();
                
                buildingModal.classList.remove('active');
                buildingForm.reset();
                
                // Показываем уведомление
                showNotification('Новый дом успешно добавлен', 'success');
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
                
                crmData.services.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = `${service.name} (${service.tariff})`;
                    serviceSelect.appendChild(option);
                });
                
                crmData.buildings.forEach(building => {
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
                    id: crmData.payments.length > 0 ? 
                        Math.max(...crmData.payments.map(p => p.id)) + 1 : 1,
                    serviceId: parseInt(document.getElementById('paymentService').value),
                    buildingId: parseInt(document.getElementById('paymentBuilding').value),
                    amount: parseInt(document.getElementById('paymentAmount').value),
                    status: document.getElementById('paymentStatus').value,
                    date: new Date().toISOString().split('T')[0],
                    period: document.getElementById('paymentPeriod').value,
                    payer: "Начисление от УК"
                };
                
                crmData.payments.push(newPayment);
                saveToLocalStorage();
                updateCounters();
                loadRecentPayments();
                
                if (document.getElementById('paymentsChart')) {
                    initCharts();
                }
                
                paymentModal.classList.remove('active');
                paymentForm.reset();
                
                showNotification('Начисление успешно создано', 'success');
            });
        }
    }
    
    // Вспомогательные функции
    function formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(amount);
    }
    
    function formatCurrencyShort(amount) {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + ' млн';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + ' тыс';
        }
        return amount.toString();
    }
    
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('ru-RU');
    }
    
    function formatMonth(monthString) {
        const [year, month] = monthString.split('-');
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        return `${months[parseInt(month) - 1]} ${year}`;
    }
    
    function getStatusText(status) {
        const statusMap = {
            'charged': 'Начислено',
            'paid': 'Оплачено',
            'processing': 'В обработке'
        };
        return statusMap[status] || status;
    }
    
    function getRiskText(risk) {
        const riskMap = {
            'recurrent_issues': 'Повторные обращения',
            'frequent_accidents': 'Частые аварии',
            'overdue_work': 'Просроченные работы'
        };
        return riskMap[risk] || risk;
    }
    
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? 'var(--accent-teal)' : 'var(--warning-red)'};
            color: white;
            border-radius: var(--border-radius-sm);
            box-shadow: var(--shadow-md);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
        
        // Добавляем CSS анимации
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
    }
    
    // Функции для других секций (заглушки)
    function getProfileHTML() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">Профиль управляющей компании</div>
                    <button class="btn btn-primary" id="editProfileBtn">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                </div>
                <div style="padding: 24px;">
                    <h3 style="margin-bottom: 20px;">${crmData.currentCompany.legalName}</h3>
                    
                    <div class="form-row mb-3">
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">ИНН</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.inn}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">ОГРН</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.ogrn}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Форма</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.form}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Регион</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.region}</div>
                        </div>
                    </div>
                    
                    <h4 style="margin: 24px 0 16px 0;">Контактная информация</h4>
                    <div class="form-row">
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Диспетчерская</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.contacts.dispatcher}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Аварийная служба</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.contacts.emergency}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Бухгалтерия</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.contacts.accounting}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Приём граждан</div>
                            <div style="font-weight: 600;">${crmData.currentCompany.contacts.reception}</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 16px;">
                        <div style="color: var(--text-light); font-size: 14px; margin-bottom: 4px;">Часы работы</div>
                        <div style="font-weight: 600;">${crmData.currentCompany.contacts.hours}</div>
                    </div>
                    
                    <h4 style="margin: 24px 0 16px 0;">Документы</h4>
                    <div id="company-documents">
                        ${crmData.currentCompany.licenses.map((license, index) => `
                            <div class="d-flex justify-between align-center mb-2 p-2" style="background-color: var(--bg-light); border-radius: var(--border-radius-sm);">
                                <div>
                                    <i class="fas fa-file-alt" style="margin-right: 8px; color: var(--primary-blue);"></i>
                                    ${license}
                                </div>
                                <button class="btn btn-secondary btn-sm">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    function initProfile() {
        // Инициализация профиля
        const editBtn = document.getElementById('editProfileBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                showNotification('Редактирование профиля доступно в расширенной версии', 'info');
            });
        }
    }
    
    // Функции для остальных секций...
    function getBuildingsHTML() {
        return `
            <div class="table-container">
                <div class="table-header">
                    <div class="table-title">Дома под управлением</div>
                    <div class="table-actions">
                        <button class="btn btn-primary" id="addBuildingBtn2">
                            <i class="fas fa-plus"></i> Добавить дом
                        </button>
                        <button class="btn btn-secondary">Экспорт</button>
                    </div>
                </div>
                <table id="buildings-table">
                    <thead>
                        <tr>
                            <th>Адрес</th>
                            <th>Подъезды</th>
                            <th>Квартиры</th>
                            <th>Площадь</th>
                            <th>Год постройки</th>
                            <th>Риски</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody id="buildings-table-body">
                    </tbody>
                </table>
            </div>
        `;
    }
    
    function initBuildings() {
        const tableBody = document.getElementById('buildings-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        crmData.buildings.forEach(building => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${building.address}</strong></td>
                <td>${building.floors}</td>
                <td>${building.apartments}</td>
                <td>${building.totalArea || '—'}</td>
                <td>${building.yearBuilt || '—'}</td>
                <td>
                    ${building.risks && building.risks.length > 0 ? 
                        `<span class="risk-flag">${building.risks.length} риска</span>` : 
                        '<span class="text-muted">Нет</span>'}
                </td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="viewBuilding(${building.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="editBuilding(${building.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Добавляем обработчик для кнопки добавления
        const addBtn = document.getElementById('addBuildingBtn2');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                document.getElementById('buildingModal').classList.add('active');
            });
        }
    }
    
    // Глобальные функции для использования в HTML
    window.viewBuilding = function(buildingId) {
        showNotification(`Просмотр дома ID: ${buildingId} (доступно в расширенной версии)`, 'info');
    };
    
    window.editBuilding = function(buildingId) {
        showNotification(`Редактирование дома ID: ${buildingId} (доступно в расширенной версии)`, 'info');
    };
    
    window.filterPayments = function() {
        showNotification('Фильтрация платежей (доступно в расширенной версии)', 'info');
    };
    
    window.sortPayments = function() {
        showNotification('Сортировка платежей (доступно в расширенной версии)', 'info');
    };
    
    // Добавляем обработчик для кнопки "Добавить платеж" в секции платежей
    function initPayments() {
        const addPaymentBtn = document.getElementById('addPaymentBtn');
        if (addPaymentBtn) {
            addPaymentBtn.addEventListener('click', () => {
                document.getElementById('paymentModal').classList.add('active');
            });
        }
    }
});
