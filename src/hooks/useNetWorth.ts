import { useState, useEffect } from 'react';
import networthData from '../data/networth.json';

export function useNetWorth() {
  const [data, setData] = useState({
    netWorth: networthData.estimatedNetWorthINR,
    person: networthData.person,
    lastUpdated: networthData.lastUpdated,
    sourceNote: networthData.sourceNote,
    disclaimer: networthData.disclaimer,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchNetWorth() {
      try {
        const response = await fetch('/api/networth');
        if (response.ok) {
          const apiData = await response.json();
          if (isMounted) {
            setData({
              netWorth: apiData.estimatedNetWorthINR || networthData.estimatedNetWorthINR,
              person: apiData.person || networthData.person,
              lastUpdated: apiData.lastUpdated || networthData.lastUpdated,
              sourceNote: apiData.sourceNote || networthData.sourceNote,
              disclaimer: apiData.disclaimer || networthData.disclaimer,
              isLoading: false,
            });
          }
          return;
        }
      } catch {
        // API not available, use fallback data silently
      }
      
      if (isMounted) {
        setData(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchNetWorth();

    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}
