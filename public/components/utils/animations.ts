export const modalAnimations = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    content: {
      initial: { scale: 0.85, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      },
      exit: {
        scale: 0.85,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeIn" },
      },
    },
  };
  