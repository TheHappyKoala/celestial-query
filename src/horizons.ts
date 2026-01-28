import { fetchHorizonsApiData } from "src/utils/horizons/api-utils";
import { FetchSolarSystemBodyStateVectorsArgsType } from "types/horizons";
import { StateVectorsForBody } from "types/api";
import { convertStateVectorsToJSONForBody } from "src/utils/horizons/parsing-utils";

export const fetchSolarSystemBodyStateVectors = async (
  queryParameters: FetchSolarSystemBodyStateVectorsArgsType,
): Promise<StateVectorsForBody | undefined> => {
  try {
    const data = await fetchHorizonsApiData(queryParameters);

    const stateVectors = convertStateVectorsToJSONForBody(data);

    return stateVectors;
  } catch (error) {
    console.error(
      `Error fetching data for body ID ${queryParameters.bodyIds}:`,
      error,
    );

    return undefined;
  }
};

export const fetchSolarSystemBodiesStateVectors = async (
  queryParameters: FetchSolarSystemBodyStateVectorsArgsType,
) => {
  const bodiesArray = queryParameters.bodyIds.split(",");

  const stateVectorsArray = [];

  for (const bodyId of bodiesArray) {
    const stateVectors = await fetchSolarSystemBodyStateVectors({
      ...queryParameters,
      bodyIds: bodyId,
    });

    if (stateVectors) {
      stateVectorsArray.push(stateVectors);
    }
  }

  return stateVectorsArray;
};
