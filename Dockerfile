# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install 

EXPOSE 3000

CMD ["node", "dist/main"]
