import Link from "next/link";
import dynamic from "next/dynamic";
import StocksTable from "@/components/stockTable"

export  default function Bourse() {

  return (
    <section className="space-y-4">
      {/* HERO */}
      <div className="text-center mt-10">
        <StocksTable />
      </div>

    </section>

  );
}
