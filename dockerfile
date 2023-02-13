FROM  node:14-alpine

EXPOSE 300

WORKDIR /api

COPY . .
RUN npm install
RUN npm run prisma:generate
RUN apk update && apk add bash \
    && chmod +x ./docker-start.sh
CMD ["./docker-start.sh"]