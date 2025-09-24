# Micro Frontend de Operaciones

Un micro frontend moderno para la gestión de operaciones industriales, construido con HTML, CSS y JavaScript puro.

## 🚀 Características

- **Dashboard en Tiempo Real**: Métricas y estado de operaciones
- **Gestión de Inventario**: Control completo de stock y materiales
- **Logística**: Seguimiento de entregas y rutas
- **Producción**: Monitoreo de líneas de producción
- **Control de Calidad**: Inspecciones y métricas de calidad
- **Mantenimiento**: Programación y seguimiento de mantenimientos

## 📋 Módulos Incluidos

### 1. Dashboard
- Métricas generales de eficiencia
- Estado en tiempo real de líneas de producción
- Alertas y notificaciones
- Indicadores de rendimiento

### 2. Inventario
- Gestión completa de stock
- Categorización de productos
- Alertas de stock bajo
- Búsqueda y filtrado avanzado

### 3. Logística
- Seguimiento de entregas
- Gestión de rutas
- Estados de envío
- Programación de entregas

### 4. Producción
- Monitoreo de líneas de producción
- Órdenes de producción
- Métricas de eficiencia
- Control de progreso

### 5. Control de Calidad
- Inspecciones de productos
- Métricas de calidad
- Reportes de rechazos
- Tasa de aprobación

### 6. Mantenimiento
- Programación de mantenimientos
- Tipos de mantenimiento (Preventivo, Correctivo, Predictivo)
- Estado de equipos
- Historial de mantenimientos

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Responsive Design**: Compatible con dispositivos móviles

## 🚀 Instalación y Uso

### Opción 1: Servidor Python (Recomendado)
```bash
# Navegar a la carpeta del proyecto
cd operaciones

# Iniciar servidor local
python -m http.server 8080

# Abrir en el navegador
http://localhost:8080
```

### Opción 2: Node.js con serve
```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm run serve

# O usar directamente
npx serve -s . -l 8080
```

### Opción 3: Cualquier servidor web
Simplemente sirve los archivos estáticos desde cualquier servidor web (Apache, Nginx, etc.)

## 📁 Estructura del Proyecto

```
operaciones/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── package.json        # Configuración del proyecto
├── README.md          # Documentación
└── assets/            # Recursos adicionales (si los hay)
```

## 🎨 Características de Diseño

- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Tema Moderno**: Gradientes y sombras para una apariencia profesional
- **Navegación por Tabs**: Interfaz intuitiva y organizada
- **Modales Interactivos**: Formularios para agregar/editar datos
- **Notificaciones**: Feedback visual para acciones del usuario
- **Animaciones Suaves**: Transiciones y efectos visuales

## 🔧 Funcionalidades Principales

### Gestión de Datos
- CRUD completo para inventario
- Formularios de validación
- Búsqueda y filtrado en tiempo real
- Persistencia de datos en memoria

### Interfaz de Usuario
- Navegación fluida entre módulos
- Modales para formularios
- Notificaciones de estado
- Indicadores visuales de estado

### Tiempo Real
- Actualizaciones automáticas de métricas
- Simulación de datos en tiempo real
- Estados dinámicos de equipos
- Alertas automáticas

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluciones**: Desde 320px hasta 4K

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Producción
```bash
npm run build
# Los archivos estáticos están listos para desplegar
```

### Integración con Micro Frontend
Este micro frontend puede integrarse fácilmente con:
- Single-SPA
- Module Federation
- iframe embedding
- Web Components

## 🔒 Seguridad

- Validación de formularios en el frontend
- Sanitización de datos de entrada
- Prevención de XSS básica
- Estructura segura de datos

## 📊 Datos de Ejemplo

El micro frontend incluye datos de ejemplo para demostrar todas las funcionalidades:
- Items de inventario
- Órdenes de producción
- Envíos y entregas
- Inspecciones de calidad
- Programas de mantenimiento

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@empresa.com
- Documentación: [Wiki del proyecto](https://github.com/empresa/operaciones-microfrontend/wiki)

## 🔄 Actualizaciones Futuras

- [ ] Integración con APIs reales
- [ ] Autenticación y autorización
- [ ] Exportación de reportes
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Internacionalización (i18n)
- [ ] Temas personalizables
- [ ] Dashboard personalizable

---

**Desarrollado con ❤️ para la gestión eficiente de operaciones industriales**
