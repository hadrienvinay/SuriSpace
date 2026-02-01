import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { format } from "path";
import DeletePostButton from '@/components/DeletePostButton';
import { auth } from "@/lib/auth";

export default async function Posts() {
  const posts = await prisma.post.findMany();
  const session = await auth();
  
  
  return (
    <section className="space-y-16">
      {session && (
      <div className="fixed top-40 right-40">
        <Link href="/posts/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          + Nouvel Article 
        </Link>
      </div>)}

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Les articles de <span className="text-blue-600">Suri</span>
        </h1>

        <div className="max-w-screen-xl mx-auto p-16">
          <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
            <div key="algo" className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
              <Image
                  src="/uploads/image-1769438168655-893060458.jpg"
                  width={300}
                  height={300}
                  alt="image"
                  className="w-100"
                />
              <div className="py-4 px-8">
                <a href="/posts/algoculture">
                    <h4 className="text-lg mb-3 font-semibold">L'algoculture</h4>
                </a>
                <p className="mb-2 text-sm text-gray-600">
                  La culture des algues — ou algoculture — est une activité vieille de plusieurs siècles, mais elle connaît aujourd’hui une croissance rapide à l’échelle mondiale.
                </p>

                <span className="text-xs">ARTICLE</span>
                &nbsp;<span className="text-xs text-gray-500">2025</span>
              </div>
            </div>
            <div key="cosmo" className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
              <Image
                  src="/univers.webp"
                  width={300}
                  height={300}
                  alt="image"
                  className="w-100"
                />
              <div className="py-4 px-8">
                <a href="/posts/negative">
                    <h4 className="text-lg mb-3 font-semibold">La masse négative</h4>
                </a>
                <p className="mb-2 text-sm text-gray-600">
                  Rapidement réfuté par les scientifiques dans les années 50, l'hypothèse de l'existence de la masse négative attise la curiosité et pourrait s'avérer un candidat sérieux pour expliquer la structure et le comportement des masses de notre univers
                </p>
                <span className="text-xs">ARTICLE</span>
                &nbsp;<span className="text-xs text-gray-500">2026</span>
              </div>
            </div>
            <div key="space" className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
              <Image
                  src="/artemis.jpg"
                  width={300}
                  height={300}
                  alt="image"
                  className="w-100"
                />
              <div className="py-4 px-8">
                <a href="/posts/space">
                    <h4 className="text-lg mb-3 font-semibold">L'actualité spatiale 2026</h4>
                </a>
                <p className="mb-2 text-sm text-gray-600">
                  Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026                
                </p>
                <span className="text-xs">ARTICLE</span>
                &nbsp;<span className="text-xs text-gray-500">2026</span>
              </div>
            </div>

            {posts.map((post) => (

              <div key={post.id} className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                {session && (
                <div className="absolute">
                  <DeletePostButton postId={post.id} />
                </div>
                )}
                <Image
                    src={post.image || "/python_img.webp"}
                    width={300}
                    height={300}
                    alt="image"
                    className="w-100"
                  />
                <div className="py-4 px-8">
                  <a href={`/posts/${post.id}`}>
                      <h4 className="text-lg mb-3 font-semibold">{post.title}</h4>
                  </a>
                  <p className="mb-2 text-sm text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                  </p>

                  <span className="text-xs">ARTICLE</span>
                  &nbsp;<span className="text-xs text-gray-500">{ post.createdAt.getUTCFullYear() }</span>
                </div>
              </div>
            
            ))}

          </div>
        </div>
      </div>

    </section>

    

  );
}
