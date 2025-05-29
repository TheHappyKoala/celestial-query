import { createInterface } from "node:readline/promises";

const queryForUserInput = async (query: string): Promise<string> => {
  const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await readLine.question(query);

  readLine.close();

  return userInput;
};

export { queryForUserInput };
