import React,{useState} from 'react'

function App(){
  const [currentSection, setCurrentSection]=useState('home')

  const toggleSection = (sectionName) => {
    if(currentSection===sectionName){
      setCurrentSection('home')
    }else{
      setCurrentSection(sectionName)
    }
  }

  return (
    <main className="min-h-screen w-full bg-black font-sans">
      <section className='relative h-screen w-full flex items-center justify-center overflow-hidden font-sans'>
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="src/video/dark-galaxy.3840x2160.mp4" type="video/mp4"/>
        </video>

        <nav className="absolute top-0 left-0 w-full z-[100] bg-black/25 backdrop-blur-sm h-15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <ul className='flex items-center justify-center gap-10 py-5 text-gray-300 uppercase tracking-[0.3em] text-xs font-medium'>
            <li className="cursor-pointer" onClick={()=>toggleSection('work')}><a className='hover:text-pink-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]' href="#">Work</a></li>
            <li className="cursor-pointer" onClick={()=>toggleSection('skills')}><a className='hover:text-pink-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]' href="#">Skills</a></li>
            <li className="cursor-pointer" onClick={()=>toggleSection('about')}><a className='hover:text-pink-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]' href="#">About</a></li>
            <li className="cursor-pointer" onClick={()=>toggleSection('social')}><a className='hover:text-pink-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]' href="#">Social</a></li>
          </ul>
        </nav>

        {currentSection==='home' && (
          <div id='Home' className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase italic text-transparent bg-clip-text bg-gradient-to-t from-grey to-white drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] [-webkit-text-stroke:0.1px_rgba(0,0,0,0.1)]">
              Alexander
            </h1>
            <div className='bg-gradient-to-r from-black to-white shadow-[0_0_30px_rgba(139,92,246,0.7)] h-1 w-200'>ㅤ</div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-mono tracking-widest mt-4 bg-black/30 px-5 py-2 rounded-full border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm">Chasing the Binary Galaxy</p>
          </div>
        )}

        {currentSection==='work' && (
  <div id='WorkList' className="relative z-10 flex flex-col items-center justify-center text-white px-4 max-w-[60vw] max-h-[60vh]">
    <h2 className="text-3xl font-bold uppercase mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">My Work</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto">
      
      <div className="p-3 border border-white/20 bg-white/5 rounded-xl shadow-lg backdrop-blur-sm">
        <h3 className="text-base font-bold">OWASP Juice Shop Pentest</h3>
        <img src="src/images/juiceshop.jpg" alt="juice shop" className="mt-2 mb-2 w-full object-cover rounded-md" />
        <p className="text-xs mb-2 text-gray-200">My pentesting project on Juice Shop. I found and exploited multiple web vulnerabilities. Good practice to learn how to attack and defend an app.</p>
        <a href="https://github.com/alexander-sudo-rgb/Pen-Testing-with-juice-shop" target="_blank" rel="noreferrer" className="text-pink-400 underline text-xs hover:text-white">Check my Github repo</a>
      </div>

      <div className="p-3 border border-white/20 bg-white/5 rounded-xl shadow-lg backdrop-blur-sm">
        <h3 className="text-base font-bold">HACKATHON THEME – DATA & CLIMATE</h3>
        <img src="src/images/Hackaton.png" alt="juice shop" className="mt-2 mb-2 w-full object-cover rounded-md" />
        <p className="text-xs mb-2 text-gray-200">This hackathon is an opportunity to put my technical skills in
web development, data, and UI/UX into practice, while working on a real-world challenge
led by a recognized leader in the green transition. </p>
        <a href="https://github.com/alexander-sudo-rgb/Poduct-Design-Hackathon" target="_blank" rel="noreferrer" className="text-pink-400 underline text-xs hover:text-white">Check my Github repo</a>
      </div>

      <div className="p-3 border border-white/20 bg-white/5 rounded-xl shadow-lg backdrop-blur-sm">
      <h3 className="text-base font-bold">TARDIS: Train Delay Predictor</h3>
      <img src="src/images/Tardis.png" alt="TARDIS dashboard" className="mt-2 mb-2 w-full object-cover rounded-md" />
      <p className="text-xs mb-2 text-gray-200">A data analysis and machine learning project to forecast SNCF train delays. I performed data cleaning, exploratory data analysis, and built a regression model integrated into an interactive Streamlit dashboard.</p>
      <a href="https://github.com/alexander-sudo-rgb/TARDIS-SNCF-Delay-Predictor" target="_blank" rel="noreferrer" className="text-pink-400 underline text-xs hover:text-white">Check my Github repo</a>
</div>
    </div>
    <button onClick={()=>setCurrentSection('home')} className="mt-4 text-xs uppercase tracking-widest hover:text-pink-500 transition-colors drop-shadow-md">[ Back ]</button>
  </div>
)}

        {currentSection==='skills' && (
        <div id='WorkList' className="gap-30 flex grid-cols-1 relative z-10 text-white px-4">
          <h2 className="absolute bottom-110 left-115 text-4xl font-bold uppercase mb-8 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">My Skills</h2>
          
          <div className="gap-10">
            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/HTML.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(11)].map((_,i)=><div key={i} className="h-full w-3 bg-orange-400/90 rounded-sm shadow-[0_0_8px_rgba(251,146,60,0.4)]"></div>)}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/CSS.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(11)].map((_,i)=><div key={i} className="h-full w-3 bg-blue-400/90 rounded-sm shadow-[0_0_8px_rgba(96,165,250,0.4)]"></div>)}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/Git.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(7)].map((_,i)=><div key={i} className="h-full w-3 bg-slate-300/90 rounded-sm shadow-[0_0_8px_rgba(203,213,225,0.4)]"></div>)}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/JS.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(5)].map((_,i)=><div key={i} className="h-full w-3 bg-orange-300/90 rounded-sm shadow-[0_0_8px_rgba(253,186,116,0.4)]"></div>)}
              </div>
            </div>
          </div>

          <div className="gap-4">
            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/PenTesting.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(5)].map((_,i)=><div key={i} className="h-full w-3 bg-cyan-500/90 rounded-sm shadow-[0_0_8px_rgba(6,182,212,0.4)]"></div>)}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/Python.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(8)].map((_,i)=><div key={i} className="h-full w-3 bg-sky-400/90 rounded-sm shadow-[0_0_8px_rgba(56,189,248,0.4)]"></div>)}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/SQL.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(7)].map((_,i)=>(i<7 && <div key={i} className="h-full w-3 bg-blue-300/90 rounded-sm shadow-[0_0_8px_rgba(147,197,253,0.4)]"></div>))}
              </div>
            </div>

            <div className="h-28 w-120 p-4 border border-white/20 bg-white/2 rounded-xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="h-20 w-25 flex items-center justify-center border border-white/20 bg-white/10 rounded-xl shrink-0 shadow-inner"><img className="h-15 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" src="src/images/TailWindCSS.png" alt=""/></div>
              <div className="flex gap-0.5 h-10 w-80 border border-white/10 bg-white/5 rounded-sm p-1 shadow-inner">
                {[...Array(11)].map((_,i)=><div key={i} className="h-full w-3 bg-cyan-400/90 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>)}
              </div>
            </div>

            <button onClick={()=>setCurrentSection('home')} className="absolute left-130 top-110 mt-8 text-xs uppercase tracking-widest hover:text-pink-500 transition-colors drop-shadow-md">[ Retour ]</button>
          </div>
        </div>
        )}

        {currentSection==='about' && (
          <div id='WorkList' className="relative z-10 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-4xl font-bold uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">Hi, i'm Alexander Salazar</h2>
            <div className='h-1 w-88 border-white/80 bg-white/60 rounded-xl z-20 mb-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]'></div>
            <div className="gap-4 justify-center">
              <div className="p-6 border border-white/20 bg-white/5 rounded-xl h-50 w-200 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">I am currently a first-year Bachelor student at Epitech, a computer science school in France. Since the start of the year, I have gained hands-on experience in teamwork through various group projects, allowing me to fully immerse myself in the world of coding. <br/><br/> I'm constantly sharpening my skills across the year. I believe learning never stops, and I'm always up for a good challenge, a new skill, or an interesting bug to squash.</div>
            </div>
            <button onClick={()=>setCurrentSection('home')} className="mt-8 text-xs uppercase tracking-widest hover:text-pink-500 transition-colors drop-shadow-md">[ Retour ]</button>
          </div>
        )}

        {currentSection==='social' && (
          <div id='WorkList' className="relative z-10 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-4xl font-bold uppercase mb-8 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">Socials Medias</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              <a href="https://www.linkedin.com/in/alexander-salazar-2934a1386/" target="_blank" rel="noopener noreferrer" className="flex justify-center p-4 border border-white/20 bg-white/5 rounded-xl w-28 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white group shadow-xl backdrop-blur-md">
                <img className="h-15 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" src="src/images/linkedin.png" alt="LinkedIn"/>
              </a>
              <a href="https://github.com/alexander-sudo-rgb" target="_blank" rel="noopener noreferrer" className="flex justify-center p-4 border border-white/20 bg-white/5 rounded-xl w-28 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white group shadow-xl backdrop-blur-md">
                <img className="h-15 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" src="src/images/Git.png" alt="GitHub"/>
              </a>
              <a href="tel:+33600000000" className="flex justify-center p-4 border border-white/20 bg-white/5 rounded-xl w-28 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white group shadow-xl backdrop-blur-md">
                <img className="h-15 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" src="src/images/telephone.png" alt="Téléphone"/>
              </a>
              <a href="mailto:alexanderelisei75@gmail.com" className="flex justify-center p-4 border border-white/20 bg-white/5 rounded-xl w-28 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-white group shadow-xl backdrop-blur-md">
                <img className="h-15 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.4)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" src="src/images/gmail.png" alt="Email"/>
              </a>
            </div>
            <button onClick={()=>setCurrentSection('home')} className="mt-8 text-xs uppercase tracking-widest hover:text-pink-500 transition-colors drop-shadow-md">[ Retour ]</button>
          </div>
        )}

        <div className='border-solid border-4 border-white/10 z-50 rounded-[40px] h-7/10 w-7/10 absolute pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.3)]'></div>
        <div className='bg-white/2 z-0 rounded-[40px] h-7/10 w-7/10 absolute backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)]'></div>
      </section>
    </main>
  )
}

export default App