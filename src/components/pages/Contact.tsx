import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    message: "",
  });

  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Submit status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  // Industry options
  const industries = [
    "Retail & E-commerce",
    "Food & Beverage",
    "Cosmetics & Beauty",
    "Electronics & Technology",
    "Pharmaceuticals & Healthcare",
    "Luxury & Premium Goods",
    "Fashion & Apparel",
    "Other",
  ];

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you'd send the form data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitSuccess(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        industry: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:+14155550123";
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleGetDirections = (location: string) => {
    // In a real app, you might link to Google Maps with the address
    // For now, just log which location was requested
    console.log(`Getting directions to ${location}`);
    // Could redirect to a maps URL like:
    // window.open(`https://maps.google.com/?q=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mb-10">
              Connect with our packaging experts to discuss your specific
              requirements and discover how we can help elevate your product
              packaging.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact information section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-emerald-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-emerald-500/30 pb-2">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-500/20 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Address
                    </h3>
                    <p className="text-gray-300">
                      123 Innovation Way
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-500/20 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-300">
                      <button
                        onClick={handlePhoneCall}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        +1 (415) 555-0123
                      </button>
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Mon-Fri: 8am - 6pm PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-500/20 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-300">
                      <button
                        onClick={() => handleEmail("info@packx.com")}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        info@packx.com
                      </button>
                    </p>
                    <p className="text-gray-300 mt-1">
                      <button
                        onClick={() => handleEmail("sales@packx.com")}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        sales@packx.com
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map and locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Our Locations
              </h2>

              <div className="relative h-48 sm:h-60 rounded-lg overflow-hidden mb-6">
                {/* This is a placeholder for a map. In a real application, you'd embed a Google Maps or similar */}
                <div className="absolute inset-0 bg-gray-800/90 flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-emerald-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <p className="text-gray-300">
                      Interactive map would be embedded here
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Headquarters
                  </h3>
                  <p className="text-gray-300 mb-2">
                    123 Innovation Way
                    <br />
                    San Francisco, CA 94103
                    <br />
                    United States
                  </p>
                  <button
                    onClick={() =>
                      handleGetDirections(
                        "123 Innovation Way, San Francisco, CA 94103"
                      )
                    }
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm flex items-center"
                  >
                    Get directions
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-4 bg-black/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Production Facility
                  </h3>
                  <p className="text-gray-300 mb-2">
                    456 Manufacturing Blvd
                    <br />
                    Oakland, CA 94621
                    <br />
                    United States
                  </p>
                  <button
                    onClick={() =>
                      handleGetDirections(
                        "456 Manufacturing Blvd, Oakland, CA 94621"
                      )
                    }
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm flex items-center"
                  >
                    Get directions
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact form - full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Send Us a Message
            </h2>

            {submitSuccess === true && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                Thank you for your message! Our team will get back to you
                shortly.
              </div>
            )}

            {submitSuccess === false && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                There was an error sending your message. Please try again or
                contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-gray-300 mb-2">
                    Company*
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${
                      errors.company ? "border-red-500" : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="industry"
                    className="block text-gray-300 mb-2"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-black/50 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="Tell us about your packaging requirements..."
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 px-4 bg-gradient-to-t from-black to-emerald-950/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <FAQItem
              question="What is the minimum order quantity for custom packaging?"
              answer="Our minimum order quantities vary depending on the packaging solution and level of customization required. Typically, our MOQs start at 500 units for standard packaging and 1,000 units for fully custom solutions. However, we do offer smaller batch options for startups and small businesses. Please contact us with your specific requirements for a precise quote."
              delay={0}
            />

            <FAQItem
              question="How long does the design and production process take?"
              answer="Our standard timeline from design approval to delivery is 4-6 weeks. For rush orders, we can expedite production to as little as 2 weeks for an additional fee. The timeline depends on the complexity of the design, materials used, and current production capacity. We'll provide you with a detailed timeline during the initial consultation."
              delay={1}
            />

            <FAQItem
              question="Do you offer sustainable packaging options?"
              answer="Yes, sustainability is at the core of our business. We offer a wide range of eco-friendly packaging solutions, including recyclable, biodegradable, and compostable options. Our TerraCore™ and EcoFlex™ product lines are specifically designed with sustainability in mind, using recycled materials and renewable resources."
              delay={2}
            />

            <FAQItem
              question="Can you match my brand colors exactly?"
              answer="Yes, we use color matching systems to ensure your packaging precisely reflects your brand colors. We can match Pantone colors with high accuracy and provide physical samples before full production to ensure your satisfaction with the color reproduction."
              delay={3}
            />

            <FAQItem
              question="Do you ship internationally?"
              answer="Yes, we ship to customers worldwide. We have distribution centers in North America, Europe, and Asia to efficiently serve global brands. International shipping costs and timelines will be included in your custom quote."
              delay={4}
            />
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for?
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg hover:shadow-emerald-500/20 duration-300 ease-in-out"
            >
              Contact Our Team
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// FAQ Item component
interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-800/70 hover:bg-gray-800 rounded-lg transition-colors flex justify-between items-center"
      >
        <span className="text-white font-medium">{question}</span>
        <svg
          className={`w-5 h-5 text-emerald-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.2, ease: "easeInOut" },
        }}
        className="overflow-hidden"
      >
        <div className="p-4 bg-gray-800/40 rounded-b-lg mt-1 text-gray-300">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
