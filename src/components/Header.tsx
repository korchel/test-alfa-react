import { Link, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { routes } from "../routes";
import { Button } from "./ui/Button";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="h-20 sticky top-0 bg-gray-50 z-20 shadow-lg">
      <Container className="h-full flex items-center">
        <Link
          to={routes.createProduct()}
          className='ml-auto'
          state={{ previousLocation: location }}
        >
          <Button variant="primary">Create</Button>
        </Link>
      </Container>
    </header>
  );
};
