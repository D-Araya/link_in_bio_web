FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM dependencies AS development
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM development AS testing
CMD ["npm", "run", "test:coverage"]

FROM development AS build
RUN npm run build

FROM nginx:stable-alpine AS runtime
ARG VCS_REF=unknown
LABEL org.opencontainers.image.source="https://github.com/D-Araya/link_in_bio_web" \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.title="Rastro Sureño"
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1
# Skip the root-oriented upstream entrypoint: no templates or mutations needed.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]

# CI may package the already verified artifact.
FROM runtime AS production
COPY dist/ /usr/share/nginx/html/

# Default/local target builds from sources without depending on host dist.
FROM runtime AS production-selfbuild
COPY --from=build /app/dist/ /usr/share/nginx/html/
