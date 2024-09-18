import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';

export function useCurrentUser() {
  return useSWR('/api/auth/user-info', fetcher);
}

export function useUser(id) {
  // debugger
  return useSWR(`/api/users/${id}`, fetcher);
}
