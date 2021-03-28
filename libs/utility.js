const BigNumber = require("bignumber.js");

/**
 * Convert 10.999 to 10999000
 */
function toBaseUnitBN(rawAmt, decimals) {
  const raw = new BigNumber(rawAmt);
  const base = new BigNumber(10);
  const decimalsBN = new BigNumber(decimals);
  return raw.times(base.pow(decimalsBN)).integerValue();
}

/**
 * Convert 10999000 to 10.999
 */
const toTokenUnitsBN = (tokenAmount, tokenDecimals) => {
  const amt = new BigNumber(tokenAmount);
  const digits = new BigNumber(10).pow(new BigNumber(tokenDecimals));
  return amt.div(digits);
};

function formatDigits(num, percision) {
  return parseFloat(num).toFixed(percision);
}

const permute = (input, permArr, usedChars, start) => {
  if (start) {
    permArr = [];
    usedChars = [];
  }
  let i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input, permArr, usedChars, false);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
};

module.exports = {
  toBaseUnitBN,
  toTokenUnitsBN,
  formatDigits,
  permute,
};
