import { CircularProgress } from '@mui/material';

type LoadingSpinnerType = {
  status: string;
};
const LoadingSpinner = ({ status }: LoadingSpinnerType) => {
  if (status === 'pending') {
    return (
      <div className="centered">
        <CircularProgress />
      </div>
    );
  } else {
    return <></>;
  }
};

export default LoadingSpinner;
