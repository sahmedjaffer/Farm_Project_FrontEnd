# 🌍 Trip Planner (Frontend)

This is the **frontend** of the Trip Planner project, built with **React.js**.  
It allows users to plan their trips by browsing **Hotels, Flights, and Attractions**, as well as managing their personal profiles.

🚀 Live Demo: [https://viajero-bh.surge.sh](https://viajero-bh.surge.sh)

---

## 🔗 Backend Repository

The backend of this project is available here:  
[Trip Planner Backend](https://github.com/sahmedjaffer/Trip_Planner_Backend.git)

---

## 📑 Pages & Routes

The application has 9 main pages:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing page of the app |
| `/signin` | `SignInPage` | User login page |
| `/register` | `RegisterPage` | User registration page |
| `/profile/*` | `ProfilePage` | Main profile dashboard (protected) |
| `/profile/update-profile` | `UserUpdate` | Page to update user information |
| `/profile/my-history` | `MyHistoryPage` | Shows user’s trip history |
| `/hotels` | `HotelsPage` | Explore and search hotels |
| `/attractions` | `AttractionsPage` | Explore attractions in destinations |
| `/flights` | `FlightsPage` | Browse and book flights |
| `*` | `HomePage` | Catch-all route (redirects to home) |

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](screenshots/home.png)

### 🔑 Sign In
![Sign In](screenshots/signin.png)

### 📝 Register
![Register](screenshots/register.png)

### 👤 Profile
![Profile](screenshots/profile.png)

### ⚙️ Update Profile
![Update Profile](screenshots/update-profile.png)

### 📜 My History
![My History](screenshots/my-history.png)

### 🏨 Hotels
![Hotels](screenshots/hotels.png)

### ✈️ Flights
![Flights](screenshots/flights.png)

### 🎡 Attractions
![Attractions](screenshots/attractions.png)

---

## 🛠️ Tech Stack

- **React.js** (with React Router for navigation)  
- **CSS** for styling  
- **Surge.sh** for deployment  

---

## 📦 Installation & Setup

Clone the repository and install dependencies:

```bash
git https://github.com/sahmedjaffer/Farm_Project_FrontEnd.git
cd Farm_Project_FrontEnd
npm install
```

Run locally:

```bash
npm start
```

The app will be available at:  
👉 [http://localhost:5147](http://localhost:5147)

---

## 🌐 Deployment

This project is deployed on **Surge.sh**.  
To deploy a new version:

```bash
npm run build
surge ./build viajero-bh.surge.sh
```

---

## 👤 Author

Developed by **[Sayed Ahmed Kadhem]** ✨  
Feel free to connect and contribute!
