import Link from "next/link";
import dynamic from "next/dynamic";
import StocksTable from "@/components/stockTable"
import MetalsPrice from "../metals/page";

export  default function Bourse() {

  return (
    <section className="space-y-4">
      <h1 className="text-4xl text-center font-bold mt-14">Indices Boursier en Temps Réel et Prix Spot Or/Argent</h1>
      {/* HERO */}
      <div className="text-center mt-10">
        <StocksTable />
      </div>
      <div className="text-center mt-10">
        <MetalsPrice />
      </div>  

    </section>

  );
}
