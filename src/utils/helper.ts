export function commaNumber(num: number): string {
  const reversedNumbers = [...String(num)].reverse();
  const result: string[] = [];
  let count = 1;

  reversedNumbers.forEach((num) => {
    result.push(num);

    if (count % 3 === 0) result.push(',');
    count++;
  });

  if (result.reverse()[0] === ',') result.shift();

  return result.join('');
}
