import { useCallback, useEffect, useState } from 'react';

const useIsTabActive = () => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === 'visible');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }},1000);
    return ()=>clearInterval(interval);
  }, [handleVisibilityChange]);

  return isTabVisible;
};

export default useIsTabActive;