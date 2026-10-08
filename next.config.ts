import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Don't auto-create AGENTS.md / CLAUDE.md when `next dev` runs under an AI agent.
  agentRules: false,
};

export default nextConfig;
