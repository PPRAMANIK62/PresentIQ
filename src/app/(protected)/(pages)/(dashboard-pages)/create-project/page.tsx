import { Suspense } from "react";
import CreateProjectSkeleton from "./_components/create-project/create-project-skeleton";
import RenderPage from "./_components/render-page";

const CreateProjectPage = () => {
  return (
    <main className="size-full pt-6">
      <Suspense fallback={<CreateProjectSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default CreateProjectPage;
