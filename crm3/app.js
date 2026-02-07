// app.js - РАБОЧАЯ ВЕРСИЯ
// Все страницы точно открываются!

// Глобальные переменные
let crmData = null;

// Основная функция запуска
function initApp() {
    console.log('🚀 Запускаем приложение...');
    
    // Устанавливаем дату
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }

    // Загружаем данные
    loadData();
    
    // Настраиваем навигацию
    setupNav();
    
    // Настраиваем модальные окна
    setupModals();
    
    // Показываем первую страницу
    showPage('dashboard');
}

// Загрузка данных
function loadData() {
    const savedData = localStorage.getItem('crmData');
    
    if (savedData) {
        crmData = JSON.parse(savedData);
        console.log('📊 Данные загружены');
    } else {
        // Создаем тестовые данные
        crmData = {
            currentCompany: {
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
                { id: 1, address: "ул. Ленина, д. 15", floors: 9, apartments: 72, risks: ["electrical"] },
                { id: 2, address: "пр. Победы, д. 42", floors: 5, apartments: 40, risks: ["roof"] }
            ],
            residents: [
                { id: 1, name: "Иванов Иван Иванович", apartment: "15", buildingId: 1, phone: "+7 (916) 123-45-67", email: "ivanov@mail.ru", status: "active", balance: 1500.50 },
                { id: 2, name: "Петрова Мария Сергеевна", apartment: "42", buildingId: 1, phone: "+7 (916) 234-56-78", email: "petrova@mail.ru", status: "active", balance: -2300.75 }
            ],
            tickets: [
                { id: 1, title: "Протечка в ванной", type: "ремонт", status: "open", priority: "high", createdAt: "2024-08-01" }
            ],
            services: [
                { id: 1, name: "Содержание общего имущества", type: "main", tariff: 25.50, period: "monthly", buildingId: 1 }
            ],
            payments: [
                { id: 1, serviceId: 1, amount: 1836.00, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" }
            ],
            documents: [
                { id: 1, name: "Договор с ООО 'Сервис Плюс'", type: "договор", status: "signed", date: "2024-01-15", size: "2.4 MB" }
            ]
        };
        
        localStorage.setItem('crmData', JSON.stringify(crmData));
        console.log('📊 Тестовые данные созданы');
    }
}

// НАВИГАЦИЯ - ТОЧНО РАБОТАЕТ!
function setupNav() {
    console.log('🔗 Настраиваем навигацию...');
    
    // ВЕШАЕМ ОБРАБОТЧИКИ НА КАЖДУЮ ССЫЛКУ ПРЯМО
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 Найдено ссылок:', navLinks.length);
    
    navLinks.forEach(link => {
        // Удаляем старые обработчики
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Вешаем новый обработчик
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('👉 Клик по:', this.getAttribute('data-page'));
            
            // Убираем активный класс у всех
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Добавляем активный класс текущей
            this.classList.add('active');
            
            // Загружаем страницу
            const pageName = this.getAttribute('data-page');
            showPage(pageName);
        });
    });
    
    console.log('✅ Навигация настроена');
}

// ПОКАЗАТЬ СТРАНИЦУ - РАБОЧИЙ МЕТОД
function showPage(pageName) {
    console.log('📄 Показываем страницу:', pageName);
    
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error('❌ Не найден content-area!');
        return;
    }
    
    // Показываем загрузку
    contentArea.innerHTML = '<div class="loading">Загрузка...</div>';
    
    // Генерируем контент
    setTimeout(() => {
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
        
        // Вставляем HTML
        contentArea.innerHTML = html;
        
        // Инициализируем страницу
        initPage(pageName);
        
        console.log('✅ Страница загружена:', pageName);
    }, 100);
}

