import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";

import { cn } from "../lib/utils";
import { Checkbox, InputField, SelectComponent } from "./ui";
import { AppDispatchType } from "../store";
import {
  getFilters,
  setCategoryFilter,
  setSearchString,
  toggleIsFavoriteChosen
} from "../store/filterSlice";
import { getCategories } from "../store/categoriesSlice";

interface Props {
  className: string;
}

export const Filters: FC<Props> = ({className}) => {
  const dispatch = useDispatch<AppDispatchType>();

  const filters = useSelector(getFilters);

  const categories = useSelector(getCategories);
  const categoryOptions = [...categories.map((category) => ({
    label: category,
    value: category,
  }))];

  const handleCheck = () => {
    dispatch(toggleIsFavoriteChosen());
  };

  const handleSelect = (value: string) => {
    dispatch(setCategoryFilter(value));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchString(event.target.value));
  };

  return (
    <div className={cn(className, 'flex flex-col gap-4')}>
      <InputField
        placeholder="Search by name"
        value={filters.searchString}
        onChange={handleInput}
      />
      <SelectComponent
        placeholder={'Filter by category'}
        onChange={handleSelect}
        selectOptions={categoryOptions}
        isClearable
        value={filters.category}
      />
      <Checkbox
        label='Show only favorite products'
        onChange={handleCheck}
        checked={filters.isFavoriteChosen}
      />
    </div>
  );
};