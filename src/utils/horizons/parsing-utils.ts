import { StateVectorsForBody } from "types/api";
import { Vector } from "types/api";

const extractTargetBodyName = (data: string): string | null => {
  const match = data.match(/Target body name:\s*(\S+)/);

  return match?.[1] ?? null;
};

const extractDateAndTimeForVectorRow = (
  row: string = "",
): { date: string | null; time: string | null } => {
  const match = row.match(/A\.D\.\s+(\S+)\s+(\S+)/);

  return {
    date: match && match[1] ? match[1] : null,
    time: match && match[2] ? match[2] : null,
  };
};

const extractVectorFromVectorRow = (row: string = ""): Vector => {
  const [x, y, z] = row.trim().split(" ").filter(Boolean);

  return {
    x: x ? parseFloat(x) : null,
    y: y ? parseFloat(y) : null,
    z: z ? parseFloat(z) : null,
  };
};

const convertStateVectorsToJSONForBody = (
  data: string,
): StateVectorsForBody => {
  const vectorTableMatches = data.match(/\$\$\SOE(.+)\$\$EOE/s);

  const stateVectors = [];

  if (vectorTableMatches && vectorTableMatches.length > 1) {
    const vectorTable = vectorTableMatches[1];

    if (vectorTable) {
      const vectorTableRows = vectorTable
        .split("\n")
        .filter((row) => Boolean(row));

      const numberOfVectorTableRows = vectorTableRows.length;

      for (let i = 0; i < numberOfVectorTableRows; i += 3) {
        const { date, time } = extractDateAndTimeForVectorRow(
          vectorTableRows[i],
        );

        const position = extractVectorFromVectorRow(vectorTableRows?.[i + 1]);
        const velocity = extractVectorFromVectorRow(vectorTableRows?.[i + 2]);

        stateVectors.push({
          date,
          time,
          position,
          velocity,
        });
      }
    }
  }

  return {
    name: extractTargetBodyName(data),
    stateVectors,
  };
};

export { convertStateVectorsToJSONForBody, extractTargetBodyName };
