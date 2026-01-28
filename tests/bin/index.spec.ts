import { jest } from "@jest/globals";
import { StateVectorsForBody } from "../../types/api";
import * as srcIndex from "../../src/index";
import { main } from "../../bin/index";

describe("bin/index CLI", () => {
  const fetchSolarSystemBodiesStateVectors = jest.spyOn(
    srcIndex,
    "fetchSolarSystemBodiesStateVectors",
  );

  const consoleLogSpy = jest.spyOn(console, "log");

  it("should parse CLI arguments, call the API, and log formatted JSON output", async () => {
    const mockResponse: StateVectorsForBody[] = [
      {
        name: "Earth",
        stateVectors: [
          {
            date: "2024-01-01",
            time: "00:00:00.000",
            position: { x: 1.0, y: 0.0, z: 0.0 },
            velocity: { x: 0.0, y: 1.0, z: 0.0 },
          },
        ],
      },
    ];

    fetchSolarSystemBodiesStateVectors.mockResolvedValueOnce(mockResponse);

    const args = [
      "node",
      "bin/index.ts",
      "--body_ids",
      "399",
      "--center",
      "@sun",
      "--start_time",
      "2024-01-01",
      "--stop_time",
      "2024-01-02",
      "--step_size",
      "1d",
      "--output_units",
      "AU-D",
    ];

    await main(args);

    expect(fetchSolarSystemBodiesStateVectors).toHaveBeenCalledWith({
      bodyIds: "399",
      center: "@sun",
      startTime: "2024-01-01",
      stopTime: "2024-01-02",
      stepSize: "1d",
      outputUnits: "AU-D",
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      JSON.stringify(mockResponse, null, 2),
    );
  });
});
