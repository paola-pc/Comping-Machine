import useSWR from 'swr';
import fetcher from '../libs/fetcher';

// swr is going to fetch data using fetcher and store it in its global store
// Again, just like redux

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  return {
    data, error, isLoading, mutate
    // mutate is a method provided by SWR if we want to fetch again on purpose
  }
}

export default useCurrentUser;