import { getRecentProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  const recentProjects = await getRecentProjects();

  return (
    <SidebarProvider>
      <AppSidebar user={auth.user} recentProjects={recentProjects.data} />
      <SidebarInset>
        <UpperInfoBar user={auth.user}>{children}</UpperInfoBar>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
