
import DashboardContent from '../components/dashboard/dashBoard';
import MinimalLayout from '../layout/MinimalLayout';
import Expense from '../views/pages/expense';
import Income from '../views/pages/income';

const MainRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'home',
            element: <DashboardContent />
        },
        {
            path: 'income',
            element: <Income />
        },
        {
            path: 'expenses',
            element: <Expense />
        },
        // {
        //     path: 'pages/userInfo',
        //     element: <UserInfo />
        // },
        // {
        //     path: 'pages/report',
        //     element: <Report />
        // },
        // {
        //     path: 'pages/calender',
        //     element: <Calender />
        // },
        // {
        //     path: 'pages/:query',
        //     element: <SearchResults />
        // },
    ]
};

export default MainRoutes;
