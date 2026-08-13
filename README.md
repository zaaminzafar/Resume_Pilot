# Resume Builder

A full-stack web application that allows users to create, customize, and manage professional resumes with multiple template options.

## Features

- 🔐 User Authentication (Login/Register)
- 📝 Create and edit resumes with an intuitive form
- 🎨 Multiple resume templates:
  - ATS Resume (Applicant Tracking System optimized)
  - Professional Template
  - Modern Template
  - Minimal Template
  - Creative Template
- 👤 User profile management
- 🔒 Protected routes and secure resume storage
- 💾 Save and manage multiple resumes
- 📱 Responsive design

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySql
- **Authentication**: JWT (middleware implemented)

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (with component-specific stylesheets)
- **Package Manager**: npm or yarn

## Project Structure

```
resume-builder/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── resumeController.js   # Resume business logic
│   │   └── userController.js     # User authentication logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── routes/
│   │   ├── resumeRoutes.js       # Resume endpoints
│   │   └── userRoutes.js         # User endpoints
│   ├── index.js                  # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   ├── types/                # TypeScript type definitions
│   │   ├── hooks/                # Custom React hooks
│   │   ├── context/              # React Context
│   │   ├── utils/                # Utility functions
│   │   ├── styles/               # Global & component styles
│   │   ├── App.tsx               # Main App component
│   │   └── main.tsx              # React entry point
│   ├── public/                   # Static assets
│   ├── vite.config.ts            # Vite configuration
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySql

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory (if needed):
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use)

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-reload)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Register**: Create a new account with your email and password
2. **Login**: Sign in to your account
3. **Create Resume**: Click "Create Resume" to start building
4. **Choose Template**: Select your preferred resume template
5. **Fill Information**: Enter your personal, professional, and educational details
6. **Preview**: See a live preview of your resume
7. **Save**: Save your resume to your account
8. **Manage**: View, edit, or delete your resumes from the dashboard

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Resumes
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get a specific resume
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.
