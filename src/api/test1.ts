const doAsyncWork = () => Promise.reject(new Error('API Test 1'));
doAsyncWork();

export default function handler(req: any, res: any) {
  res.status(200).json({ name: 'John Doe' });
}
