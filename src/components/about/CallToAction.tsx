import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Be Part of Our Story
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Together, we can create lasting change. Join us in our mission to build a better world.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="/donate" 
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Donate Now
            </a>
            <a 
              href="/get-involved" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all duration-300"
            >
              Volunteer
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}