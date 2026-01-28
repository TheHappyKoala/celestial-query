import * as horizons from "src/horizons";
import { fetchSolarSystemBodiesStateVectors } from "src/horizons";
import * as apiUtils from "src/utils/horizons/api-utils";
import { earthHorizonsResponse } from "tests/data/horizons";
import * as parsingUtils from "src/utils/horizons/parsing-utils";

const bodyIds = "399";
const center = "500@0";
const startTime = "2006-01-01";
const stopTime = "2006-01-20";
const stepSize = "1d";
const outputUnits = "AU-D";

describe("fetchSolarSystemBodiesStateVectors", () => {
  it("should fetch state vectors for solar system bodies", async () => {
    const fetchSolarSystemBodyStateVectorsSpy = jest.spyOn(
      horizons,
      "fetchSolarSystemBodyStateVectors",
    );

    await fetchSolarSystemBodiesStateVectors({
      bodyIds,
      center,
      startTime,
      stopTime,
      stepSize,
      outputUnits,
    });

    expect(fetchSolarSystemBodyStateVectorsSpy).toHaveBeenCalledWith({
      bodyIds: "399",
      center: "500@0",
      startTime: "2006-01-01",
      stopTime: "2006-01-20",
      stepSize: "1d",
      outputUnits: "AU-D",
    });

    expect(fetchSolarSystemBodyStateVectorsSpy).toHaveBeenCalledTimes(1);
  });
});

describe("fetchSolarSystemBodyStateVectors", () => {
  let apiUtilsSpy: jest.SpyInstance;
  let parsingUtilsSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    apiUtilsSpy = jest.spyOn(apiUtils, "fetchHorizonsApiData");
    parsingUtilsSpy = jest.spyOn(
      parsingUtils,
      "convertStateVectorsToJSONForBody",
    );
    consoleErrorSpy = jest.spyOn(console, "error");
  });

  it("should fetch state vectors for a single solar system body", async () => {
    apiUtilsSpy.mockReturnValueOnce(
      Promise.resolve(earthHorizonsResponse.result),
    );

    const stateVectors = await horizons.fetchSolarSystemBodyStateVectors({
      bodyIds,
      center,
      startTime,
      stopTime,
      stepSize,
      outputUnits,
    });

    expect(apiUtilsSpy).toHaveBeenCalledWith({
      bodyIds: "399",
      center: "500@0",
      startTime: "2006-01-01",
      stopTime: "2006-01-20",
      stepSize: "1d",
      outputUnits: "AU-D",
    });
    expect(parsingUtilsSpy).toHaveBeenCalledWith(earthHorizonsResponse.result);
    expect(stateVectors).toMatchSnapshot();
  });

  it("Logs error and returns undefined on API fetch failure", async () => {
    const errorMessage = "API fetch error";
    const mockError = new Error(errorMessage);
    apiUtilsSpy.mockRejectedValueOnce(mockError);

    const stateVectors = await horizons.fetchSolarSystemBodyStateVectors({
      bodyIds,
      center,
      startTime,
      stopTime,
      stepSize,
      outputUnits,
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching data for body ID 399:",
      mockError,
    );
    expect(stateVectors).toBeUndefined();
  });
});
