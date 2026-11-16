import type { Metadata } from "next";
import { CreditCard, Receipt, Wallet } from "lucide-react";
import { ComingSoon } from "@/components/app/coming-soon";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Balance, top-ups and invoices for DARKNOTE HOSTS.",
};

const planned = [
  "Prepaid balance with usage breakdown",
  "Card and transfer top-ups",
  "Monthly invoices and receipts",
  "Spend controls per workspace",
];

export default function WalletPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Billing"
        title="Wallet"
        description="Balance, top-ups and invoices will live here. Billing is not connected in this build."
        badge={<Badge tone="outline">Coming soon</Badge>}
      />

      <ComingSoon
        icon={Wallet}
        section="Billing"
        title="Payments arrive with the billing stage."
        description="No balance is shown because no payment provider is connected. Once billing is live, this page will carry your real balance and history."
        planned={planned}
        actions={
          <>
            <Button disabled>
              <CreditCard className="h-4 w-4" />
              Add funds
            </Button>
            <ButtonLink href="/contact" variant="secondary">
              <Receipt className="h-4 w-4" />
              Ask about billing
            </ButtonLink>
          </>
        }
        footnote="No card details will ever be stored by DARKNOTE HOSTS; payments are handled by the provider."
      />
    </div>
  );
}
