import {
  HorizonsAPIResponse,
  FetchSolarSystemBodyStateVectorsArgsType,
} from "types/horizons";
import { fetchData, constructQueryParamsString } from "src/utils/data-utils";

export const assembleHorizonsApiUrl = (
  queryParameters: FetchSolarSystemBodyStateVectorsArgsType,
): string => {
  const HORIZONS_API_BASE_URL: string =
    "https://ssd.jpl.nasa.gov/api/horizons.api";

  const fixedQueryParams: [string, string][] = [
    ["format", "json"],
    ["OBJ_DATA", "NO"],
    ["MAKE_EPHEM", "YES"],
    ["EPHEM_TYPE", "VECTORS"],
    ["VEC_LABELS", "NO"],
    ["VEC_TABLE", "2"],
  ];

  const dynamicQueryParams: [string, string][] = [
    ["COMMAND", `'${queryParameters.bodyIds}'`],
    ["CENTER", queryParameters.center],
    ["START_TIME", queryParameters.startTime],
    ["STOP_TIME", queryParameters.stopTime],
    ["STEP_SIZE", queryParameters.stepSize],
    ["OUT_UNITS", queryParameters.outputUnits],
  ];

  const queryString = [
    HORIZONS_API_BASE_URL,
    "?",
    constructQueryParamsString(fixedQueryParams),
    "&",
    constructQueryParamsString(dynamicQueryParams),
  ].join("");

  return queryString;
};

export const fetchHorizonsApiData = async (
  queryParameters: FetchSolarSystemBodyStateVectorsArgsType,
): Promise<string> => {
  const url = assembleHorizonsApiUrl(queryParameters);

  const data = await fetchData<HorizonsAPIResponse>(url);

  if (!data?.result) {
    throw new Error(
      `No data returned from Horizons API for body ID: ${queryParameters.bodyIds}`,
    );
  }

  return data.result;
};
