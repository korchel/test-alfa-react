/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ChangeEventHandler,
    DetailedHTMLProps,
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    useState,
  } from 'react';
  import clsx from 'clsx';
  
  import { InputLabel } from './InputLabel';
  import { ErrorMessage } from './ErrorMessage';
  
  interface IFileInput
    extends DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
    onChange: (...event: any[]) => void;
    error?: string;
    label: string;
  }
  
  export const FileInput = forwardRef(
    (
      { onChange, error, label, ...props }: IFileInput,
      ref: ForwardedRef<HTMLInputElement>,
    ) => {
      const [fileName, setFileName] = useState<string | undefined>(
        '.png',
      );
  
      const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        onChange(file);
        setFileName(file?.name);
      };
  
      return (
        <div
          className={clsx(
            error
                ? 'border-red-400'
                : 'border-slate-400',
            'relative border p-2 cursor-pointer rounded-md',
            'text-gray',
          )}
        >
          <InputLabel required={false} htmlFor='file'>
            {label}
          </InputLabel>
          <div>{fileName}</div>
          <input
            id='file'
            type='file'
            className='absolute opacity-0 h-full w-full cursor-pointer inset-0 text-[0]'
            {...props}
            ref={ref}
            onChange={handleChange}
          />
          {error && (
            <ErrorMessage className='absolute top-10 left-0'>
              {error}
            </ErrorMessage>
          )}
        </div>
      );
    },
  );

  FileInput.displayName = 'file input';