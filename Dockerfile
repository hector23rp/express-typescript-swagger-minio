FROM node:16 as builder
RUN mkdir -p /app
WORKDIR /app
ADD package.json /app/
ADD package-lock.json /app/
RUN npm install
ADD . /app
RUN npm run build

FROM node:16
RUN mkdir -p /app
WORKDIR /app
COPY --from=builder /app .
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT
CMD ["node", "dist/index.js"]