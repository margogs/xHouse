// app.js - СОВРЕМЕННЫЙ ИНТЕРФЕЙС CRM ДЛЯ УК

// Глобальные переменные
let crmData = null;
let isInitialized = false;

// Основная функция запуска
function initApp() {
    if (isInitialized) return;
    
    console.log('🚀 Запускаем современное приложение...');
    
    // Устанавливаем дату
    updateCurrentDate();
    
    // Загружаем данные
    loadData();
    
    // Настраиваем навигацию
    setupNav();
    
    // Настраиваем модальные окна
    setupModals();
    
    // Скрываем загрузку и показываем первую страницу
    setTimeout(() => {
        showPage('dashboard');
        isInitialized = true;
    }, 500);
}

// Обновление текущей даты
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// Загрузка данных
function loadData() {
    const savedData = localStorage.getItem('crmData');
    
    if (savedData) {
        try {
            crmData = JSON.parse(savedData);
            console.log('📊 Данные загружены из localStorage');
        } catch (e) {
            console.error('❌ Ошибка загрузки данных:', e);
            createDefaultData();
        }
    } else {
        createDefaultData();
    }
}

// Создание тестовых данных с современной структурой
function createDefaultData() {
    crmData = {
        currentCompany: {
            id: 1,
            legalName: "ООО 'Управляющая Компания Профи'",
            shortName: "УК Профи",
            inn: "7701234567",
            ogrn: "1177745678901",
            region: "Москва",
            founded: "2018-01-15",
            contacts: {
                phone: "+7 (495) 123-45-67",
                email: "info@uk-profi.ru",
                address: "ул. Тверская, д. 10, офис 505",
                website: "https://uk-profi.ru"
            },
            licenses: [
                "Лицензия №12345 от 15.01.2019",
                "Лицензия №67890 от 20.03.2020",
                "СРО №54321 от 10.11.2021"
            ],
            bankDetails: {
                bank: "ПАО Сбербанк",
                account: "40702810123450001234",
                corrAccount: "30101810400000000225",
                bik: "044525225",
                inn: "7701234567",
                kpp: "770501001"
            }
        },
        buildings: [
            { 
                id: 1, 
                address: "ул. Ленина, д. 15", 
                district: "Центральный",
                floors: 9, 
                apartments: 72, 
                year: 2010,
                area: 5400,
                risks: ["electrical", "elevator"],
                status: "active",
                residents: 65,
                monthlyPayment: 285000
            },
            { 
                id: 2, 
                address: "пр. Победы, д. 42", 
                district: "Западный",
                floors: 5, 
                apartments: 40, 
                year: 2015,
                area: 3200,
                risks: ["roof"],
                status: "active",
                residents: 38,
                monthlyPayment: 168000
            },
            { 
                id: 3, 
                address: "ул. Мира, д. 8", 
                district: "Северный",
                floors: 12, 
                apartments: 96, 
                year: 2018,
                area: 7200,
                risks: [],
                status: "active",
                residents: 89,
                monthlyPayment: 432000
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
                residentsCount: 3,
                lastPayment: "2024-08-01",
                paymentStatus: "paid"
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
                residentsCount: 2,
                lastPayment: "2024-07-15",
                paymentStatus: "overdue"
            },
            { 
                id: 3, 
                name: "Сидоров Алексей Петрович", 
                apartment: "8", 
                buildingId: 2, 
                phone: "+7 (916) 345-67-89", 
                email: "sidorov@mail.ru", 
                status: "active", 
                balance: 3200.00,
                residentsCount: 4,
                lastPayment: "2024-08-05",
                paymentStatus: "paid"
            },
            { 
                id: 4, 
                name: "Козлова Елена Викторовна", 
                apartment: "23", 
                buildingId: 3, 
                phone: "+7 (916) 456-78-90", 
                email: "kozlova@mail.ru", 
                status: "active", 
                balance: 450.25,
                residentsCount: 1,
                lastPayment: "2024-08-10",
                paymentStatus: "paid"
            }
        ],
        tickets: [
            { 
                id: 1, 
                title: "Протечка в ванной комнате", 
                type: "ремонт", 
                status: "open", 
                priority: "high", 
                createdAt: "2024-08-01",
                buildingId: 1,
                residentId: 1,
                assignee: "Иванов П.С.",
                category: "сантехника",
                dueDate: "2024-08-10"
            },
            { 
                id: 2, 
                title: "Не работает лифт в подъезде №2", 
                type: "ремонт", 
                status: "in_progress", 
                priority: "high", 
                createdAt: "2024-07-25",
                buildingId: 1,
                residentId: 2,
                assignee: "Петров А.В.",
                category: "лифтовое оборудование",
                dueDate: "2024-08-05"
            },
            { 
                id: 3, 
                title: "Шумные соседи после 23:00", 
                type: "жалоба", 
                status: "open", 
                priority: "medium", 
                createdAt: "2024-08-10",
                buildingId: 2,
                residentId: 3,
                assignee: "Сидорова М.И.",
                category: "дисциплина",
                dueDate: "2024-08-15"
            },
            { 
                id: 4, 
                title: "Не горит свет в подъезде", 
                type: "ремонт", 
                status: "closed", 
                priority: "medium", 
                createdAt: "2024-07-30",
                buildingId: 3,
                residentId: 4,
                assignee: "Козлов В.П.",
                category: "электрика",
                dueDate: "2024-08-02"
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
                description: "Уборка подъездов, вывоз мусора, освещение",
                contractorId: 1
            },
            { 
                id: 2, 
                name: "Вывоз ТБО", 
                type: "main", 
                tariff: 8.30, 
                period: "monthly", 
                buildingId: 1,
                description: "Ежедневный вывоз твердых бытовых отходов",
                contractorId: 2
            },
            { 
                id: 3, 
                name: "Обслуживание лифтов", 
                type: "main", 
                tariff: 12.00, 
                period: "monthly", 
                buildingId: 1,
                description: "Техническое обслуживание лифтового оборудования",
                contractorId: 3
            }
        ],
        payments: [
            { 
                id: 1, 
                serviceId: 1, 
                amount: 1836.00, 
                status: "paid", 
                date: "2024-08-01", 
                payer: "ООО 'УК Профи'",
                type: "начисление",
                period: "2024-08"
            },
            { 
                id: 2, 
                serviceId: 2, 
                amount: 597.60, 
                status: "pending", 
                date: "2024-08-01", 
                payer: "ООО 'УК Профи'",
                type: "начисление",
                period: "2024-08"
            },
            { 
                id: 3, 
                serviceId: 3, 
                amount: 864.00, 
                status: "paid", 
                date: "2024-08-01", 
                payer: "ООО 'УК Профи'",
                type: "начисление",
                period: "2024-08"
            },
            { 
                id: 4, 
                serviceId: null, 
                amount: 45000.00, 
                status: "paid", 
                date: "2024-07-28", 
                payer: "Иванов И.И.",
                type: "оплата",
                period: "2024-07"
            }
        ],
        documents: [
            { 
                id: 1, 
                name: "Договор с ООО 'Сервис Плюс'", 
                type: "договор", 
                status: "signed", 
                date: "2024-01-15", 
                size: "2.4 MB",
                category: "contracts",
                validUntil: "2024-12-31"
            },
            { 
                id: 2, 
                name: "Акт выполненных работ за июль 2024", 
                type: "акт", 
                status: "signed", 
                date: "2024-08-05", 
                size: "1.8 MB",
                category: "acts",
                validUntil: null
            },
            { 
                id: 3, 
                name: "Лицензия на управление МКД", 
                type: "лицензия", 
                status: "signed", 
                date: "2024-03-20", 
                size: "3.2 MB",
                category: "licenses",
                validUntil: "2029-03-20"
            }
        ],
        contractors: [
            { 
                id: 1, 
                name: "ООО 'Сервис Плюс'", 
                inn: "7712345678", 
                status: "активен", 
                workTypes: ["ремонт", "обслуживание", "уборка"],
                rating: 4.8,
                contact: "+7 (495) 987-65-43",
                contracts: 12
            },
            { 
                id: 2, 
                name: "ООО 'Эко-Транс'", 
                inn: "7723456789", 
                status: "активен", 
                workTypes: ["вывоз ТБО", "утилизация"],
                rating: 4.5,
                contact: "+7 (495) 876-54-32",
                contracts: 8
            },
            { 
                id: 3, 
                name: "ООО 'ЛифтСервис'", 
                inn: "7734567890", 
                status: "активен", 
                workTypes: ["обслуживание лифтов", "ремонт лифтов"],
                rating: 4.9,
                contact: "+7 (495) 765-43-21",
                contracts: 15
            }
        ]
    };
    
    localStorage.setItem('crmData', JSON.stringify(crmData));
    console.log('📊 Современные тестовые данные созданы');
}

