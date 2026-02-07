// app.js - РАБОЧАЯ ВЕРСИЯ
// Все страницы точно открываются!

// Глобальные переменные
let crmData = null;

// Основная функция запуска
function initApp() {
    console.log('🚀 Запускаем приложение...');
    
    // Устанавливаем дату
    updateCurrentDate();
    
    // Загружаем данные
    loadData();
    
    // Настраиваем навигацию
    setupNav();
    
    // Настраиваем модальные окна
    setupModals();
    
    // Показываем первую страницу
    showPage('dashboard');
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
        crmData = JSON.parse(savedData);
        console.log('📊 Данные загружены из localStorage');
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
                { id: 1, title: "Протечка в ванной", type: "ремонт", status: "open", priority: "high", createdAt: "2024-08-01" },
                { id: 2, title: "Не работает лифт", type: "ремонт", status: "closed", priority: "high", createdAt: "2024-07-25" }
            ],
            services: [
                { id: 1, name: "Содержание общего имущества", type: "main", tariff: 25.50, period: "monthly", buildingId: 1 },
                { id: 2, name: "Вывоз ТБО", type: "main", tariff: 8.30, period: "monthly", buildingId: 1 }
            ],
            payments: [
                { id: 1, serviceId: 1, amount: 1836.00, status: "paid", date: "2024-08-01", payer: "ООО 'УК Профи'" },
                { id: 2, serviceId: 2, amount: 597.60, status: "pending", date: "2024-08-01", payer: "ООО 'УК Профи'" }
            ],
            documents: [
                { id: 1, name: "Договор с ООО 'Сервис Плюс'", type: "договор", status: "signed", date: "2024-01-15", size: "2.4 MB" },
                { id: 2, name: "Акт выполненных работ за июль", type: "акт", status: "signed", date: "2024-08-05", size: "1.8 MB" }
            ],
            contractors: [
                { id: 1, name: "ООО 'Сервис Плюс'", inn: "7712345678", status: "активен", workTypes: ["ремонт", "обслуживание"] },
                { id: 2, name: "ООО 'Эко-Транс'", inn: "7723456789", status: "активен", workTypes: ["вывоз ТБО"] }
            ]
        };
        
        localStorage.setItem('crmData', JSON.stringify(crmData));
        console.log('📊 Тестовые данные созданы');
    }
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
    
    // Показываем загрузку
    contentArea.innerHTML = '<div class="loading" style="text-align: center; padding: 50px; font-size: 18px;">Загрузка...</div>';
    
    // Генерируем контент с небольшой задержкой для UX
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
    }, 50);
}

