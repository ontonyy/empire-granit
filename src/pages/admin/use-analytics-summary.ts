import { useCallback, useEffect, useState } from 'react';
import { getAnalyticsSummary, type AnalyticsSummary } from '../../lib/analytics-summary';
import { EMPTY_SUMMARY } from './copy';

export function useAnalyticsSummary() {
  const [summary, setSummary] = useState<AnalyticsSummary>(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const nextSummary = await getAnalyticsSummary();
      setSummary(nextSummary);
    } catch (loadError) {
      console.error(loadError);
      setError('Не удалось загрузить данные аналитики из Firestore.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { summary, isLoading, error, reload };
}
