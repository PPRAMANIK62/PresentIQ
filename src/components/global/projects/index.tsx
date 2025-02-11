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
          src={
            project.thumbnail ??
            "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx*fA%3D%3D"
          }
        />
      ))}
    </motion.div>
  );
};

export default Projects;