// СТРАНИЦА 1: Аналитика
function getDashboard() {
    return `
        <div class="page-header">
            <h2 class="page-title">Аналитика</h2>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Начислено за месяц</h3>
                <div class="stat-value">2 450 780 ₽</div>
                <div class="stat-change">+12.5% с прошлого месяца</div>
            </div>
            <div class="stat-card">
                <h3>Оплачено</h3>
                <div class="stat-value">1 890 540 ₽</div>
                <div class="stat-change">+8.3% с прошлого месяца</div>
            </div>
            <div class="stat-card">
                <h3>Дома в управлении</h3>
                <div class="stat-value">${crmData.buildings.length}</div>
                <div class="stat-change">+2 в этом месяце</div>
            </div>
            <div class="stat-card">
                <h3>Активные обращения</h3>
                <div class="stat-value">12</div>
                <div class="stat-change">-5 с прошлой недели</div>
            </div>
        </div>
        <div style="text-align: center; padding: 50px; color: var(--gray-700);">
            <h3>📊 График аналитики</h3>
            <p>Здесь будет график</p>
        </div>
    `;
}

// СТРАНИЦА 2: Дома
function getBuildings() {
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
                        <th>Риски</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.buildings.map(building => `
                        <tr>
                            <td><strong>${building.address}</strong></td>
                            <td>${building.floors}</td>
                            <td>${building.apartments}</td>
                            <td>${building.risks.join(', ') || 'Нет'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 3: Жильцы
function getResidents() {
    return `
        <div class="page-header">
            <h2 class="page-title">Жильцы</h2>
            <button class="btn btn-primary" onclick="openModal('residentModal')">
                <i class="fas fa-plus"></i> Добавить жильца
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего жильцов</h3>
                <div class="stat-value">${crmData.residents.length}</div>
                <div class="stat-change">в ${crmData.buildings.length} домах</div>
            </div>
            <div class="stat-card">
                <h3>Активные</h3>
                <div class="stat-value">${crmData.residents.filter(r => r.status === 'active').length}</div>
                <div class="stat-change">100% активны</div>
            </div>
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
                    ${crmData.residents.map(resident => `
                        <tr>
                            <td><strong>${resident.name}</strong></td>
                            <td>${resident.apartment}</td>
                            <td>${resident.phone}</td>
                            <td>${resident.balance} ₽</td>
                            <td><span class="status-badge ${resident.status === 'active' ? 'status-paid' : 'status-pending'}">${resident.status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 4: Обращения
function getTickets() {
    return `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
            <button class="btn btn-primary" onclick="openModal('ticketModal')">
                <i class="fas fa-plus"></i> Создать обращение
            </button>
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
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.tickets.map(ticket => `
                        <tr>
                            <td>#${ticket.id}</td>
                            <td><strong>${ticket.title}</strong></td>
                            <td>${ticket.type}</td>
                            <td><span class="status-badge ${ticket.priority === 'high' ? 'status-pending' : 'status-paid'}">${ticket.priority === 'high' ? 'Высокий' : 'Низкий'}</span></td>
                            <td><span class="status-badge ${ticket.status === 'open' ? 'status-pending' : 'status-paid'}">${ticket.status === 'open' ? 'Открыто' : 'Закрыто'}</span></td>
                            <td>${ticket.createdAt}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 5: Услуги
function getServices() {
    return `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
            <button class="btn btn-primary" onclick="openModal('serviceModal')">
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
                    </tr>
                </thead>
                <tbody>
                    ${crmData.services.map(service => `
                        <tr>
                            <td><strong>${service.name}</strong></td>
                            <td>${service.type === 'main' ? 'Основная' : 'Дополнительная'}</td>
                            <td>${service.tariff} ₽</td>
                            <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 6: Платежи
function getPayments() {
    return `
        <div class="page-header">
            <h2 class="page-title">Платежи</h2>
            <button class="btn btn-primary" onclick="openModal('paymentModal')">
                <i class="fas fa-plus"></i> Создать начисление
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Начислено всего</h3>
                <div class="stat-value">${crmData.payments.reduce((sum, p) => sum + p.amount, 0)} ₽</div>
                <div class="stat-change">за все время</div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Плательщик</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.payments.map(payment => `
                        <tr>
                            <td>#${payment.id}</td>
                            <td><strong>${payment.amount} ₽</strong></td>
                            <td><span class="status-badge ${payment.status === 'paid' ? 'status-paid' : 'status-pending'}">${payment.status === 'paid' ? 'Оплачен' : 'Ожидает'}</span></td>
                            <td>${payment.date}</td>
                            <td>${payment.payer}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 7: Подрядчики
function getContractors() {
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
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>ООО 'Сервис Плюс'</strong></td>
                        <td>7712345678</td>
                        <td><span class="status-badge status-paid">Активен</span></td>
                    </tr>
                    <tr>
                        <td><strong>ООО 'Эко-Транс'</strong></td>
                        <td>7723456789</td>
                        <td><span class="status-badge status-paid">Активен</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 8: Документы
function getDocuments() {
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
                    ${crmData.documents.map(doc => `
                        <tr>
                            <td><strong>${doc.name}</strong></td>
                            <td>${doc.type}</td>
                            <td><span class="status-badge ${doc.status === 'signed' ? 'status-paid' : 'status-pending'}">${doc.status === 'signed' ? 'Подписан' : 'Ожидает'}</span></td>
                            <td>${doc.date}</td>
                            <td>${doc.size}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 9: Реквизиты
function getRequisites() {
    const company = crmData.currentCompany;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Реквизиты для оплаты</h2>
            <button class="btn btn-primary" onclick="openModal('requisitesModal')">
                <i class="fas fa-edit"></i> Редактировать реквизиты
            </button>
        </div>
        <div style="max-width: 800px;">
            <div style="background: var(--gray-100); padding: 25px; border-radius: 12px;">
                <h3>Банковские реквизиты</h3>
                <div style="margin-top: 20px;">
                    <p><strong>Наименование:</strong> ${company.legalName}</p>
                    <p><strong>ИНН:</strong> ${company.inn}</p>
                    <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                    <p><strong>Банк:</strong> ПАО Сбербанк</p>
                    <p><strong>Расчетный счет:</strong> 40702810123450001234</p>
                    <p><strong>БИК:</strong> 044525225</p>
                </div>
            </div>
        </div>
    `;
}

// СТРАНИЦА 10: Профиль УК
function getProfile() {
    const company = crmData.currentCompany;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Профиль компании</h2>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3>Основная информация</h3>
                    <p><strong>Название:</strong> ${company.legalName}</p>
                    <p><strong>ИНН:</strong> ${company.inn}</p>
                    <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                    <p><strong>Регион:</strong> ${company.region}</p>
                </div>
                <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
                    <h3>Контакты</h3>
                    <p><strong>Телефон:</strong> ${company.contacts.phone}</p>
                    <p><strong>Email:</strong> ${company.contacts.email}</p>
                    <p><strong>Адрес:</strong> ${company.contacts.address}</p>
                </div>
            </div>
            <div>
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h3>Статистика</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">${crmData.buildings.length}</div>
                            <div>Домов</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: var(--primary);">${crmData.residents.length}</div>
                            <div>Жильцов</div>
                        </div>
                    </div>
                    <h4 style="margin-top: 30px;">Лицензии</h4>
                    <ul style="margin-top: 10px;">
                        ${company.licenses.map(license => `<li>${license}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Инициализация страницы
function initPage(pageName) {
    console.log('🔄 Инициализируем страницу:', pageName);
    
    // Здесь можно добавить специфичную логику для каждой страницы
    if (pageName === 'dashboard') {
        // Инициализация графика
        setTimeout(() => {
            const ctx = document.getElementById('analyticsChart');
            if (ctx) {
                console.log('📈 Инициализируем график');
                // Код для графика...
            }
        }, 200);
    }
}

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
}

// Открыть модальное окно
function openModal(modalId) {
    console.log('📱 Открываем модальное окно:', modalId);
    document.getElementById(modalId).classList.add('active');
}

// Экспортируем все функции в window
window.showPage = showPage;
window.openModal = openModal;
window.closeAllModals = function() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
};

// Запускаем приложение при загрузке
document.addEventListener('DOMContentLoaded', initApp);

// Также запускаем при полной загрузке страницы
window.addEventListener('load', function() {
    console.log('✅ Страница полностью загружена');
    initApp();
});

// Фолбэк: если DOMContentLoaded уже сработал
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
