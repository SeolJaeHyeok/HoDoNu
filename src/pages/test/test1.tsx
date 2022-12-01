import * as Sentry from '@sentry/nextjs';

export default function handler(req: any, res: any) {
  try {
    throw new Error('API Test 4');
  } catch (error) {
    Sentry.captureException(error);
  }

  // res.status(200).json({ name: 'John Doe' });
}
