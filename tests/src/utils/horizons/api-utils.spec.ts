import {
  assembleHorizonsApiUrl,
  fetchHorizonsApiData,
} from "src/utils/horizons/api-utils";
import * as dataUtils from "src/utils/data-utils";
import { HorizonsAPIResponse } from "types/horizons";

describe("assembleHorizonsApiUrl", () => {
  const mockBodyIds = "499";
  const mockCenter = "500@0";
  const mockStartTime = "2006-01-01";
  const mockStopTime = "2006-01-20";
  const mockStepSize = "1d";
  const mockOutputUnits = "AU-D";

  it("Assembles the correct URL", () => {
    const expectedUrl =
      "https://ssd.jpl.nasa.gov/api/horizons.api?format=json&OBJ_DATA=NO&MAKE_EPHEM=YES&EPHEM_TYPE=VECTORS&VEC_LABELS=NO&VEC_TABLE=2&COMMAND='499'&CENTER=500%400&START_TIME=2006-01-01&STOP_TIME=2006-01-20&STEP_SIZE=1d&OUT_UNITS=AU-D";

    const url = assembleHorizonsApiUrl({
      bodyIds: mockBodyIds,
      center: mockCenter,
      startTime: mockStartTime,
      stopTime: mockStopTime,
      stepSize: mockStepSize,
      outputUnits: mockOutputUnits,
    });

    expect(url).toEqual(expectedUrl);
  });
});

describe("fetchHorizonsApiData", () => {
  const mockQueryParams = {
    bodyIds: "499",
    center: "500@0",
    startTime: "2006-01-01",
    stopTime: "2006-01-20",
    stepSize: "1d",
    outputUnits: "AU-D",
  };

  const mockResultData = "Mock Horizons data result";

  const mockApiResponse: HorizonsAPIResponse = {
    result: mockResultData,
    signature: {
      source: "NASA/JPL",
      version: "1.0",
    },
  };

  let fetchDataSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchDataSpy = jest.spyOn(dataUtils, "fetchData");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Returns the result data when the API returns valid data", async () => {
    fetchDataSpy.mockResolvedValue(mockApiResponse);

    const result = await fetchHorizonsApiData(mockQueryParams);

    expect(result).toEqual(mockResultData);
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
    expect(fetchDataSpy).toHaveBeenCalledWith(
      assembleHorizonsApiUrl(mockQueryParams),
    );
  });

  it("Throws an error when the API returns null", async () => {
    fetchDataSpy.mockResolvedValue(null);

    await expect(fetchHorizonsApiData(mockQueryParams)).rejects.toThrow(
      `No data returned from Horizons API for body ID: ${mockQueryParams.bodyIds}`,
    );

    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it("Throws an error when the API returns data without a result property", async () => {
    fetchDataSpy.mockResolvedValue({ signature: { source: "NASA/JPL" } });

    await expect(fetchHorizonsApiData(mockQueryParams)).rejects.toThrow(
      `No data returned from Horizons API for body ID: ${mockQueryParams.bodyIds}`,
    );

    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it("Throws an error when the API returns data with an empty result", async () => {
    fetchDataSpy.mockResolvedValue({ result: "" });

    await expect(fetchHorizonsApiData(mockQueryParams)).rejects.toThrow(
      `No data returned from Horizons API for body ID: ${mockQueryParams.bodyIds}`,
    );

    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it("Propagates errors from fetchData", async () => {
    const mockError = new Error("Network error");
    fetchDataSpy.mockRejectedValue(mockError);

    await expect(fetchHorizonsApiData(mockQueryParams)).rejects.toThrow(
      "Network error",
    );
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });
});
