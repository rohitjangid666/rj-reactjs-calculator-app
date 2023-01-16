import { lazy } from 'react';
import appUrls from '../appUrls';
import MainLayout from '../layout/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const AgeCalculator = lazy(() => import('../pages/AgeCalculator'));
const BMICalculator = lazy(() => import('../pages/BMICalculator'));

const RoutesPath = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: appUrls.HOME,
      exact: true,
      element: <Home />,
    },
    {
      path: appUrls.AGE_CALCULATOR,
      element: <AgeCalculator />,
    },
    {
      path: appUrls.BMI_CALCULATOR,
      element: <BMICalculator />,
    },
  ],
};

export default RoutesPath;