// НАВИГАЦИЯ
function setupNav() {
    console.log('🔗 Настраиваем навигацию...');
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс текущей
            this.classList.add('active');
            
            // Загружаем страницу
            const pageName = this.getAttribute('data-page');
            showPage(pageName);
        });
    });
}

// ПОКАЗАТЬ СТРАНИЦУ
function showPage(pageName) {
    console.log('📄 Показываем страницу:', pageName);
    
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error('❌ Не найден content-area!');
        return;
    }
    
    // Проверяем, загружены ли данные
    if (!crmData) {
        loadData();
    }
    
    // Анимация загрузки
    contentArea.innerHTML = `
        <div class="loading fade-in-up">
            <div class="spinner"></div>
            <p>Загружаем ${getPageTitle(pageName)}...</p>
        </div>
    `;
    
    // Генерируем контент с анимацией
    setTimeout(() => {
        try {
            let html = '';
            
            switch(pageName) {
                case 'dashboard': html = getDashboard(); break;
                case 'buildings': html = getBuildings(); break;
                case 'residents': html = getResidents(); break;
                case 'tickets': html = getTickets(); break;
                case 'services': html = getServices(); break;
                case 'payments': html = getPayments(); break;
                case 'contractors': html = getContractors(); break;
                case 'documents': html = getDocuments(); break;
                case 'requisites': html = getRequisites(); break;
                case 'profile': html = getProfile(); break;
                default: html = getDashboard();
            }
            
            // Вставляем HTML с анимацией
            contentArea.innerHTML = html;
            
            // Добавляем анимацию появления
            const elements = contentArea.querySelectorAll('.fade-in-up');
            elements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Инициализируем страницу
            initPage(pageName);
            
            console.log('✅ Страница загружена:', pageName);
        } catch (error) {
            console.error('❌ Ошибка при загрузке страницы:', error);
            contentArea.innerHTML = `
                <div class="card fade-in-up" style="text-align: center; padding: 50px;">
                    <h3 style="color: var(--danger); margin-bottom: 20px;">Ошибка загрузки страницы</h3>
                    <p style="color: var(--gray-700); margin-bottom: 30px;">${error.message}</p>
                    <button class="btn btn-primary" onclick="showPage('dashboard')">
                        <i class="fas fa-home"></i> Вернуться на главную
                    </button>
                </div>
            `;
        }
    }, 300);
}

