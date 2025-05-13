# **Backend для электронного дневника**  

Серверная часть системы электронного дневника, разработанная на **TypeScript** с использованием **NestJS**, **TypeORM** и **PostgreSQL**. Позволяет управлять успеваемостью, расписанием, домашними заданиями и пользователями 

---

## **Технологии**  
- **TypeScript** – строго типизированный язык программирования  
- **NestJS** – фреймворк для создания масштабируемых серверных приложений  
- **TypeORM** – ORM для работы с базой данных  
- **PostgreSQL** – реляционная СУБД для хранения данных  
- **Swagger** – документация API  
- **Docker** – контейнеризация приложения  

---

## **Функционал**  
✅ **Управление пользователями** (регистрация, роли, доступы)  
✅ **Журнал успеваемости** (выставление и анализ оценок)  
✅ **Расписание занятий** (гибкое управление уроками)  
✅ **Домашние задания** (публикация, сдача, проверка)  
✅ **Отчеты и аналитика** (успеваемость, посещаемость)  
✅ **Уведомления** (изменения в расписании, новые оценки)  

---

## **Установка и запуск**  

### **Требования**  
- Node.js (v16+)  
- PostgreSQL (v12+)  
- Docker (опционально)  

### **1. Клонирование репозитория**  
```bash
git clone <repo-url>
cd school-diary-backend
```

### **2. Установка зависимостей**  
```bash
npm install
# или
yarn install
```

### **3. Настройка .env**  
Создайте `.env` в корне проекта:  
```env
SERVER=0.0.0.0
PORT=3000

# База данных
DATABASE_HOST=localhost
DATABASE_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=school_diary

# JWT
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=30m

# Почта (для уведомлений)
MAIL_HOST=smtp.example.com
MAIL_USER=admin@example.com
MAIL_PASSWORD=your_password
MAIL_FROM=noreply@example.com
```

### **4. Запуск**  
**В режиме разработки:**  
```bash
npm run start:dev
```  

**В production:**  
```bash
npm run build
npm run start:prod
```  

**Swagger UI:**  
Доступен по адресу: `http://localhost:3000/api`  

---

## **Docker-развертывание**  

### **1. Сборка образа**  
```bash
docker build -t school-diary-backend .
```  

### **2. Запуск контейнера**  
```bash
docker run -p 3000:3000 school-diary-backend
```  

### **3. Docker Compose**  
```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your_password
      - POSTGRES_DB=school_diary
    depends_on:
      - db

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: school_diary
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```  

Запуск:  
```bash
docker-compose up -d
```  

---

## **Доступные команды**  
| Команда | Описание |
|---------|----------|
| `npm run build` | Сборка проекта |
| `npm run start:dev` | Запуск в режиме разработки |
| `npm run test` | Запуск тестов |
| `npm run lint` | Проверка кода линтером |
| `npm run format` | Форматирование кода |

---

## **Лицензия**  
Программное обеспечение распространяется по условиям **лицензионного соглашения (EULA)**. Коммерческое использование требует разрешения.  

---  

📌 **Документация API:** Доступна в Swagger UI после запуска (`/api`)  
📌 **Поддержка:** support@example.com
