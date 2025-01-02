import { Controller, useForm } from "react-hook-form";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { zodResolver } from '@hookform/resolvers/zod';

import { TextArea, Button, InputField, Title, SelectComponent } from "./ui";
import { ICreateProduct, IProduct, productSchema } from "../interfaces/product";
import { getCategories } from "../store/categoriesSlice";

interface Props {
    onSubmitFunction: (data: ICreateProduct) => void;
    defaultValues?: IProduct;
}

export const ProductForm: FC<Props> = ({ onSubmitFunction, defaultValues }) => {
  const categories = useSelector(getCategories);
  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<ICreateProduct>({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ICreateProduct) => {
    onSubmitFunction(data);
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title text='Create new product' />
      <InputField
        {...register('title')}
        label='Product name'
        error={errors.title?.message}
      />
      <Controller
        control={control}
        name='category'
        render={({ field }) => (
          <SelectComponent
            {...field}
            placeholder={'Chose category'}
            error={errors.category?.message}
            label='Category'
            onChange={field.onChange}
            selectOptions={categoryOptions}
            required={true}
          />
        )}
      />
      <InputField
        {...register('brand')}
        label='Brand'
        error={errors.brand?.message}
      />
      <TextArea
        {...register('description')}
        label='Product description'
        error={errors.description?.message}
      />
      <InputField
        {...register('price')}
        type='number'
        step=".01"
        label='Price'
        placeholder="Dollars"
        error={errors.price?.message}
      />
      <Button variant="primary">
        Submit
      </Button>
    </form>
  );
};