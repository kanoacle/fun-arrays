/*jshint esversion: 6*/

const dataset = require('./dataset.json').bankBalances;
console.log(dataset);

var hundredThousandairs = dataset.filter(function (element, index, array) {
  return Number(element.amount) > 100000;
});

var roundedDollar = dataset.map(function (element, index, array) {
  var rounded = Number(parseFloat(element.amount).toFixed(0));
  return {
    amount : element.amount,
    state : element.state,
    rounded : rounded
  };
});

var roundedDime = dataset.map(function (element, index, array) {
  var rounded = Number(parseFloat(element.amount).toFixed(1));
  return {
    amount : element.amount,
    state : element.state,
    roundedDime : rounded
  };
});

var sumOfBankBalances = dataset.reduce(function (prev, curr) {
  var sum = prev + Number(curr.amount);
  return Math.round(sum * 100) / 100;
}, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.filter(function (element, index, array) {
  return element.state==='WI' || element.state==='IL' || element.state==='WY' || element.state==='OH'|| element.state==='GA' || element.state==='DE';
}).reduce(function (prev, curr) {
  var sum = prev + Number(curr.amount * 0.189);
  return Math.round(sum * 100) / 100;
}, 0);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
