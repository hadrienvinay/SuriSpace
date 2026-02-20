import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { format } from "path";
import { auth } from "@/lib/auth";

export default async function paris() {
  const paris = await prisma.pari.findMany();
  const totalParis = await prisma.pari.count();
  const nbFilles =  await prisma.pari.count({
    where: {sexe: 'fille'},
  });
  
  return (
    <section className="max-w-7xl mx-auto space-y-16">
        {/* HERO */}
        <div className="text-center mt-10 overflow-x-auto">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
            Les paris en cours <span className="text-blue-600">des Babes</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <Link href="/baby/new" className="inline-flex items-center gap-2
              bg-linear-to-r from-indigo-600 to-purple-700
              hover:from-indigo-700 hover:to-purple-700
              text-white font-semibold
              px-6 py-3
              rounded-2xl
              shadow-lg hover:shadow-xl
              transition-all duration-300
              active:scale-95">
              ➕ Nouveau pari
            </Link>
          </div>
          <div className="mt-5">
            Nombre total de paris : {totalParis} / Cote fille : {(nbFilles/totalParis)*100}% - Cote garçon : {100-(nbFilles/totalParis)*100}%
          </div>
        <table className="hidden md:table mt-10 min-w-full divide-y divide-gray-200 text-gray-600">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Parieur</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Sexe</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Prénom</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date de Naissance</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Poids (g)</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Taille (cm)</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Yeux</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Cheveux</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paris.map((pari) => (
              <tr key={pari.id} className={`${pari.sexe ==='fille' ? 'bg-pink-100 ' : 'bg-blue-100'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{pari.parieurName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{pari.sexe}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">{pari.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {new Date(pari.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">{pari.poids}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">{pari.taille}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">{pari.yeux}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">{pari.cheveux}</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Version mobile */}
        <div className="md:hidden space-y-4 mt-6 p-2">
          {paris.map((item) => (
            <div key={item.id} className={`rounded-lg shadow ${item.sexe ==='fille' ? 'bg-pink-300 ' : 'bg-blue-300'}`}>
              <p><span className="font-semibold">Nom du parieur: </span> {item.parieurName}</p>
              <p><span className="font-semibold">Sexe:</span> {item.sexe}</p>
              <p><span className="font-semibold">Prénom:</span> {item.prenom}</p>
              <p><span className="font-semibold">Date de naissance:</span> {new Date(item.date).toLocaleDateString('fr-FR')}</p>
              <p><span className="font-semibold">Poids:</span> {item.poids} g</p>
              <p><span className="font-semibold">Taille:</span> {item.taille} cm</p>
              <p><span className="font-semibold">Yeux:</span> {item.yeux}</p>
              <p><span className="font-semibold">Cheveux:</span> {item.cheveux}</p>
            </div>
          ))}
        </div>

      </div>
  
    </section>

    

  );
}
