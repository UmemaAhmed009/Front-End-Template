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
import Classes from './pages/Classes';
import Units from './pages/Units';
import Lessons from './pages/Lessons';
import LessonDetails from './pages/LessonDetails';
import Questions from './pages/Questions';
import AnsweredQuestions from './pages/Answered_Questions';
import ProtectedRoutes from "./ProtectedRoutes";
import AuthComponent from './AuthComponent';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
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
      path: '/subject/:subjectID/class/:classID/unit/:unitID/lesson/:lessonID/lesson-details/answered-questions',
      element: <AnsweredQuestions/>,
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