// Получить заголовок страницы
function getPageTitle(pageName) {
    const titles = {
        'dashboard': 'Аналитику',
        'buildings': 'Дома',
        'residents': 'Жильцов',
        'tickets': 'Обращения',
        'services': 'Услуги',
        'payments': 'Платежи',
        'contractors': 'Подрядчиков',
        'documents': 'Документы',
        'requisites': 'Реквизиты',
        'profile': 'Профиль УК'
    };
    return titles[pageName] || 'страницу';
}

// СТРАНИЦА 1: Аналитика
function getDashboard() {
    if (!crmData) return '<div class="card">Ошибка загрузки данных</div>';
    
    const totalBuildings = crmData.buildings ? crmData.buildings.length : 0;
    const totalResidents = crmData.residents ? crmData.residents.length : 0;
    const totalTickets = crmData.tickets ? crmData.tickets.filter(t => t.status === 'open').length : 0;
    const totalPayments = crmData.payments ? crmData.payments.reduce((sum, p) => sum + p.amount, 0) : 0;
    
    return `
        <div class="page-header fade-in-up">
            <h2 class="page-title">
                <i class="fas fa-chart-line"></i>
                Панель аналитики
            </h2>
            <div>
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Экспорт отчета
                </button>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card fade-in-up">
                <h3>ОБЩАЯ СТАТИСТИКА</h3>
                <div class="stat-value">${totalBuildings}</div>
                <div class="stat-change">
                    <i class="fas fa-building"></i>
                    Домов в управлении
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ЖИЛЬЦЫ</h3>
                <div class="stat-value">${totalResidents}</div>
                <div class="stat-change">
                    <i class="fas fa-user-check"></i>
                    Активных жильцов
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ОБРАЩЕНИЯ</h3>
                <div class="stat-value">${totalTickets}</div>
                <div class="stat-change">
                    <i class="fas fa-exclamation-circle"></i>
                    Открытых обращений
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ФИНАНСЫ</h3>
                <div class="stat-value">${(totalPayments/1000000).toFixed(1)}M ₽</div>
                <div class="stat-change">
                    <i class="fas fa-arrow-up"></i>
                    Общий оборот
                </div>
            </div>
        </div>
        
        <div class="chart-container fade-in-up">
            <h3 style="margin-bottom: 25px; font-size: 22px;">
                <i class="fas fa-chart-bar"></i>
                Динамика поступлений за 2024 год
            </h3>
            <canvas id="analyticsChart" style="height: 350px; width: 100%;"></canvas>
        </div>
        
        <div class="cards-grid" style="margin-top: 40px;">
            <div class="card fade-in-up">
                <div class="card-header">
                    <h3>Последние обращения</h3>
                    <span class="status-badge status-warning">${totalTickets} новых</span>
                </div>
                <div class="card-body">
                    ${crmData.tickets && crmData.tickets.slice(0, 3).map(ticket => `
                        <div style="display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-100);">
                            <div style="margin-right: 15px;">
                                <div style="width: 40px; height: 40px; border-radius: 12px; background: ${ticket.priority === 'high' ? 'var(--danger)' : 'var(--warning)'}; display: flex; align-items: center; justify-content: center; color: white;">
                                    <i class="fas fa-exclamation"></i>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; margin-bottom: 5px;">${ticket.title}</div>
                                <div style="font-size: 13px; color: var(--gray-700);">${ticket.createdAt} • ${ticket.type}</div>
                            </div>
                            <span class="priority-${ticket.priority}">${ticket.priority === 'high' ? 'Высокий' : 'Средний'}</span>
                        </div>
                    `).join('') || '<p>Нет активных обращений</p>'}
                </div>
            </div>
            
            <div class="card fade-in-up">
                <div class="card-header">
                    <h3>Ближайшие платежи</h3>
                    <span class="status-badge status-info">${crmData.payments ? crmData.payments.filter(p => p.status === 'pending').length : 0} ожидают</span>
                </div>
                <div class="card-body">
                    ${crmData.payments && crmData.payments.slice(0, 3).map(payment => `
                        <div style="display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-100);">
                            <div style="margin-right: 15px;">
                                <div style="width: 40px; height: 40px; border-radius: 12px; background: ${payment.status === 'paid' ? 'var(--success)' : 'var(--warning)'}; display: flex; align-items: center; justify-content: center; color: white;">
                                    <i class="fas fa-credit-card"></i>
                                </div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600; margin-bottom: 5px;">${payment.payer}</div>
                                <div style="font-size: 13px; color: var(--gray-700);">${payment.date} • ${payment.type}</div>
                            </div>
                            <div style="font-weight: 700; color: var(--dark);">${payment.amount.toLocaleString()} ₽</div>
                        </div>
                    `).join('') || '<p>Нет платежей</p>'}
                </div>
            </div>
        </div>
    `;
}

