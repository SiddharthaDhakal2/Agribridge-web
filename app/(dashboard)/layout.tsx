import Header from "../(navigation)/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="pt-16 bg-white min-h-screen">{children}</div>
      
      {/* Footer */}
      <footer className="bg-green-700 text-white py-4">
        <div className="text-center text-sm">
          <p>&copy; 2025 AgriBridge. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
