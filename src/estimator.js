
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
const estSevereCasesBRT = (infectionByRT) => {
  const estSevereCasesByRT = Math.trunc(infectionByRT * (15 / 100));
  return estSevereCasesByRT;
};
// eslint-disable-next-line arrow-body-style
const estHospitalBRT = (data, severeCasesByRequestTime) => {
  const hospitalBRT = Math.trunc((data.totalHospitalBeds * (35 / 100)) - severeCasesByRequestTime);
  return hospitalBRT;
};

// Changenge 3 functions
const estimateCasesForICUByRequestedTime = (data, currentlyInfected) => {
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const estCasesForICUBRT = Math.trunc(infectionRT * (5 / 100));
  console.log(estCasesForICUBRT, infectionRT);
  return estCasesForICUBRT;
};
const casesVentilatorsBRT = (data, currentlyInfected) => {
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const casesForVentBRT = Math.trunc(infectionRT * (2 / 100));
  console.log(casesForVentBRT, infectionRT);
  return casesForVentBRT;
};
const estimateDollarsInFlight = (data, currentlyInfected) => {
  const infectionRT = infectionByRequestTime(data, currentlyInfected);
  const dollarsInFlight = Math.trunc(((infectionRT * (65 / 100))
  * data.region.avgDailyIncomeInUSD) / 30);
  return dollarsInFlight;
};

// Estimate Impact function
const estimateImpact = (data, impact) => {
  // Challenge 1
  const currentlyInfectedR = Math.trunc(estimateCurrentlyInfected(impact, data));
  const infectionByRT = Math.trunc(infectionByRequestTime(data, currentlyInfectedR));

  // Challenge 2
  const severeCasesByRequestedTime = estSevereCasesBRT(infectionByRT);
  const hospitalBedsByRequestedTime = estHospitalBRT(data, severeCasesByRequestedTime);

  // Challenge 3
  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(data, currentlyInfectedR);
  const casesForVentilatorsByRequestedTime = casesVentilatorsBRT(data, currentlyInfectedR);
  const dollarsInFlightForImpact = estimateDollarsInFlight(data, currentlyInfectedR);

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
