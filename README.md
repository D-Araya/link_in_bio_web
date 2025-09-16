# Link in Bio Website 🔗

Una aplicación web moderna de "link in bio" construida con React, TypeScript, Vite y completamente dockerizada para desarrollo, testing y producción.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Desarrollo](#-desarrollo)
- [Testing](#-testing)
- [Docker](#-docker)
- [Producción](#-producción)
- [Despliegue](#-despliegue)
- [Componentes](#-componentes)
- [Scripts Disponibles](#-scripts-disponibles)
- [Contribución](#-contribución)

## ✨ Características

- 🎨 **Interfaz moderna y responsive** con diseño minimalista
- 👤 **Avatar personalizable** con efectos hover
- 🔗 **Botones de enlaces** con iconos y animaciones
- 🐳 **Completamente dockerizado** con configuración multi-stage
- 🧪 **Testing completo** con Vitest y React Testing Library
- ⚡ **Desarrollo rápido** con Vite y Hot Module Replacement
- 📱 **Responsive design** optimizado para móviles y desktop
- 🔧 **TypeScript** para mayor seguridad de tipos
- 🎯 **ESLint** configurado para mejores prácticas

## 🛠 Tecnologías

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y dev server ultrarrápido
- **CSS3** - Estilos modernos con flexbox y animaciones

### Testing
- **Vitest** - Framework de testing rápido y moderno
- **React Testing Library** - Utilidades para testing de componentes React
- **@testing-library/jest-dom** - Matchers adicionales para DOM
- **jsdom** - Implementación de DOM para Node.js

### DevOps
- **Docker** - Containerización con multi-stage builds
- **Docker Compose** - Orquestación de servicios
- **Nginx** - Servidor web para producción
- **GitHub Actions** - CI/CD automatizado
- **GitHub Pages** - Hosting gratuito
- **GitHub Container Registry** - Registro de imágenes Docker
- **ESLint** - Linting y análisis estático de código

## 📁 Estructura del Proyecto

```
link-in-bio-website/
├── 📁 public/
│   └── logo_rastro_sureno.jpg     # Logo/avatar de la aplicación
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Avatar.tsx              # Componente de avatar
│   │   ├── LinkButton.tsx          # Componente de botón de enlace
│   │   └── 📁 __tests__/
│   │       ├── Avatar.test.tsx     # Tests del componente Avatar
│   │       └── LinkButton.test.tsx # Tests del componente LinkButton
│   ├── 📁 test/
│   │   └── setup.ts                # Configuración global de tests
│   ├── 📁 __tests__/
│   │   └── App.test.tsx            # Tests de integración de App
│   ├── App.tsx                     # Componente principal
│   ├── main.tsx                    # Punto de entrada
│   ├── index.css                   # Estilos globales
│   └── vite-env.d.ts              # Tipos de Vite
├── 📄 Dockerfile                   # Configuración Docker multi-stage
├── 📄 docker-compose.yml          # Orquestación de servicios
├── 📄 DOCKER.md                    # Guía completa de Docker
├── 📄 package.json                # Dependencias y scripts
├── 📄 vite.config.ts              # Configuración de Vite
├── 📄 vitest.config.ts            # Configuración de Vitest
├── 📄 tsconfig.json               # Configuración de TypeScript
└── 📄 eslint.config.js            # Configuración de ESLint
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 20+ (si ejecutas localmente)
- Docker y Docker Compose (recomendado)
- Git

### Clonar el Repositorio
```bash
git clone <repository-url>
cd link-in-bio-website
```

### Opción 1: Desarrollo con Docker (Recomendado)
```bash
# Construir y ejecutar en modo desarrollo
docker-compose up --build app

# La aplicación estará disponible en http://localhost:5173
```

### Opción 2: Desarrollo Local
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 💻 Desarrollo

### Comandos de Desarrollo

```bash
# Desarrollo con Docker
docker-compose up app

# Desarrollo local
npm run dev

# Linting
npm run lint

# Preview de build
npm run preview
```

### Hot Module Replacement
Vite proporciona HMR automático. Los cambios en el código se reflejan instantáneamente en el navegador sin perder el estado de la aplicación.

### Estructura de Componentes

La aplicación sigue una arquitectura de componentes modular:

- **App.tsx**: Componente principal que orquesta la aplicación
- **Avatar.tsx**: Componente reutilizable para mostrar avatar con efectos
- **LinkButton.tsx**: Componente para botones de enlaces con iconos

## 🧪 Testing

### Framework de Testing
Utilizamos **Vitest** con **React Testing Library** para un testing moderno y eficiente.

### Ejecutar Tests

```bash
# Tests con Docker
docker-compose --profile testing run --rm test

# Tests con coverage
docker-compose --profile testing run --rm test-coverage

# Tests en modo watch
docker-compose --profile testing run --rm test-watch

# Tests locales
npm test
npm run test:coverage
npm run test:ui
```

### Cobertura de Tests
- ✅ **Avatar.tsx**: Tests de renderizado, props y interacciones
- ✅ **LinkButton.tsx**: Tests de renderizado, enlaces y accesibilidad
- ✅ **App.tsx**: Tests de integración y renderizado completo

### Configuración de Tests
- **vitest.config.ts**: Configuración principal de Vitest
- **src/test/setup.ts**: Setup global con mocks y configuraciones
- **@testing-library/jest-dom**: Matchers adicionales para DOM

## 🐳 Docker

### Arquitectura Multi-Stage
El proyecto utiliza un Dockerfile multi-stage optimizado:

1. **base**: Imagen base con Node.js y dependencias del sistema
2. **development**: Configuración para desarrollo con volúmenes
3. **testing**: Entorno aislado para ejecutar tests
4. **testing-coverage**: Tests con reportes de cobertura
5. **build**: Construcción optimizada para producción
6. **production**: Servidor Nginx con archivos estáticos

### Servicios Disponibles

```bash
# Desarrollo
docker-compose up app

# Testing
docker-compose --profile testing run test
docker-compose --profile testing run test-coverage
docker-compose --profile testing run test-watch

# Build de producción
docker-compose --profile build run build

# Producción con Nginx
docker-compose --profile production up production
```

### Gestión de Volúmenes
- **Código fuente**: Montado como volumen para desarrollo
- **node_modules**: Volumen persistente para mejor rendimiento
- **Builds**: Volúmenes para artefactos de construcción

Para más detalles, consulta [DOCKER.md](./DOCKER.md).

## 🌐 Producción

### Build de Producción
```bash
# Con Docker
docker-compose --profile build run build

# Local
npm run build
```

### Despliegue
```bash
# Servidor de producción con Nginx
docker-compose --profile production up -d production

# Preview local del build
npm run preview
```

### Optimizaciones
- **Tree shaking** automático con Vite
- **Minificación** de CSS y JavaScript
- **Compresión gzip** en Nginx
- **Caché de assets** optimizado
- **Lazy loading** de componentes

## 🚀 Despliegue

### GitHub Pages + GitHub Actions (Recomendado)

Esta aplicación está configurada para desplegarse automáticamente usando herramientas gratuitas de GitHub:

#### Características del Despliegue
- ✅ **CI/CD Automático** con GitHub Actions
- ✅ **Hosting Gratuito** en GitHub Pages
- ✅ **Docker Registry** en GitHub Container Registry
- ✅ **HTTPS** por defecto
- ✅ **Deploy automático** en cada push a main

#### Configuración Rápida

1. **Subir código a GitHub:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages:**
   - Ir a Settings → Pages
   - Source: "GitHub Actions"

3. **Configurar permisos:**
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

4. **Actualizar configuración:**
   ```javascript
   // En vite.config.js, línea 28:
   config.base = '/TU_REPOSITORIO/'
   ```

#### URLs de Despliegue
- **Aplicación:** `https://TU_USUARIO.github.io/TU_REPOSITORIO/`
- **Actions:** `https://github.com/TU_USUARIO/TU_REPOSITORIO/actions`
- **Docker:** `ghcr.io/TU_USUARIO/TU_REPOSITORIO:latest`

#### Workflow Automático
Cada push a `main` ejecuta:
1. 🧪 **Tests** y linting
2. 🏗️ **Build** de la aplicación
3. 🚀 **Deploy** a GitHub Pages
4. 🐳 **Build** y push de imagen Docker

### Otras Opciones de Despliegue

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker en cualquier servidor
```bash
# Usar imagen de GitHub Container Registry
docker run -p 80:80 ghcr.io/TU_USUARIO/TU_REPOSITORIO:latest

# O build local
docker-compose --profile production up -d production
```

📖 **Para guía detallada:** Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧩 Componentes

### Avatar
```typescript
interface AvatarProps {
  src: string;      // URL de la imagen
  alt: string;      // Texto alternativo
  name: string;     // Nombre a mostrar
}
```

**Características:**
- Imagen circular con efectos hover
- Animaciones suaves de escala
- Texto de nombre estilizado
- Responsive design

### LinkButton
```typescript
interface LinkButtonProps {
  href: string;     // URL de destino
  icon: string;     // Emoji o icono
  text: string;     // Texto del botón
}
```

**Características:**
- Botones con iconos y texto
- Efectos hover y animaciones
- Enlaces externos seguros (target="_blank")
- Diseño responsive

## 📜 Scripts Disponibles

```json
{
  "dev": "vite --host 0.0.0.0",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview --host 0.0.0.0",
  "test": "vitest",
  "test:coverage": "vitest --coverage",
  "test:ui": "vitest --ui",
  "test:run": "vitest run"
}
```

## 🤝 Contribución

### Flujo de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Desarrollar con tests: `npm test`
4. Commit con mensajes descriptivos
5. Push y crear Pull Request

### Estándares de Código
- **ESLint**: Configurado para React y TypeScript
- **Prettier**: Formateo automático de código
- **TypeScript**: Tipado estricto obligatorio
- **Tests**: Cobertura mínima del 80%

### Testing en CI/CD
```bash
# Verificar que todos los tests pasen
docker-compose --profile testing run --rm test

# Verificar cobertura
docker-compose --profile testing run --rm test-coverage

# Build de producción
docker-compose --profile build run --rm build
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la [documentación de Docker](./DOCKER.md)
2. Verifica que Docker esté ejecutándose
3. Asegúrate de tener las versiones correctas de Node.js
4. Ejecuta `docker-compose down && docker-compose up --build app` para reiniciar

---

**Desarrollado con ❤️ usando React, TypeScript, Vite y Docker**
