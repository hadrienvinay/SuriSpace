import Link from "next/link";

export default function Musique() {
  return (
    <section className="space-y-16">

      {/* HERO */}
      <div className="text-center mt-10">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight md:text-6xl">
          Musique de <span className="text-blue-600">Suri</span>
        </h1>
        <p className="mt-6 text-xl max-w-2xl mx-auto">
          Une page référencant mes créations musicales et les dernières pépites.
          <Link href="https://soundcloud.com/surivibe" className="hover:text-blue-600 transition">Soundcloud</Link>

        </p>
        <br></br>

      <div className="space-y-8">
        <div className="bg-white p-12 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-5 lg:mb-0 lg:mr-16 lg:flex-1">
              <h3 className="text-2xl font-semibold text-black mb-3">Ilivor</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                La musique techno et ambiance qui met tous le monde d'accord
              </p>
              <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1233956614&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div><a href="https://soundcloud.com/peaktimerecrods" title="Peaktime Records" target="_blank" >Peaktime Records</a> · <a href="https://soundcloud.com/peaktimerecrods/premiere-ilivor-donneur-de-force" title="Premiere : ILIVOR - Donneur de Force" target="_blank">Premiere : ILIVOR - Donneur de Force</a></div>            
            </div>
            <div className="flex lg:items-center mt-5 lg:mt-0">
              <button className="px-8 py-4 bg-black text-white text-base font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                Learn More
               </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-5 lg:mb-0 lg:mr-16 lg:flex-1">
              <h3 className="text-2xl font-semibold text-black mb-3">SovietWave mix</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ce genre de mix 
              <Link href="https://soundcloud.com/user-901750447/resurrection-full-version" className="hover:text-blue-600 transition">BANG BANG</Link>
              </p>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/A-nh3Tzzsps?si=swWhlEO_w8InJOZ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="flex lg:items-center mt-5 lg:mt-0">
              <button className="px-8 py-4 bg-black text-white text-base font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                Learn More
               </button>
            </div>
          </div>
        </div>

      </div>



        <div className="p-4 w-full">
          <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 w-full">
              <li className="px-6 py-4">
                  <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold text-lg">Ilivor, il est trop fort</span>
                      <span className="text-gray-500 text-xs">Techno / Ambiant</span>
                  </div>
                  <p className="text-gray-700"></p>
              </li>
              <li className="px-6 py-4">
                  <div className="flex justify-between">
                      <span className="font-semibold text-lg">List Item 2</span>
                      <span className="text-gray-500 text-xs">2 days ago</span>
                  </div>
                  <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
              </li>
              <li className="px-6 py-4">
                  <div className="flex justify-between">
                      <span className="font-semibold text-lg">List Item 3</span>
                      <span className="text-gray-500 text-xs">3 days ago</span>
                  </div>
                  <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
              </li>
          </ul>
        </div>

      </div>

    </section>

  );
}
