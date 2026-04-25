# 🔗 Linklytics – URL Shortener with Analytics

Shortify is a full-stack URL shortener that allows users to create short links, manage them, and track click analytics through an interactive dashboard.

---

## 🚀 Features

* 🔐 User Authentication (JWT based)
* 🔗 Create and manage short URLs
* 📊 Click analytics with graphical insights
* 📈 Track total clicks over time
* 📋 Copy short links instantly
* ⚡ Fast redirection system
* 📱 Responsive UI

---

## 🛠️ Tech Stack

### Backend

* Spring Boot
* Spring Security (JWT Authentication)
* Spring Data JPA
* MySQL

### Frontend

* React.js (Vite)
* React Query
* Tailwind CSS
* Chart.js

---

## 📂 Project Structure

```
backend/
 ├── controller/
 ├── service/
 ├── repository/
 ├── models/
 └── dtos/

frontend/
 ├── components/
 ├── contextApi/
 ├── hooks/
 └── pages/
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

1. Navigate to backend folder:

```
cd backend
```

2. Configure database in `application.properties`:

```
spring.datasource.url=YOUR_DB_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

3. Run the application:

```
mvn spring-boot:run
```

---

### 🔹 Frontend Setup

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
VITE_BACKEND_URL=http://localhost:8080
VITE_REACT_FRONT_END_URL=http://localhost:5173
```

4. Start frontend:

```
npm run dev
```

---

## 🔑 API Endpoints

| Method | Endpoint                       | Description        |
| ------ | ------------------------------ | ------------------ |
| POST   | /api/auth/public/register      | Register user      |
| POST   | /api/auth/public/login         | Login user         |
| POST   | /api/urls/shorten              | Create short URL   |
| GET    | /api/urls/myurls               | Get user URLs      |
| GET    | /api/urls/analytics/{shortUrl} | Get analytics      |
| GET    | /api/urls/totalClicks          | Total clicks graph |

---

## 📊 Analytics

* Tracks clicks per day
* Displays data in graphs
* Handles empty data gracefully
* No crashes on missing data

---

## 🧪 Key Improvements

* Fixed JWT handling issues
* Resolved JSON parsing errors
* Fixed routing and navigation bugs
* Eliminated backend 400 & 500 errors
* Improved error handling and stability

---

## 📸 Screens

* Landing Page
* Login/Register
* Dashboard
* Analytics Graph

---

## 🧑‍💻 Author

Chirag Agrawal

---

## ⭐ Contribute

Feel free to fork, improve, and submit pull requests!

---


