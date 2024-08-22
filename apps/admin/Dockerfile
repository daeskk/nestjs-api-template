FROM node:20.13-alpine as base

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn workspaces focus --production

FROM node:20.13-alpine as build

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules

COPY package*.json nest-cli.json tsconfig.build.json tsconfig.json ./
COPY /apps/admin ./apps/admin
COPY /libs ./libs

RUN yarn build admin

FROM node:20.13-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/ ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3002

ENTRYPOINT ["node", "dist/apps/admin/main.js"]
