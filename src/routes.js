import { useNavigate, Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './admin/UserPage';
import SubjectsPage from './admin/SubjectsPage';
import SubjectForm from './admin/Subject-form';
import LessonsPage from './admin/LessonsPage';
import LessonForm from './admin/Lesson-form';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Register from './pages/RegisterPage';
import Subjects from './pages/Subjects';
import Classes from './pages/Classes';
import Units from './pages/Units';
import Lessons from './pages/Lessons';
import LessonDetails from './pages/LessonDetails';
import Questions from './pages/Questions';
import AnsweredQuestions from './pages/Answered_Questions';
import ProtectedRoutes from "./ProtectedRoutes";
import AuthComponent from './AuthComponent';
import UserSettingsPage from './pages/UserSettingsPage';
import AuthMiddleware from './sections/auth/login/AuthMiddleware';
import UserProfilePage from './pages/UserProfile';

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate;
  const routes = useRoutes([
    
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="dashboard/app" />, index: true },
        { path: '/dashboard/app', element: <AuthMiddleware><DashboardAppPage /></AuthMiddleware> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: '/dashboard/app', element: <AuthMiddleware><DashboardAppPage /></AuthMiddleware> },
        {
          path: 'user-settings',
          element: <AuthMiddleware><UserSettingsPage /></AuthMiddleware>,
        },
        {
          path: '/user-profile',
          element: <AuthMiddleware><UserProfilePage /></AuthMiddleware>,
        },
        {
          path: '/subject',
          element: <AuthMiddleware><Subjects/></AuthMiddleware>,
        },
        {
          path: '/subject/:subjectID/classes',
          element: <AuthMiddleware><Classes/></AuthMiddleware>,
        },
        {
          path: '/subject/:subjectID/class/:classID/units',
          element: <AuthMiddleware><Units/></AuthMiddleware>,
        },
        {
          path:'/subject/:subjectID/class/:classID/unit/:unitID/lessons',
          element: <AuthMiddleware><Lessons/></AuthMiddleware>,
        },
        {
          path:'/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details',
          element: <AuthMiddleware><LessonDetails/></AuthMiddleware>,
        },
        {
          path: '/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details/question',
          element: <AuthMiddleware><Questions/></AuthMiddleware>,
        },
        {
          path: '/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details/answered-questions',
          element: <AuthMiddleware><AnsweredQuestions/></AuthMiddleware>,
        }
      ],
      path: '',
      element: <LoginPage />, index: true
    },
    {
      path: '/home',
      // element: <DashboardLayout />,
      // children: [
      //   // { element: <Navigate to="" />},
      //   { path: 'app', element: <DashboardAppPage /> },
      //   { path: 'user', element: <UserPage /> },
      //   { path: 'products', element: <ProductsPage /> },
      //   { path: 'blog', element: <BlogPage /> },
      // ],
    },
    {
      path: 'signUp',
      element: <Register />,
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'admin',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <AdminPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'subjects', element: <SubjectsPage /> },
        { path: 'subjects/newSubject', element: <SubjectForm /> },
        { path: 'lessons', element: <LessonsPage /> },
        { path: 'lessons/newLesson', element: <LessonForm /> },
      ],
    },

    {
      path: '/subject/:subjectID/classes',
      element: <Classes/>,
    },
    {
      path: '/subject/:subjectID/class/:classID/units',
      element: <Units/>,
    },
    {
      path:'/subject/:subjectID/class/:classID/unit/:unitID/lessons',
      element: <Lessons/>,
    },
    {
      path:'/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details',
      element: <LessonDetails/>,
    },
    {
      path: '/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details/question',
      element: <Questions/>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
