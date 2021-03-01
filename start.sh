#!/bin/sh
set -e

npm start & 

cd backend && npm start &
