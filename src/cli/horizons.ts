import { assembleHorizonsApiUrl, fetchData } from "src/utils/data-utils";
import {
  FetchSolarSystemBodiesStateVectorsArgsType,
  HorizonsAPIResponse,
} from "types/horizons";

const fetchSolarSystemBodiesStateVectors = async ({
  bodyIds,
  center,
  startTime,
  stopTime,
  stepSize,
  outputUnits,
}: FetchSolarSystemBodiesStateVectorsArgsType) => {
  const bodiesArray = bodyIds.split(",");

  for (const bodyId of bodiesArray) {
    const url = assembleHorizonsApiUrl({
      bodyId,
      center,
      startTime,
      stopTime,
      stepSize,
      outputUnits,
    });

    try {
      const data = await fetchData<HorizonsAPIResponse>(url);

      console.log(data);
    } catch (error) {
      console.error(`Error fetching data for body ID ${bodyId}:`, error);
    }
  }
};

export { fetchSolarSystemBodiesStateVectors };
