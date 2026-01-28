import * as dataUtils from "src/utils/data-utils";

describe("constructQueryParamsString", () => {
  it("Constructs a query string from an array of key-value pairs", () => {
    const params: [string, string][] = [
      ["format", "json"],
      ["OBJ_DATA", "NO"],
      ["MAKE_EPHEM", "YES"],
    ];

    const result = dataUtils.constructQueryParamsString(params);

    expect(result).toEqual("format=json&OBJ_DATA=NO&MAKE_EPHEM=YES");
  });

  it("Encodes special characters in values", () => {
    const params: [string, string][] = [
      ["key-with-hyphens", "value with spaces"],
      ["special&chars", "value=test"],
    ];

    const result = dataUtils.constructQueryParamsString(params);

    expect(result).toEqual(
      "key-with-hyphens=value%20with%20spaces&special&chars=value%3Dtest",
    );
  });

  it("Returns an empty string for an empty array", () => {
    const params: [string, string][] = [];

    const result = dataUtils.constructQueryParamsString(params);

    expect(result).toEqual("");
  });
});

describe("fetchData", () => {
  const mockFetchData = { data: "Some data" };
  const mockFetchUrl = "https://verydata.com";
  const fetchSpy = jest.spyOn(global, "fetch") as jest.Mock;
  const fetchDataSpy = jest.spyOn(dataUtils, "fetchData");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Returns data when fetch returns a 200 status code", async () => {
    fetchSpy.mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(mockFetchData),
        }),
      ),
    );

    const data = await dataUtils.fetchData<typeof mockFetchData>(mockFetchUrl);

    expect(data).toEqual(mockFetchData);
    expect(fetchDataSpy).toHaveBeenCalledWith(mockFetchUrl);
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it("Returns null when fetch returns a 204 status code", async () => {
    fetchSpy.mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 204,
        }),
      ),
    );

    const data = await dataUtils.fetchData<typeof mockFetchData>(mockFetchUrl);

    expect(data).toEqual(null);
    expect(fetchDataSpy).toHaveBeenCalledWith(mockFetchUrl);
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it("Throws an error when fetch returns a non-200/204 status code", async () => {
    fetchSpy.mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 500,
        }),
      ),
    );

    await expect(
      dataUtils.fetchData<typeof mockFetchData>(mockFetchUrl),
    ).rejects.toThrow(
      `The response from ${mockFetchUrl} was not ok! Status: 500`,
    );
    expect(fetchDataSpy).toHaveBeenCalledWith(mockFetchUrl);
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });
});
