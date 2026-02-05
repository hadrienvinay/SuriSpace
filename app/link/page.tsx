import Link from "next/link";
import dynamic from "next/dynamic";
import ShowLinks from "@/components/ShowLinks"

export  default function Bourse() {

  return (
    <section className="space-y-4">
      <h1 className="text-4xl text-center font-bold mt-14">Liste des ressources</h1>
      {/* HERO */}
      <div className="text-center mt-10">
        <ShowLinks />
      </div>


    </section>

  );
}
