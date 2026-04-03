import { Link } from "react-router-dom";

export default function BottomDock({ activeTab }: { activeTab: 'home' | 'assets' | 'compose' | 'settings' }) {
  const getTabClass = (tab: string) => {
    return activeTab === tab 
      ? "text-[#1C1C1E] font-bold" 
      : "text-black/30 hover:text-black/60";
  };

  return (
    <>
      {/* Dynamic Navigation Bar - Native Mobile Style */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-black/[0.04] shadow-[0_-8px_20px_rgba(0,0,0,0.02)] pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <nav className="flex items-center justify-around px-2">
          
          <Link to="/" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('home')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'home' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">每日</span>
          </Link>

          <Link to="/assets" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('assets')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'assets' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">词典</span>
          </Link>

          <Link to="/recipe/new" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('compose')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'compose' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">撰写</span>
          </Link>
          
          <Link to="/settings" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('settings')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'settings' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">配置</span>
          </Link>
          
        </nav>
      </div>
    </>
  );
}
