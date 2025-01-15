# 🔍 Searching - Lost and Found Platform

## Overview

A web platform designed to connect people who have lost items with those who have found them. The platform facilitates easy reporting, searching, and recovering of lost items through a user-friendly interface.

## 🌐 Live Demo

[Visit Live Site](https://searchinghub.netlify.app/)

## ✨ Features

- **User Authentication**

  - Email/Password login
  - Google Sign-in
  - Protected routes for authenticated users

- **Item Management**

  - Report lost/found items
  - Upload item images
  - Add detailed item descriptions
  - Specify location and date

- **Search & Filter**

  - Search by title/location
  - Toggle between table/card view
  - Responsive design for all devices

- **Item Recovery**
  - Mark items as recovered
  - Track recovery details
  - Contact item finder/owner

## 🛠 Technologies Used

- React 18
- Tailwind CSS
- Firebase Authentication
- Node.js & Express
- MongoDB

## 📦 NPM Packages

- `react-router-dom` - Routing
- `axios` - HTTP requests
- `react-datepicker` - Date selection
- `react-icons` - UI icons
- `react-helmet` - Dynamic page titles
- `framer-motion` - Animations
- `sweetalert2` - Notifications
- `react-modal` - Modal dialogs
- `tailwindcss` - Styling
- `daisyui` - UI components

## 🚀 Installation

```bash
# Clone repository
git clone [(Comming soon...)]

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Set up Firebase Configuration

1. Go to the Firebase Console.
2. Create a new project or select an existing project.
3. Add a new web app to your project.
4. Copy the Firebase configuration object.

## Create a .env file in the root directory:

```bash
VITE_apiKey=your-api-key
VITE_authDomain=your-auth-domain
VITE_projectId=your-project-id
VITE_storageBucket=your-storage-bucket
VITE_messagingSenderId=your-messaging-sender-id
VITE_appId=your-app-id
```

## 📁 Project Structure

```bash
├── public
│   ├── [index.html](http://_vscodecontentref_/1)
│   └── ...
├── src
│   ├── assets
│   │   └── img
│   │       └── aboutImage.jpg
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── context
│   │   └── AuthContext.jsx
│   ├── hooks
│   │   ├── useAuth.jsx
│   │   └── useAxiosSecure.jsx
│   ├── pages
│   │   ├── About
│   │   │   └── About.jsx
│   │   ├── Home
│   │   │   └── Home.jsx
│   │   ├── LostAndFound
│   │   │   └── LostandFoundItems.jsx
│   │   ├── MyItems
│   │   │   └── MyItems.jsx
│   │   ├── RecoveredItems
│   │   │   └── RecoveredItems.jsx
│   │   ├── Register
│   │   │   └── Register.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .env
├── .gitignore
├── [README.md](http://_vscodecontentref_/2)
├── [package.json](http://_vscodecontentref_/3)
└── ...
```

## 🔒 Authentication

- Email/Password login
- Google Sign-in
- Protected routes for authenticated users

## 🎨 Design Philosophy

- Clean and intuitive user interface
- Responsive design for all devices
- Easy navigation and accessibility

## 📞 Contact

For any inquiries or issues, please contact us at [abdulwahab22400@gmail.com].

## 🙏 Acknowledgements

- `Firebase` for authentication and database services.
- `React` for the front-end framework.
- `Tailwind CSS` for styling.
- `SweetAlert2` for beautiful alerts.
- `React Icons` for icons.
- `Framer Motion` for animations.

## 🤝 Contributing

- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch
- Create a pull request
