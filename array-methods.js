/*jshint esversion: 6*/

const dataset = require('./dataset.json').bankBalances;

var hundredThousandairs = dataset.filter( (account) => {
  return Number(account.amount) > 100000;
});



var roundedDollar = dataset.map( (account) => {
  rounded = Number(parseFloat(account.amount).toFixed(0));
  return {
    amount : account.amount,
    state : account.state,
    rounded : rounded
  };
});



var roundedDime = dataset.map( (account) => {
  rounded = Number(parseFloat(account.amount).toFixed(1));
  return {
    amount : account.amount,
    state : account.state,
    roundedDime : rounded
  };
});



var sumOfBankBalances = dataset.reduce( (prev, curr) => {
  sum = prev + Number(curr.amount);
  return Math.round(sum * 100) / 100;
}, 0);



var sumOfInterests = dataset.filter( (account) => {
//spcifying which states to calculate for, by checking if the state values are in the "dataset" array
  return ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(account.state) >= 0;
})
//calculate the interest for each state
.map( (account) => {
  return {
    amount : Number(account.amount * 0.189)
  };
})
//adding the interests together
.reduce( (prev, curr) => {
  sum = prev + curr.amount;
  return Math.round(sum * 100) / 100;
}, 0);



var stateSums = dataset.reduce( (prev, curr) => {
  if (!prev.hasOwnProperty(curr.state)) {
    prev[curr.state] = 0;
  }
  prev[curr.state] += Number(curr.amount);
  prev[curr.state] = Math.round(prev[curr.state] * 100) / 100;
  return prev;
}, {});



var sumOfHighInterests = Object.keys(stateSums).filter( (state) => {
//filter out the states that we've already calculated
  return ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(state) === -1;
})
//map to get the total amounts for each state
.map( (state) => {
  return {
    state : state,
    combinedAmount : stateSums[state]
  };
})
//map to get interest rates for each state
.map( (account) => {
  return {
    interest : Number(account.combinedAmount * 0.189)
  };
})
//filter out all the states whose combined interest is greater than $50,000
.filter( (account) => {
  return account.interest > 50000;
})
//reduce to find the sum
.reduce( (prev, curr) => {
  sum = prev + curr.interest;
  return Math.round(sum * 100) / 100;
}, 0);



var lowerSumStates = Object.keys(stateSums).filter( (state) => {
  return stateSums[state] < 1000000;
});



var higherStateSums = Object.keys(stateSums).filter( (state) => {
//filtering out which states have a combined amount greater that $1,000,000
  return stateSums[state] > 1000000;
//getting the combined amounts
}).map( (state) => {
  return {
    state : state,
    combinedAmount : stateSums[state]
  };
})
//adding all the amounts together
.reduce( (prev, curr) => {
  sum = prev + curr.combinedAmount;
  return sum;
}, 0);



var areStatesInHigherStateSum = Object.keys(stateSums).filter( (state) => {
//only evaluating selected states
  return ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(state) >= 0;
})
//creating an array with all of the states and their combined amounts
.map( (state) => {
  return {
    state : state,
    combinedAmount : stateSums[state]
  };
})
//checking the values for selected states and returning a boolean
.every( (account) => {
  return account.combinedAmount > 2500000;
});



var anyStatesInHigherStateSum = Object.keys(stateSums).filter( (state) => {
//only evaluating selected states
  return ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(state) >= 0;
})
//creating an array with all of the states and their combined amounts
.map( (state) => {
  return {
    state : state,
    combinedAmount : stateSums[state]
  };
})
//checking the values for selected states and returning a boolean
.some( (account) => {
  return account.combinedAmount > 2500000;
});


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
