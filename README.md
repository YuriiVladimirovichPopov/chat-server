### Подробное описание разделов

1. **Описание**: Это сервер для чата, построенный с использованием NestJS и PostgreSQL.
2. **Требования**: 
- Node.js
- Docker
- Docker Compose
3. **Установка**: 
- git clone https://github.com/YuriiVladimirovichPopov/chat-server
- cd chat-server
4. **Конфигурация**:
Для настройки приложения создайте файл `.development.env` в корне проекта и добавьте следующие переменные окружения:

 .development.env

- PORT=9000
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=yourpassword
- DB_NAME=chat-server

5. **Запуск**: 
- local:
yarn start:dev
- with docker:
docker-compose up --build -d
6. **Пересборка Docker контейнеров**: 
docker-compose build
docker-compose up -d
7. **Дополнительные команды**:
Просмотр логов контейнеров: docker-compose logs -f
Перезапуск контейнеров: docker-compose restart

8. **Лицензия**: MIT License.