FROM node:18 as builder-base

RUN apt-get update -y && apt-get upgrade -y

FROM builder-base as builder

ADD . /workspace
WORKDIR /workspace

COPY . .
RUN npm install && npm run build

FROM node:18-slim as production

RUN apt-get update -y && apt-get upgrade -y

ENV PUBLIC_GOOGLE_MAPS_API_KEY=""

WORKDIR /app

RUN rm -rf ./*

COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/build .

EXPOSE 3000

CMD ["node", "index.js"]
