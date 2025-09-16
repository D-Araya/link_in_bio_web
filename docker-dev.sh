#!/bin/bash
# docker-dev.sh - Helper script para Rastro Sureño Link in Bio
# Facilita el uso de Docker Compose para diferentes escenarios

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner del proyecto
print_banner() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE} 🧀 Rastro Sureño Link in Bio - Docker Helper${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo
}

# Función para mostrar ayuda
show_help() {
    cat << EOF
📋 Uso: $0 [comando]

🚀 Comandos Principales:
  dev         Inicia entorno de desarrollo (puerto 5173)
  build       Construye la aplicación para producción
  prod        Inicia servidor de producción con Nginx (puerto 80)
  prod-local  Inicia servidor de producción local (puerto 8080)

🧪 Comandos de Testing:
  test        Ejecuta todos los tests
  test-watch  Ejecuta tests en modo watch
  test-cov    Ejecuta tests con reporte de cobertura
  test-ui     Abre interfaz web de Vitest (puerto 51204)

🛠️  Comandos de Mantenimiento:
  clean       Limpia contenedores, volúmenes e imágenes
  logs        Muestra logs en tiempo real
  shell       Abre shell en el contenedor de desarrollo
  status      Muestra estado de servicios
  
❓ Comandos de Información:
  help        Muestra esta ayuda
  version     Muestra información de versión

📖 Ejemplos:
  $0 dev              # Desarrollo normal
  $0 test-cov         # Tests con cobertura
  $0 prod-local       # Producción local en puerto 8080
  $0 clean            # Limpiar todo
EOF
}

# Función para setear variables de entorno
set_build_vars() {
    export BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
    export VCS_REF=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    export VERSION=$(git describe --tags --always 2>/dev/null || echo "dev")
}

# Función para verificar dependencias
check_dependencies() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker no está instalado${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose no está instalado${NC}"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${YELLOW}⚠️  Git no está disponible, usando valores por defecto${NC}"
    fi
}

# Función principal
main() {
    print_banner
    check_dependencies
    set_build_vars
    
    case "${1:-help}" in
        # Comandos principales
        "dev")
            echo -e "${GREEN}🚀 Iniciando entorno de desarrollo...${NC}"
            docker-compose up app
            ;;
        "build")
            echo -e "${BLUE}🏗️  Construyendo aplicación para producción...${NC}"
            docker-compose --profile build up --build build
            echo -e "${GREEN}✅ Build completado en ./dist${NC}"
            ;;
        "prod")
            echo -e "${GREEN}🌐 Iniciando servidor de producción (puerto 80)...${NC}"
            echo -e "${YELLOW}⚠️  Requiere permisos de administrador para puerto 80${NC}"
            docker-compose --profile production up --build production
            ;;
        "prod-local")
            echo -e "${GREEN}🌐 Iniciando servidor de producción local (puerto 8080)...${NC}"
            docker-compose --profile production-local up --build production-selfbuild
            ;;
        
        # Comandos de testing
        "test")
            echo -e "${BLUE}🧪 Ejecutando tests...${NC}"
            docker-compose --profile testing run --rm test
            ;;
        "test-watch")
            echo -e "${BLUE}👀 Ejecutando tests en modo watch...${NC}"
            docker-compose --profile testing up test-watch
            ;;
        "test-cov")
            echo -e "${BLUE}📊 Ejecutando tests con cobertura...${NC}"
            docker-compose --profile testing run --rm test-coverage
            echo -e "${GREEN}✅ Reporte de cobertura disponible en ./coverage${NC}"
            ;;
        "test-ui")
            echo -e "${BLUE}🎨 Iniciando interfaz web de Vitest...${NC}"
            echo -e "${GREEN}🌐 Disponible en: http://localhost:51204${NC}"
            docker-compose --profile testing --profile ui up test-ui
            ;;
        
        # Comandos de mantenimiento
        "clean")
            echo -e "${YELLOW}🧹 Limpiando contenedores, volúmenes e imágenes...${NC}"
            docker-compose down --volumes --remove-orphans
            docker system prune -f
            echo -e "${GREEN}✅ Limpieza completada${NC}"
            ;;
        "logs")
            echo -e "${BLUE}📜 Mostrando logs...${NC}"
            docker-compose logs -f
            ;;
        "shell")
            echo -e "${BLUE}🐚 Abriendo shell en contenedor de desarrollo...${NC}"
            docker-compose exec app sh || docker-compose run --rm app sh
            ;;
        "status")
            echo -e "${BLUE}📊 Estado de servicios:${NC}"
            docker-compose ps
            echo
            echo -e "${BLUE}📊 Uso de volúmenes:${NC}"
            docker system df
            ;;
        
        # Información
        "version")
            echo -e "${BLUE}📦 Información de versión:${NC}"
            echo "  VERSION: $VERSION"
            echo "  VCS_REF: $VCS_REF"
            echo "  BUILD_DATE: $BUILD_DATE"
            echo "  Docker: $(docker --version)"
            echo "  Docker Compose: $(docker-compose --version)"
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Ejecutar función principal
main "$@"