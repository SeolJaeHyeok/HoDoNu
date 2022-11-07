export function convertTime(date: string) {
  // http://ccambo.github.io/Dev/Typescript/1.typescript-problem-solving-and-tips/
  const start = +new Date(date);
  const end = +new Date(); // 현재 날짜
  const diff = end - start; // 경과 시간

  const times = [
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '주', milliSeconds: 1000 * 60 * 60 * 24 * 7 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '분', milliSeconds: 1000 * 60 },
  ];

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
}

export const getRegexIgnoreWhitespaces = (keyword: string) =>
  new RegExp(keyword.replaceAll(/\s*/g, '').split('').join('\\s*'), 'gi');

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
  // eslint-disable-next-line no-unused-vars
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
