# Plan técnico — SDD 001

1. Simplificar el contenido a datos tipados de perfil y dos componentes de presentación. Mantener logo, tarjeta, fondo y colores; sustituir dependencia de iconos CDN por marcas textuales decorativas locales. CSS se encarga de hover/foco y movimiento reducido.
2. Importar logo desde fuentes para que Vite lo versione. Usar `base: './'`: el único documento funciona en raíz o subdirectorio con slash final. Build mediante launcher Node que fija producción antes de invocar Vite; eliminar configuración JS duplicada.
3. Corregir alcance/umbrales de Vitest y mantener tests de comportamiento. Agregar pruebas Playwright del artefacto real en ambos mounts, incluyendo móvil y ausencia de errores de red/consola.
4. Compartir configuración Nginx no-root entre imágenes con build interno y artefacto externo. PID/temporales en `/tmp`, puerto 8080, logs stdout/stderr, cache por nombres con hash, headers heredados sin overrides por location y sin fallback SPA.
5. Simplificar Compose/helper; alinear Node 22 con CI. Verificar la imagen antes de publicar; permisos por job, artefactos de cobertura y resumen que distinga ambos destinos.
6. Actualizar documentación y registrar resultados, pendientes y correspondencia con hallazgos F01–F12.

Actualización de alcance: Hostinger importa el repositorio de GitHub y genera `dist` con Node 22. Documentar la configuración de hPanel y comprobar las exclusiones de Git. Entregar también un ZIP de respaldo para `public_html` con configuración Apache de headers y caché. Mantener Docker como comprobación local y Pages/GHCR como publicación manual opcional.

## Decisiones y trade-offs

- Un artefacto relativo evita dos builds divergentes; requiere URL de directorio terminada en `/`, que los hosts deben redirigir normalmente.
- No se necesitan variables de entorno para seis enlaces estáticos. Se editan en un archivo tipado y se recompila.
- Los iconos serán caracteres decorativos locales con etiquetas completas visibles: se elimina la descarga CDN y su permiso en CSP, sin agregar una biblioteca de iconos.
- CSP estricta desde Nginx y meta compatible con Pages; `frame-ancestors` se aplica mediante header en Nginx porque no se soporta en meta.
- Pruebas E2E justificadas por los errores de entrega que las pruebas DOM no detectaban. No se escriben tests que congelen cada valor CSS.
- Node 22 se mantiene para compatibilidad con el entorno actual y las herramientas; lockfile fija paquetes. No se hace migración de framework.

Referencias verificadas: [base relativa de Vite](https://vite.dev/guide/build.html#relative-base), [herencia de headers Nginx](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header), [permisos del token de GitHub](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token).
