import { FC } from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-accent-light dark:bg-accent dark:bg-opacity-20 text-accent border border-accent rounded-md my-2">
      {message}
    </div>
  );
};

export default ErrorMessage;
