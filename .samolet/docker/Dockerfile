FROM registry-dev.samoletgroup.ru/cspb-fiit-platform/re-team/docker/base/nodejs/base:18 as build-stage

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY package*.json ./

RUN npm ci 
COPY . .
RUN npm run build

FROM registry-dev.samoletgroup.ru/cspb-fiit-platform/re-team/docker/base/nginx:latest as production-stage

COPY .samolet/nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chown 10001 /etc/nginx -R && chown 10001 /var/cache/nginx -R && chown 10001 /var/run/ -R && chown 10001 /usr/share/nginx/html -R

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
