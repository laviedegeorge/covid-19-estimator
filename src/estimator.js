
// Changenge 1 Functions
const estimateCurrentlyInfected = (impact, data) => {
  const currentlyInfected = Math.trunc(data.reportedCases * impact);
  return currentlyInfected;
};
const infectionByRequestTime = (data, currentlyInfected) => {
  let time = '';
  let infectionBRT = '';
  // for days
  if (data.periodType.toLowerCase() === 'days') {
    time = Math.trunc((data.timeToElapse * 1) / 3);
  }
  // for weeks
  if (data.periodType.toLowerCase() === 'weeks') {
    time = Math.trunc((data.timeToElapse * 7) / 3);
  }
  // months
  if (data.periodType.toLowerCase() === 'months') {
    time = Math.trunc((data.timeToElapse * 30) / 3);
  }

  infectionBRT = Math.trunc(currentlyInfected * (2 ** time));
  return infectionBRT;
};

// Changenge 2 functions
// eslint-disable-next-line arrow-body-style
const estSevereCasesBRT = (currentlyInfected) => {
  return currentlyInfected * 512 * 0.15;
};
// eslint-disable-next-line arrow-body-style
const estHospitalBRT = (data, severeCasesByRequestTime) => {
  return data.totalHospitalBeds * 0.35 - severeCasesByRequestTime;
};

// Changenge 3 functions
const estimateCasesForICUByRequestedTime = (infectionRT) => infectionRT * 0.05;
const casesVentilatorsBRT = (infectionRT) => infectionRT * 0.02;
const estimateDollarsInFlight = (data, infectionRT) => {
  const dollarsInFlight = (infectionRT * 0.65)
  * data.region.avgDailyIncomeInUSD * 30;
  return dollarsInFlight;
};

// Estimate Impact function
const estimateImpact = (data, impact) => {
  // Challenge 1
  const currentlyInfectedR = Math.trunc(estimateCurrentlyInfected(impact, data));
  const infectionByRT = Math.trunc(infectionByRequestTime(data, currentlyInfectedR));

  // Challenge 2
  const severeCasesByRequestedTime = estSevereCasesBRT(currentlyInfectedR);
  const hospitalBedsByRequestedTime = estHospitalBRT(data, severeCasesByRequestedTime);

  // Challenge 3
  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(infectionByRT);
  const casesForVentilatorsByRequestedTime = casesVentilatorsBRT(infectionByRT);
  const dollarsInFlightForImpact = estimateDollarsInFlight(data, infectionByRT);

  // Impact object
  const impactObj = {
    currentlyInfected: currentlyInfectedR,
    infectionsByRequestedTime: infectionByRT,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByRequestedTime),
    dollarsInFlight: dollarsInFlightForImpact
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
