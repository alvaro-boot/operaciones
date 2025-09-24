// Datos de ejemplo para el micro frontend
const sampleData = {
    inventory: [
        { id: 'INV-001', code: 'MAT-001', description: 'Material A - Acero Inoxidable', category: 'materia-prima', stock: 150, minStock: 50, status: 'normal' },
        { id: 'INV-002', code: 'PROD-001', description: 'Producto Terminado A', category: 'producto-terminado', stock: 25, minStock: 30, status: 'low' },
        { id: 'INV-003', code: 'HERR-001', description: 'Herramienta de Corte', category: 'herramientas', stock: 8, minStock: 10, status: 'low' },
        { id: 'INV-004', code: 'EQ-001', description: 'Equipo de Medición', category: 'equipos', stock: 3, minStock: 5, status: 'low' },
        { id: 'INV-005', code: 'MAT-002', description: 'Material B - Aluminio', category: 'materia-prima', stock: 200, minStock: 75, status: 'normal' }
    ],
    shipments: [
        { id: 'ENT-001', destination: 'Cliente A - Zona Norte', status: 'pending', date: '2024-01-15' },
        { id: 'ENT-002', destination: 'Cliente B - Zona Sur', status: 'in-transit', date: '2024-01-15' },
        { id: 'ENT-003', destination: 'Cliente C - Zona Este', status: 'delivered', date: '2024-01-14' }
    ],
    productionOrders: [
        { id: 'ORD-001', product: 'Widget A', line: 'A', progress: 75, efficiency: 85 },
        { id: 'ORD-002', product: 'Widget B', line: 'B', progress: 45, efficiency: 92 },
        { id: 'ORD-003', product: 'Widget C', line: 'C', progress: 0, efficiency: 0 }
    ],
    qualityInspections: [
        { id: 'INS-001', product: 'Widget A', status: 'approved', date: '2024-01-15' },
        { id: 'INS-002', product: 'Widget B', status: 'rejected', date: '2024-01-15' },
        { id: 'INS-003', product: 'Widget C', status: 'pending', date: '2024-01-15' }
    ],
    maintenance: [
        { equipment: 'Línea A - Motor Principal', date: '2024-01-15', type: 'Preventivo', status: 'scheduled' },
        { equipment: 'Línea B - Sistema Hidráulico', date: '2024-01-20', type: 'Correctivo', status: 'scheduled' },
        { equipment: 'Línea C', date: '2024-01-14', type: 'Correctivo', status: 'in-progress' }
    ]
};

// Estado de la aplicación
let currentTab = 'dashboard';
let filteredInventory = [...sampleData.inventory];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadDashboardData();
    loadInventoryData();
    setupEventListeners();
    startRealTimeUpdates();
});

// Configurar event listeners
function setupEventListeners() {
    // Navegación por tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Filtros de inventario
    const searchInput = document.getElementById('search-inventory');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterInventory);
    }

    // Cerrar modal al hacer clic fuera
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
}

// Inicializar la aplicación
function initializeApp() {
    console.log('Micro Frontend de Operaciones inicializado');
    updateDateTime();
    setInterval(updateDateTime, 60000); // Actualizar cada minuto
}

// Actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Si hay un elemento para mostrar la fecha/hora, actualizarlo
    const dateTimeElement = document.querySelector('.date-time');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Cambiar de tab
function switchTab(tabId) {
    // Remover clase active de todos los tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar el tab seleccionado
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    currentTab = tabId;
    
    // Cargar datos específicos del tab
    switch(tabId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'inventario':
            loadInventoryData();
            break;
        case 'logistica':
            loadLogisticsData();
            break;
        case 'produccion':
            loadProductionData();
            break;
        case 'calidad':
            loadQualityData();
            break;
        case 'mantenimiento':
            loadMaintenanceData();
            break;
    }
}

// Cargar datos del dashboard
function loadDashboardData() {
    // Actualizar métricas en tiempo real
    updateMetrics();
    
    // Actualizar estado de líneas de producción
    updateProductionStatus();
    
    // Actualizar alertas
    updateAlerts();
}

// Actualizar métricas
function updateMetrics() {
    const totalProcessed = sampleData.productionOrders.reduce((sum, order) => sum + order.progress, 0);
    const avgEfficiency = sampleData.productionOrders.reduce((sum, order) => sum + order.efficiency, 0) / sampleData.productionOrders.length;
    const activeOrders = sampleData.productionOrders.filter(order => order.progress > 0 && order.progress < 100).length;
    
    // Actualizar valores en el DOM si existen
    const efficiencyElement = document.querySelector('.metric-value');
    if (efficiencyElement) {
        efficiencyElement.textContent = `${Math.round(avgEfficiency)}%`;
    }
}

