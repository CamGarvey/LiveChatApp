import { motion, AnimatePresence } from 'framer-motion';

const ChangingTitle = ({ title }: { title: string }) => {
  return (
    <AnimatePresence custom={title}>
      <motion.h4
        key={title}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        exit={{ scale: 0 }}
      >
        {title}
      </motion.h4>
    </AnimatePresence>
  );
};

export default ChangingTitle;
