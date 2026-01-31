import Link from "next/link";
import dynamic from "next/dynamic";
import MapboxMap from "../../components/Map"

export  default function Map() {

  return (
    <section className="space-y-4">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          POKEMON GOGO <span className="text-blue-600">ROMZER</span>
        </h1>
        <MapboxMap />
      </div>

    </section>

  );
}
