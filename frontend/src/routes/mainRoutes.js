
import DashboardContent from '../components/dashboard/dashBoard';
import MinimalLayout from '../layout/MinimalLayout';

const MainRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'home',
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
