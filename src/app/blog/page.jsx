'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Blog.module.css";

import { blogPosts, categories, featuredPost } from "@/data/blogData";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return blogPosts;
    }
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, blogPosts]);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const filterButtonVariants = {
    inactive: {
      scale: 1,
    },
    active: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (selectedPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.blogContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key="post-detail"
        >
          <motion.button
            className={`${styles.readMoreBtn} ${styles.button}`}
            onClick={handleBackToBlog}
            style={{ marginBottom: "30px" }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ← Back to Blog
          </motion.button>

          <motion.article
            className={styles.postDetail}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className={styles.postCategory}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {selectedPost.category}
            </motion.div>
            <motion.h1
              className={styles.postDetailTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {selectedPost.title}
            </motion.h1>
            <motion.div
              className={`${styles.postMeta} ${styles.postDetailMeta}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </motion.div>
            <motion.div
              className={`${styles.postTags} ${styles.postDetailTags}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {selectedPost.tags?.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={styles.tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className={styles.postContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {selectedPost.content}
            </motion.div>
          </motion.article>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.blogContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="blog-list"
      >
        <motion.header className={styles.blogHeader} variants={itemVariants}>
          <motion.h1
            className={styles.blogTitle}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Tech Blog.
          </motion.h1>
          <motion.p
            className={styles.blogSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A blog about technology, programming, and various intriguing topics.
            Here I share my experiences, projects and opinions on modern web
            development.
          </motion.p>
        </motion.header>

        <motion.nav
          className={styles.blogFilters}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`${styles.filterBtn} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              variants={filterButtonVariants}
              initial="inactive"
              animate={selectedCategory === category ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              custom={index}
            >
              {category}
            </motion.button>
          ))}
        </motion.nav>

        <motion.section
          className={styles.featuredPost}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className={styles.featuredBadge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Featured
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {featuredPost?.title}
          </motion.h2>
          <motion.div
            className={styles.postMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <span>{featuredPost?.date}</span>
            <span>{featuredPost?.readTime}</span>
            <span>{featuredPost?.category}</span>
          </motion.div>
          <motion.p
            className={styles.postExcerpt}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {featuredPost?.excerpt}
          </motion.p>
          <motion.button
            className={`${styles.readMoreBtn} ${styles.button}`}
            onClick={() => handleReadMore(featuredPost)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            Read More
            <motion.i
              className="fas fa-arrow-right"
              style={{ marginLeft: "10px" }}
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            All Posts
          </motion.h2>
          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                className={styles.noPosts}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                No posts found for the selected category.
              </motion.div>
            ) : (
              <motion.div
                className={styles.postsGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={selectedCategory}
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className={styles.postCard}
                    variants={cardVariants}
                    custom={index}
                    whileHover="hover"
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={styles.postCategory}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {post.category}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                    >
                      {post.title}
                    </motion.h3>
                    <motion.div
                      className={styles.postMeta}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    >
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </motion.div>
                    <motion.p
                      className={styles.postExcerpt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    >
                      {post.excerpt}
                    </motion.p>
                    <motion.div
                      className={styles.postTags}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                    >
                      {post.tags?.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className={styles.tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.1 + 0.5 + tagIndex * 0.05,
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.button
                      className={`${styles.readMoreBtn} ${styles.button} ${styles.cardButton}`}
                      onClick={() => handleReadMore(post)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                    >
                      Read More
                      <motion.i
                        className="fas fa-arrow-right"
                        style={{ marginLeft: "10px" }}
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};

export default Blog;