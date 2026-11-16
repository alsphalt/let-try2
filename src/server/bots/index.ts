import "server-only";

/**
 * Bot hosting boundary.
 *
 * Types and repository contracts only. Runtime provisioning (containers,
 * process supervision, channel sessions) is deliberately not implemented in
 * Stage 01 and must not be simulated.
 */

export const botStatuses = [
  "provisioning",
  "running",
  "stopped",
  "error",
] as const;

export type BotStatus = (typeof botStatuses)[number];

export type Bot = {
  id: string;
  workspaceId: string;
  name: string;
  runtime: "node" | "python";
  status: BotStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBotInput = Pick<Bot, "name" | "runtime">;

export interface BotRepository {
  listByWorkspace(workspaceId: string): Promise<Bot[]>;
  findById(workspaceId: string, botId: string): Promise<Bot | null>;
  create(workspaceId: string, input: CreateBotInput): Promise<Bot>;
  setStatus(workspaceId: string, botId: string, status: BotStatus): Promise<Bot>;
  remove(workspaceId: string, botId: string): Promise<void>;
}

export interface BotRuntime {
  readonly kind: string;
  start(botId: string): Promise<void>;
  stop(botId: string): Promise<void>;
  logs(botId: string, limit?: number): Promise<string[]>;
}
