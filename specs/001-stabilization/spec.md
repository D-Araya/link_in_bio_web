# SDD 001 — Entrega fiable de Rastro Sureño

Estado: especificación acordada a partir de la auditoría y solicitud del usuario. Fecha: 2026-11-15.

## Objetivo

Conservar una página estática pequeña de React, con la identidad visual actual, y hacer verificables sus enlaces y su publicación. Sin backend, base de datos, framework nuevo o servicios operativos adicionales.

Destino principal confirmado: **Hostinger desde GitHub**. Hostinger usa Node 22 para compilar y sirve `dist` como un sitio estático. Se conserva un ZIP de respaldo para carga manual y la publicación opcional en Pages/GHCR mediante ejecución manual de GitHub Actions.

## Usuarios y comportamiento

Un visitante abre la página desde móvil o escritorio, reconoce Rastro Sureño y accede a sus canales. Los enlaces se abren en una pestaña nueva con aviso accesible y protección `noopener noreferrer`.

Los perfiles sociales siguen el README existente. El propietario confirmó en este chat el número **+56 9 93504989**, que se normaliza a `https://wa.me/56993504989`. No se inventan otros destinos ni se contacta a terceros durante las pruebas.

## Criterios de aceptación

| ID | Requisito comprobable |
| --- | --- |
| AC01 | El mismo `dist` carga en `/` y `/link_in_bio_web/`, incluyendo logo, CSS, JS y favicon. No hay rutas SPA adicionales. |
| AC02 | `npm run build` produce código de producción aunque un `.env` local declare `NODE_ENV=development`. Una sola configuración Vite efectiva. |
| AC03 | Los seis enlaces apuntan a los canales aprobados: búsqueda Google, perfiles documentados de Instagram/TikTok/Facebook, web y WhatsApp confirmado. |
| AC04 | Página en español, nombre/metadatos correctos, navegación por teclado, foco visible, sin overflow a 320px y respeto a movimiento reducido. |
| AC05 | La presentación no depende de CSS, fuentes o scripts de terceros. No usa estilos ni handlers DOM inline que requieran una CSP permisiva. |
| AC06 | Cobertura de fuentes con mínimos efectivos de 80% en líneas, statements, funciones y ramas, LCOV generado y builds excluidos. E2E verifica montaje real. |
| AC07 | Docker construye desde código o artefacto, ejecuta Nginx como usuario no-root en 8080, permite filesystem de solo lectura con `/tmp` escribible y responde con MIME/headers correctos. |
| AC08 | Solo assets con hash tienen cache larga; HTML/favicon revalidan; un asset inexistente devuelve 404, sin fallback HTML. Healthcheck verifica al menos el HTML presente. |
| AC09 | CI usa Node 22 compatible, instala con lockfile, exige lint/tests/build/E2E y comprueba imagen antes de publicar. Pages y GHCR tienen permisos específicos por job. |
| AC10 | El contexto Docker está versionado y excluye secretos, dependencias y archivos innecesarios. La producción no se sobreescribe con un bind mount. |
| AC11 | La guía explica comandos reales, despliegue, rollback y límites de HTTPS/hosting. El helper no limpia recursos Docker ajenos. |
| AC12 | Se revisan dependencias con el registro disponible, se corrigen vulnerabilidades verificables dentro de un alcance compatible y se registran las limitaciones pendientes. |
| AC13 | La guía indica los valores de importación desde GitHub. Git excluye archivos de entorno, dependencias, builds y reportes. El lockfile y la configuración necesaria se pueden versionar. |

## Límites

La titularidad de los perfiles proviene del README y del número confirmado, no de una verificación externa de identidad. No se publica a Pages/GHCR en esta tarea. No se convierte el informe histórico en un dictamen de infraestructura no inspeccionada. La licencia y titularidad del logo quedan pendientes del propietario; no se inventa un titular legal.

## Definición de terminado

Implementación trazable a AC01–AC13, con resultados y pendientes registrados en `validation.md`. La verificación del despliegue remoto requiere acceso al entorno publicado.
