import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from "next/navigation";

export default async function Project({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
    
  });

  if (!project) {
    notFound();
  }
  return (
    <section className="space-y-16">

        <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                <div className="shrink-0">
                    <Image
                    src="/python_img.webp"
                    width={100}
                    height={100}
                    alt="image"
                    className="size-12 rounded-full"
                    />
                </div>

                <div className="grow">
                    <div className="flex justify-between items-center gap-x-2">
                    <div>
                        <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                            <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                                <span className="font-semibold">
                                    Hadrien Vinay
                                </span>
                                <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl " role="tooltip">
                                    <div className="p-4 sm:p-5">
                                        <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                            <div className="shrink-0">
                                            <Image
                                                src={`${project.image}`|| "/python_img.webp"}
                                                width={100}
                                                height={100}
                                                alt="image"
                                                className="size-8 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <ul className="text-xs">
                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        {project.createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </li>
                        <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        Web Development - C++
                        </li>
                    </ul>
                </div>
                <div>
                    <Link href={project.link || ""} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                        <svg className="w-5 h-5 me-2 -ms-1 text-green-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                        clipRule="evenodd" />
                        </svg>
                        Projet sur Github 
                    </Link>
                </div>
                </div>
            </div>
        </div>

        <div className="space-y-5 md:space-y-8">
        <div className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">{project.title}</h2>

            <p className="text-lg">{project.resume}</p>
        </div>

        <p className="text-lg">{project.content}</p>

        <figure>
            <Image
                src={`${project.image}`|| "/python_img.webp"}
                width={100}
                height={100}
                alt="image"
                className="w-full object-cover rounded-xl"
                unoptimized
                />
            <figcaption className="mt-3 text-sm text-center">
                {project.imageTitle}
            </figcaption>
        </figure>

        { project.content2 ? (
            <div className="space-y-3">
            <p className="text-lg">{project.content2}</p>
            <figure>
                <Image
                    src={`${project.image2}`|| "/python_img.webp"}
                    width={200}
                    height={100}
                    alt="image"
                    className="w-full object-cover rounded-xl"
                    unoptimized
                    />
                <figcaption className="mt-3 text-sm text-center">
                    {project.image2Title}
                </figcaption>
            </figure>   
            </div>  ) : null   
        
        }
        
        </div>

</div>
    </section>

  );
}
