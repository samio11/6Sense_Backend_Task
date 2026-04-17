import crypto from 'crypto';

const getHashedPrefix = (name: string) => {
  return crypto
    .createHash('md5')
    .update(name)
    .digest('hex')
    .slice(0, 7);
};

const getLongestIncreasingParts = (name: string) => {
  const chars = name.toLowerCase();

  let maxLen = 0;
  let current = '';
  let currentStart = 0;

  const found: { substring: string; start: number; end: number }[] = [];

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];

    if (!/[a-z]/.test(ch)) {
      if (current.length) {
        if (current.length > maxLen) {
          maxLen = current.length;
          found.length = 0;
          found.push({
            substring: current,
            start: currentStart,
            end: i - 1,
          });
        } else if (current.length === maxLen) {
          found.push({
            substring: current,
            start: currentStart,
            end: i - 1,
          });
        }
      }

      current = '';
      continue;
    }

    if (!current.length) {
      current = ch;
      currentStart = i;
    } else {
      const prev = current[current.length - 1];

      if (ch > prev) {
        current += ch;
      } else {
        if (current.length > maxLen) {
          maxLen = current.length;
          found.length = 0;
          found.push({
            substring: current,
            start: currentStart,
            end: i - 1,
          });
        } else if (current.length === maxLen) {
          found.push({
            substring: current,
            start: currentStart,
            end: i - 1,
          });
        }

        current = ch;
        currentStart = i;
      }
    }
  }

   if (current.length) {
    const endIndex = chars.length - 1;

    if (current.length > maxLen) {
      found.length = 0;
      found.push({ substring: current, start: currentStart, end: endIndex });
    } else if (current.length === maxLen) {
      found.push({ substring: current, start: currentStart, end: endIndex });
    }
  }

  return found;
};

export const generateProductCodeBase = (name: string) => {
  const prefix = getHashedPrefix(name);
  const parts = getLongestIncreasingParts(name);

  const validParts = parts.filter((item) => item.substring.length > 0);

  const combinedSubstring = validParts.map((item) => item.substring).join('');
  const startIndex = validParts.length ? validParts[0].start : 0;
  const endIndex = validParts.length ? validParts[validParts.length - 1].end : 0;

  return `${prefix}-${startIndex}${combinedSubstring}${endIndex}`;
};