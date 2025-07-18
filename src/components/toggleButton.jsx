'use client'
import { useContext } from 'react';
import { motion } from 'framer-motion';
import {ThemeContext} from '@/context/ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <motion.button
      className={styles.toggleContainer}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sliding background circle */}
      <motion.div
        className={styles.slider}
        animate={{
          x: currentTheme ? 32 : 0, // dark mode = right, light mode = left
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      
      {/* Sun icon */}
      <div className={`${styles.iconWrapper} ${!currentTheme ? styles.active : ''}`}>
        <i className="fa-solid fa-sun"></i>
      </div>
      
      {/* Moon icon */}
      <div className={`${styles.iconWrapper} ${currentTheme ? styles.active : ''}`}>
        <i className="fa-solid fa-moon"></i>
      </div>
    </motion.button>
  );
}