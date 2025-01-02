import Select from 'react-select';
import { ForwardedRef, forwardRef } from 'react';

import { InputLabel } from '../InputLabel';
import { ErrorMessage } from '../ErrorMessage';
import { ISelectOption, onSelect } from './types';
import { EmotionCacheProvider } from './EmotionProvider';
import { getClassNames } from './styles';
import { cn } from '../../../lib/utils';

interface ISelectInputProps {
  onChange: (option: string) => void;
  placeholder?: string;
  selectOptions: ISelectOption[];
  error?: string;
  value: string | undefined;
  label?: string;
  required?: boolean;
  className?: string;
  isClearable?: boolean
}

export const SelectComponent = forwardRef(
  (
    {
      onChange,
      placeholder,
      selectOptions,
      label,
      error,
      value,
      required = false,
      isClearable = false,
      className,
      ...props
    }: ISelectInputProps,
    ref: ForwardedRef<null>,
  ) => {
    const handleSelect: onSelect = (option) => {
      const _option = option as ISelectOption;
      onChange(_option?.value);
    };

    return (
      <EmotionCacheProvider>
        <div className={cn(className, 'relative')}>
          <InputLabel required={required}>{label}</InputLabel>
          <Select
            value={
              value
                ? selectOptions.find((option) => option.value === value)
                : undefined
            }
            classNames={getClassNames(!!error)}
            onChange={handleSelect}
            options={selectOptions}
            placeholder={placeholder}
            ref={ref}
            isClearable={isClearable}
            {...props}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </EmotionCacheProvider>
    );
  },
);