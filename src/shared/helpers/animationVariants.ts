export const formVariants = Object.freeze({
  front: { rotateY: 0, opacity: 1 },
  back: { rotateY: 180, opacity: 0 },
});

export const inputVariants = Object.freeze({
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2,
    },
  }),
  hidden: { opacity: 0, x: -100 },
});
