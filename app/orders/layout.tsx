import Header from "@/app/(navigation)/Header";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-14">{children}</main>
    </>
  );
}
