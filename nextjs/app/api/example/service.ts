import dbConnect from 'app/api/db-connect';
import type { IExample } from 'app/api/example/interfaces';

import Example from './model';

export const createExample = async ({ title, description }: IExample) => {
  await dbConnect();
  const data = await Example.create({ title, description });

  return data;
};

export const getExampleData = async () => {
  await dbConnect();
  const data = await Example.find({});

  return data;
};

export const findExampleByTitle = async (title: string) => {
  await dbConnect();
  const data = await Example.find({ title: { $regex: title, $options: 'i' } });

  return data;
};

export const deleteExample = async (id: string) => {
  await dbConnect();
  await Example.findByIdAndDelete(id);
};

export const findExampleDetailById = async (id: string) => {
  await dbConnect();
  const data = await Example.findOne({ _id: id });

  return data;
};