// Actualizar estado de producción
function updateProductionStatus() {
    // Esta función se ejecutará en tiempo real
    console.log('Actualizando estado de producción...');
}

// Actualizar alertas
function updateAlerts() {
    const lowStockItems = sampleData.inventory.filter(item => item.status === 'low');
    const alertsContainer = document.querySelector('.card-body');
    
    if (alertsContainer && lowStockItems.length > 0) {
        // Crear alertas dinámicamente si es necesario
        console.log('Alertas de stock bajo:', lowStockItems);
    }
}

// Cargar datos de inventario
function loadInventoryData() {
    const tbody = document.getElementById('inventory-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    filteredInventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.description}</td>
            <td>${getCategoryName(item.category)}</td>
            <td>${item.stock}</td>
            <td>${item.minStock}</td>
            <td><span class="status-badge ${item.status}">${getStatusText(item.status)}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editInventoryItem('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-secondary" onclick="deleteInventoryItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filtrar inventario
function filterInventory() {
    const searchTerm = document.getElementById('search-inventory').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    
    filteredInventory = sampleData.inventory.filter(item => {
        const matchesSearch = item.description.toLowerCase().includes(searchTerm) || 
                             item.code.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    loadInventoryData();
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const categories = {
        'materia-prima': 'Materia Prima',
        'producto-terminado': 'Producto Terminado',
        'herramientas': 'Herramientas',
        'equipos': 'Equipos'
    };
    return categories[category] || category;
}

// Obtener texto de estado
function getStatusText(status) {
    const statuses = {
        'normal': 'Normal',
        'low': 'Stock Bajo',
        'out': 'Sin Stock'
    };
    return statuses[status] || status;
}

// Cargar datos de logística
function loadLogisticsData() {
    console.log('Cargando datos de logística...');
    // Implementar lógica específica de logística
}

// Cargar datos de producción
function loadProductionData() {
    console.log('Cargando datos de producción...');
    // Implementar lógica específica de producción
}

// Cargar datos de calidad
function loadQualityData() {
    console.log('Cargando datos de calidad...');
    // Implementar lógica específica de calidad
}

// Cargar datos de mantenimiento
function loadMaintenanceData() {
    console.log('Cargando datos de mantenimiento...');
    // Implementar lógica específica de mantenimiento
}

// Funciones de modal
function showModal(title, content) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

// Modal para agregar item de inventario
function showAddItemModal() {
    const content = `
        <form id="add-item-form">
            <div class="form-group">
                <label for="item-code">Código:</label>
                <input type="text" id="item-code" required>
            </div>
            <div class="form-group">
                <label for="item-description">Descripción:</label>
                <input type="text" id="item-description" required>
            </div>
            <div class="form-group">
                <label for="item-category">Categoría:</label>
                <select id="item-category" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="materia-prima">Materia Prima</option>
                    <option value="producto-terminado">Producto Terminado</option>
                    <option value="herramientas">Herramientas</option>
                    <option value="equipos">Equipos</option>
                </select>
            </div>
            <div class="form-group">
                <label for="item-stock">Stock Actual:</label>
                <input type="number" id="item-stock" min="0" required>
            </div>
            <div class="form-group">
                <label for="item-min-stock">Stock Mínimo:</label>
                <input type="number" id="item-min-stock" min="0" required>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Agregar Item</button>
            </div>
        </form>
    `;
    
    showModal('Agregar Item al Inventario', content);
    
    // Configurar el formulario
    const form = document.getElementById('add-item-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addInventoryItem();
        });
    }
}

// Agregar item de inventario
function addInventoryItem() {
    const code = document.getElementById('item-code').value;
    const description = document.getElementById('item-description').value;
    const category = document.getElementById('item-category').value;
    const stock = parseInt(document.getElementById('item-stock').value);
    const minStock = parseInt(document.getElementById('item-min-stock').value);
    
    const newItem = {
        id: `INV-${Date.now()}`,
        code: code,
        description: description,
        category: category,
        stock: stock,
        minStock: minStock,
        status: stock <= minStock ? 'low' : 'normal'
    };
    
    sampleData.inventory.push(newItem);
    filteredInventory = [...sampleData.inventory];
    loadInventoryData();
    closeModal();
    
    showNotification('Item agregado exitosamente', 'success');
}

// Editar item de inventario
function editInventoryItem(itemId) {
    const item = sampleData.inventory.find(i => i.id === itemId);
    if (!item) return;
    
    const content = `
        <form id="edit-item-form">
            <div class="form-group">
                <label for="edit-item-code">Código:</label>
                <input type="text" id="edit-item-code" value="${item.code}" required>
            </div>
            <div class="form-group">
                <label for="edit-item-description">Descripción:</label>
                <input type="text" id="edit-item-description" value="${item.description}" required>
            </div>
            <div class="form-group">
                <label for="edit-item-category">Categoría:</label>
                <select id="edit-item-category" required>
                    <option value="materia-prima" ${item.category === 'materia-prima' ? 'selected' : ''}>Materia Prima</option>
                    <option value="producto-terminado" ${item.category === 'producto-terminado' ? 'selected' : ''}>Producto Terminado</option>
                    <option value="herramientas" ${item.category === 'herramientas' ? 'selected' : ''}>Herramientas</option>
                    <option value="equipos" ${item.category === 'equipos' ? 'selected' : ''}>Equipos</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-item-stock">Stock Actual:</label>
                <input type="number" id="edit-item-stock" value="${item.stock}" min="0" required>
            </div>
            <div class="form-group">
                <label for="edit-item-min-stock">Stock Mínimo:</label>
                <input type="number" id="edit-item-min-stock" value="${item.minStock}" min="0" required>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </div>
        </form>
    `;
    
    showModal('Editar Item del Inventario', content);
    
    const form = document.getElementById('edit-item-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            updateInventoryItem(itemId);
        });
    }
}

// Actualizar item de inventario
function updateInventoryItem(itemId) {
    const itemIndex = sampleData.inventory.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;
    
    const code = document.getElementById('edit-item-code').value;
    const description = document.getElementById('edit-item-description').value;
    const category = document.getElementById('edit-item-category').value;
    const stock = parseInt(document.getElementById('edit-item-stock').value);
    const minStock = parseInt(document.getElementById('edit-item-min-stock').value);
    
    sampleData.inventory[itemIndex] = {
        ...sampleData.inventory[itemIndex],
        code: code,
        description: description,
        category: category,
        stock: stock,
        minStock: minStock,
        status: stock <= minStock ? 'low' : 'normal'
    };
    
    filteredInventory = [...sampleData.inventory];
    loadInventoryData();
    closeModal();
    
    showNotification('Item actualizado exitosamente', 'success');
}

// Eliminar item de inventario
function deleteInventoryItem(itemId) {
    if (confirm('¿Está seguro de que desea eliminar este item?')) {
        sampleData.inventory = sampleData.inventory.filter(i => i.id !== itemId);
        filteredInventory = [...sampleData.inventory];
        loadInventoryData();
        showNotification('Item eliminado exitosamente', 'success');
    }
}

// Modal para agregar envío
function showAddShipmentModal() {
    const content = `
        <form id="add-shipment-form">
            <div class="form-group">
                <label for="shipment-destination">Destino:</label>
                <input type="text" id="shipment-destination" required>
            </div>
            <div class="form-group">
                <label for="shipment-date">Fecha de Entrega:</label>
                <input type="date" id="shipment-date" required>
            </div>
            <div class="form-group">
                <label for="shipment-notes">Notas:</label>
                <textarea id="shipment-notes" rows="3"></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear Envío</button>
            </div>
        </form>
    `;
    
    showModal('Nueva Entrega', content);
    
    const form = document.getElementById('add-shipment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addShipment();
        });
    }
}

