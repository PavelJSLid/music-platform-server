# 1. Используем официальный образ Node.js
FROM node:20

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json (или pnpm-lock.yaml / yarn.lock)
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Собираем проект NestJS
RUN npm run build

# 7. Открываем порт (по умолчанию Nest слушает 3000)
EXPOSE 3000

# 8. Запускаем приложение
CMD ["npm", "run", "start:prod"]