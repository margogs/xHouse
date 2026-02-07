    <!-- Модальное окно для добавления жильца -->
    <div id="residentModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Добавить жильца</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="residentForm">
                <div class="form-group">
                    <label for="residentName">ФИО *</label>
                    <input type="text" id="residentName" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="residentBuilding">Дом *</label>
                        <select id="residentBuilding" class="form-control" required>
                            <option value="">Выберите дом</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="residentApartment">Квартира *</label>
                        <input type="text" id="residentApartment" class="form-control" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="residentPhone">Телефон</label>
                        <input type="tel" id="residentPhone" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="residentEmail">Email</label>
                        <input type="email" id="residentEmail" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="residentCount">Количество жильцов</label>
                        <input type="number" id="residentCount" class="form-control" value="1">
                    </div>
                    <div class="form-group">
                        <label for="residentStatus">Статус</label>
                        <select id="residentStatus" class="form-control">
                            <option value="active">Активен</option>
                            <option value="inactive">Неактивен</option>
                        </select>
                    </div>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Сохранить жильца</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Модальное окно для создания обращения -->
    <div id="ticketModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Создать обращение</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="ticketForm">
                <div class="form-group">
                    <label for="ticketTitle">Название обращения *</label>
                    <input type="text" id="ticketTitle" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="ticketDescription">Описание *</label>
                    <textarea id="ticketDescription" class="form-control" rows="3" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="ticketType">Тип обращения</label>
                        <select id="ticketType" class="form-control">
                            <option value="ремонт">Ремонт</option>
                            <option value="электрика">Электрика</option>
                            <option value="водопровод">Водопровод</option>
                            <option value="уборка">Уборка</option>
                            <option value="отопление">Отопление</option>
                            <option value="другое">Другое</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ticketPriority">Приоритет</label>
                        <select id="ticketPriority" class="form-control">
                            <option value="low">Низкий</option>
                            <option value="medium" selected>Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="ticketBuilding">Дом *</label>
                        <select id="ticketBuilding" class="form-control" required>
                            <option value="">Выберите дом</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ticketResident">Жилец</label>
                        <select id="ticketResident" class="form-control">
                            <option value="">Выберите жильца</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ticketAssignee">Ответственный</label>
                    <select id="ticketAssignee" class="form-control">
                        <option value="">Выберите ответственного</option>
                    </select>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Создать обращение</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Модальное окно для добавления услуги -->
    <div id="serviceModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Добавить услугу</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="serviceForm">
                <div class="form-group">
                    <label for="serviceName">Название услуги *</label>
                    <input type="text" id="serviceName" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="serviceType">Тип услуги</label>
                        <select id="serviceType" class="form-control">
                            <option value="main">Основная</option>
                            <option value="additional">Дополнительная</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="serviceTariff">Тариф (₽) *</label>
                        <input type="number" id="serviceTariff" class="form-control" step="0.01" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="servicePeriod">Период оплаты</label>
                        <select id="servicePeriod" class="form-control">
                            <option value="monthly">Ежемесячно</option>
                            <option value="on-demand">По требованию</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="serviceSLA">SLA (время реагирования)</label>
                        <input type="text" id="serviceSLA" class="form-control" placeholder="Например: 24 часа">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="serviceBuilding">Дом *</label>
                        <select id="serviceBuilding" class="form-control" required>
                            <option value="">Выберите дом</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="serviceContractor">Подрядчик</label>
                        <select id="serviceContractor" class="form-control">
                            <option value="">Выберите подрядчика</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="serviceDescription">Описание услуги</label>
                    <textarea id="serviceDescription" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Сохранить услугу</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Модальное окно для добавления подрядчика -->
    <div id="contractorModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Добавить подрядчика</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="contractorForm">
                <div class="form-group">
                    <label for="contractorName">Название организации *</label>
                    <input type="text" id="contractorName" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="contractorINN">ИНН *</label>
                        <input type="text" id="contractorINN" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="contractorStatus">Статус</label>
                        <select id="contractorStatus" class="form-control">
                            <option value="активен">Активен</option>
                            <option value="на проверке">На проверке</option>
                            <option value="приостановлен">Приостановлен</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="contractorWorkTypes">Виды работ (через запятую)</label>
                    <input type="text" id="contractorWorkTypes" class="form-control" placeholder="Например: уборка территории, ремонт">
                </div>
                <div class="form-group">
                    <label for="contractorBankDetails">Банковские реквизиты</label>
                    <textarea id="contractorBankDetails" class="form-control" rows="3" placeholder="Банк, р/с, БИК и т.д."></textarea>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Сохранить подрядчика</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Модальное окно для добавления документа -->
    <div id="documentModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Добавить документ</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="documentForm">
                <div class="form-group">
                    <label for="documentName">Название документа *</label>
                    <input type="text" id="documentName" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="documentType">Тип документа</label>
                        <select id="documentType" class="form-control">
                            <option value="договор">Договор</option>
                            <option value="акт">Акт</option>
                            <option value="лицензия">Лицензия</option>
                            <option value="отчет">Отчет</option>
                            <option value="смета">Смета</option>
                            <option value="другое">Другое</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="documentCategory">Категория</label>
                        <select id="documentCategory" class="form-control">
                            <option value="contracts">Договоры</option>
                            <option value="acts">Акты</option>
                            <option value="licenses">Лицензии</option>
                            <option value="reports">Отчеты</option>
                            <option value="estimates">Сметы</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="documentStatus">Статус</label>
                        <select id="documentStatus" class="form-control">
                            <option value="pending">Ожидает подписи</option>
                            <option value="signed">Подписан</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="documentDate">Дата документа</label>
                        <input type="date" id="documentDate" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label for="documentFile">Файл документа</label>
                    <input type="file" id="documentFile" class="form-control">
                    <small style="color: var(--gray-700);">В демо-версии файл не загружается, только добавляется запись</small>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Добавить документ</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Модальное окно для редактирования реквизитов -->
    <div id="requisitesModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Редактировать реквизиты</h3>
                <button class="close-modal">&times;</button>
            </div>
            <form id="requisitesForm">
                <div class="form-group">
                    <label for="requisitesBank">Название банка *</label>
                    <input type="text" id="requisitesBank" class="form-control" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="requisitesAccount">Расчетный счет *</label>
                        <input type="text" id="requisitesAccount" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="requisitesCorrAccount">Корреспондентский счет *</label>
                        <input type="text" id="requisitesCorrAccount" class="form-control" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="requisitesBIK">БИК банка *</label>
                        <input type="text" id="requisitesBIK" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="requisitesINN">ИНН *</label>
                        <input type="text" id="requisitesINN" class="form-control" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="requisitesKPP">КПП</label>
                    <input type="text" id="requisitesKPP" class="form-control">
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn btn-primary">Сохранить реквизиты</button>
                    <button type="button" class="btn btn-secondary close-modal">Отмена</button>
                </div>
            </form>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
