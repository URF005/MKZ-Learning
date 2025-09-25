import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import About from './Pages/About'
import LogIn from './Pages/auth/LogIn'
import RequiredAuth from './Pages/auth/RequiredAuth'
import SignUp from './Pages/auth/SignUp'
import UnprotectedRoute from './Pages/auth/UnprotectedRoute'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/course/CourseDescription'
import CourseList from './Pages/course/CourseList'
import CreateCourse from './Pages/course/CreateCourse'
import EditCourse from './Pages/course/EditCourse'
import AddCourseLecture from './Pages/dashboard/AddCourseLecture'
import AdminDashboard from './Pages/dashboard/AdminDashboard'
import CourseLectures from './Pages/dashboard/CourseLectures'
import EditCourseLecture from './Pages/dashboard/EditCourseLecture'
import HomePage from './Pages/HomePage'
import NotFound from './Pages/NotFound'
import ChangePassword from './Pages/password/ChangePassword'
import ResetPassword from './Pages/password/ResetPassword'
import Checkout from './Pages/payments/Checkout'
import PendingApproval from './Pages/payments/PendingApproval'
import Profile from './Pages/user/Profile'

// Newly added footer pages
import HelpCenter from './Pages/HelpCenter'

import TermsOfService from './Pages/TermsOfService'
import PrivacyPolicy from './Pages/PrivacyPolicy'



function App() {
  const location = useLocation();

  useEffect(() => {
    const setTitle = () => {
      const baseTitle = "MZK Digital";
      const path = location.pathname;

      if (path === "/") {
        document.title = `${baseTitle} | Online Learning & Courses Platform`;
      } else if (path === "/about") {
        document.title = `About - ${baseTitle}`;
      } else if (path === "/contact") {
        document.title = `Contact - ${baseTitle}`;
      } else if (path === "/signup") {
        document.title = `Sign Up - ${baseTitle}`;
      } else if (path === "/login") {
        document.title = `Log In - ${baseTitle}`;
      } else if (path === "/courses") {
        document.title = `All Courses - ${baseTitle}`;
      } else if (path === "/course/description") {
        document.title = `Course Description - ${baseTitle}`;
      } else if (path === "/course/create") {
        document.title = `Create Course - ${baseTitle}`;
      } else if (path === "/admin/dashboard") {
        document.title = `Admin Dashboard - ${baseTitle}`;
      } else if (path === "/profile") {
        document.title = `Profile - ${baseTitle}`;
      } else if (path === "/profile/changePassword") {
        document.title = `Change Password - ${baseTitle}`;
      }
      // Footer pages
      else if (path === "/help") {
        document.title = `Help Center - ${baseTitle}`;
      } else if (path === "/terms") {
        document.title = `Terms of Service - ${baseTitle}`;
      } else if (path === "/privacy") {
        document.title = `Privacy Policy - ${baseTitle}`;
      } else {
        document.title = baseTitle; // fallback
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
          <Route path="/checkout/pending" element={<PendingApproval />} />

          <Route path='/course/:name/:id/lectures' element={<CourseLectures />} />
        </Route>

        {/* Footer pages */}
        <Route path='/help' element={<HelpCenter />} />

        <Route path='/terms' element={<TermsOfService />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />



      </Routes>
    </>
  )
}

export default App
