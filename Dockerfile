# Dockerfile optimizado para Rastro Sureño Link in Bio
# Implementa la sugerencia de Gemini: usar artifacts preconstruidos

# ================================
# Stage 1: Base dependencies
# ================================
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./

# ================================
# Stage 2: Development environment
# ================================
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ================================
# Stage 3: Testing environment
# ================================
FROM development AS testing
RUN npm run test:run

# ================================
# Stage 4: Build stage (para CI local)
# ================================
FROM base AS build
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# ================================
# Stage 5: Production optimizado (NUEVA IMPLEMENTACIÓN)
# ================================
# Esta stage puede usar artifacts preconstruidos desde GitHub Actions
FROM nginx:alpine AS production

# Metadatos para tracking
ARG BUILD_DATE
ARG VCS_REF  
ARG VERSION
LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.source="https://github.com/D-Araya/link_in_bio_web" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.title="Rastro Sureño Link in Bio" \
      org.opencontainers.image.description="Link in bio para Rastro Sureño - Quesos Artesanales Patagónicos"

# Configuración de seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Configuración optimizada de Nginx
COPY --chown=nextjs:nodejs nginx.conf /etc/nginx/nginx.conf

# Opción 1: Usar artifacts desde GitHub Actions (cuando están disponibles)
# Esta línea se ejecutará en el contexto de GitHub Actions
COPY --chown=nextjs:nodejs dist/ /usr/share/nginx/html/

# Opción 2: Fallback - usar build local si no hay artifacts
# Esta línea se usa para builds locales con Docker
# COPY --from=build --chown=nextjs:nodejs /app/dist/ /usr/share/nginx/html/

# Cambiar al usuario no-root para seguridad
USER nextjs

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ================================
# Stage 6: Production con build integrado (para desarrollo local)
# ================================
FROM nginx:alpine AS production-selfbuild
ARG BUILD_DATE
ARG VCS_REF  
ARG VERSION

LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.source="https://github.com/D-Araya/link_in_bio_web" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.version=$VERSION

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Para desarrollo local: usar el build integrado
COPY --from=build --chown=nextjs:nodejs /app/dist/ /usr/share/nginx/html/
COPY --chown=nextjs:nodejs nginx.conf /etc/nginx/nginx.conf

USER nextjs
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]