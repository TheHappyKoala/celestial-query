const sliceByLines = (string: string, start: number, end: number): string => {
  const lines = string.split("\n");
  const startFromLineNumber = start;
  const stopFromLineNumber = lines.length - end;

  const linesToInclude = lines.slice(startFromLineNumber, stopFromLineNumber);

  return linesToInclude.join("\n");
};

export { sliceByLines };
