module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: ["controllers/**/*.ts", "services/**/*.ts"],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
