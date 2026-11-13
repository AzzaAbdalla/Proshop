
# 🛍️ ProShop - MERN E-commerce Platform

A full-featured MERN stack e-commerce application with a shopping cart, user authentication, checkout, PayPal integration, admin panel, and more.

## Demo admin login

Use this account after the sample data is imported (`npm run data:import` from the project root):

| | |
|---|---|
| **Email** | `Admin@email.com` |
| **Password** | `12345` |

---

## 🚀 Features

- 🔐 **User authentication** with JWT
- 👩‍💻 **Admin management** for users, products, and orders
- ⭐ **Product reviews** and ratings
- 🔍 **Search and pagination**
- 🛒 **Shopping cart** and order placement
- 📸 **Image upload** support
- 💳 **PayPal payment** integration
- 📱 **Responsive UI** with React Bootstrap

---

## 🛠 Tech Stack

| Layer      | Technologies                              |
|------------|--------------------------------------------|
| Frontend   | React, Redux Toolkit, RTK Query, Axios     |
| UI         | React Bootstrap                            |
| Backend    | Node.js, Express.js, MongoDB, Mongoose     |
| Auth       | JSON Web Tokens                            |
| Payments   | PayPal REST API                            |
| Deployment | Render (Backend), Vercel/Netlify (Frontend)|

---

## 📁 Folder Structure

```bash
/ProShop
├── /Backend           # Express + MongoDB REST API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── /Frontend          # React + Redux application
│   ├── public/
│   ├── src/
│   └── build/         # Production build (after npm run build)
│
└── README.md
```

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/proshop.git
cd proshop
```

### 2. Install Dependencies

#### Backend

```bash
cd Backend
npm install
```

#### Frontend

```bash
cd ../Frontend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `/Backend` folder:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
PAYPAL_CLIENT_ID=your_paypal_client_id
PAGINATION_LIMIT=4
REACT_APP_BASE_URL=http://localhost:5000
```

---

## 🏃 Run Locally

### Start Backend

```bash
cd Backend
npm run server
```

### Start Frontend

```bash
cd ../Frontend
npm start
```

🧭 Visit: [http://localhost:3000](http://localhost:3000)

---

## 📦 Build for Production

To serve the frontend via the backend:

```bash
cd Frontend
npm run build
```

Then run the backend:

```bash
cd ../Backend
node server.js
```

✅ Ensure `Frontend/build/index.html` exists — the backend will serve the React app from there.

---

## 🐞 Troubleshooting

**Error:**

```bash
ENOENT: no such file or directory, stat 'Frontend/build/index.html'
```

**Solution:**

Run `npm run build` inside the `Frontend` directory.

---

## 🌐 Deployment Tips

- 🔹 Use **Render** for backend hosting
- 🔹 Use **Vercel** or **Netlify** for frontend hosting
- 🔹 Ensure `.env` variables are set correctly in both environments

---

## 🙋 Author

**Azza Abdalla**  
GitHub: [@AzzaAbdalla](https://github.com/AzzaAbdalla)
