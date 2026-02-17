import Link from "next/link";
import prisma from '@/lib/prisma'
import Image from 'next/image'
import { format } from "path";
import { auth } from "@/lib/auth";

export default async function paris() {
  const paris = await prisma.pari.findMany();
  
  return (
    <section className="space-y-16">
        <div className="fixed top-40 right-40">
            <Link href="/baby/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            + Nouveau pari
            </Link>
        </div>

        {/* HERO */}
        <div className="text-center mt-10">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
            Les paris en cours <span className="text-blue-600">des Babes</span>
            </h1>
        <table className="mt-10 min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parieur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexe</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Naissance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poids (g)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille (cm)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yeux</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cheveux</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paris.map((pari) => (
              <tr key={pari.id} className={`${pari.sexe ==='fille' ? 'bg-pink-100 ' : 'bg-blue-100 hover\:bg-blue-300'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pari.parieurName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{pari.sexe}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pari.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(pari.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pari.poids}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pari.taille}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pari.yeux}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pari.cheveux}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    


    </section>

    

  );
}
