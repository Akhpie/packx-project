import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface CaseStudy {
  title: string;
  description: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Eco-Friendly Beverage Packaging",
    description:
      "Revolutionizing drink containers with 100% recyclable materials",
    image:
      "https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Smart Electronics Packaging",
    description:
      "Protective designs that reduce waste and enhance unboxing experience",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sustainable Food Packaging",
    description: "Biodegradable solutions for fresh food preservation",
    image:
      "https://images.unsplash.com/photo-1607342656412-9f9890dc4c81?auto=format&fit=crop&q=80&w=800",
  },
];

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Create different transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      style={{ opacity, scale }}
      className="bg-gray-800 rounded-xl overflow-hidden relative"
    >
      <motion.div className="h-48 overflow-hidden" style={{ y: imageY }}>
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </motion.div>
      <motion.div className="p-6" style={{ y }}>
        <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
        <p className="text-gray-400 mb-4">{study.description}</p>
        <button className="text-emerald-400 flex items-center gap-2 hover:text-emerald-300 transition-colors group">
          Learn More
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="inline-block"
          >
            <ArrowRight size={16} />
          </motion.span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export const CaseStudies = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );

  return (
    <section
      className="py-20 bg-gray-900 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Case Studies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
