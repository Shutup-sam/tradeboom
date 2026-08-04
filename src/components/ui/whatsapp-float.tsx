'use client';

import { motion } from 'framer-motion';
import { useCursor } from '@/components/providers/cursor-provider';

export function WhatsAppFloat() {
  const { setVariant } = useCursor();

  return (
    <motion.a
      href="https://wa.me/918796510028?text=Hi,%20I%20would%20like%20to%20enquire%20about%20Trade%20Boom%20trading%20courses%20and%20mentorship."
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setVariant('enroll', 'Chat')}
      onMouseLeave={() => setVariant('default')}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_30px_rgb(16,185,129,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgb(16,185,129,0.6)]"
      aria-label="Enquire on WhatsApp"
    >
      {/* Background Pulse Ring */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400 opacity-25" />

      {/* Custom WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 transition-transform duration-300"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003  5.324 5.328 0 11.894 0c3.18.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.328 11.88-11.894 11.88-1.996-.001-3.956-.5-5.698-1.448L0 24zm6.59-4.817c1.66.988 3.296 1.489 4.968 1.49 5.372 0 9.743-4.307 9.745-9.6.002-2.562-1.002-4.97-2.83-6.799-1.828-1.827-4.26-2.83-6.82-2.83-5.376 0-9.748 4.307-9.75 9.6-.001 1.77.476 3.41 1.381 4.793L2.23 21.085l5.068-1.309L6.647 19.183z" />
      </svg>
    </motion.a>
  );
}
