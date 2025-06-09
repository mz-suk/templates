// jest.config.ts
import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Next.js 앱 경로 설정
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // js -> ts로 바꿀 수 있음
  testEnvironment: "jsdom",
};

export default createJestConfig(customJestConfig);
