# Blog CMS with Admin Panel

A simple Content Management System (CMS) where users can read blog posts, and administrators can manage blog posts (create, edit, delete).

## Features

- **Admin Login**: Secure login for the admin panel using JWT authentication.
- **Blog Management**: Admin can create, edit, and delete blog posts.
- **Blog Display**: Public users can view blog posts.
- **Rich Text Editor**: Use of [Quill](https://quilljs.com/) as a rich text editor for writing blog content.
- **Responsive Design**: Basic mobile and tablet support.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Editor**: Quill for rich text editing
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render/Railway

## Installation

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (LTS version)
- **MongoDB** (or use a cloud database like MongoDB Atlas)
- **Git** (for version control)

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/iasiddiqui/Blog-cms
cd Blog-cms
