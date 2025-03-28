import { motion } from 'framer-motion';
import { CheckCircle, Shield, Heart, BarChart3 } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      title: '100% Transparent Donations',
      description: 'Every rupee is accounted for with our blockchain-based tracking system',
      icon: <Shield className="w-8 h-8 text-purple-600" />,
    },
    {
      id: 2,
      title: 'Real Impact, Real Stories',
      description: 'Testimonials and success stories from the people we help',
      icon: <Heart className="w-8 h-8 text-red-500" />,
    },
    {
      id: 3,
      title: 'Technology for Change',
      description: 'AI-powered donation tracking & real-time impact reports',
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    },
    {
      id: 4,
      title: 'Community-Driven',
      description: 'Built by the people, for the people with local participation',
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <motion.div 
              key={reason.id}
              className="flex items-start p-6 rounded-xl bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: reason.id * 0.1 }}
            >
              <div className="mr-4 p-2 bg-white rounded-full shadow-md">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-purple-600 font-semibold mb-4">
            Your support changes lives. Be the reason someone smiles today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/donate" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Donate Now
            </a>
            <a 
              href="/get-involved" 
              className="px-6 py-3 bg-transparent border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all duration-300"
            >
              Volunteer
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}