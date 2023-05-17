FROM node:20 as builder-base

RUN apt-get update -y && apt-get upgrade -y

FROM builder-base as builder

ADD . /workspace
WORKDIR /workspace

COPY . .
RUN npm install && npm run build

FROM node:20-slim as production

RUN apt-get update -y && apt-get upgrade -y

ENV PUBLIC_GOOGLE_MAPS_API_KEY=""

WORKDIR /app

RUN rm -rf ./*

COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/build .

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "index.js"]
