import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  // debugger
  return useSWR('/api/users', fetcher);
}

export function useUser(id) {
  // debugger
  return useSWR(`/api/users/${id}`, fetcher);
}
