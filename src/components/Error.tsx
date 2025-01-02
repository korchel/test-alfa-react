import { useNavigate } from "react-router-dom";
import { Button } from "./ui";

export const Error = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-96 w-full">
      <div className="font-semibold">
        An error occured
      </div>
      <Button
        variant='primary'
        onClick={() => navigate(0)}
      >
        Try again
      </Button>
    </div>
  );
};