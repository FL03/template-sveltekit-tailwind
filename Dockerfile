FROM node:18 as builder-base

RUN apt-get update -y && apt-get upgrade -y

FROM builder-base as builder

ARG GOOGLE_APPLICATION_CREDENTIALS

ENV PUBLIC_FIREBASE_CONFIG='{"apiKey": "demo","authDomain": "demo.firebaseapp.com","projectId": "svkcl-d7eb1","storageBucket": "demo.appspot.com"}' \
    PUBLIC_GOOGLE_MAPS_API_KEY=""

ADD . /workspace
WORKDIR /workspace

COPY . .
RUN npm install && npm run build

FROM node:18-slim as production

RUN apt-get update -y && apt-get upgrade -y

ENV NODE_ENV="production" \
    PORT=3000

WORKDIR /app

RUN rm -rf ./*

COPY --from=builder /workspace/package.json .
COPY --from=builder /workspace/build .

RUN npm install --omit=dev

EXPOSE ${PORT}

CMD ["node", "index.js"]
