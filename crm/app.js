// Главный объект данных CRM
window.crmData = window.crmData || null;

// Текущее состояние приложения
const appState = {
    currentModule: 'dashboard',
    currentEditingId: null
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupNavigation();
    loadModule('dashboard');
    setupModal();
});

// Инициализация данных в localStorage
function initializeData() {
    if (!localStorage.getItem('crmData')) {
        const testData = {
            currentCompany: {
                id: 1,
                name: "ООО 'Управляющая Компания'",
                inn: "1234567890",
                ogrn: "1234567890123",
                region: "Москва",
                contacts: {
                    phone: "+7 (495) 123-45-67",
                    email: "info@uk-example.ru"
                },
                licenses: ["Лицензия №12345"]
            },
            companies: [
                {
                    id: 1,
                    legalName: "ООО 'Управляющая Компания'",
                    inn: "1234567890",
                    ogrn: "1234567890123",
                    region: "Москва",
                    contacts: {
                        phone: "+7 (495) 123-45-67",
                        email: "info@uk-example.ru"
                    },
                    licenses: ["Лицензия №12345"]
                }
            ],
            buildings: [
                {
                    id: 1,
                    address: "ул. Ленина, д. 10",
                    floors: 9,
                    apartments: 72,
                    risks: ["Старая электропроводка", "Неутепленный фасад"],
                    passport: {
                        elevators: [{"номер": 1, "год": 2010}],
                        itp: {"тип": "Автономный", "год": 2015}
                    }
                },
                {
                    id: 2,
                    address: "пр. Мира, д. 25",
                    floors: 5,
                    apartments: 40,
                    risks: [],
                    passport: {
                        elevators: [],
                        itp: {"тип": "Центральный", "год": 2018}
                    }
                }
            ],
            services: [
                {
                    id: 1,
                    name: "Уборка территории",
                    type: "main",
                    tariff: 15000,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 1,
                    sla: "Ежедневно"
                },
                {
                    id: 2,
                    name: "Обслуживание лифтов",
                    type: "main",
                    tariff: 25000,
                    period: "monthly",
                    buildingId: 1,
                    contractorId: 2,
                    sla: "24/7"
                }
            ],
            contractors: [
                {
                    id: 1,
                    legalName: "ООО 'Чистый Город'",
                    inn: "0987654321",
                    workTypes: ["Уборка", "Вывоз мусора"],
                    bankDetails: "р/с 40702810000000000001",
                    status: "активен"
                },
                {
                    id: 2,
                    legalName: "ЗАО 'ЛифтСервис'",
                    inn: "1122334455",
                    workTypes: ["Обслуживание лифтов"],
                    bankDetails: "р/с 40702810000000000002",
                    status: "активен"
                }
            ],
            payments: [
                {
                    id: 1,
                    serviceId: 1,
                    amount: 15000,
                    status: "paid",
                    date: "2024-03-15",
                    payer: "ООО 'УК'"
                },
                {
                    id: 2,
                    serviceId: 2,
                    amount: 25000,
                    status: "processing",
                    date: "2024-03-16",
                    payer: "ООО 'УК'"
                }
            ],
            documents: [
                {
                    id: 1,
                    type: "Договор",
                    name: "Договор с ООО 'Чистый Город'",
                    link: "#",
                    status: "signed",
                    entityId: 1
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Алексей Смирнов",
                    role: "manager",
                    permissions: ["full"]
                }
            ]
        };
        localStorage.setItem('crmData', JSON.stringify(testData));
    }
    
    window.crmData = JSON.parse(localStorage.getItem('crmData'));
}

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('crmData', JSON.stringify(window.crmData));
}

// Настройка навигации
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех пунктов
            navItems.forEach(nav => nav.classList.remove('active'));
            // Добавляем активный класс текущему пункту
            this.classList.add('active');
            
            // Загружаем модуль
            const module = this.getAttribute('data-module');
            loadModule(module);
        });
    });
    
    // Кнопка "Добавить"
    document.getElementById('add-new-btn').addEventListener('click', function() {
        openModal(appState.currentModule, 'add');
    });
}

