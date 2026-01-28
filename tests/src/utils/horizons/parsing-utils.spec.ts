import { convertStateVectorsToJSONForBody } from "src/utils/horizons/parsing-utils";
import { earthHorizonsData } from "tests/data/horizons";

describe("convertStateVectorsToJSONForBody", () => {
  it("should convert state vectors data to JSON format", () => {
    const data = convertStateVectorsToJSONForBody(earthHorizonsData);

    expect(data.name).toBe("Earth");
    expect(data.stateVectors.length).toBe(20);
    expect(data.stateVectors[0]).toStrictEqual({
      date: "2006-Jan-01",
      time: "00:00:00.0000",
      position: {
        x: -0.1726747127320182,
        y: 0.969578013322437,
        z: -0.0001276207767932136,
      },
      velocity: {
        x: -0.01721457450124194,
        y: -0.003149384497423472,
        z: -1.243540782086011e-7,
      },
    });
  });
});
