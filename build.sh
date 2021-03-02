#!/bin/sh
set -e

npm run build & 

cd backend && npm install &
