import { Mic, MicOff, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

export function VoiceAssistantUI() {
  const { isListening, transcript, error, startListening, stopListening } = useVoiceAssistant();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass rounded-2xl p-6 shadow-2xl border border-primary/20 w-80 mb-2 overflow-hidden relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Listening...
              </div>
              <button onClick={stopListening} className="p-1 hover:bg-secondary rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="min-h-[60px] text-lg font-medium leading-relaxed">
              {transcript || <span className="text-muted-foreground italic">"Say something like 'Add 2 notebooks'..."</span>}
            </div>

            <div className="mt-4 flex items-center gap-1 h-8">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isListening ? [8, 24, 12, 32, 8][(i % 5)] : 4,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    delay: i * 0.05,
                  }}
                  className="w-1 bg-primary/40 rounded-full"
                />
              ))}
            </div>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <motion.button
          onClick={isListening ? stopListening : startListening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-5 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center ${
            isListening 
              ? 'bg-red-500 text-white shadow-red-500/30' 
              : 'bg-primary text-primary-foreground shadow-primary/30'
          }`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </motion.button>
        
        {!isListening && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <div className="glass px-3 py-1.5 rounded-xl text-xs font-bold border border-border shadow-sm flex items-center gap-2">
              <Command size={12} /> Click to use Voice AI
            </div>
          </div>
        )}
        
        {isListening && (
          <div className="absolute -inset-2 rounded-3xl border-2 border-red-500/30 animate-ping -z-10" />
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 text-destructive text-xs font-bold px-3 py-1.5 rounded-lg border border-destructive/20"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
