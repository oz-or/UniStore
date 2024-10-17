import AccountHeader from "@/components/account/AccountHeader";
import Footer from "@/components/account/Footer";
import { Sidebar } from "@/components/account/sidebar/Sidebar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      id="account"
      className="flex flex-col 1440:items-center px-2 1200:px-6 pb-12"
    >
      <AccountHeader />
      <Sidebar />
      {children}
      <Footer />
    </section>
  );
}

export default Layout;
