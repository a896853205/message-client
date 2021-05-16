const groupByPlace = (
  allCode: string[],
  placeNumber: number,
): Map<string, string[]> => {
  const resMap = new Map<string, string[]>();

  for (let code of allCode) {
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
  completeWorks: string = '0123456789',
): string[] => {
  const canRandomArray: string[] = [];
  const completeWorkArr = completeWorks.split('');

  const maxPossibility = Math.pow(
    completeWorkArr.length,
    codeLength - placeNumber - 1,
  );

  for (let completeWork of completeWorkArr) {
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

const getRandomString = (len: number, completeWorks: string = '0123456789') => {
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
  codeLength: number = 6,
  resString: string,
): string => {
  let allCode = notSameArray;
  for (let idx = 0; idx < codeLength; idx++) {
    const GBPMap = groupByPlace(allCode, idx);
    if (idx === 0) {
      // 首位确定值判断
      const firstIndexGBPArray = GBPMap.get(resString);
      if (!firstIndexGBPArray) {
        resString = resString + getRandomString(codeLength - idx - 1);
        return resString;
      } else {
        continue;
      }
    }
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