// Agregar envío
function addShipment() {
    const destination = document.getElementById('shipment-destination').value;
    const date = document.getElementById('shipment-date').value;
    const notes = document.getElementById('shipment-notes').value;
    
    const newShipment = {
        id: `ENT-${Date.now()}`,
        destination: destination,
        status: 'pending',
        date: date,
        notes: notes
    };
    
    sampleData.shipments.push(newShipment);
    closeModal();
    showNotification('Envío creado exitosamente', 'success');
}

// Modal para agregar orden de producción
function showAddOrderModal() {
    const content = `
        <form id="add-order-form">
            <div class="form-group">
                <label for="order-product">Producto:</label>
                <input type="text" id="order-product" required>
            </div>
            <div class="form-group">
                <label for="order-line">Línea de Producción:</label>
                <select id="order-line" required>
                    <option value="">Seleccionar línea</option>
                    <option value="A">Línea A</option>
                    <option value="B">Línea B</option>
                    <option value="C">Línea C</option>
                </select>
            </div>
            <div class="form-group">
                <label for="order-quantity">Cantidad:</label>
                <input type="number" id="order-quantity" min="1" required>
            </div>
            <div class="form-group">
                <label for="order-priority">Prioridad:</label>
                <select id="order-priority" required>
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear Orden</button>
            </div>
        </form>
    `;
    
    showModal('Nueva Orden de Producción', content);
    
    const form = document.getElementById('add-order-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addProductionOrder();
        });
    }
}

