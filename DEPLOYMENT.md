# Despliegue de Rastro Sureño

## Hostinger desde GitHub

En hPanel, crea una **Web App** en el dominio o subdominio de la página. Elige **Importar repositorio Git**, conecta GitHub y selecciona el repositorio y la rama que quieras publicar. Esta opción requiere un plan de Hostinger que incluya Web Apps. [Guía oficial de importación](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

| Campo | Valor |
| --- | --- |
| Framework | React con Vite, según el preset detectado |
| Rama | `main` o la rama elegida para producción |
| Directorio raíz | Raíz del repositorio |
| Versión de Node.js | `22.x` |
| Gestor de paquetes | `npm` |
| Comando de build | `npm run build` |
| Directorio de salida | `dist` |
| Entry file y variables de entorno | Dejar vacíos |

Sube los archivos fuente y `package-lock.json` a la rama elegida antes de importarla. `.gitignore` excluye `dist/`, `node_modules/`, `.env` y sus variantes, archivos temporales y reportes. Hostinger instala las dependencias y genera `dist/`. Node se usa para compilar y el sitio se sirve como archivos estáticos. [Versiones de Node disponibles](https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/).

Después del despliegue, revisa el dominio por HTTPS y comprueba logo, estilos y enlaces. Para actualizar, publica los cambios en la rama conectada y revisa los logs de Hostinger. Para volver a una versión anterior, revierte el cambio en Git y vuelve a desplegar. La configuración efectiva de headers depende del servicio de hosting. La política de contenido base viaja en el HTML.

## Alternativa de carga manual en Hostinger

La aplicación compilada es HTML, CSS, JavaScript y recursos estáticos. En hPanel crea o selecciona un sitio con acceso al Administrador de archivos, por ejemplo **PHP/HTML personalizado**. Usa el dominio o subdominio reservado a esta página. [Guía oficial para añadir un sitio](https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/).

1. Obtén el ZIP de entrega o descarga el artefacto `hostinger-dist` de una ejecución exitosa del workflow. Para generar los archivos localmente con Node 22, usa `npm ci` y `npm run build`.
2. Antes de reemplazar una versión, descarga un respaldo de los archivos que gestiona este proyecto. Si el dominio ya aloja la tienda, usa el subdominio o directorio destinado al enlace en bio.
3. Sube y extrae el ZIP en `public_html` o en el directorio elegido. Deja `index.html`, `favicon.svg`, `assets/` y `.htaccess` juntos, sin una carpeta adicional `dist/`. Si ya existe un `.htaccess` del sitio en el directorio, revisa cómo incorporar estas reglas antes de reemplazarlo.
4. Abre el sitio por HTTPS. Comprueba el logo, los seis enlaces y que el navegador cargue JS y CSS. Para una instalación en subdirectorio, abre la URL con slash al final. El certificado y el redireccionamiento HTTPS se administran en Hostinger.
5. Conserva el ZIP fuera del directorio público tras extraerlo.

Documentación oficial del [Administrador de archivos](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/).

La política de contenido también está en el HTML. `.htaccess` añade headers y caché cuando el hosting admite las directivas correspondientes. Comprueba sus valores efectivos tras publicar. La página usa una sola ruta y no necesita reescrituras.

## Actualización y rollback

Primero carga los nuevos archivos con hash de `assets/` y después actualiza `index.html`. Conserva al menos el conjunto de archivos referenciado por la versión previa, para que el rollback no dependa de volver a subir esos assets. Para volver atrás, restaura la versión anterior respaldada y abre el sitio por HTTPS para comprobar el resultado. Purga la caché de HTML del hosting si sigue sirviendo la revisión equivocada.

## Destinos opcionales

- GitHub Pages. Configura GitHub Actions como origen de Pages y ejecuta manualmente **Verify and package Rastro Sureño** sobre `main` con `publish_pages`.
- GHCR. Ejecuta manualmente el mismo workflow con `publish_image`. Conserva el SHA o digest de la imagen para volver a una revisión. El contenedor escucha HTTP en 8080.
- Docker local. `docker compose --profile production up --build production` construye desde fuentes. Para empaquetar un build existente, usa `docker build --target production -t rastro-sureno:local .` después de `npm run build`. Comprueba ambas variantes con `node scripts/verify-container.mjs IMAGEN`.
