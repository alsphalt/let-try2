import "server-only";

/**
 * Outbound API / channel integration boundary.
 *
 * Credentials are described but never persisted here. A future adapter will
 * store encrypted secrets and expose only references to them.
 */

export const integrationKinds = [
  "whatsapp",
  "telegram",
  "discord",
  "slack",
  "webhook",
  "custom",
] as const;

export type IntegrationKind = (typeof integrationKinds)[number];

export type IntegrationConnection = {
  id: string;
  workspaceId: string;
  kind: IntegrationKind;
  label: string;
  /** Reference to a credential stored in the secret manager, never the secret. */
  credentialRef: string | null;
  createdAt: Date;
};

export type ConnectionStatus = "active" | "expired" | "revoked";

export interface IntegrationRegistry {
  list(workspaceId: string): Promise<IntegrationConnection[]>;
  connect(
    workspaceId: string,
    kind: IntegrationKind,
    credentialRef: string,
  ): Promise<IntegrationConnection>;
  disconnect(workspaceId: string, connectionId: string): Promise<void>;
}
