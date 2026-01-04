type FetchSolarSystemBodyStateVectorsArgsType = {
  bodyIds: string;
  center: string;
  startTime: string;
  stopTime: string;
  stepSize: string;
  outputUnits: string;
};

type HorizonsAPIResponse = {
  signature: {
    version: string;
    source: string;
  };
  result: string;
};

export { FetchSolarSystemBodyStateVectorsArgsType, HorizonsAPIResponse };
