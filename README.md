# Rastro Sureño · Link in Bio

Página de enlaces de Rastro Sureño, hecha con React 19, TypeScript, Vite y CSS. El resultado es un sitio estático en `dist/`. Node 22 se usa para desarrollar, probar y compilar. El sitio publicado solo necesita que el hosting sirva los archivos.

## Desarrollo

```sh
npm ci
npm run dev
```

Edita los enlaces en [src/profile.ts](src/profile.ts), el diseño en [src/index.css](src/index.css) y los metadatos en [index.html](index.html). El enlace de WhatsApp usa el número comercial en formato internacional, con solo dígitos después de `https://wa.me/`.

## Verificación

```sh
npx playwright install chromium
npm run check
```

El comando ejecuta lint, Vitest con cobertura, build y pruebas en Chromium. El reporte LCOV queda en `coverage/lcov.info`. Las pruebas de navegador usan el build final en escritorio y a 320 px, en la raíz y en `/link_in_bio_web/`.

## Publicación

El destino principal es Hostinger. Conecta el repositorio de GitHub mediante la opción Web App y configura el build para publicar `dist/`. La [guía de despliegue](DEPLOYMENT.md) contiene los valores y la alternativa de carga manual. Los pushes y PR a `main` verifican y empaquetan el sitio en GitHub Actions. Pages y GHCR se pueden publicar mediante una ejecución manual del workflow.

## Docker opcional

```sh
docker compose up --build app
docker compose --profile testing run --build --rm test
docker compose --profile production up --build production
```

La vista de producción local estará en `http://127.0.0.1:8080/`. Docker sirve para reproducir y comprobar el entorno Nginx.

La [especificación SDD](specs/001-stabilization/spec.md) registra los criterios de aceptación. La [validación](specs/001-stabilization/validation.md) registra los resultados y pendientes.
