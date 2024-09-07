'use server';

import { getExampleData } from './service';

export async function getExample() {
  const data = await getExampleData();
  console.log('-data', data);
  return data;
}
