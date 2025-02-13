export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return <div className="min-h-screen w-full">{children}</div>;
};

export default Layout;
