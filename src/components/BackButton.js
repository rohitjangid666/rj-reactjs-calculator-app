import { useNavigate } from 'react-router-dom';
import appUrls from '../appUrls';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className='btn mt-1' onClick={() => navigate(appUrls.HOME)}>
        Back to Home
      </button>
    </>
  );
};

export default BackButton;
