// 随机可能的全集
const COMPLETE_WORKS = '0123456789';

const groupByPlace = (
  allCode: string[],
  placeNumber: number,
): Map<string, string[]> => {
  const resMap = new Map<string, string[]>();

  for (const code of allCode) {
    const place = code.charAt(placeNumber);

    const groupArr = resMap.get(place);

    if (groupArr) {
      groupArr.push(code);
    } else {
      resMap.set(place, [code]);
    }
  }

  return resMap;
};

const getCanRandomArrayFromGBPMap = (
  GBPMap: Map<string, string[]>,
  placeNumber: number,
  codeLength: number,
  completeWorks: string = COMPLETE_WORKS,
): string[] => {
  const canRandomArray: string[] = [];
  const completeWorkArr = completeWorks.split('');

  const maxPossibility = Math.pow(
    completeWorkArr.length,
    codeLength - placeNumber - 1,
  );

  for (const completeWork of completeWorkArr) {
    const GBPArr = GBPMap.get(completeWork);

    if (!GBPArr) {
      canRandomArray.push(completeWork);
      continue;
    }

    if (GBPArr.length < maxPossibility) {
      canRandomArray.push(completeWork);
    }
  }

  return canRandomArray;
};

/**
 * [0,max)随机
 * @param max 最大整数（不包括）
 */
const getRandomZeroToInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getRandomString = (
  len: number,
  completeWorks: string = COMPLETE_WORKS,
) => {
  if (len === 0) return '';

  const completeWorksArr = completeWorks.split('');
  let res = '';

  while (len--) {
    const idx = getRandomZeroToInt(completeWorksArr.length);
    res += completeWorksArr[idx];
  }

  return res;
};

export const randomNotInArrayAndSameLength = (
  notSameArray: string[],
  codeLength = 6,
  startIdx: number,
): string => {
  let resString = '';
  let allCode = notSameArray;

  for (let idx = startIdx; idx < codeLength; idx++) {
    const GBPMap = groupByPlace(allCode, idx);

    const canRandomArr = getCanRandomArrayFromGBPMap(GBPMap, idx, codeLength);

    if (canRandomArr.length === 0) throw new Error('全满了，无法继续随机');

    const randomIdx = getRandomZeroToInt(canRandomArr.length);
    const canRandomPlaceCode = canRandomArr[randomIdx];

    const GBPArr = GBPMap.get(canRandomPlaceCode);
    resString = resString + canRandomPlaceCode;

    if (GBPArr) {
      allCode = GBPArr;
      continue;
    }

    // 进入优化逻辑
    resString = resString + getRandomString(codeLength - idx - 1);
    break;
  }

  return resString;
};

export const planOutRandom = (notSameArray: string[], codeLength = 6) => {
  return randomNotInArrayAndSameLength(notSameArray, codeLength, 1);
};
