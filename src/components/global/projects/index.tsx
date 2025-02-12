import { containerVariants } from "@/lib/constants";
import { type Project } from "@prisma/client";
import { motion } from "framer-motion";
import ProjectCard from "../project-card";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          projectId={project.id}
          title={project.title}
          createdAt={project.createdAt.toString()}
          isDeleted={project.isDeleted}
          slideData={project.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
