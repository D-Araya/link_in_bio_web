#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"

case "${1:-help}" in
  dev) docker compose up --build app ;;
  test) docker compose --profile testing run --build --rm test ;;
  prod|prod-local) docker compose --profile production up --build production ;;
  build) docker build --target production-selfbuild -t rastro-sureno:local . ;;
  logs) docker compose logs --follow ;;
  status) docker compose ps ;;
  clean) docker compose --profile testing --profile production down --remove-orphans ;;
  *) printf '%s\n' 'Uso: ./docker-dev.sh {dev|test|prod|build|logs|status|clean}' ;;
esac
