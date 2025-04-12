import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Sustainability = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Sustainability{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
                Commitment
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-10">
              At PackX, sustainability isn't just a feature of our products—it's
              the foundation of everything we do. We're committed to creating
              packaging solutions that protect both your products and our
              planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Sustainability Initiatives
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Circular Materials",
                description:
                  "We prioritize recycled, recyclable, and biodegradable materials in all our packaging solutions, continuously innovating to minimize virgin resource use.",
                icon: "♻️",
              },
              {
                title: "Carbon Neutral Operations",
                description:
                  "Our manufacturing facilities are powered by renewable energy, and we offset remaining emissions through verified carbon offset programs.",
                icon: "🌱",
              },
              {
                title: "Waste Reduction",
                description:
                  "We implement closed-loop manufacturing processes that minimize waste and repurpose production scraps into new packaging components.",
                icon: "📉",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-emerald-400">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Goals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our 2030 Sustainability Goals
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                goal: "100% Circular Materials",
                current: "78%",
                description:
                  "We aim to use only recycled, recyclable, or compostable materials in all our packaging solutions by 2030.",
              },
              {
                goal: "Zero Waste to Landfill",
                current: "82%",
                description:
                  "We're targeting zero waste to landfill across all our operations, with comprehensive waste reduction and recycling programs.",
              },
              {
                goal: "Carbon Negative Operations",
                current: "65%",
                description:
                  "Beyond carbon neutrality, we're working to make our operations carbon negative, removing more carbon than we emit.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-emerald-900/20 to-transparent p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold text-emerald-400">
                      {item.goal}
                    </h3>
                    <div className="text-5xl font-bold mt-2 mb-4">
                      {item.current}
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{
                          width: item.current,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Current progress
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-t from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Partner with Us for a Sustainable Future
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's work together to create packaging that meets your needs
              while protecting our planet for future generations.
            </p>
            <Link
              to="/contact"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors inline-block font-medium"
            >
              Contact Our Sustainability Team
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
