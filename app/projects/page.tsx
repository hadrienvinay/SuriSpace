import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { link } from "fs";

export default async function Projects() {
  const projects = await prisma.project.findMany()
  return (
    <section className="space-y-16">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Projets de <span className="text-blue-600">Suri</span>
        </h1>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Une page référencant mes divers projets réalisés 
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
        {projects.map((project) => (

          <div key={project.id} className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                        
            <Image
                src={project.image || "/python_img.webp"}
                width={300}
                height={300}
                alt="image"
                className="w-full h-48 object-cover"
              />
            <div className="py-4 px-8">
              <a href={`/projects/${project.id}`}>
                  <h4 className="text-lg mb-3 font-semibold">{project.title}</h4>
              </a>
              <p className="mb-2 text-sm text-gray-600">
                {project.resume}
              </p>

              <span className="text-xs">Projet</span>
              &nbsp;<span className="text-xs text-gray-500">{ project.createdAt.getUTCFullYear() }</span>
            </div>
          </div>
        ))}

         </div>

      </div>

    </section>

  );
}
