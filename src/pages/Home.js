import { useNavigate } from 'react-router-dom';

import appUrls from '../appUrls';

const apps = [{ title: 'Age Calculator', path: appUrls.AGE_CALCULATOR }];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='card-container'>
        {apps.map((app, index) => (
          <div key={index} className='card' onClick={() => navigate(app.path)}>
            {index + 1}. {app.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
