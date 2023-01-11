import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='app-container'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
