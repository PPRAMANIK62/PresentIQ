import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  // const recentProjects = getRecentProjects();

  return (
    <SidebarProvider>
      <AppSidebar user={auth.user}></AppSidebar>
    </SidebarProvider>
  );
};

export default Layout;
