import { motion, Variants, useInView } from "framer-motion";
import React, { useRef } from "react";

type Preset = "fade" | "blur" | "fade-in-blur" | "scale" | "slide";
type Per = "word" | "char" | "line";

interface TextEffectProps {
  children: string;
  per?: Per;
  as?: keyof React.JSX.IntrinsicElements;
  preset?: Preset;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  className?: string;
  style?: React.CSSProperties;
  variants?: { container?: Variants; item?: Variants };
  /** true = animate on scroll-into-view (once); false/undefined = animate on mount */
  onScroll?: boolean;
}

const presets: Record<Preset, { item: Variants }> = {
  fade: {
    item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  },
  blur: {
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  "fade-in-blur": {
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
  },
  scale: {
    item: { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } },
  },
  slide: {
    item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  },
};

const staggerDefaults: Record<Per, number> = {
  char: 0.03,
  word: 0.06,
  line: 0.12,
};

export function TextEffect({
  children,
  per = "word",
  as = "p",
  preset = "fade-in-blur",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  className,
  style,
  variants,
  onScroll = false,
}: TextEffectProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once: true });

  const segments =
    per === "char"
      ? children.split("")
      : per === "line"
      ? children.split("\n")
      : children.split(/(\s+)/);

  const base = presets[preset];
  const stagger = staggerDefaults[per] / speedReveal;
  const duration = 0.35 / speedSegment;

  const containerVariants: Variants = variants?.container ?? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const itemVariants: Variants = variants?.item ?? {
    hidden: base.item.hidden,
    visible: {
      ...(base.item.visible as object),
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const shouldAnimate = onScroll ? inView : true;

  const MotionTag = motion[as as "p"] as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    initial: string;
    animate: string;
    variants: Variants;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }>;

  const renderSegments = () => {
    if (per === "word") {
      const words = children.trim().split(/\s+/);
      return words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span variants={itemVariants} style={{ display: "inline-block" }}>
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ));
    }
    if (per === "char") {
      return children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ));
    }
    return children.split("\n").map((line, i) => (
      <motion.span key={i} variants={itemVariants} style={{ display: "block" }}>
        {line}
      </motion.span>
    ));
  };

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLElement>}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {renderSegments()}
    </MotionTag>
  );
}
