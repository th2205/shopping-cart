export function commaNumber(num: number, code?: string): string {
  const result: string[] = [];
  let count = 1;

  if (code === 'KRW' || code === undefined) {
    const reversedNumbers: string[] = [...String(num)].reverse();

    reversedNumbers.forEach((num) => {
      result.push(num);

      if (count % 3 === 0) result.push(',');
      count++;
    });

    if (result.reverse()[0] === ',') result.shift();

    return `${result.join('')}원`;
  } else {
    const splitedArray = String(num).split('.');
    const left: string[] = [...splitedArray[0]].reverse();
    const right: string = splitedArray[1];

    left.forEach((num) => {
      result.push(num);

      if (count % 3 === 0) result.push(',');
      count++;
    });

    if (result.reverse()[0] === ',') result.shift();

    return '$' + [...result, '.', right].join('');
  }
}
