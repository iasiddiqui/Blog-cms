# Blog CMS with Admin Panel


This project is a full-stack**Content Management System (CMS)** that allows users to create, edit, and delete blog posts through a simple and responsive interface. The CMS includes user authentication, CRUD functionality for blog posts, and a dashboard for managing content.

## 🚀 Live Demo

👉 [View the app here](https://blog-cms-frontend-9w95.onrender.com/)

## ✨ Features

- **Admin Login**: Secure login for the admin panel using JWT authentication.
- **Blog Management**: Admin can create, edit, and delete blog posts.
- **Blog Display**: Public users can view blog posts.
- **Rich Text Editor**: Integrated [Tiptap](https://tiptap.dev/) for writing blog content.
- **Responsive Design**: Works on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Editor**: Tiptap (rich text editor)
- **Image Hosting**: Cloudinary
- **Deployment**:
  - Frontend: Vercel/render
  - Backend: Render / Railway

## 🎯 Approach

# Backend API
- Developed RESTful APIs for authentication and blog CRUD operations.
- Used JWT tokens to secure protected routes.
- Integrated MongoDB for storing users and blog data.

# Frontend UI
- Built a responsive React interface with protected routes for authenticated users.
- Implemented login and signup forms with validation.
- Designed a dashboard for listing, editing, and deleting blogs.
- Integrated a rich text editor for blog content.

# Responsive Design
- Used CSS Flexbox and media queries to ensure the app works well on different screen sizes.

# User Experience
- Added error/success messages for actions (login, signup, CRUD operations).
- Included loading states and form feedback for better usability.

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js (LTS)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

---

### 🔐 Environment Variables

#### ➤ Backend (`/backend/.env`)

Create a `.env` file in the `/backend` folder with the following:

```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

VITE_API_URL=http://localhost:5000/api  # for frontend API URL
```


## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/iasiddiqui/Blog-cms

