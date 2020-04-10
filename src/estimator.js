const inputData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

// Changenge 1 Functions

const estimateCurrentlyInfected = (impact) => {
  const currentlyInfected = inputData.reportedCases * impact;
  return currentlyInfected;
};
const estimateInfectionByRequestedTime = (num) => {
  const infectionByRequestedTime = estimateCurrentlyInfected(num) * 512;
  return infectionByRequestedTime;
};

// Changenge 2 functions

const estimateSevereCasesByRequestedTime = (num) => {
  const severeCasesByRequestedTime = estimateInfectionByRequestedTime(num) * 0.15;
  return severeCasesByRequestedTime;
};
const estimateHospitalBedsByRequestedTime = (num) => {
  const percentOfTotalHosiptalBeds = inputData.totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = percentOfTotalHosiptalBeds
  - (estimateSevereCasesByRequestedTime(num));
  return hospitalBedsByRequestedTime;
};

// Changenge 3 functions

const estimateCasesForICUByRequestedTime = (num) => {
  const casesForICUByRequestedTime = estimateInfectionByRequestedTime(num) * 0.05;
  return casesForICUByRequestedTime;
};
const estimateCasesForVentilatorsByRequestedTime = (num) => {
  const casesForVentilatorsByRequestedTime = estimateInfectionByRequestedTime(num) * 0.02;
  return casesForVentilatorsByRequestedTime;
};
const estimateDollarsInFlight = (num) => {
  const dollarsInFlight = (estimateInfectionByRequestedTime(num) * 0.65)
  * inputData.region.avgDailyIncomeInUSD * 30;
  return dollarsInFlight;
};

// Estimate Impact function
const estimateImpact = () => {
  const impact = 10;

  // Challenge 1
  const currentlyInfected = estimateCurrentlyInfected(impact);
  const infectionByRequestedTime = estimateInfectionByRequestedTime(impact);

  // Challenge 2
  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(impact);
  const hospitalBedsByRequestedTime = estimateHospitalBedsByRequestedTime(impact);

  // Challenge 3
  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(impact);
  const casesForVentilatorsByRequestedTime = estimateCasesForVentilatorsByRequestedTime(impact);
  const dollarsInFlightForImpact = estimateDollarsInFlight(impact);

  // Impact object
  const impactObj = {
    currentlyInfected: Math.trunc(currentlyInfected),
    infectionByRequestedTime: Math.trunc(infectionByRequestedTime),
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByRequestedTime),
    dollarsInFlight: dollarsInFlightForImpact
  };
  return impactObj;
};
const estimateSevereImpact = () => {
  const severeImpact = 50;

  // Challenge 1
  const currentlyInfected = estimateCurrentlyInfected(severeImpact);
  const infectionByRequestedTime = estimateInfectionByRequestedTime(severeImpact);

  // Challenge 2
  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(severeImpact);
  const hospitalBedsByRequestedTime = estimateHospitalBedsByRequestedTime(severeImpact);

  // Challenge 3
  const casesForICUByRequestedTime = estimateCasesForICUByRequestedTime(severeImpact);
  const casesForVentilatorsByReqTime = estimateCasesForVentilatorsByRequestedTime(severeImpact);
  const dollarsInFlightForSevereImpact = estimateDollarsInFlight(severeImpact);

  // severeImpact object
  const severeImpactObj = {
    currentlyInfected: Math.trunc(currentlyInfected),
    infectionByRequestedTime: Math.trunc(infectionByRequestedTime),
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByReqTime),
    dollarsInFlight: dollarsInFlightForSevereImpact
  };

  return severeImpactObj;
};

const covid19ImpactEstimator = (data) => {
  const impact = estimateImpact(data);
  const severeImpact = estimateSevereImpact(data);
  const completeData = { data, impact, severeImpact };
  return completeData;
};

export default covid19ImpactEstimator;