// СТРАНИЦА 1: Аналитика
function getDashboard() {
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
                <div class="stat-value">${crmData.tickets.filter(t => t.status === 'open').length}</div>
                <div class="stat-change">-5 с прошлой недели</div>
            </div>
        </div>
        <div style="background: white; padding: 25px; border-radius: 16px; margin-top: 30px;">
            <h3 style="margin-bottom: 20px;">📊 Динамика начислений</h3>
            <canvas id="analyticsChart" style="height: 300px; width: 100%;"></canvas>
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
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего домов</h3>
                <div class="stat-value">${crmData.buildings.length}</div>
                <div class="stat-change">в управлении</div>
            </div>
            <div class="stat-card">
                <h3>Общее квартир</h3>
                <div class="stat-value">${crmData.buildings.reduce((sum, b) => sum + b.apartments, 0)}</div>
                <div class="stat-change">во всех домах</div>
            </div>
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
                            <td>
                                ${building.risks && building.risks.length > 0 
                                    ? building.risks.map(risk => {
                                        switch(risk) {
                                            case 'electrical': return '<span class="risk-flag risk-high"></span>Электрика';
                                            case 'roof': return '<span class="risk-flag risk-medium"></span>Крыша';
                                            case 'elevator': return '<span class="risk-flag risk-high"></span>Лифт';
                                            case 'plumbing': return '<span class="risk-flag risk-medium"></span>Водопровод';
                                            default: return risk;
                                        }
                                    }).join(', ') 
                                    : '<span style="color: var(--gray-400);">Нет</span>'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 3: Жильцы
function getResidents() {
    const activeResidents = crmData.residents.filter(r => r.status === 'active').length;
    
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
                <div class="stat-value">${activeResidents}</div>
                <div class="stat-change">${Math.round((activeResidents / crmData.residents.length) * 100)}% от общего числа</div>
            </div>
            <div class="stat-card">
                <h3>Средний баланс</h3>
                <div class="stat-value">${Math.round(crmData.residents.reduce((sum, r) => sum + r.balance, 0) / crmData.residents.length)} ₽</div>
                <div class="stat-change">по всем жильцам</div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Квартира</th>
                        <th>Дом</th>
                        <th>Телефон</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.residents.map(resident => {
                        const building = crmData.buildings.find(b => b.id === resident.buildingId);
                        return `
                            <tr>
                                <td><strong>${resident.name}</strong></td>
                                <td>${resident.apartment}</td>
                                <td>${building ? building.address : 'Не указан'}</td>
                                <td>${resident.phone}</td>
                                <td>
                                    <span style="color: ${resident.balance >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: 600;">
                                        ${resident.balance} ₽
                                    </span>
                                </td>
                                <td>
                                    <span class="status-badge ${resident.status === 'active' ? 'status-paid' : 'status-pending'}">
                                        ${resident.status === 'active' ? 'Активен' : 'Неактивен'}
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

// СТРАНИЦА 4: Обращения
function getTickets() {
    const openTickets = crmData.tickets.filter(t => t.status === 'open').length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Обращения</h2>
            <button class="btn btn-primary" onclick="openModal('ticketModal')">
                <i class="fas fa-plus"></i> Создать обращение
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего обращений</h3>
                <div class="stat-value">${crmData.tickets.length}</div>
                <div class="stat-change">за все время</div>
            </div>
            <div class="stat-card">
                <h3>Открытые</h3>
                <div class="stat-value">${openTickets}</div>
                <div class="stat-change">требуют решения</div>
            </div>
            <div class="stat-card">
                <h3>Высокий приоритет</h3>
                <div class="stat-value">${crmData.tickets.filter(t => t.priority === 'high').length}</div>
                <div class="stat-change">срочные обращения</div>
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
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.tickets.map(ticket => `
                        <tr>
                            <td>#${ticket.id}</td>
                            <td><strong>${ticket.title}</strong></td>
                            <td>${ticket.type}</td>
                            <td>
                                <span class="status-badge ${ticket.priority === 'high' ? 'status-pending' : 'status-processing'}">
                                    ${ticket.priority === 'high' ? 'Высокий' : ticket.priority === 'medium' ? 'Средний' : 'Низкий'}
                                </span>
                            </td>
                            <td>
                                <span class="status-badge ${ticket.status === 'open' ? 'status-pending' : 'status-paid'}">
                                    ${ticket.status === 'open' ? 'Открыто' : 'Закрыто'}
                                </span>
                            </td>
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
    const mainServices = crmData.services.filter(s => s.type === 'main').length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Услуги и тарифы</h2>
            <button class="btn btn-primary" onclick="openModal('serviceModal')">
                <i class="fas fa-plus"></i> Добавить услугу
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего услуг</h3>
                <div class="stat-value">${crmData.services.length}</div>
                <div class="stat-change">активных</div>
            </div>
            <div class="stat-card">
                <h3>Основные</h3>
                <div class="stat-value">${mainServices}</div>
                <div class="stat-change">обязательные услуги</div>
            </div>
            <div class="stat-card">
                <h3>Средний тариф</h3>
                <div class="stat-value">${Math.round(crmData.services.reduce((sum, s) => sum + s.tariff, 0) / crmData.services.length)} ₽</div>
                <div class="stat-change">за кв.м/месяц</div>
            </div>
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
                    </tr>
                </thead>
                <tbody>
                    ${crmData.services.map(service => {
                        const building = crmData.buildings.find(b => b.id === service.buildingId);
                        return `
                            <tr>
                                <td><strong>${service.name}</strong></td>
                                <td>${service.type === 'main' ? 'Основная' : 'Дополнительная'}</td>
                                <td>${service.tariff} ₽</td>
                                <td>${service.period === 'monthly' ? 'Ежемесячно' : 'По требованию'}</td>
                                <td>${building ? building.address : 'Все дома'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 6: Платежи
function getPayments() {
    const totalAmount = crmData.payments.reduce((sum, p) => sum + p.amount, 0);
    const paidAmount = crmData.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    
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
                <div class="stat-value">${totalAmount.toLocaleString()} ₽</div>
                <div class="stat-change">за все время</div>
            </div>
            <div class="stat-card">
                <h3>Оплачено</h3>
                <div class="stat-value">${paidAmount.toLocaleString()} ₽</div>
                <div class="stat-change">${Math.round((paidAmount / totalAmount) * 100)}% от начисленного</div>
            </div>
            <div class="stat-card">
                <h3>В ожидании</h3>
                <div class="stat-value">${(totalAmount - paidAmount).toLocaleString()} ₽</div>
                <div class="stat-change">неоплаченные начисления</div>
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
                            <td><strong>${payment.amount.toLocaleString()} ₽</strong></td>
                            <td>
                                <span class="status-badge ${payment.status === 'paid' ? 'status-paid' : 'status-pending'}">
                                    ${payment.status === 'paid' ? 'Оплачен' : 'Ожидает'}
                                </span>
                            </td>
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
    const activeContractors = crmData.contractors.filter(c => c.status === 'активен').length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Подрядчики</h2>
            <button class="btn btn-primary" onclick="openModal('contractorModal')">
                <i class="fas fa-plus"></i> Добавить подрядчика
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего подрядчиков</h3>
                <div class="stat-value">${crmData.contractors.length}</div>
                <div class="stat-change">в базе</div>
            </div>
            <div class="stat-card">
                <h3>Активные</h3>
                <div class="stat-value">${activeContractors}</div>
                <div class="stat-change">работают сейчас</div>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>ИНН</th>
                        <th>Виды работ</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    ${crmData.contractors.map(contractor => `
                        <tr>
                            <td><strong>${contractor.name}</strong></td>
                            <td>${contractor.inn}</td>
                            <td>${contractor.workTypes ? contractor.workTypes.join(', ') : 'Не указаны'}</td>
                            <td>
                                <span class="status-badge ${contractor.status === 'активен' ? 'status-paid' : 'status-pending'}">
                                    ${contractor.status}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// СТРАНИЦА 8: Документы
function getDocuments() {
    const signedDocs = crmData.documents.filter(d => d.status === 'signed').length;
    
    return `
        <div class="page-header">
            <h2 class="page-title">Документы</h2>
            <button class="btn btn-primary" onclick="openModal('documentModal')">
                <i class="fas fa-upload"></i> Загрузить документ
            </button>
        </div>
        <div class="stats-cards">
            <div class="stat-card">
                <h3>Всего документов</h3>
                <div class="stat-value">${crmData.documents.length}</div>
                <div class="stat-change">в системе</div>
            </div>
            <div class="stat-card">
                <h3>Подписаны</h3>
                <div class="stat-value">${signedDocs}</div>
                <div class="stat-change">${Math.round((signedDocs / crmData.documents.length) * 100)}% от общего числа</div>
            </div>
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
                            <td>
                                <span class="status-badge ${doc.status === 'signed' ? 'status-paid' : 'status-pending'}">
                                    ${doc.status === 'signed' ? 'Подписан' : 'Ожидает'}
                                </span>
                            </td>
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
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3>Банковские реквизиты</h3>
                    <div style="margin-top: 20px;">
                        <p><strong>Наименование:</strong> ${company.legalName}</p>
                        <p><strong>ИНН:</strong> ${company.inn}</p>
                        <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                        <p><strong>Банк:</strong> ПАО Сбербанк</p>
                        <p><strong>Расчетный счет:</strong> 40702810123450001234</p>
                        <p><strong>Корреспондентский счет:</strong> 30101810400000000225</p>
                        <p><strong>БИК:</strong> 044525225</p>
                        <p><strong>КПП:</strong> 770501001</p>
                    </div>
                </div>
                <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
                    <h3>Реквизиты для жильцов</h3>
                    <p style="margin-top: 15px;"><strong>Назначение платежа:</strong> Оплата жилищно-коммунальных услуг</p>
                    <p><strong>Получатель:</strong> ${company.legalName}</p>
                    <p><strong>ИНН:</strong> ${company.inn}</p>
                    <p><strong>КПП:</strong> 770501001</p>
                    <p><strong>Расчетный счет:</strong> 40702810123450001234</p>
                </div>
            </div>
            <div>
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h3>QR-код для оплаты</h3>
                    <div style="text-align: center; padding: 30px;">
                        <div style="width: 200px; height: 200px; background: var(--gray-200); display: inline-flex; align-items: center; justify-content: center; border-radius: 12px;">
                            <i class="fas fa-qrcode" style="font-size: 80px; color: var(--gray-400);"></i>
                        </div>
                        <p style="margin-top: 20px; color: var(--gray-700);">Отсканируйте для быстрой оплаты</p>
                    </div>
                    <div style="margin-top: 30px;">
                        <h4>Скачать реквизиты</h4>
                        <div style="display: flex; gap: 15px; margin-top: 15px;">
                            <button class="btn btn-secondary">
                                <i class="fas fa-file-pdf"></i> PDF
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fas fa-file-word"></i> Word
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fas fa-print"></i> Печать
                            </button>
                        </div>
                    </div>
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
            <button class="btn btn-secondary">
                <i class="fas fa-edit"></i> Редактировать профиль
            </button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
                <div style="background: var(--gray-100); padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3>Основная информация</h3>
                    <div style="margin-top: 20px;">
                        <p><strong>Название:</strong> ${company.legalName}</p>
                        <p><strong>ИНН:</strong> ${company.inn}</p>
                        <p><strong>ОГРН:</strong> ${company.ogrn}</p>
                        <p><strong>Регион:</strong> ${company.region}</p>
                        <p><strong>Дата регистрации:</strong> 15.01.2018</p>
                        <p><strong>ОКПО:</strong> 12345678</p>
                    </div>
                </div>
                <div style="background: var(--primary-light); padding: 25px; border-radius: 12px;">
                    <h3>Контакты</h3>
                    <div style="margin-top: 20px;">
                        <p><strong>Телефон:</strong> ${company.contacts.phone}</p>
                        <p><strong>Email:</strong> ${company.contacts.email}</p>
                        <p><strong>Адрес:</strong> ${company.contacts.address}</p>
                        <p><strong>Веб-сайт:</strong> <a href="https://uk-profi.ru" target="_blank">uk-profi.ru</a></p>
                    </div>
                </div>
            </div>
            <div>
                <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <h3>Статистика компании</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                        <div style="text-align: center; padding: 20px; background: var(--gray-100); border-radius: 12px;">
                            <div style="font-size: 28px; font-weight: bold; color: var(--primary);">${crmData.buildings.length}</div>
                            <div style="color: var(--gray-700);">Домов</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: var(--gray-100); border-radius: 12px;">
                            <div style="font-size: 28px; font-weight: bold; color: var(--primary);">${crmData.residents.length}</div>
                            <div style="color: var(--gray-700);">Жильцов</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: var(--gray-100); border-radius: 12px;">
                            <div style="font-size: 28px; font-weight: bold; color: var(--primary);">${crmData.contractors.length}</div>
                            <div style="color: var(--gray-700);">Подрядчиков</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: var(--gray-100); border-radius: 12px;">
                            <div style="font-size: 28px; font-weight: bold; color: var(--primary);">${crmData.services.length}</div>
                            <div style="color: var(--gray-700);">Услуг</div>
                        </div>
                    </div>
                    
                    <h4 style="margin-top: 30px;">Лицензии</h4>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        ${company.licenses.map(license => `<li style="margin-bottom: 8px;">${license}</li>`).join('')}
                    </ul>
                    
                    <h4 style="margin-top: 30px;">Руководство</h4>
                    <div style="margin-top: 15px;">
                        <p><strong>Генеральный директор:</strong> Петров Александр Сергеевич</p>
                        <p><strong>Главный бухгалтер:</strong> Сидорова Ольга Владимировна</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Инициализация страницы
function initPage(pageName) {
    console.log('🔄 Инициализируем страницу:', pageName);
    
    if (pageName === 'dashboard') {
        setTimeout(() => {
            const ctx = document.getElementById('analyticsChart');
            if (ctx && window.Chart) {
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
            }
        }, 100);
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
    document.getElementById(modalId).classList.add('active');
}

// Экспортируем функции в window
window.showPage = showPage;
window.openModal = openModal;
window.initApp = initApp;

// Запускаем приложение при загрузке
document.addEventListener('DOMContentLoaded', initApp);
