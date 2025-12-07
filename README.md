# Blog-Application
**BlogApp – Full Stack Blogging Platform**

A full-stack blog application built using **Spring Boot**, **React**, **PostgreSQL**, **JWT Authentication**, and **DTO-based APIs**.
Users can create, edit, delete, and view posts, while admins have additional control over categories.

## 🚀 **Features**

### ✅ **User Features**

* User registration & login with **JWT authentication**
* Create, edit, view, and delete blog posts
* Search posts using keywords
* Filter posts by **categories**
* View posts created by the logged-in user
* Protected routes for authenticated users
* DTO-based API communication

### 🔐 **Admin Features**

* Admin-only **CRUD operations for categories**
* Manage all categories through an admin dashboard
* Role-based access control using Spring Security

## 🛠 **Tech Stack**

### **Backend (Java + Spring Boot)**

* Spring Boot
* Spring MVC
* Spring Security + JWT
* JPA + Hibernate
* PostgreSQL
* DTOs for clean API layer

### **Frontend (React)**

* React + Vite
* React Router
* Axios
* Tailwind CSS
* Context API for auth state


## 🗄 **Database**

**PostgreSQL**

Tables include:

* `users`
* `posts`
* `categories`
* Many-to-One mapping:

  * Post → User
  * Post → Category

---

## 🔐 **Authentication Flow**

1. User logs in → API returns **JWT token**
2. Token stored in browser (localStorage)
3. Every request attaches token via Axios interceptor
4. Backend validates token using **JwtFilter**
5. User gains access to protected routes



## 📡 **API Endpoints**

### **Auth**

```
POST /api/auth/login
POST /api/users          (register)
```

### **Posts**

```
GET    /api/posts
GET    /api/posts/{id}
POST   /api/posts
PUT    /api/posts/{id}
DELETE /api/posts/{id}

GET    /api/posts/user/{userId}
GET    /api/posts/search?keyword=...
GET    /api/categories/{id}/posts
```

### **Categories**

```
GET    /api/categories
POST   /api/categories        (admin)
PUT    /api/categories/{id}   (admin)
DELETE /api/categories/{id}   (admin)
```

---

## 🧪 **Key Advantages**

* Clean backend structure using **DTOs, Services, Repositories**
* Stateless, secure JWT authentication
* Modern UI with searchable & filterable posts
* Fully role-based admin management

---

## 🌟 **Future Enhancements**

* Rich text editor for post content
* Image upload for posts
* Pagination and infinite scroll
* User profiles



Just tell me!
