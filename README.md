# MERN Enquiry Management System

A modern full-stack application built with MERN stack for managing customer inquiries efficiently. Features include real-time form validation, responsive design, and comprehensive CRUD operations. Perfect for businesses needing a robust contact management solution with an intuitive interface and secure data handling.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🚀 Features

- **Responsive Design**: Fully responsive UI that works seamlessly on desktop and mobile devices
- **Real-time Validation**: Client-side form validation with immediate feedback
- **CRUD Operations**: Complete Create, Read, Update, and Delete functionality
- **Modern UI**: Built with Flowbite React components and Tailwind CSS
- **Toast Notifications**: User-friendly notifications for all actions
- **Loading States**: Smooth loading states and transitions
- **Error Handling**: Comprehensive error handling on both frontend and backend

## 🛠️ Tech Stack

### Frontend
- React.js
- Flowbite React
- Tailwind CSS
- Axios for API calls
- React Toastify for notifications
- SweetAlert2 for confirmations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-enquiry-management-system.git
   cd mern-enquiry-management-system
   ```

2. **Install dependencies for backend**
   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   - Create .env file in server directory
   ```env
   PORT=8020
   MONGODB_URI=your_mongodb_connection_string
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:8020

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 📱 API Endpoints

### Enquiry Routes
- `POST /api/website/enquiry/insert` - Create new enquiry
- `GET /api/website/enquiry/view` - Get all enquiries
- `PUT /api/website/enquiry/update/:id` - Update an enquiry
- `DELETE /api/website/enquiry/delete/:id` - Delete an enquiry
- `GET /api/website/enquiry/single/:id` - Get single enquiry

## 💡 Usage

1. **Creating an Enquiry**
   - Fill out the form with name, email, phone, and message
   - Click "Save" to submit
   - Receive confirmation notification

2. **Viewing Enquiries**
   - All enquiries are displayed in a responsive table
   - Mobile view shows essential information
   - Desktop view shows all details

3. **Updating an Enquiry**
   - Click "Edit" on any enquiry
   - Form will be populated with existing data
   - Update fields and click "Update"

4. **Deleting an Enquiry**
   - Click "Delete" on any enquiry
   - Confirm deletion in the popup
   - Receive confirmation notification

## 🔒 Security Features

- Input validation on both client and server side
- Error handling for all API operations
- Secure error messages
- Protection against common web vulnerabilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [Flowbite React](https://flowbite-react.com/)