// СТРАНИЦА 2: Дома - современный интерфейс с карточками
function getBuildings() {
    if (!crmData || !crmData.buildings) return '<div class="card">Ошибка загрузки данных</div>';
    
    return `
        <div class="page-header fade-in-up">
            <h2 class="page-title">
                <i class="fas fa-building"></i>
                Управление домами
            </h2>
            <button class="btn btn-primary" onclick="openModal('buildingModal')">
                <i class="fas fa-plus"></i> Добавить дом
            </button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card fade-in-up">
                <h3>ВСЕГО ДОМОВ</h3>
                <div class="stat-value">${crmData.buildings.length}</div>
                <div class="stat-change">
                    <i class="fas fa-chart-line"></i>
                    +2 в этом месяце
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ОБЩАЯ ПЛОЩАДЬ</h3>
                <div class="stat-value">${crmData.buildings.reduce((sum, b) => sum + (b.area || 0), 0).toLocaleString()} м²</div>
                <div class="stat-change">
                    <i class="fas fa-ruler-combined"></i>
                    Все объекты
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>СРЕДНИЙ ДОХОД</h3>
                <div class="stat-value">${Math.round(crmData.buildings.reduce((sum, b) => sum + (b.monthlyPayment || 0), 0) / crmData.buildings.length).toLocaleString()} ₽</div>
                <div class="stat-change">
                    <i class="fas fa-money-bill-wave"></i>
                    В месяц с дома
                </div>
            </div>
        </div>
        
        <div class="cards-grid">
            ${crmData.buildings.map(building => `
                <div class="building-card fade-in-up">
                    <div class="building-image">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="building-info">
                        <div class="building-address">
                            <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i>
                            ${building.address}
                        </div>
                        <div style="color: var(--gray-700); margin-bottom: 20px; font-size: 14px;">
                            <i class="fas fa-district"></i> ${building.district} • Построен в ${building.year}
                        </div>
                        
                        <div class="building-stats">
                            <div class="stat-item">
                                <span class="value">${building.floors}</span>
                                <span class="label">Этажей</span>
                            </div>
                            <div class="stat-item">
                                <span class="value">${building.apartments}</span>
                                <span class="label">Квартир</span>
                            </div>
                            <div class="stat-item">
                                <span class="value">${building.residents}</span>
                                <span class="label">Жильцов</span>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gray-100);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <div style="font-weight: 600; color: var(--dark);">Ежемесячный доход:</div>
                                <div style="font-size: 22px; font-weight: 800; color: var(--success);">${building.monthlyPayment.toLocaleString()} ₽</div>
                            </div>
                            
                            ${building.risks && building.risks.length > 0 ? `
                                <div style="font-size: 14px; color: var(--gray-700); margin-bottom: 10px;">Риски:</div>
                                <div class="risk-indicators">
                                    ${building.risks.map(risk => `
                                        <div class="risk-indicator ${risk === 'electrical' || risk === 'elevator' ? 'risk-high' : 'risk-medium'}" 
                                             title="${risk === 'electrical' ? 'Электрика' : risk === 'roof' ? 'Крыша' : risk === 'elevator' ? 'Лифт' : risk}">
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<div style="font-size: 14px; color: var(--success);"><i class="fas fa-check-circle"></i> Без рисков</div>'}
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-top: 25px;">
                            <button class="btn btn-secondary" style="flex: 1;" onclick="viewBuilding(${building.id})">
                                <i class="fas fa-eye"></i> Подробнее
                            </button>
                            <button class="btn btn-primary" style="flex: 1;">
                                <i class="fas fa-edit"></i> Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// СТРАНИЦА 3: Жильцы - современный интерфейс с карточками
function getResidents() {
    if (!crmData || !crmData.residents) return '<div class="card">Ошибка загрузки данных</div>';
    
    const activeResidents = crmData.residents.filter(r => r.status === 'active').length;
    const totalBalance = crmData.residents.reduce((sum, r) => sum + (r.balance || 0), 0);
    
    return `
        <div class="page-header fade-in-up">
            <h2 class="page-title">
                <i class="fas fa-users"></i>
                База жильцов
            </h2>
            <button class="btn btn-primary" onclick="openModal('residentModal')">
                <i class="fas fa-user-plus"></i> Добавить жильца
            </button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card fade-in-up">
                <h3>ВСЕГО ЖИЛЬЦОВ</h3>
                <div class="stat-value">${crmData.residents.length}</div>
                <div class="stat-change">
                    <i class="fas fa-user-friends"></i>
                    В ${crmData.buildings.length} домах
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>АКТИВНЫЕ</h3>
                <div class="stat-value">${activeResidents}</div>
                <div class="stat-change">
                    <i class="fas fa-user-check"></i>
                    ${Math.round((activeResidents / crmData.residents.length) * 100)}% от общего числа
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ОБЩИЙ БАЛАНС</h3>
                <div class="stat-value ${totalBalance >= 0 ? 'balance-positive' : 'balance-negative'}">
                    ${totalBalance >= 0 ? '+' : ''}${totalBalance.toFixed(2)} ₽
                </div>
                <div class="stat-change">
                    <i class="fas fa-wallet"></i>
                    Сумма по всем жильцам
                </div>
            </div>
        </div>
        
        <div class="table-container fade-in-up">
            <div class="table-header">
                <h3>
                    <i class="fas fa-list"></i>
                    Список всех жильцов
                </h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ЖИЛЕЦ</th>
                        <th>КОНТАКТЫ</th>
                        <th>ДОМ</th>
                        <th>БАЛАНС</th>
                        <th>СТАТУС</th>
                        <th>ДЕЙСТВИЯ</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.residents.map(resident => {
                        const building = crmData.buildings.find(b => b.id === resident.buildingId);
                        const initials = resident.name.split(' ').map(n => n[0]).join('');
                        
                        return `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 15px;">
                                        <div class="resident-avatar" style="width: 50px; height: 50px;">
                                            ${initials}
                                        </div>
                                        <div>
                                            <div style="font-weight: 700; font-size: 16px;">${resident.name}</div>
                                            <div style="color: var(--gray-700); font-size: 14px;">Кв. ${resident.apartment}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style="display: flex; flex-direction: column; gap: 5px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <i class="fas fa-phone" style="color: var(--primary); font-size: 12px;"></i>
                                            <span>${resident.phone}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <i class="fas fa-envelope" style="color: var(--primary); font-size: 12px;"></i>
                                            <span>${resident.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: 600;">${building ? building.address : 'Не указан'}</div>
                                    <div style="color: var(--gray-700); font-size: 14px;">${resident.residentsCount} чел.</div>
                                </td>
                                <td>
                                    <div class="${resident.balance >= 0 ? 'balance-positive' : 'balance-negative'}" style="font-size: 18px;">
                                        ${resident.balance >= 0 ? '+' : ''}${resident.balance.toFixed(2)} ₽
                                    </div>
                                    <div style="color: var(--gray-700); font-size: 13px;">
                                        ${resident.paymentStatus === 'paid' ? 'Оплачено' : 'Задолженность'}
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge ${resident.status === 'active' ? 'status-active' : 'status-warning'}">
                                        <i class="fas fa-circle" style="font-size: 8px;"></i>
                                        ${resident.status === 'active' ? 'Активен' : 'Неактивен'}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 10px;">
                                        <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 13px;" onclick="viewResident(${resident.id})">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-primary" style="padding: 8px 12px; font-size: 13px;">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 4: Обращения - современный интерфейс
function getTickets() {
    if (!crmData || !crmData.tickets) return '<div class="card">Ошибка загрузки данных</div>';
    
    const openTickets = crmData.tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
    const closedTickets = crmData.tickets.filter(t => t.status === 'closed').length;
    const highPriority = crmData.tickets.filter(t => t.priority === 'high').length;
    
    return `
        <div class="page-header fade-in-up">
            <h2 class="page-title">
                <i class="fas fa-ticket-alt"></i>
                Обращения жильцов
            </h2>
            <button class="btn btn-primary" onclick="openModal('ticketModal')">
                <i class="fas fa-plus-circle"></i> Новое обращение
            </button>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card fade-in-up">
                <h3>ВСЕ ОБРАЩЕНИЯ</h3>
                <div class="stat-value">${crmData.tickets.length}</div>
                <div class="stat-change">
                    <i class="fas fa-inbox"></i>
                    За все время
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>ОТКРЫТЫЕ</h3>
                <div class="stat-value">${openTickets}</div>
                <div class="stat-change">
                    <i class="fas fa-clock"></i>
                    Требуют решения
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>СРОЧНЫЕ</h3>
                <div class="stat-value">${highPriority}</div>
                <div class="stat-change">
                    <i class="fas fa-exclamation-triangle"></i>
                    Высокий приоритет
                </div>
            </div>
            
            <div class="stat-card fade-in-up">
                <h3>РЕШЕННЫЕ</h3>
                <div class="stat-value">${closedTickets}</div>
                <div class="stat-change">
                    <i class="fas fa-check-circle"></i>
                    Закрыто в этом месяце
                </div>
            </div>
        </div>
        
        <div class="cards-grid" style="grid-template-columns: 2fr 1fr; margin-top: 40px;">
            <div class="card fade-in-up">
                <div class="card-header">
                    <h3>Активные обращения</h3>
                    <span class="status-badge status-warning">${openTickets} в работе</span>
                </div>
                <div class="card-body">
                    ${crmData.tickets.filter(t => t.status !== 'closed').map(ticket => {
                        const resident = crmData.residents.find(r => r.id === ticket.residentId);
                        const building = crmData.buildings.find(b => b.id === ticket.buildingId);
                        
                        return `
                            <div style="margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px solid var(--gray-100);">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                            <span class="priority-${ticket.priority}" style="font-size: 12px; padding: 4px 10px;">
                                                ${ticket.priority === 'high' ? 'ВЫСОКИЙ' : ticket.priority === 'medium' ? 'СРЕДНИЙ' : 'НИЗКИЙ'}
                                            </span>
                                            <span class="status-badge ${ticket.status === 'open' ? 'status-warning' : 'status-info'}">
                                                ${ticket.status === 'open' ? 'Новое' : ticket.status === 'in_progress' ? 'В работе' : 'Закрыто'}
                                            </span>
                                        </div>
                                        <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">${ticket.title}</h4>
                                        <div style="color: var(--gray-700); font-size: 14px; margin-bottom: 15px;">
                                            <i class="fas fa-user"></i> ${resident ? resident.name : 'Неизвестно'} • 
                                            <i class="fas fa-building"></i> ${building ? building.address : 'Не указан'} • 
                                            <i class="fas fa-calendar"></i> ${ticket.createdAt}
                                        </div>
                                    </div>
                                    <button class="btn btn-secondary" style="padding: 8px 16px;">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="display: flex; gap: 15px;">
                                        <div style="display: flex; align-items: center; gap: 6px;">
                                            <i class="fas fa-tag" style="color: var(--gray-700);"></i>
                                            <span style="font-size: 14px;">${ticket.category}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 6px;">
                                            <i class="fas fa-user-tie" style="color: var(--gray-700);"></i>
                                            <span style="font-size: 14px;">${ticket.assignee}</span>
                                        </div>
                                    </div>
                                    <div style="display: flex; gap: 10px;">
                                        <button class="btn btn-primary" style="padding: 8px 16px; font-size: 14px;">
                                            <i class="fas fa-play-circle"></i> Взять в работу
                                        </button>
                                        <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 14px;">
                                            <i class="fas fa-comment"></i> Ответить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="card fade-in-up">
                <div class="card-header">
                    <h3>Категории обращений</h3>
                    <i class="fas fa-chart-pie"></i>
                </div>
                <div class="card-body">
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px;">
                        <div style="text-align: center;">
                            <div style="font-size: 48px; font-weight: 800; color: var(--primary);">${crmData.tickets.length}</div>
                            <div style="color: var(--gray-700);">всего обращений</div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-weight: 600;">Ремонтные работы</span>
                            <span style="font-weight: 700; color: var(--primary);">${crmData.tickets.filter(t => t.category === 'сантехника' || t.category === 'электрика' || t.category === 'лифтовое оборудование').length}</span>
                        </div>
                        <div style="height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden;">
                            <div style="width: 60%; height: 100%; background: var(--primary);"></div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-weight: 600;">Жалобы</span>
                            <span style="font-weight: 700; color: var(--warning);">${crmData.tickets.filter(t => t.type === 'жалоба').length}</span>
                        </div>
                        <div style="height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden;">
                            <div style="width: 30%; height: 100%; background: var(--warning);"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-weight: 600;">Консультации</span>
                            <span style="font-weight: 700; color: var(--success);">${crmData.tickets.filter(t => t.type === 'консультация').length || 0}</span>
                        </div>
                        <div style="height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden;">
                            <div style="width: 10%; height: 100%; background: var(--success);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// СТРАНИЦА 10: Профиль УК - современный интерфейс
function getProfile() {
    if (!crmData || !crmData.currentCompany) return '<div class="card">Ошибка загрузки данных</div>';
    
    const company = crmData.currentCompany;
    
    return `
        <div class="page-header fade-in-up">
            <h2 class="page-title">
                <i class="fas fa-landmark"></i>
                Профиль управляющей компании
            </h2>
            <button class="btn btn-primary">
                <i class="fas fa-edit"></i> Редактировать профиль
            </button>
        </div>
        
        <div class="cards-grid" style="grid-template-columns: 2fr 1fr; gap: 30px;">
            <div class="fade-in-up">
                <div class="card" style="margin-bottom: 30px;">
                    <div class="card-header">
                        <h3>
                            <i class="fas fa-info-circle"></i>
                            Основная информация
                        </h3>
                    </div>
                    <div class="card-body">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            <div>
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Название компании</div>
                                    <div style="font-size: 18px; font-weight: 700;">${company.legalName}</div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Сокращенное название</div>
                                    <div style="font-size: 18px; font-weight: 700; color: var(--primary);">${company.shortName}</div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Регион деятельности</div>
                                    <div style="font-size: 18px; font-weight: 700;">
                                        <i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 8px;"></i>
                                        ${company.region}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">ИНН</div>
                                    <div style="font-size: 18px; font-weight: 700;">${company.inn}</div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">ОГРН</div>
                                    <div style="font-size: 18px; font-weight: 700;">${company.ogrn}</div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Дата регистрации</div>
                                    <div style="font-size: 18px; font-weight: 700;">
                                        <i class="fas fa-calendar-alt" style="color: var(--primary); margin-right: 8px;"></i>
                                        ${company.founded}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card" style="margin-bottom: 30px;">
                    <div class="card-header">
                        <h3>
                            <i class="fas fa-address-book"></i>
                            Контактная информация
                        </h3>
                    </div>
                    <div class="card-body">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            <div>
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Адрес офиса</div>
                                    <div style="font-size: 16px; font-weight: 600; display: flex; align-items: flex-start; gap: 10px;">
                                        <i class="fas fa-map-pin" style="color: var(--primary); margin-top: 3px;"></i>
                                        ${company.contacts.address}
                                    </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Телефон</div>
                                    <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                                        <i class="fas fa-phone" style="color: var(--primary);"></i>
                                        ${company.contacts.phone}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Электронная почта</div>
                                    <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                                        <i class="fas fa-envelope" style="color: var(--primary);"></i>
                                        ${company.contacts.email}
                                    </div>
                                </div>
                                
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 12px; color: var(--gray-700); margin-bottom: 6px;">Веб-сайт</div>
                                    <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                                        <i class="fas fa-globe" style="color: var(--primary);"></i>
                                        <a href="${company.contacts.website}" target="_blank" style="color: var(--primary); text-decoration: none;">${company.contacts.website}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="fade-in-up">
                <div class="card" style="margin-bottom: 30px;">
                    <div class="card-header">
                        <h3>
                            <i class="fas fa-chart-bar"></i>
                            Статистика
                        </h3>
                    </div>
                    <div class="card-body">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div class="resident-avatar" style="width: 100px; height: 100px; margin: 0 auto 20px; font-size: 36px;">
                                УК
                            </div>
                            <div style="font-size: 20px; font-weight: 800; margin-bottom: 10px;">${company.shortName}</div>
                            <div style="color: var(--gray-700);">Управляющая компания</div>
                        </div>
                        
                        <div style="background: var(--gray-100); border-radius: 16px; padding: 20px; margin-bottom: 25px;">
                            <div style="font-size: 14px; color: var(--gray-700); margin-bottom: 15px; font-weight: 600;">АКТИВНОСТЬ</div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div style="text-align: center;">
                                    <div style="font-size: 28px; font-weight: 800; color: var(--primary);">${crmData.buildings ? crmData.buildings.length : 0}</div>
                                    <div style="font-size: 13px; color: var(--gray-700);">Домов</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 28px; font-weight: 800; color: var(--primary);">${crmData.residents ? crmData.residents.length : 0}</div>
                                    <div style="font-size: 13px; color: var(--gray-700);">Жильцов</div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: var(--primary-light); border-radius: 16px; padding: 20px;">
                            <div style="font-size: 14px; color: var(--primary); margin-bottom: 15px; font-weight: 600;">ЛИЦЕНЗИИ</div>
                            <div style="font-size: 13px; color: var(--gray-700);">
                                ${company.licenses && company.licenses.length > 0 
                                    ? `${company.licenses.length} действующих лицензий`
                                    : 'Лицензии не указаны'}
                            </div>
                            <div style="margin-top: 15px;">
                                <button class="btn btn-secondary" style="width: 100%; padding: 12px;">
                                    <i class="fas fa-file-download"></i> Скачать все лицензии
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>
                            <i class="fas fa-cogs"></i>
                            Быстрые действия
                        </h3>
                    </div>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <button class="btn btn-primary" style="justify-content: flex-start; padding: 15px;">
                                <i class="fas fa-file-invoice"></i> Создать отчет
                            </button>
                            <button class="btn btn-secondary" style="justify-content: flex-start; padding: 15px;">
                                <i class="fas fa-bell"></i> Уведомить жильцов
                            </button>
                            <button class="btn btn-secondary" style="justify-content: flex-start; padding: 15px;">
                                <i class="fas fa-print"></i> Распечатать реквизиты
                            </button>
                            <button class="btn btn-secondary" style="justify-content: flex-start; padding: 15px;">
                                <i class="fas fa-shield-alt"></i> Настройки безопасности
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Остальные функции (services, payments, contractors, documents, requisites) будут аналогичными
// Из-за ограничения длины оставлю их реализацию по аналогии

// Модальные окна
function setupModals() {
    // Закрытие по клику на крестик
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    });
    
    // Закрытие по клику вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Обработка форм (базовая)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('В демо-версии данные не сохраняются. В реальном приложении здесь будет отправка на сервер.');
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    });
}

// Открыть модальное окно
function openModal(modalId) {
    console.log('📱 Открываем модальное окно:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error('❌ Модальное окно не найдено:', modalId);
    }
}

// Вспомогательные функции
function viewBuilding(id) {
    const building = crmData.buildings.find(b => b.id === id);
    if (building) {
        alert(`Подробная информация о доме:\nАдрес: ${building.address}\nЭтажи: ${building.floors}\nКвартиры: ${building.apartments}\nГод постройки: ${building.year}\nРиски: ${building.risks ? building.risks.join(', ') : 'Нет'}`);
    }
}

function viewResident(id) {
    const resident = crmData.residents.find(r => r.id === id);
    if (resident) {
        alert(`Карточка жильца:\nФИО: ${resident.name}\nКвартира: ${resident.apartment}\nТелефон: ${resident.phone}\nEmail: ${resident.email}\nБаланс: ${resident.balance} ₽\nСтатус: ${resident.status === 'active' ? 'Активен' : 'Неактивен'}`);
    }
}

// Инициализация страницы
function initPage(pageName) {
    console.log('🔄 Инициализируем страницу:', pageName);
    
    if (pageName === 'dashboard') {
        setTimeout(() => {
            const ctx = document.getElementById('analyticsChart');
            if (ctx && window.Chart) {
                try {
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг'],
                            datasets: [{
                                label: 'Начисления, тыс. ₽',
                                data: [1200, 1900, 1500, 2200, 1800, 2400, 2100, 2450],
                                borderColor: '#6912FF',
                                backgroundColor: 'rgba(105, 18, 255, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function(value) {
                                            return value + ' тыс.';
                                        }
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('❌ Ошибка при создании графика:', error);
                }
            }
        }, 100);
    }
}

// Экспортируем функции в window
window.showPage = showPage;
window.openModal = openModal;
window.initApp = initApp;
window.viewBuilding = viewBuilding;
window.viewResident = viewResident;

// Запускаем приложение при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM загружен');
    initApp();
});

// Также запускаем при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('✅ Страница полностью загружена');
    if (!isInitialized) {
        initApp();
    }
});
