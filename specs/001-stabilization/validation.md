# Validación SDD 001

| Criterios | Evidencia local |
| --- | --- |
| AC01–AC05 | `npm run build` con Node 22.16.0 y Vite 7.3.8. El artefacto funciona en raíz y subdirectorio. JS de producción aunque el entorno local declare desarrollo. 14 pruebas Chromium aprobadas en escritorio y a 320 px, incluidas carga de recursos, enlaces, teclado y preferencia de movimiento. Se interceptó la navegación de WhatsApp. |
| AC06 | `npm run test:coverage` aprobó 4 pruebas. V8 registró 7/7 líneas, 7/7 statements y 4/4 funciones en el alcance unitario. El código medido no tiene ramas instrumentadas. Se generó LCOV. Playwright prueba el montaje real de `main.tsx`. |
| AC07–AC08 | Los targets `production` y `production-selfbuild` pasaron `scripts/verify-container.mjs`. Se comprobó UID 101, filesystem de solo lectura, `nginx -t`, caché, CSP, MIME, salud y 404. |
| AC09–AC11 | Lint, Compose y ambos builds Docker aprobados localmente. CI configura la instalación con lockfile y permisos por job. La ejecución remota queda por verificar. |
| AC12 | `npm audit` pasó de 24 entradas a 7 moderadas vinculadas a `minimatch` en la cadena de lint. Cero altas o críticas. `npm audit --omit=dev` reportó cero. Se conservó la versión actual de `typescript-eslint` frente al downgrade sugerido por npm. |
| AC13 | `git check-ignore` comprobó las exclusiones de entorno, dependencias, compilación y reportes, y que las reglas permitan versionar `.dockerignore`, `public/.htaccess`, `package-lock.json` y `.env.example`. La guía describe la importación directa. |

El ZIP se abrió y se comparó byte por byte con `dist`. Incluye `.htaccess`, favicon, HTML y los tres recursos de `assets/`. SHA-256 `0b6403f850f168b0e888368f33c4c63ed5be1ea54de5d9cfd3ff32a934a3bc27`.

F01–F10 y F12 se abordaron con cambios de entrega, contenido, verificación y caché. F11 se abordó eliminando la dependencia CDN y configurando CSP en el documento y Nginx. Quedan por comprobar los headers, TLS y la publicación efectiva en Hostinger, y los permisos remotos de Pages/GHCR si se usan. La titularidad de los perfiles sociales y la licencia del logo quedan con el responsable del proyecto. El informe de auditoría conserva la evidencia del commit anterior a estos cambios.
