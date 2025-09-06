
import DashboardContent from '../components/dashboard/dashBoard';
import MinimalLayout from '../layout/MinimalLayout';

const MainRoutes = {
    path: '/',
    element: <MinimalLayout />,  // ✅ changed here
    children: [
        {
            path: 'dashboard',
            element: <DashboardContent />
        },
        // {
        //     path: 'pages/income',
        //     element: <Income />
        // },
        // {
        //     path: 'pages/expense',
        //     element: <Expense />
        // },
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
