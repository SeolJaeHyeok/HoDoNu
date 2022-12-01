import * as Sentry from '@sentry/nextjs';

export default function handler(req: any, res: any) {
  try {
    throw new Error('API Test 4');
  } catch (error) {
    Sentry.captureMessage('Sentry에서 추적한 test1 페이지에서 발생한 Error입니다.');
  }

  // res.status(200).json({ name: 'John Doe' });
}
