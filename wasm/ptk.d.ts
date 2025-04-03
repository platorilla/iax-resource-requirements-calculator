// Copyright © 2025 ITRS. All rights reserved.

declare global {
  export interface Window {
    ptk: PTK;
  }
}

export interface PTK {
  load(): Promise<void>;
  version(): string;
  calculateResourceRequirements(
    opts: CalculateResourceRequirementsOpts
  ): Promise<PTKResourceRequirements>;
}

export interface CalculateResourceRequirementsOpts {
  cluster?: {
    nodes: number;
  };
  configGroupNames?: string[];
  matcherPattern?: string;
  configValues?: { [key: string]: string };
}

export interface PTKResourceRequirements {
  limits: {
    cpuCores: number;
    cpuMilli: number;
    memoryGiB: number;
    memoryBytes: number;
  };
  requests: {
    cpuCores: number;
    cpuMilli: number;
    memoryGiB: number;
    memoryBytes: number;
  };
}

export {};
