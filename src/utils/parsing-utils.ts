const sliceByLines = (string: string, start: number, end: number): string => {
  console.log("string", string);
  console.log("start", start);
  console.log("end", end);
  const lines = string.split("\n");
  console.log("lines", lines);
  const startFromLineNumber = start;
  const stopFromLineNumber = lines.length - end;

  console.log("stopFromLineNumber", stopFromLineNumber);

  const linesToInclude = lines.slice(startFromLineNumber, stopFromLineNumber);

  console.log("linesToInclude", linesToInclude);
  console.log("Resulting string", linesToInclude.join("\n"));
  return linesToInclude.join("\n");
};

export { sliceByLines };