// Загрузка модуля
function loadModule(moduleName) {
    appState.currentModule = moduleName;
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    // Очищаем область контента
    contentArea.innerHTML = '';
    
    switch(moduleName) {
        case 'dashboard':
            pageTitle.textContent = 'Дашборд';
            pageSubtitle.textContent = 'Обзор показателей и статистика';
            loadDashboard(contentArea);
            break;
        case 'buildings':
            pageTitle.textContent = 'Дома';
            pageSubtitle.textContent = 'Управление жилыми домами';
            loadBuildings(contentArea);
            break;
        case 'payments':
            pageTitle.textContent = 'Платежи';
            pageSubtitle.textContent = 'Управление платежами и начислениями';
            loadPayments(contentArea);
            break;
        case 'contractors':
            pageTitle.textContent = 'Подрядчики';
            pageSubtitle.textContent = 'Реестр подрядных организаций';
            loadContractors(contentArea);
            break;
        default:
            pageTitle.textContent = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
            pageSubtitle.textContent = 'Модуль в разработке';
            contentArea.innerHTML = `<div class="card"><h3>Модуль "${moduleName}" в разработке</h3></div>`;
    }
}

// Загрузка дашборда
function loadDashboard(container) {
    // Карточки с показателями
    const cardsHTML = `
        <div class="cards-grid">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Начислено</h3>
                    <div class="card-icon" style="background: #6912FF;">
                        <i class="fas fa-ruble-sign"></i>
                    </div>
                </div>
                <div class="card-value">825,000 ₽</div>
                <div class="card-change positive">+12% за месяц</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Оплачено</h3>
                    <div class="card-icon" style="background: #20C997;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="card-value">790,000 ₽</div>
                <div class="card-change positive">+8% за месяц</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Дома</h3>
                    <div class="card-icon" style="background: #FD7E14;">
                        <i class="fas fa-home"></i>
                    </div>
                </div>
                <div class="card-value">${window.crmData.buildings.length}</div>
                <div class="card-change">Всего объектов</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Подрядчики</h3>
                    <div class="card-icon" style="background: #DC3545;">
                        <i class="fas fa-hard-hat"></i>
                    </div>
                </div>
                <div class="card-value">${window.crmData.contractors.length}</div>
                <div class="card-change">Активных: ${window.crmData.contractors.filter(c => c.status === 'активен').length}</div>
            </div>
        </div>
    `;
    
    // График
    const chartHTML = `
        <div class="chart-container">
            <h3 class="chart-title">Динамика платежей</h3>
            <canvas id="paymentsChart"></canvas>
        </div>
    `;
    
    // Последние платежи
    const paymentsHTML = `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Услуга</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.crmData.payments.map(payment => `
                        <tr>
                            <td>${payment.date}</td>
                            <td>${window.crmData.services.find(s => s.id === payment.serviceId)?.name || 'Неизвестно'}</td>
                            <td>${payment.amount.toLocaleString()} ₽</td>
                            <td><span class="status ${payment.status}">${getStatusText(payment.status)}</span></td>
                            <td class="actions">
                                <button class="btn-icon" onclick="editPayment(${payment.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = cardsHTML + chartHTML + paymentsHTML;
    
    // Инициализация графика
    initChart();
}

