import { useSelector } from 'react-redux';
import CreateUser from '../features/users/CreateUser';
import { Link } from 'react-router-dom';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-4 text-xl font-semibold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username !== '' ? (
        <div>
          <p className="mb-2">Hi! {username}, </p>{' '}
          <Button to="/menu" type="primary">
            Continue ordering
          </Button>
        </div>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
