function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section id="account" className="flex flex-col 1440:items-center  ">
      {children}
    </section>
  );
}

export default Layout;
