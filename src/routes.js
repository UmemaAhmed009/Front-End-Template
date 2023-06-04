import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
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
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signUp',
      element: <Register />,
    },
    // {
    //   path: '/user-settings',
    //   element: <AuthMiddleware><UserSettingsPage /></AuthMiddleware>,
    // },
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