// Agregar orden de producción
function addProductionOrder() {
    const product = document.getElementById('order-product').value;
    const line = document.getElementById('order-line').value;
    const quantity = parseInt(document.getElementById('order-quantity').value);
    const priority = document.getElementById('order-priority').value;
    
    const newOrder = {
        id: `ORD-${Date.now()}`,
        product: product,
        line: line,
        quantity: quantity,
        priority: priority,
        progress: 0,
        efficiency: 0
    };
    
    sampleData.productionOrders.push(newOrder);
    closeModal();
    showNotification('Orden de producción creada exitosamente', 'success');
}

// Modal para programar mantenimiento
function showAddMaintenanceModal() {
    const content = `
        <form id="add-maintenance-form">
            <div class="form-group">
                <label for="maintenance-equipment">Equipo:</label>
                <input type="text" id="maintenance-equipment" required>
            </div>
            <div class="form-group">
                <label for="maintenance-date">Fecha Programada:</label>
                <input type="date" id="maintenance-date" required>
            </div>
            <div class="form-group">
                <label for="maintenance-type">Tipo de Mantenimiento:</label>
                <select id="maintenance-type" required>
                    <option value="Preventivo">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                    <option value="Predictivo">Predictivo</option>
                </select>
            </div>
            <div class="form-group">
                <label for="maintenance-description">Descripción:</label>
                <textarea id="maintenance-description" rows="3" required></textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button type="submit" class="btn btn-primary">Programar Mantenimiento</button>
            </div>
        </form>
    `;
    
    showModal('Programar Mantenimiento', content);
    
    const form = document.getElementById('add-maintenance-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addMaintenance();
        });
    }
}

// Agregar mantenimiento
function addMaintenance() {
    const equipment = document.getElementById('maintenance-equipment').value;
    const date = document.getElementById('maintenance-date').value;
    const type = document.getElementById('maintenance-type').value;
    const description = document.getElementById('maintenance-description').value;
    
    const newMaintenance = {
        equipment: equipment,
        date: date,
        type: type,
        description: description,
        status: 'scheduled'
    };
    
    sampleData.maintenance.push(newMaintenance);
    closeModal();
    showNotification('Mantenimiento programado exitosamente', 'success');
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Actualizaciones en tiempo real
function startRealTimeUpdates() {
    // Simular actualizaciones cada 30 segundos
    setInterval(() => {
        updateRealTimeData();
    }, 30000);
}

// Actualizar datos en tiempo real
function updateRealTimeData() {
    // Simular cambios en los datos
    sampleData.productionOrders.forEach(order => {
        if (order.progress < 100 && Math.random() > 0.7) {
            order.progress = Math.min(100, order.progress + Math.floor(Math.random() * 10));
            order.efficiency = Math.max(0, Math.min(100, order.efficiency + (Math.random() - 0.5) * 5));
        }
    });
    
    // Actualizar la vista si estamos en el tab de producción
    if (currentTab === 'produccion') {
        loadProductionData();
    }
    
    // Actualizar métricas del dashboard
    if (currentTab === 'dashboard') {
        updateMetrics();
    }
}

// Funciones de utilidad
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

// Exportar funciones para uso global
window.switchTab = switchTab;
window.showAddItemModal = showAddItemModal;
window.showAddShipmentModal = showAddShipmentModal;
window.showAddOrderModal = showAddOrderModal;
window.showAddMaintenanceModal = showAddMaintenanceModal;
window.closeModal = closeModal;
window.editInventoryItem = editInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;

// Agregar estilos CSS para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .status-badge.normal {
        background-color: #d4edda;
        color: #155724;
    }
    
    .status-badge.low {
        background-color: #fff3cd;
        color: #856404;
    }
    
    .status-badge.out {
        background-color: #f8d7da;
        color: #721c24;
    }
`;
document.head.appendChild(style);
