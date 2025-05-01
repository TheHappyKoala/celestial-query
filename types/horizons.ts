type FetchSolarSystemBodyStateVectorsArgsType = {
  bodyId: string;
  center: string;
  startTime: string;
  stopTime: string;
  stepSize: string;
  outputUnits: string;
};

type FetchSolarSystemBodiesStateVectorsArgsType = Omit<
  FetchSolarSystemBodyStateVectorsArgsType,
  "bodyId"
> & {
  bodyIds: string;
};

type HorizonsAPIResponse = {
  signature: {
    version: string;
    source: string;
  };
  result: string;
};

export {
  FetchSolarSystemBodyStateVectorsArgsType,
  FetchSolarSystemBodiesStateVectorsArgsType,
  HorizonsAPIResponse,
};
