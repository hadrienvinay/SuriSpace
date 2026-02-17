import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { link } from "fs";
import { auth } from "@/lib/auth";
import DeleteProjectButton from "@/components/DeleteProjectButton";

export default async function Projects() {
  const session = await auth();
  let user = null;
  if (session && session.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user?.email,
      }
    });
  }
  const projects = await prisma.project.findMany({
    orderBy: {
    createdAt: 'desc', // or 'asc'
  },}
  )
  return (
    <section className="space-y-16">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Projets de <span className="text-blue-600">Suri</span>
        </h1>
        <div>
          <p className="mt-6 text-xl max-w-2xl mx-auto">
            Une page référencant mes divers projets réalisés 
          </p>
      {session && (
      <div className=" mt-5">
        <Link href="/projects/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          + Nouveau Projet 
        </Link>
      </div>)}
        </div>
        <div className=" mx-auto p-16">  
          <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
            <a href={`/projects/gameoflife`} key="gameoflife" className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                        
            <Image
                src="/uploads/gameoflife.jpg" 
                width={300}
                height={300}
                alt="image"
                className="w-full h-48 object-cover"
              />
            <div className="py-4 px-8">
              <h4 className="text-lg mb-3 font-semibold">Le jeu de la vie</h4>
              <p className="mb-2 text-sm">
                Simulation du jeu de la Vie (Game of Life) imaginé par John Horton Conway en 1970.
              </p>

              <span className="text-xs">Projet</span>
              &nbsp;<span className="text-xs text-gray-500">2024</span>
            </div>
          </a>
          
          {projects.map((project) => (

            <a href={`/projects/${project.id}`} key={project.id} className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
            
              <Image
                  src={project.image? project.image: "/python_img.webp"}
                  width={300}
                  height={300}
                  alt="image"
                  className="w-full h-48 object-cover"
                />
              <div className="py-4 px-8">
                <h4 className="text-lg mb-3 font-semibold">{project.title}</h4>
                <p className="mb-2 text-sm ">
                  {project.resume}
                </p>
                {session && (
                  <div className="absolute">
                    <DeleteProjectButton projectId={project.id} />
                  </div>
                  )}

                <span className="text-xs">Projet</span>
                &nbsp;<span className="text-xs text-gray-500">{ project.createdAt.getUTCFullYear() }</span>
              </div>
            </a>
          ))}

         </div>
        </div>

      </div>

    </section>

  );
}
