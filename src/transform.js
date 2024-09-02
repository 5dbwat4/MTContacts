const units = ["", "十", "百", "千"];
const num2cnMap = {
  0: "零",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
};

// transform arabic number to chinese number
function num2cn(num) {
  if (num === 0) return "零";

  const digits = num.toString().split("").reverse();
  let result = "";

  digits.forEach((digit, index) => {
    if (digit !== "0") {
      result = num2cnMap[digit] + units[index] + result;
    } else if (!result.startsWith("零")) {
      result = "零" + result;
    }
  });

  // Dealing with redundant zeros in Chinese numbers.
  result = result.replace(/零+$/, ""); // remove the trailing zeros
  result = result.replace(/零+/g, "零"); // merge multiple consecutive zeros

  // Special case handling, remove the leading "一" in the "十" place.
  result = result.replace(/^一十/, "十");

  return result;
}

const cnNumMap = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
};

const cnUnitMap = {
  十: 10,
  百: 100,
  千: 1000,
};

// transform chinese number to arabic number
function cn2num(cn) {
  let unit = 1;
  let num = 0;
  let currentNum = 0;

  for (let i = 0; i < cn.length; i++) {
    const char = cn[i];
    if (cnNumMap[char] !== undefined) {
      currentNum = cnNumMap[char];
    } else if (cnUnitMap[char]) {
      if (currentNum === 0 && char === "十") {
        currentNum = 1;
      }
      unit = cnUnitMap[char];
      num += currentNum * unit;
      currentNum = 0;
    }
  }

  unit = 1;
  num += currentNum * unit;
  return num;
}

exports.cn2num = cn2num;
exports.num2cn = num2cn;
