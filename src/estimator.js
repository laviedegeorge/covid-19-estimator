
// Changenge 1 Functions
const estimateCurrentlyInfected = (impact, data) => {
  const currentlyInfected = Math.trunc(data.reportedCases * impact);
  return currentlyInfected;
};
const infectionByRequestTime = (data, impact) => {
  const currentlyInfected = Math.trunc(data.reportedCases * impact);
  if (data.periodType.toLowerCase() === 'days') {
    data.timeToElapse *= 1;
  }
  if (data.periodType.toLowerCase() === 'weeks') {
    data.timeToElapse *= 7;
  }
  if (data.periodType.toLowerCase() === 'months') {
    data.timeToElapse *= 30;
  }
  const time = Math.trunc(data.timeToElapse / 3);
  // eslint-disable-next-line no-restricted-properties
  const infectionBRT = currentlyInfected * (Math.trunc(2 ** time));
  return infectionBRT;
};

// Changenge 2 functions

// Estimate Impact function
const estimateImpact = (data, impact) => {
  // Challenge 1
  const currentlyInfectedR = Math.trunc(estimateCurrentlyInfected(impact, data));
  const infectionByRT = Math.trunc(infectionByRequestTime(data, impact));


  // Impact object
  const impactObj = {
    currentlyInfected: currentlyInfectedR,
    infectionByRequestedTime: infectionByRT
  };
  return impactObj;
};

const covid19ImpactEstimator = (data) => {
  const impact = estimateImpact(data, 10);
  const severeImpact = estimateImpact(data, 50);
  const completeData = { data, impact, severeImpact };
  return completeData;
};

export default covid19ImpactEstimator;
