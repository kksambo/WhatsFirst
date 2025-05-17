import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard_page';
import HomePage from './pages/home/home_page';
import LoginPage from './pages/login/login_page';
import ProfilePage from './pages/profile/profile_page';
import RegisterPage from './pages/register/register_page';
import TablesPage from './pages/table/tables_page';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />, // Wrap all pages with common layout
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'profile',
        element: <ProfilePage 
          initialUserData={{ 
            name: '', 
            email: '', 
            username: '', 
            firstName: '', 
            lastName: '', 
            address: '' 
          }} 
          onSave={(data) => Promise.resolve(console.log('Saved:', data))} 
        />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'tables',
        element: <TablesPage />
      }
    ]
  }
]);

// Layout wrapper for shared components (header/nav/footer)
function LayoutWrapper() {
  return (
    <div className="app-layout">
      {/* Add your common header/nav here if needed */}
      <main>
        <Outlet /> {/* This renders the matched child route */}
      </main>
      {/* Add footer here if needed */}
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;