import { FetchSolarSystemBodyStateVectorsArgsType } from "types/horizons";

const assembleHorizonsApiUrl = ({
  bodyId,
  center,
  startTime,
  stopTime,
  stepSize,
  outputUnits,
}: FetchSolarSystemBodyStateVectorsArgsType): string => {
  const baseUrl = "https://ssd.jpl.nasa.gov/api/horizons.api";

  const fixedQueryParams =
    "format=json&OBJ_DATA='NO'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&VEC_LABELS='NO'&VEC_TABLE='2'";

  const dynamicQueryParams = `COMMAND='${bodyId}'&CENTER='${center}'&START_TIME='${startTime}'&STOP_TIME='${stopTime}'&STEP_SIZE='${stepSize}'&OUT_UNITS='${outputUnits}'`;

  return `${baseUrl}?${fixedQueryParams}&${dynamicQueryParams}`;
};

const fetchData = async <TResponse>(url: string): Promise<TResponse | null> => {
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();

    return data;
  } else if (response.status === 204) {
    return null;
  } else {
    throw new Error(
      `The response from ${url} was not ok! Status: ${response.status}`,
    );
  }
};

export { fetchData, assembleHorizonsApiUrl };
