function work() {
  throw new Error('API Test 3');
}

export default function handler(req: any, res: any) {
  work();

  res.status(200).json({ name: 'John Doe' });
}
