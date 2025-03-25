import { motion } from "framer-motion";
import { Package2, Recycle, Lightbulb, Shield } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MagicCard } from "./magicui/magic-card";
import { useTheme } from "next-themes";
import { ShineBorder } from "./magicui/shine-border";

const services = [
  {
    icon: Package2,
    title: "Custom Design",
    description:
      "Tailored packaging solutions that perfectly fit your product needs",
  },
  {
    icon: Recycle,
    title: "Sustainable Materials",
    description: "Eco-friendly options that reduce environmental impact",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Cutting-edge technology integration for smart packaging",
  },
  {
    icon: Shield,
    title: "Protection",
    description: "Maximum product safety during storage and transportation",
  },
];

export const Services = () => {
  const { theme } = useTheme();
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className="relative bg-gray-950 p-6 rounded-xl border border-gray-800 transition-colors overflow-hidden">
                <CardHeader className="flex flex-col items-start space-y-4">
                  <service.icon className="w-12 h-12 text-emerald-400" />
                  <CardTitle className="text-xl font-semibold text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <BorderBeam duration={8} size={100} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
