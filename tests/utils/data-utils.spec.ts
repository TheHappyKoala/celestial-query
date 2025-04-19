import * as dataUtils from "src/utils/data-utils";

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
