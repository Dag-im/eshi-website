#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[bootstrap-dev] Installing dependencies"
npm install

echo "[bootstrap-dev] Building backend"
npm run build

echo "[bootstrap-dev] Running database bootstrap (migrations + seeds)"
npm run bootstrap-db

echo "[bootstrap-dev] Done. Start dev server with: npm run dev"
