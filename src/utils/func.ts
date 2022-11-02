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