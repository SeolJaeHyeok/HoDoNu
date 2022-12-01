import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

const Test3 = () => {
  useEffect(() => {
    try {
      throw new Error('Client Test 3');
    } catch (e: any) {
      Sentry.captureEvent(e);
    }
  }, []);

  return <h1>Client Test 3</h1>;
};

export default Test3;