// Загрузка модуля "Дома"
function loadBuildings(container) {
    const buildings = window.crmData.buildings;
    
    const html = `
        <div class="table-container">
            <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">Список домов</h3>
                <div style="display: flex; gap: 10px;">
                    <input type="text" class="form-control" placeholder="Поиск по адресу..." style="width: 300px;">
                    <button class="btn-primary" onclick="openModal('buildings', 'add')">
                        <i class="fas fa-plus"></i> Добавить дом
                    </button>
                </div>
            </div>
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
                    ${buildings.map(building => `
                        <tr>
                            <td><strong>${building.address}</strong></td>
                            <td>${building.floors}</td>
                            <td>${building.apartments}</td>
                            <td>
                                ${building.risks.length > 0 ? 
                                    `<span style="color: #DC3545; font-weight: 500;">
                                        <i class="fas fa-exclamation-triangle"></i> ${building.risks.length} рисков
                                    </span>` : 
                                    '<span style="color: #20C997;"><i class="fas fa-check-circle"></i> Нет рисков</span>'
                                }
                            </td>
                            <td class="actions">
                                <button class="btn-icon" onclick="viewBuilding(${building.id})" title="Просмотр">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-icon" onclick="editBuilding(${building.id})" title="Редактировать">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon" onclick="deleteBuilding(${building.id})" title="Удалить">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// Загрузка модуля "Платежи"
function loadPayments(container) {
    const payments = window.crmData.payments;
    
    const stats = {
        charged: payments.reduce((sum, p) => sum + p.amount, 0),
        paid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
        processing: payments.filter(p => p.status === 'processing').reduce((sum, p) => sum + p.amount, 0)
    };
    
    const html = `
        <div class="cards-grid">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Начислено</h3>
                    <div class="card-icon" style="background: #6912FF;">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="card-value">${stats.charged.toLocaleString()} ₽</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Оплачено</h3>
                    <div class="card-icon" style="background: #20C997;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="card-value">${stats.paid.toLocaleString()} ₽</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">В обработке</h3>
                    <div class="card-icon" style="background: #FD7E14;">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <div class="card-value">${stats.processing.toLocaleString()} ₽</div>
            </div>
        </div>
        
        <div class="table-container" style="margin-top: 30px;">
            <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">История платежей</h3>
                <div style="display: flex; gap: 10px;">
                    <select class="form-control" style="width: 200px;">
                        <option>Все статусы</option>
                        <option>Оплачено</option>
                        <option>В обработке</option>
                    </select>
                    <button class="btn-primary" onclick="openModal('payments', 'add')">
                        <i class="fas fa-plus"></i> Создать начисление
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Услуга</th>
                        <th>Сумма</th>
                        <th>Плательщик</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(payment => {
                        const service = window.crmData.services.find(s => s.id === payment.serviceId);
                        return `
                            <tr>
                                <td>#${payment.id.toString().padStart(4, '0')}</td>
                                <td>${payment.date}</td>
                                <td>${service?.name || 'Неизвестно'}</td>
                                <td><strong>${payment.amount.toLocaleString()} ₽</strong></td>
                                <td>${payment.payer}</td>
                                <td><span class="status ${payment.status}">${getStatusText(payment.status)}</span></td>
                                <td class="actions">
                                    <button class="btn-icon" onclick="editPayment(${payment.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-icon" onclick="deletePayment(${payment.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// Загрузка модуля "Подрядчики"
function loadContractors(container) {
    const contractors = window.crmData.contractors;
    
    const html = `
        <div class="table-container">
            <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">Реестр подрядчиков</h3>
                <button class="btn-primary" onclick="openModal('contractors', 'add')">
                    <i class="fas fa-plus"></i> Добавить подрядчика
                </button>
            </div>
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
                    ${contractors.map(contractor => `
                        <tr>
                            <td><strong>${contractor.legalName}</strong></td>
                            <td>${contractor.inn}</td>
                            <td>${contractor.workTypes.join(', ')}</td>
                            <td>
                                <span style="color: ${contractor.status === 'активен' ? '#20C997' : '#DC3545'}; font-weight: 500;">
                                    ${contractor.status}
                                </span>
                            </td>
                            <td class="actions">
                                <button class="btn-icon" onclick="viewContractor(${contractor.id})" title="Просмотр">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-icon" onclick="editContractor(${contractor.id})" title="Редактировать">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// Настройка модального окна
function setupModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    document.getElementById('modal-save').addEventListener('click', saveModalData);
}

// Открытие модального окна
function openModal(module, action, id = null) {
    appState.currentEditingId = id;
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('modal-form');
    
    title.textContent = getModalTitle(module, action);
    form.innerHTML = getModalForm(module, action, id);
    
    modal.classList.add('active');
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    appState.currentEditingId = null;
}

// Получение заголовка модального окна
function getModalTitle(module, action) {
    const titles = {
        buildings: { add: 'Добавить дом', edit: 'Редактировать дом' },
        payments: { add: 'Создать начисление', edit: 'Редактировать платеж' },
        contractors: { add: 'Добавить подрядчика', edit: 'Редактировать подрядчика' }
    };
    
    return titles[module]?.[action] || `${action === 'add' ? 'Добавить' : 'Редактировать'} запись`;
}

// Получение формы для модального окна
function getModalForm(module, action, id) {
    const data = id ? window.crmData[module].find(item => item.id === id) : null;
    
    switch(module) {
        case 'buildings':
            return `
                <div class="form-group">
                    <label class="form-label">Адрес</label>
                    <input type="text" class="form-control" id="building-address" 
                           value="${data?.address || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Количество этажей</label>
                    <input type="number" class="form-control" id="building-floors" 
                           value="${data?.floors || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Количество квартир</label>
                    <input type="number" class="form-control" id="building-apartments" 
                           value="${data?.apartments || ''}" required>
                </div>
            `;
        case 'payments':
            return `
                <div class="form-group">
                    <label class="form-label">Услуга</label>
                    <select class="form-control" id="payment-service" required>
                        <option value="">Выберите услугу</option>
                        ${window.crmData.services.map(s => 
                            `<option value="${s.id}" ${data?.serviceId === s.id ? 'selected' : ''}>
                                ${s.name} (${s.tariff.toLocaleString()} ₽)
                            </option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Сумма</label>
                    <input type="number" class="form-control" id="payment-amount" 
                           value="${data?.amount || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Статус</label>
                    <select class="form-control" id="payment-status" required>
                        <option value="charged" ${data?.status === 'charged' ? 'selected' : ''}>Начислено</option>
                        <option value="paid" ${data?.status === 'paid' ? 'selected' : ''}>Оплачено</option>
                        <option value="processing" ${data?.status === 'processing' ? 'selected' : ''}>В обработке</option>
                    </select>
                </div>
            `;
        case 'contractors':
            return `
                <div class="form-group">
                    <label class="form-label">Название организации</label>
                    <input type="text" class="form-control" id="contractor-name" 
                           value="${data?.legalName || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">ИНН</label>
                    <input type="text" class="form-control" id="contractor-inn" 
                           value="${data?.inn || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Виды работ</label>
                    <input type="text" class="form-control" id="contractor-workTypes" 
                           value="${data?.workTypes?.join(', ') || ''}" 
                           placeholder="Через запятую" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Статус</label>
                    <select class="form-control" id="contractor-status" required>
                        <option value="активен" ${data?.status === 'активен' ? 'selected' : ''}>Активен</option>
                        <option value="неактивен" ${data?.status === 'неактивен' ? 'selected' : ''}>Неактивен</option>
                    </select>
                </div>
            `;
        default:
            return '<p>Форма для этого модуля еще не реализована</p>';
    }
}

// Сохранение данных из модального окна
function saveModalData() {
    const module = appState.currentModule;
    const action = appState.currentEditingId ? 'edit' : 'add';
    
    switch(module) {
        case 'buildings':
            saveBuildingData(action);
            break;
        case 'payments':
            savePaymentData(action);
            break;
        case 'contractors':
            saveContractorData(action);
            break;
    }
    
    closeModal();
    loadModule(module);
    saveData();
}

// Сохранение данных дома
function saveBuildingData(action) {
    const newId = action === 'add' ? Math.max(...window.crmData.buildings.map(b => b.id)) + 1 : appState.currentEditingId;
    
    const buildingData = {
        id: newId,
        address: document.getElementById('building-address').value,
        floors: parseInt(document.getElementById('building-floors').value),
        apartments: parseInt(document.getElementById('building-apartments').value),
        risks: [],
        passport: { elevators: [], itp: {} }
    };
    
    if (action === 'add') {
        window.crmData.buildings.push(buildingData);
    } else {
        const index = window.crmData.buildings.findIndex(b => b.id === appState.currentEditingId);
        if (index !== -1) {
            // Сохраняем старые данные, которые не в форме
            buildingData.risks = window.crmData.buildings[index].risks;
            buildingData.passport = window.crmData.buildings[index].passport;
            window.crmData.buildings[index] = buildingData;
        }
    }
}

// Сохранение данных платежа
function savePaymentData(action) {
    const newId = action === 'add' ? Math.max(...window.crmData.payments.map(p => p.id)) + 1 : appState.currentEditingId;
    
    const paymentData = {
        id: newId,
        serviceId: parseInt(document.getElementById('payment-service').value),
        amount: parseInt(document.getElementById('payment-amount').value),
        status: document.getElementById('payment-status').value,
        date: new Date().toISOString().split('T')[0],
        payer: window.crmData.currentCompany.legalName
    };
    
    if (action === 'add') {
        window.crmData.payments.push(paymentData);
    } else {
        const index = window.crmData.payments.findIndex(p => p.id === appState.currentEditingId);
        if (index !== -1) {
            window.crmData.payments[index] = paymentData;
        }
    }
}

// Сохранение данных подрядчика
function saveContractorData(action) {
    const newId = action === 'add' ? Math.max(...window.crmData.contractors.map(c => c.id)) + 1 : appState.currentEditingId;
    
    const contractorData = {
        id: newId,
        legalName: document.getElementById('contractor-name').value,
        inn: document.getElementById('contractor-inn').value,
        workTypes: document.getElementById('contractor-workTypes').value.split(',').map(s => s.trim()),
        bankDetails: "р/с 4070281000000000000" + newId,
        status: document.getElementById('contractor-status').value
    };
    
    if (action === 'add') {
        window.crmData.contractors.push(contractorData);
    } else {
        const index = window.crmData.contractors.findIndex(c => c.id === appState.currentEditingId);
        if (index !== -1) {
            window.crmData.contractors[index] = contractorData;
        }
    }
}

// Вспомогательные функции
function getStatusText(status) {
    const statusMap = {
        'paid': 'Оплачено',
        'processing': 'В обработке',
        'charged': 'Начислено'
    };
    return statusMap[status] || status;
}

// Инициализация графика
function initChart() {
    const ctx = document.getElementById('paymentsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Начислено',
                data: [650000, 720000, 800000, 780000, 820000, 825000],
                borderColor: '#6912FF',
                backgroundColor: 'rgba(105, 18, 255, 0.1)',
                fill: true
            }, {
                label: 'Оплачено',
                data: [620000, 680000, 750000, 760000, 780000, 790000],
                borderColor: '#20C997',
                backgroundColor: 'rgba(32, 201, 151, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            height: 300
        }
    });
}

// Глобальные функции для кнопок действий
window.viewBuilding = function(id) {
    alert(`Просмотр дома #${id}`);
};

window.editBuilding = function(id) {
    openModal('buildings', 'edit', id);
};

window.deleteBuilding = function(id) {
    if (confirm('Удалить этот дом?')) {
        window.crmData.buildings = window.crmData.buildings.filter(b => b.id !== id);
        saveData();
        loadModule('buildings');
    }
};

window.editPayment = function(id) {
    openModal('payments', 'edit', id);
};

window.deletePayment = function(id) {
    if (confirm('Удалить эту запись о платеже?')) {
        window.crmData.payments = window.crmData.payments.filter(p => p.id !== id);
        saveData();
        loadModule('payments');
    }
};

window.viewContractor = function(id) {
    alert(`Просмотр подрядчика #${id}`);
};

window.editContractor = function(id) {
    openModal('contractors', 'edit', id);
};
