"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./navigationBar.module.css";
import logoImgDark from "@/assets/logo.png"
import ThemeToggle from "./toggleButton";
import {ThemeContext} from '@/context/ThemeProvider';
import logoImgLight from "@/assets/lightLogo.png"

export default function NavigationBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const {currentTheme} = useContext(ThemeContext);
  const logoImgpic= currentTheme? logoImgDark :logoImgLight

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  function handleDropdown() {
    setDropDown((prev) => !prev);
  }

  // Helper function to check if link is active
  const isLinkActive = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const sidebarVariants = {
    hidden: {
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const sidebarItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <nav className={styles.nav}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className={styles.imgLink}>
            <Image
              src={logoImgpic}
              alt="Logo"
              width={128}
              height={40}
              priority
              className={styles.image}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </motion.div>

        <motion.div className={styles.aTagsDiv} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              isLinkActive("/") && !dropDown ? styles.selected : ""
            }`}
          >
            Home
          </Link>
        </motion.div>

        <motion.div className={styles.aTagsDiv} whileTap={{ scale: 0.95 }}>
          <Link
            href="/my-work"
            className={`${styles.navLink} ${
              isLinkActive("/my-work") && !dropDown ? styles.selected : ""
            }`}
          >
            My Work
          </Link>
        </motion.div>

        <motion.div className={styles.aTagsDiv} whileTap={{ scale: 0.95 }}>
          <Link
            href="/blog"
            className={`${styles.navLink} ${
              isLinkActive("/blog") && !dropDown ? styles.selected : ""
            }`}
          >
            Blog
          </Link>
        </motion.div>

        <div className={styles.dropDownContainer}>
          <motion.button
            onClick={handleDropdown}
            className={`${styles.navButton} ${styles.navLink} ${
              dropDown ? styles.selected : ""
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            More
            <motion.i
              className="fa-solid fa-chevron-right"
              animate={{ rotate: dropDown || isHovered ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>

          <AnimatePresence>
            {dropDown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.dropdownMenu}
              >
                <motion.a
                  onClick={() => setDropDown(false)}
                  href="https://github.com/THEMEGATRON76"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dropdownAnchor}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <i className="fa-brands fa-github"></i>
                  </div>
                  <div>
                    <p className={styles.firstPara}>My Github Profile</p>
                    <p>Explore my projects and contributions.</p>
                  </div>
                </motion.a>

                <motion.div
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Link
                    onClick={() => setDropDown(false)}
                    href="/contact-me"
                    className={styles.dropdownAnchor}
                  >
                    <div>
                      <i className="fa-solid fa-address-card"></i>
                    </div>
                    <div>
                      <p className={styles.firstPara}>Contact Me</p>
                      <p>Have a Question? Feel free to reach me..</p>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle Button - Desktop */}
        <div className={styles.themeToggleDesktop}>
          <ThemeToggle />
        </div>

        <motion.button
          className={`${styles.navButton} ${styles.settings}`}
          onClick={toggleSidebar}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: "auto" }}
        >
          <motion.i
            className="fa-solid fa-bars"
            animate={{ rotate: isSidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={styles.mobileSidebar}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className={styles.sidebarHeader}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link href="/" onClick={closeSidebar}>
                  <Image
                    src={logoImgpic}
                    alt="Logo"
                    width={96}
                    height={30}
                    className={styles.sidebarLogo}
                  />
                </Link>
              </motion.div>
              <motion.button
                className={styles.closeBtn}
                onClick={closeSidebar}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fa-solid fa-times"></i>
              </motion.button>
            </motion.div>

            <motion.div
              className={styles.sidebarContent}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={sidebarItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" onClick={closeSidebar}>
                  <i className="fa-solid fa-home"></i>
                  Home
                </Link>
              </motion.div>

              <motion.div
                variants={sidebarItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/my-work" onClick={closeSidebar}>
                  <i className="fa-solid fa-briefcase"></i>
                  My Work
                </Link>
              </motion.div>

              <motion.div
                variants={sidebarItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact-me" onClick={closeSidebar}>
                  <i className="fa-solid fa-envelope"></i>
                  Contact Me
                </Link>
              </motion.div>

              <motion.div
                variants={sidebarItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/blog" onClick={closeSidebar}>
                  <i className="fa-solid fa-newspaper"></i>
                  Blog
                </Link>
              </motion.div>

              <motion.div
                variants={sidebarItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://github.com/THEMEGATRON76"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeSidebar}
                >
                  <i className="fa-brands fa-github"></i>
                  My Github
                </a>
              </motion.div>

              {/* Theme Toggle - Mobile */}
              <motion.div
                variants={sidebarItemVariants}
                className={styles.themeToggleMobile}
              >
                <div className={styles.themeToggleWrapper}>
                  <span className={styles.themeLabel}>
                    <i className="fa-solid fa-palette"></i>
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.sidebarFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <p>Made with ❤️ by Geetansh</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className={styles.sidebarOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
}
