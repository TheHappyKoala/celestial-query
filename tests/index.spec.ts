import { main } from "src/index";
import * as horizons from "src/cli/horizons";

describe("CLI Entry Point (src/index.ts)", () => {
  let fetchSolarSystemBodiesStateVectorsSpy: jest.SpyInstance = jest
    .spyOn(horizons, "fetchSolarSystemBodiesStateVectors")
    .mockResolvedValue([]);

  it("should parse CLI arguments and call fetchSolarSystemBodiesStateVectors with correct parameters", async () => {
    await main([
      "node",
      "index.js",
      "--body_ids",
      "399",
      "--center",
      "500@0",
      "--start_time",
      "2006-01-01",
      "--stop_time",
      "2006-01-20",
      "--step_size",
      "1d",
      "--output_units",
      "AU-D",
    ]);

    expect(fetchSolarSystemBodiesStateVectorsSpy).toHaveBeenCalledWith({
      bodyIds: "399",
      center: "500@0",
      startTime: "2006-01-01",
      stopTime: "2006-01-20",
      stepSize: "1d",
      outputUnits: "AU-D",
    });

    expect(fetchSolarSystemBodiesStateVectorsSpy).toHaveBeenCalledTimes(1);
  });
});
