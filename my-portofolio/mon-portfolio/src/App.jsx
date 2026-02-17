import React from 'react';

function App() {
  return (
    <main className="min-h-screen w-full bg-black font-sans">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="src/video/0217.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-600">
            Alexander
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-widest mt-4 bg-black/30 px-5 py-2 backdrop-blur-md rounded-full border border-white/10">
            Driving through the digital sunset
          </p>
        </div>
      </section>

      <section className="w-full max-w-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-30 bg-gradient-to-t from-violet-950 to-pink-950">
        <div className="w-full">
          <h2 className="text-4xl mt-10 md:text-6xl font-black uppercase italic text-white mb-8 leading-none">
            A little bit <br /> of history
          </h2>
          <div className="space-y-6">
            <p className="text-white leading-relaxed text-lg md:text-xl">
              Since I can remember, I have always been fascinated by art and technology.
              I was deeply interested in sketching, painting, crafts, and video games.
            </p>
            <p className="text-white leading-relaxed text-lg md:text-xl">
              I consider myself fortunate to have closely witnessed the technological
              transformation from indestructible Nokia devices to incredibly powerful
              modern smartphones. During my high school days, I delved into rooting
              and custom Android ROMs, and I still remain a proud member of Team Android.
            </p>
          </div>
        </div>

        <div className="w-full relative flex items-center justify-center h-[500px]">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute top-0 left-0 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 -rotate-12 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-1.jpg" alt="Work" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>
            
            <div className="absolute top-10 left-24 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 rotate-3 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-2.jpg" alt="Phone" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>

            <div className="absolute top-20 left-48 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 rotate-12 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-3.jpg" alt="Android" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>
          </div>
        </div>

        <div className="w-full relative flex items-center justify-center h-[500px]">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute top-0 left-0 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 -rotate-12 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-1.jpg" alt="Work" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>
            
            <div className="absolute top-10 left-24 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 rotate-3 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-2.jpg" alt="Phone" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>

            <div className="absolute top-20 left-48 w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl border-4 border-zinc-900 rotate-12 overflow-hidden transition-transform hover:rotate-0 hover:z-50 duration-300">
              <img src="ton-image-3.jpg" alt="Android" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-4xl mt-10 md:text-6xl font-black uppercase italic text-white mb-8 leading-none">
            Journey of a code
          </h2>
          <div className="space-y-6">
            <p className="text-white leading-relaxed text-lg md:text-xl">
              In 2019, I decided to dip my toes into the world of web development.
              It all started with a simple HTML/CSS video tutorial on YouTube,
              and I instantly fell in love.
            </p>
            <p className="text-white leading-relaxed text-lg md:text-xl">
               I chose to dive into web development,
              especially frontend, as it perfectly combined creativity with coding.
              Since then, I have had the privilege of working with a B2B enterprise SaaS, a geospatial
              data intelligence company on a GIS tool and collaborated with several freelance clients on various projects.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;