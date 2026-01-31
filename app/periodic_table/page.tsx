import Image from 'next/image'
import { notFound } from "next/navigation";

export default async function PeriodicTable() {
  
  return (

<section className="flex items-center justify-center relative overflow-hidden">
 <div className="relative items-center w-full px-5 py-12 mx-auto 2xl:max-w-7xl lg:py-12 text-xs">
  <div className="grid grid-cols-5 gap-6">
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-red-50 border-red-200 border p-2 rounded-full flex"></span>
    Post-transition metals
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-purple-50 border-purple-200 border p-2 rounded-full flex"></span>Transition metals
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-lime-50 border-lime-200 border p-2 rounded-full flex"></span>Lanthanoids
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-indigo-50 border-indigo-200 border p-2 rounded-full flex"></span>Actinoids
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-red-50 border-red-200 border p-2 rounded-full flex"></span>Alkaline earth metals
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-cyan-50 border-cyan-200 border p-2 rounded-full flex"></span>Alkali metals
   </p>

   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-pink-50 border-pink-200 border p-2 rounded-full flex"></span>Noble gases
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-blue-50 border-blue-200 border p-2 rounded-full flex"></span>Reactive nonmetals
   </p>

   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-yellow-50 border-yellow-200 border p-2 rounded-full flex"></span>Metailoids
   </p>
   <p className="inline-flex items-center gap-2">
    <span className="w-4 h-4 bg-zinc-50 border-zinc-200 border p-2 rounded-full flex"></span>Unknown
   </p>
  </div>
  <div className="grid grid-cols-18 gap-1 mt-12">
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>1</p>
    <p className="block text-center text-2xl font-medium font-mono">H</p>
    <p className="block text-center text-[0.55rem]">Hydrogen</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700 col-start-18">
    <p>2</p>
    <p className="block text-center text-2xl font-medium font-mono">He</p>
    <p className="block text-center text-[0.55rem]">Helium</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>3</p>
    <p className="block text-center text-2xl font-medium font-mono">Li</p>
    <p className="block text-center text-[0.55rem]">Lithium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>5</p>
    <p className="block text-center text-2xl font-medium font-mono">Be</p>
    <p className="block text-center text-[0.55rem]">Beryllium</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700 col-start-13">
    <p>6</p>
    <p className="block text-center text-2xl font-medium font-mono">B</p>
    <p className="block text-center text-[0.55rem]">Boron</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>7</p>
    <p className="block text-center text-2xl font-medium font-mono">C</p>
    <p className="block text-center text-[0.55rem]">Carbon</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>8</p>
    <p className="block text-center text-2xl font-medium font-mono">N</p>
    <p className="block text-center text-[0.55rem]">Nitrogen</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>9</p>
    <p className="block text-center text-2xl font-medium font-mono">O</p>
    <p className="block text-center text-[0.55rem]">Oxigen</p>
   </div>
   <div className="bg-sky-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-sky-500 hover:text-white duration-200 text-sky-700">
    <p>10</p>
    <p className="block text-center text-2xl font-medium font-mono">F</p>
    <p className="block text-center text-[0.55rem]">Fluorine</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700">
    <p>9</p>
    <p className="block text-center text-2xl font-medium font-mono">Ne</p>
    <p className="block text-center text-[0.55rem]">Neon</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>11</p>
    <p className="block text-center text-2xl font-medium font-mono">So</p>
    <p className="block text-center text-[0.55rem]">Sodium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>12</p>
    <p className="block text-center text-2xl font-medium font-mono">Mg</p>
    <p className="block text-center text-[0.55rem]">Magnesium</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800 col-start-13">
    <p>13</p>
    <p className="block text-center text-2xl font-medium font-mono">Al</p>
    <p className="block text-center text-[0.55rem]">Aluminium</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>14</p>
    <p className="block text-center text-2xl font-medium font-mono">Si</p>
    <p className="block text-center text-[0.55rem]">silicon</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>15</p>
    <p className="block text-center text-2xl font-medium font-mono">P</p>
    <p className="block text-center text-[0.55rem]">Phosphorus</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>16</p>
    <p className="block text-center text-2xl font-medium font-mono">S</p>
    <p className="block text-center text-[0.55rem]">Sulfur</p>
   </div>
   <div className="bg-sky-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-sky-500 hover:text-white duration-200 text-sky-700">
    <p>17</p>
    <p className="block text-center text-2xl font-medium font-mono">Ci</p>
    <p className="block text-center text-[0.55rem]">Chlorine</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700">
    <p>18</p>
    <p className="block text-center text-2xl font-medium font-mono">Ar</p>
    <p className="block text-center text-[0.55rem]">Argon</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>19</p>
    <p className="block text-center text-2xl font-medium font-mono">K</p>
    <p className="block text-center text-[0.55rem]">Potassium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>20</p>
    <p className="block text-center text-2xl font-medium font-mono">Ca</p>
    <p className="block text-center text-[0.55rem]">Calcium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>21</p>
    <p className="block text-center text-2xl font-medium font-mono">Sc</p>
    <p className="block text-center text-[0.55rem]">Scandium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>22</p>
    <p className="block text-center text-2xl font-medium font-mono">Ti</p>
    <p className="block text-center text-[0.55rem]">Titanium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>23</p>
    <p className="block text-center text-2xl font-medium font-mono">V</p>
    <p className="block text-center text-[0.55rem]">Vanadium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>24</p>
    <p className="block text-center text-2xl font-medium font-mono">Cr</p>
    <p className="block text-center text-[0.55rem]">Chromium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>25</p>
    <p className="block text-center text-2xl font-medium font-mono">Mn</p>
    <p className="block text-center text-[0.55rem]">Managanese</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>26</p>
    <p className="block text-center text-2xl font-medium font-mono">Fe</p>
    <p className="block text-center text-[0.55rem]">Iron</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>27</p>
    <p className="block text-center text-2xl font-medium font-mono">Co</p>
    <p className="block text-center text-[0.55rem]">Cobalt</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>28</p>
    <p className="block text-center text-2xl font-medium font-mono">Ni</p>
    <p className="block text-center text-[0.55rem]">Nickle</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>29</p>
    <p className="block text-center text-2xl font-medium font-mono">Cu</p>
    <p className="block text-center text-[0.55rem]">Copper</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>30</p>
    <p className="block text-center text-2xl font-medium font-mono">Zn</p>
    <p className="block text-center text-[0.55rem]">Zinc</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>31</p>
    <p className="block text-center text-2xl font-medium font-mono">Ga</p>
    <p className="block text-center text-[0.55rem]">Gallium</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>32</p>
    <p className="block text-center text-2xl font-medium font-mono">Ge</p>
    <p className="block text-center text-[0.55rem]">Germanium</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>33</p>
    <p className="block text-center text-2xl font-medium font-mono">As</p>
    <p className="block text-center text-[0.55rem]">Arsenic</p>
   </div>
   <div className="bg-blue-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-blue-500 hover:text-white duration-200 text-blue-500">
    <p>34</p>
    <p className="block text-center text-2xl font-medium font-mono">Se</p>
    <p className="block text-center text-[0.55rem]">Selenium</p>
   </div>
   <div className="bg-sky-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-sky-500 hover:text-white duration-200 text-sky-700">
    <p>35</p>
    <p className="block text-center text-2xl font-medium font-mono">Br</p>
    <p className="block text-center text-[0.55rem]">Bromine</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700">
    <p>36</p>
    <p className="block text-center text-2xl font-medium font-mono">Kr</p>
    <p className="block text-center text-[0.55rem]">Krypton</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>37</p>
    <p className="block text-center text-2xl font-medium font-mono">Rb</p>
    <p className="block text-center text-[0.55rem]">Rubidium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>38</p>
    <p className="block text-center text-2xl font-medium font-mono">Sr</p>
    <p className="block text-center text-[0.55rem]">Strontium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>39</p>
    <p className="block text-center text-2xl font-medium font-mono">Y</p>
    <p className="block text-center text-[0.55rem]">Yttrium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>40</p>
    <p className="block text-center text-2xl font-medium font-mono">Zr</p>
    <p className="block text-center text-[0.55rem]">Zirconium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>41</p>
    <p className="block text-center text-2xl font-medium font-mono">Nb</p>
    <p className="block text-center text-[0.55rem]">Niobium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>42</p>
    <p className="block text-center text-2xl font-medium font-mono">Mo</p>
    <p className="block text-center text-[0.55rem]">Molybdenum</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>43</p>
    <p className="block text-center text-2xl font-medium font-mono">Tc</p>
    <p className="block text-center text-[0.55rem]">Technetium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>44</p>
    <p className="block text-center text-2xl font-medium font-mono">Ru</p>
    <p className="block text-center text-[0.55rem]">Ruthenium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>45</p>
    <p className="block text-center text-2xl font-medium font-mono">Rh</p>
    <p className="block text-center text-[0.55rem]">Rhodium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>46</p>
    <p className="block text-center text-2xl font-medium font-mono">Pd</p>
    <p className="block text-center text-[0.55rem]">Palladium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>47</p>
    <p className="block text-center text-2xl font-medium font-mono">Ag</p>
    <p className="block text-center text-[0.55rem]">Silver</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>48</p>
    <p className="block text-center text-2xl font-medium font-mono">Cd</p>
    <p className="block text-center text-[0.55rem]">Cadmium</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>49</p>
    <p className="block text-center text-2xl font-medium font-mono">In</p>
    <p className="block text-center text-[0.55rem]">Indium</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>50</p>
    <p className="block text-center text-2xl font-medium font-mono">Sn</p>
    <p className="block text-center text-[0.55rem]">Tin</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>51</p>
    <p className="block text-center text-2xl font-medium font-mono">Sb</p>
    <p className="block text-center text-[0.55rem]">Antimony</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>52</p>
    <p className="block text-center text-2xl font-medium font-mono">Te</p>
    <p className="block text-center text-[0.55rem]">Tellurium</p>
   </div>
   <div className="bg-sky-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-sky-500 hover:text-white duration-200 text-sky-700">
    <p>53</p>
    <p className="block text-center text-2xl font-medium font-mono">I</p>
    <p className="block text-center text-[0.55rem]">Iodine</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700">
    <p>54</p>
    <p className="block text-center text-2xl font-medium font-mono">Xe</p>
    <p className="block text-center text-[0.55rem]">Xenon</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>55</p>
    <p className="block text-center text-2xl font-medium font-mono">Cs</p>
    <p className="block text-center text-[0.55rem]">Cesium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>56</p>
    <p className="block text-center text-2xl font-medium font-mono">Ba</p>
    <p className="block text-center text-[0.55rem]">Barium</p>
   </div>
   <div className="bg-lime-50 w-full items-center inline-flex h-full text-center p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p className="text-center text-2xl justify-center mx-auto font-medium">L</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>72</p>
    <p className="block text-center text-2xl font-medium font-mono">Hf</p>
    <p className="block text-center text-[0.55rem]">Hafnium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>73</p>
    <p className="block text-center text-2xl font-medium font-mono">Ta</p>
    <p className="block text-center text-[0.55rem]">Tantalum</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>74</p>
    <p className="block text-center text-2xl font-medium font-mono">W</p>
    <p className="block text-center text-[0.55rem]">Tungsten</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>75</p>
    <p className="block text-center text-2xl font-medium font-mono">Re</p>
    <p className="block text-center text-[0.55rem]">Rhenium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>76</p>
    <p className="block text-center text-2xl font-medium font-mono">Os</p>
    <p className="block text-center text-[0.55rem]">Osmium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>77</p>
    <p className="block text-center text-2xl font-medium font-mono">Ir</p>
    <p className="block text-center text-[0.55rem]">Iridium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>78</p>
    <p className="block text-center text-2xl font-medium font-mono">Pt</p>
    <p className="block text-center text-[0.55rem]">Platinum</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>79</p>
    <p className="block text-center text-2xl font-medium font-mono">Au</p>
    <p className="block text-center text-[0.55rem]">Gold</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>80</p>
    <p className="block text-center text-2xl font-medium font-mono">Hg</p>
    <p className="block text-center text-[0.55rem]">Mercury</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>81</p>
    <p className="block text-center text-2xl font-medium font-mono">Tl</p>
    <p className="block text-center text-[0.55rem]">Thallium</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>82</p>
    <p className="block text-center text-2xl font-medium font-mono">Pb</p>
    <p className="block text-center text-[0.55rem]">Lead</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>83</p>
    <p className="block text-center text-2xl font-medium font-mono">Bi</p>
    <p className="block text-center text-[0.55rem]">Bismuth</p>
   </div>
   <div className="bg-green-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-green-500 hover:text-white duration-200 text-green-800">
    <p>84</p>
    <p className="block text-center text-2xl font-medium font-mono">Po</p>
    <p className="block text-center text-[0.55rem]">Polonium</p>
   </div>
   <div className="bg-yellow-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-yellow-500 hover:text-white duration-200 text-yellow-700">
    <p>85</p>
    <p className="block text-center text-2xl font-medium font-mono">At</p>
    <p className="block text-center text-[0.55rem]">Astatine</p>
   </div>
   <div className="bg-pink-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-pink-500 hover:text-white duration-200 text-pink-700">
    <p>86</p>
    <p className="block text-center text-2xl font-medium font-mono">Rn</p>
    <p className="block text-center text-[0.55rem]">Radon</p>
   </div>
   <div className="bg-cyan-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-cyan-500 hover:text-white duration-200 text-cyan-600">
    <p>87</p>
    <p className="block text-center text-2xl font-medium font-mono">Fr</p>
    <p className="block text-center text-[0.55rem]">Francium</p>
   </div>
   <div className="bg-red-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-red-500 hover:text-white duration-200 text-red-500">
    <p>88</p>
    <p className="block text-center text-2xl font-medium font-mono">Ra</p>
    <p className="block text-center text-[0.55rem]">Radium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center inline-flex h-full text-center p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p className="text-center text-2xl justify-center mx-auto font-medium">A</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>104</p>
    <p className="block text-center text-2xl font-medium font-mono">Rf</p>
    <p className="block text-center text-[0.55rem]">Rutherfordium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>105</p>
    <p className="block text-center text-2xl font-medium font-mono">Db</p>
    <p className="block text-center text-[0.55rem]">Dubnium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>106</p>
    <p className="block text-center text-2xl font-medium font-mono">Sg</p>
    <p className="block text-center text-[0.55rem]">Seaborgium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>107</p>
    <p className="block text-center text-2xl font-medium font-mono">Bh</p>
    <p className="block text-center text-[0.55rem]">Bohrium</p>
   </div>
   <div className="bg-purple-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-purple-500 hover:text-white duration-200 text-purple-500">
    <p>108</p>
    <p className="block text-center text-2xl font-medium font-mono">Hs</p>
    <p className="block text-center text-[0.55rem]">Hassium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>109</p>
    <p className="block text-center text-2xl font-medium font-mono">Mt</p>
    <p className="block text-center text-[0.55rem]">Meitnerium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>110</p>
    <p className="block text-center text-2xl font-medium font-mono">Ds</p>
    <p className="block text-center text-[0.55rem]">Darmstadtium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>111</p>
    <p className="block text-center text-2xl font-medium font-mono">Rg</p>
    <p className="block text-center text-[0.55rem]">Roentgenium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>112</p>
    <p className="block text-center text-2xl font-medium font-mono">Cn</p>
    <p className="block text-center text-[0.55rem]">Copernicium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>113</p>
    <p className="block text-center text-2xl font-medium font-mono">Nh</p>
    <p className="block text-center text-[0.55rem]">Nihonium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>114</p>
    <p className="block text-center text-2xl font-medium font-mono">Fl</p>
    <p className="block text-center text-[0.55rem]">Flerovium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>115</p>
    <p className="block text-center text-2xl font-medium font-mono">Mc</p>
    <p className="block text-center text-[0.55rem]">Moscovium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>116</p>
    <p className="block text-center text-2xl font-medium font-mono">Lv</p>
    <p className="block text-center text-[0.55rem]">Livermorium</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>117</p>
    <p className="block text-center text-2xl font-medium font-mono">Ts</p>
    <p className="block text-center text-[0.55rem]">Tennessine</p>
   </div>
   <div className="bg-zinc-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-zinc-500 hover:text-white duration-200 text-zinc-500">
    <p>118</p>
    <p className="block text-center text-2xl font-medium font-mono">Og</p>
    <p className="block text-center text-[0.55rem]">Oganesson</p>
   </div>
  </div>
  <div className="grid grid-cols-18 gap-1 mt-12">
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700 col-start-3">
    <p>57</p>
    <p className="block text-center text-2xl font-medium font-mono">La</p>
    <p className="block text-center text-[0.55rem]">Lanthanum</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>58</p>
    <p className="block text-center text-2xl font-medium font-mono">Ce</p>
    <p className="block text-center text-[0.55rem]">Cerium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>59</p>
    <p className="block text-center text-2xl font-medium font-mono">Pr</p>
    <p className="block text-center text-[0.55rem]">Praseodymium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>60</p>
    <p className="block text-center text-2xl font-medium font-mono">Nd</p>
    <p className="block text-center text-[0.55rem]">Neodymium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>61</p>
    <p className="block text-center text-2xl font-medium font-mono">Pm</p>
    <p className="block text-center text-[0.55rem]">Promethium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>62</p>
    <p className="block text-center text-2xl font-medium font-mono">Sm</p>
    <p className="block text-center text-[0.55rem]">Samarium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>63</p>
    <p className="block text-center text-2xl font-medium font-mono">Eu</p>
    <p className="block text-center text-[0.55rem]">Europium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>64</p>
    <p className="block text-center text-2xl font-medium font-mono">Gd</p>
    <p className="block text-center text-[0.55rem]">Gadolinium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>65</p>
    <p className="block text-center text-2xl font-medium font-mono">Tb</p>
    <p className="block text-center text-[0.55rem]">Terbium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>66</p>
    <p className="block text-center text-2xl font-medium font-mono">Dy</p>
    <p className="block text-center text-[0.55rem]">Dysprosium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>67</p>
    <p className="block text-center text-2xl font-medium font-mono">Ho</p>
    <p className="block text-center text-[0.55rem]">Holmium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>68</p>
    <p className="block text-center text-2xl font-medium font-mono">Er</p>
    <p className="block text-center text-[0.55rem]">Erbium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>69</p>
    <p className="block text-center text-2xl font-medium font-mono">Tm</p>
    <p className="block text-center text-[0.55rem]">Thulium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>70</p>
    <p className="block text-center text-2xl font-medium font-mono">Yb</p>
    <p className="block text-center text-[0.55rem]">Ytterbium</p>
   </div>
   <div className="bg-lime-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-lime-500 hover:text-white duration-200 text-lime-700">
    <p>71</p>
    <p className="block text-center text-2xl font-medium font-mono">Lu</p>
    <p className="block text-center text-[0.55rem]">Lutetium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700 col-start-3">
    <p>89</p>
    <p className="block text-center text-2xl font-medium font-mono">Ac</p>
    <p className="block text-center text-[0.55rem]">Actinium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>90</p>
    <p className="block text-center text-2xl font-medium font-mono">Th</p>
    <p className="block text-center text-[0.55rem]">Thorium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>91</p>
    <p className="block text-center text-2xl font-medium font-mono">Pa</p>
    <p className="block text-center text-[0.55rem]">Protactinium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>92</p>
    <p className="block text-center text-2xl font-medium font-mono">U</p>
    <p className="block text-center text-[0.55rem]">Uranium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>93</p>
    <p className="block text-center text-2xl font-medium font-mono">Np</p>
    <p className="block text-center text-[0.55rem]">Neptunium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>94</p>
    <p className="block text-center text-2xl font-medium font-mono">Pu</p>
    <p className="block text-center text-[0.55rem]">Plutonium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>95</p>
    <p className="block text-center text-2xl font-medium font-mono">Am</p>
    <p className="block text-center text-[0.55rem]">Americium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>96</p>
    <p className="block text-center text-2xl font-medium font-mono">Cm</p>
    <p className="block text-center text-[0.55rem]">Curium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>97</p>
    <p className="block text-center text-2xl font-medium font-mono">Bk</p>
    <p className="block text-center text-[0.55rem]">Berkelium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>98</p>
    <p className="block text-center text-2xl font-medium font-mono">Cf</p>
    <p className="block text-center text-[0.55rem]">Californium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>99</p>
    <p className="block text-center text-2xl font-medium font-mono">Es</p>
    <p className="block text-center text-[0.55rem]">Einsteinium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>100</p>
    <p className="block text-center text-2xl font-medium font-mono">Fm</p>
    <p className="block text-center text-[0.55rem]">Fermium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>101</p>
    <p className="block text-center text-2xl font-medium font-mono">Md</p>
    <p className="block text-center text-[0.55rem]">Mendelevium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>102</p>
    <p className="block text-center text-2xl font-medium font-mono">No</p>
    <p className="block text-center text-[0.55rem]">Nobelium</p>
   </div>
   <div className="bg-indigo-50 w-full items-center h-full flex flex-col p-4 rounded-md hover:bg-indigo-500 hover:text-white duration-200 text-indigo-700">
    <p>103</p>
    <p className="block text-center text-2xl font-medium font-mono">Lr</p>
    <p className="block text-center text-[0.55rem]">Lawrencium</p>
   </div>
  </div>
 </div>
</section>

  )};
