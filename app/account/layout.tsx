import { Sidebar } from "@/components/account/sidebar/Sidebar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section id="account" className="flex flex-col 1440:items-center  ">
      <div className="1024:grid relative pb-16 1024:pb-0  1024:grid-cols-[300px_1fr] 1200:grid-cols-[320px_1fr] 1440:w-[1440px]">
        <Sidebar />

        {children}
      </div>
    </section>
  );
}

export default Layout;
