import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";

const DashboardPage = async () => {
  const projects = await getAllProjects();

  return (
    <div className="relative flex w-full flex-col gap-6 p-4 md:p-0">
      <div className="flex w-full flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold backdrop-blur-lg dark:text-primary">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All of your work in one place
          </p>
        </div>
      </div>

      {/* {Projects} */}
      <NotFound />
    </div>
  );
};

export default DashboardPage;
