#!/bin/sh

set -ex
npx prisma db push
npx prisma generate
npx prisma db seed
npm run start
