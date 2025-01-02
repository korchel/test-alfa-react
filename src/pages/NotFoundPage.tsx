import { Link } from 'react-router-dom';

import { Button, Title } from '../components/ui';
import { routes } from '../routes';

export const NotFoundPage = () => {
  return (
    <div className='mt-80 flex flex-col items-center justify-center gap-3'>
      <Title text='Page not found' />
      <Link to={routes.productsPage()}>
        <Button variant='primary'>
          Home
        </Button>
      </Link>
    </div>
  );
};