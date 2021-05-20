FROM node:16-alpine3.11
RUN apk add --no-cache python g++ make

WORKDIR /app

COPY . .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install
RUN yarn build
EXPOSE 7002
CMD ["yarn", "run", "start:prod"]