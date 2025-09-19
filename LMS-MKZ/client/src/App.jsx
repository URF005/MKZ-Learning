import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import About from './pages/About'
import LogIn from './pages/auth/LogIn'
import RequiredAuth from './pages/auth/RequiredAuth'
import SignUp from './pages/auth/SignUp'
import UnprotectedRoute from './pages/auth/UnprotectedRoute'
import Contact from './pages/Contact'
import CourseDescription from './pages/course/CourseDescription'
import CourseList from './pages/course/CourseList'
import CreateCourse from './pages/course/CreateCourse'
import EditCourse from './pages/course/EditCourse'
import AddCourseLecture from './pages/dashboard/AddCourseLecture'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import CourseLectures from './pages/dashboard/CourseLectures'
import EditCourseLecture from './pages/dashboard/EditCourseLecture'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ChangePassword from './pages/password/ChangePassword'
import ResetPassword from './pages/password/ResetPassword'
import Checkout from './pages/payments/Checkout'
import CheckoutFail from './pages/payments/CheckoutFail'
import CheckoutSuccess from './pages/payments/CheckoutSuccess'
import Profile from './pages/user/Profile'

// Newly added footer pages
import Pricing from './Pages/Pricing'
import HelpCenter from './Pages/HelpCenter'

import TermsOfService from './Pages/TermsOfService'
import PrivacyPolicy from './Pages/PrivacyPolicy'



function App() {
  const location = useLocation();

  useEffect(() => {
    const setTitle = () => {
      const path = location.pathname;
      if (path === '/') {
        document.title = 'Learning Management System';
      } else if (path === '/about') {
        document.title = 'About - Learning Management System';
      } else if (path === '/contact') {
        document.title = 'Contact - Learning Management System';
      } else if (path === '/signup') {
        document.title = 'Sign Up - Learning Management System';
      } else if (path === '/login') {
        document.title = 'Log In - Learning Management System';
      } else if (path === '/courses') {
        document.title = 'All Courses - Learning Management System';
      } else if (path === '/course/description') {
        document.title = 'Course Description - Learning Management System';
      } else if (path === '/course/create') {
        document.title = 'Create Course - Learning Management System';
      } else if (path === '/admin/dashboard') {
        document.title = 'Admin Dashboard - Learning Management System';
      } else if (path === '/profile') {
        document.title = 'Profile - Learning Management System';
      } else if (path === '/profile/changePassword') {
        document.title = 'Change Password - Learning Management System';
      }
      // Footer pages
      else if (path === '/pricing') {
        document.title = 'Pricing - Learning Management System';
      } else if (path === '/help') {
        document.title = 'Help Center - Learning Management System';
      } else if (path === '/terms') {
        document.title = 'Terms of Service - Learning Management System';
      } else if (path === '/privacy') {
        document.title = 'Privacy Policy - Learning Management System';
      }
    };

    setTitle();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />

        <Route path='/' element={<HomePage />} />

        <Route element={<UnprotectedRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Route>

        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element={<CourseDescription />} />

        <Route element={<RequiredAuth allowedRole={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/course/:name/:id/editCourse' element={<EditCourse />} />
          <Route path='/course/:name/:id/lectures/addlecture' element={<AddCourseLecture />} />
          <Route path='/course/:name/:id/lectures/editlecture' element={<EditCourseLecture />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>

        <Route element={<RequiredAuth allowedRole={["ADMIN", "USER"]} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/changePassword' element={<ChangePassword />} />
          <Route path='/course/:name/checkout' element={<Checkout />} />
          <Route path='/course/:name/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/course/:name/checkout/fail' element={<CheckoutFail />} />
          <Route path='/course/:name/:id/lectures' element={<CourseLectures />} />
        </Route>

        {/* Footer pages */}
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/help' element={<HelpCenter />} />

        <Route path='/terms' element={<TermsOfService />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />



      </Routes>
    </>
  )
}

export default App
