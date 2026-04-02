import { Link } from "react-router-dom";

export default function BottomDock({ activeTab }: { activeTab: 'home' | 'assets' | 'compose' | 'settings' }) {
  const getIconClass = (tab: string) => {
    return activeTab === tab 
      ? "text-[#1C1C1E] scale-110 drop-shadow-sm" 
      : "text-black/40 hover:text-[#1C1C1E] hover:scale-105";
  };

  return (
    <>
      {/* Soft Fade Mask */}
      <div className="fixed bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/40 to-transparent z-40 pointer-events-none"></div>

      {/* Ultra-sleek Concentrated Floating Island Dock */}
      <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out">
        <nav className="flex items-center justify-center gap-6 bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] px-6 py-2.5 rounded-[8px] relative">
          
          <Link to="/" className={`transition-all duration-300 px-3 py-1 active:scale-95 outline-none flex items-center justify-center ${getIconClass('home')}`}>
             <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 10h6M9 14h6M9 18h4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          
          <Link to="/assets" className={`transition-all duration-300 px-3 py-1 active:scale-95 outline-none flex items-center justify-center ${getIconClass('assets')}`}>
             <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>

          <Link to="/recipe/new" className={`transition-all duration-300 px-3 py-1 active:scale-95 outline-none flex items-center justify-center ${getIconClass('compose')}`}>
             <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          
          <Link to="/settings" className={`transition-all duration-300 px-3 py-1 active:scale-95 outline-none flex items-center justify-center ${getIconClass('settings')}`}>
             <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </Link>
          
          
        </nav>
      </div>
    </>
  );
}
