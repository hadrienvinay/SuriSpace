import Image from 'next/image'
import { notFound } from "next/navigation";
import Algo from '@/components/algo';

export default async function Algoculture() {
  
  return (
    <section className="space-y-16">
    <div className="max-w-4xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl">
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

                                <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl" role="tooltip">
                                    <div className="p-4 sm:p-5">
                                    <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                        <div className="shrink-0">
                                        <Image
                                            src="/python_img.webp"
                                            width={100}
                                            height={100}
                                            alt="image"
                                            className="size-8 rounded-full"
                                            />
                                        </div>

                                        
                                    </div>
                                    </div>

                                    <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                        <div>
                                             <a href="/posts" id="back-button" type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                                </svg>
                                                Retour
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <ul className="text-xs">
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                18 Janvier 2026
                                </li>
                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                                2 min de lecture
                                </li>
                            </ul>
                            </div>

                            <div>
                                <a href="/posts" type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none   ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                                    </svg>
                                    Retour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    <Algo />
       
    </div>

    </section>

  );
}
