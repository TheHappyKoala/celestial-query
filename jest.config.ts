import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "tests/(.*)": "<rootDir>/tests/$1",
    "types/(.*)": "<rootDir>/types/$1",
  },
  testMatch: ["**/tests/**/*.spec.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/types/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/types/"],
};

export default config;
