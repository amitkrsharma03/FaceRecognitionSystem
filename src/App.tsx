import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, ShieldCheck, Info, ChevronRight } from 'lucide-react';
import StudentManagement from './components/StudentManagement';
import Registration from './components/Registration';

function App() {
  const [showMain, setShowMain] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowMain(false);
  };

  const options = [
    {
      id: 'registration',
      title: 'Registration',
      description: 'Register new students with face recognition',
      icon: UserPlus,
      color: 'bg-indigo-500',
    },
    {
      id: 'verification',
      title: 'Verification',
      description: 'Verify student identity using face recognition',
      icon: ShieldCheck,
      color: 'bg-emerald-500',
    },
  ];

  if (!showMain) {
    if (selectedOption === 'registration') {
      return <Registration />;
    }
    return <StudentManagement />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <AnimatePresence>
        {showMain && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block p-3 rounded-full bg-indigo-100 mb-4"
              >
                <Users className="h-12 w-12 text-indigo-600" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Student Management System
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8"
              >
                Secure and efficient student management with face recognition
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Let's Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                >
                  {options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      onClick={() => handleOptionSelect(option.id)}
                      className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className={`${option.color} inline-block p-3 rounded-full mb-4`}>
                          <option.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                          {option.title}
                        </h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 flex justify-end">
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="md:col-span-2"
                  >
                    <button
                      onClick={() => handleOptionSelect('details')}
                      className="w-full bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer p-6 flex items-center justify-between group"
                    >
                      <div className="flex items-center">
                        <div className="bg-purple-500 inline-block p-3 rounded-full mr-4">
                          <Info className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                            Project Details
                          </h3>
                          <p className="text-gray-600">Learn more about the system and its features</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;