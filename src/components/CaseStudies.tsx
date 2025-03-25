import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    title: "Eco-Friendly Beverage Packaging",
    description: "Revolutionizing drink containers with 100% recyclable materials",
    image: "https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Smart Electronics Packaging",
    description: "Protective designs that reduce waste and enhance unboxing experience",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sustainable Food Packaging",
    description: "Biodegradable solutions for fresh food preservation",
    image: "https://images.unsplash.com/photo-1607342656412-9f9890dc4c81?auto=format&fit=crop&q=80&w=800",
  },
];

export const CaseStudies = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Case Studies
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-xl overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                <p className="text-gray-400 mb-4">{study.description}</p>
                <button className="text-emerald-400 flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  Learn More <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};