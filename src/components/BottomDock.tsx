import { Link } from "react-router-dom";

export default function BottomDock({ activeTab }: { activeTab: 'home' | 'assets' | 'compose' | 'settings' }) {
  const getTabClass = (tab: string) => {
    return activeTab === tab 
      ? "text-primary font-bold transition-all duration-500 scale-110" 
      : "text-foreground/25 hover:text-foreground/45 transition-all duration-500";
  };

  return (
    <>
      {/* Dynamic Navigation Bar - Native Mobile Style */}
      <div 
        className="fixed bottom-0 left-0 w-full z-50 bg-background/95 backdrop-blur-2xl border-t border-foreground/[0.05] shadow-[0_-10px_30px_rgba(225,82,61,0.03)] pt-2.5"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
      >
        <nav className="flex items-center justify-around px-2">
          
          <Link to="/" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('home')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'home' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M6 13.8a4.5 4.5 0 1 1 2.6-8.3 5 5 0 0 1 6.8 0 4.5 4.5 0 1 1 2.6 8.3c1 .5 1.5 1.2 1.5 2.2V19a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2v-3c0-1 .5-1.7 1.5-2.2z" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">每日</span>
          </Link>

          <Link to="/assets" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('assets')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'assets' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">食材</span>
          </Link>

          <Link to="/recipe/new" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('compose')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'compose' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/></svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">记录</span>
          </Link>
          
          <Link to="/settings" className={`flex flex-col items-center gap-1.5 transition-all duration-300 outline-none ${getTabClass('settings')}`}>
             <svg className="w-[22px] h-[22px]" fill={activeTab === 'settings' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                <path fillRule="evenodd" d="M12 15a3 3 0 100-6 3 3 0 000 6z M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" clipRule="evenodd" />
             </svg>
             <span className="text-[10px] tracking-widest uppercase font-bold">配置</span>
          </Link>
          
        </nav>
      </div>
    </>
  );
}
