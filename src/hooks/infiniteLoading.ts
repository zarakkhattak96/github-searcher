import { useEffect, useState } from 'react';
import { IUserProfile } from '../utils/interfaces';
import axios from 'axios';
import { fetchUserProfiles } from '../services/github';

export const useInfiniteLoading = (query: string) => {
  const [userProfs, setUserProfs] = useState<IUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query || query.length < 3) {
      setUserProfs([]);
      setHasMore(false);
      setLoading(false);
      return;
    }

    const source = axios.CancelToken.source();
    setLoading(true);
    setError(false);

    fetchUserProfiles(query, 15, page)
      .then((res) => {
        setUserProfs((prev) => {
          const newUsers = res.filter(
            (newUser) => !prev.some((user) => user.id === newUser.id),
          );

          console.log(newUsers, 'NEW USERS');

          return [...prev, ...newUsers];
        });

        setHasMore(res.data.items.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });

    return () => source.cancel();
  }, [query, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return {
    userProfs,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
