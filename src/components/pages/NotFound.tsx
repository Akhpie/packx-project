import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NotFound = () => {
  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-emerald-500">404</h1>
          <div className="text-2xl md:text-3xl font-bold mt-4 mb-6">
            Page Not Found
          </div>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved to
            another location.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors inline-block font-medium"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
