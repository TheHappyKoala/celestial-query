import { queryForUserInput } from "src/utils/cli-utils";
import { createInterface } from "node:readline/promises";

jest.mock("node:readline/promises", () => ({
  createInterface: jest.fn(),
}));

describe("queryForUserInput", () => {
  const mockQuestion = jest.fn();
  const mockClose = jest.fn();

  (createInterface as jest.Mock).mockReturnValue({
    question: mockQuestion,
    close: mockClose,
  });

  it("should return user input correctly", async () => {
    const question = "What is your name?";
    const input = "Bob";

    mockQuestion.mockResolvedValueOnce(input);

    const result = await queryForUserInput(question);

    expect(createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout,
    });
    expect(mockQuestion).toHaveBeenCalledWith(question);
    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(result).toBe(input);
  });
});
