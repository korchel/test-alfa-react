import { ClassNamesConfig, GroupBase } from 'react-select';
import { ISelectOption } from './types';
import { cn } from '../../../lib/utils';

export const getClassNames = (
  isError: boolean,
):
  | ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>>
  | undefined => {
  const borderClassNames = isError
    ? 'border-red-400'
    : 'border-slate-400';
  return {
    control: (state) =>
      cn(
        'bg-transparent',
        state.isFocused
          ? `ring ring-slate-400 ring-opacity-50 border-slate-400`
          : borderClassNames,
        'hover:border-slate-400 rounded-md cursor-pointer',
      ),
    valueContainer: () => 'p-1',
    option: ({ isSelected, isFocused }) =>
      cn(
        isFocused && !isSelected && '!bg-slate-400',
        isSelected && '!bg-slate-400',
        'cursor-pointer',
      ),
    menu: () => 'z-20',
    placeholder: () => 'text-gray-400',
    dropdownIndicator: () => 'text-gray-400',
    indicatorSeparator: () => 'bg-gray-400',
  };
};
