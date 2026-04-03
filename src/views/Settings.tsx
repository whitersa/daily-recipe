import { motion } from "framer-motion";
import ManualUpdateButton from "@/components/ManualUpdateButton";
import BottomDock from "@/components/BottomDock";

export default function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >


      <main className="flex-1 overflow-y-auto no-scrollbar px-6 flex flex-col items-center justify-center pb-[120px]">
        <ManualUpdateButton />
      </main>

      <BottomDock activeTab="settings" />
    </motion.div>
  );
}
