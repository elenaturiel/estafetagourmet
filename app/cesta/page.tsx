import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Tu cesta",
  description: "Revisa los productos de tu cesta en Estafeta Gourmet antes de finalizar el pedido.",
  alternates: { canonical: "/cesta" },
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Tu cesta" />
      <div className="container-site pb-16 lg:pb-24">
        <CartView />
      </div>
    </>
  );
}
