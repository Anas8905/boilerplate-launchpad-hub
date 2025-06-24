
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FrameworkCard from '../components/FrameworkCard';
import UserModal from '../components/UserModal';
import Footer from '../components/Footer';

const frameworks = [
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: 'Enterprise-grade Java framework for building robust backend applications',
    logo: '☕',
    color: 'from-green-500 to-green-600',
    repository: 'https://github.com/Genc/spring-boot-boilerplate',
    category: 'Backend'
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Powerful TypeScript framework for building dynamic web applications',
    logo: '🅰️',
    color: 'from-red-500 to-red-600',
    repository: 'https://github.com/ArslanAmeer/angular-boilerplate',
    category: 'Frontend'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Full-stack React framework with SSR and static site generation',
    logo: '▲',
    color: 'from-black to-gray-800',
    repository: 'https://github.com/ixartz/Next-js-Boilerplate',
    category: 'Full-stack'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'Progressive JavaScript framework for building user interfaces',
    logo: '💚',
    color: 'from-green-400 to-emerald-500',
    repository: 'https://github.com/vuesion/vuesion',
    category: 'Frontend'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Popular JavaScript library for building component-based UIs',
    logo: '⚛️',
    color: 'from-blue-500 to-cyan-500',
    repository: 'https://github.com/react-boilerplate/react-boilerplate',
    category: 'Frontend'
  },
  {
    id: 'react-native',
    name: 'React Native',
    description: 'Build native mobile apps using React and JavaScript',
    logo: '📱',
    color: 'from-purple-500 to-pink-500',
    repository: 'https://github.com/thecodingmachine/react-native-boilerplate',
    category: 'Mobile'
  },
  {
    id: 'flutter',
    name: 'Flutter',
    description: 'Google\'s UI toolkit for building natively compiled mobile apps',
    logo: '🐦',
    color: 'from-blue-400 to-blue-600',
    repository: 'https://github.com/zubairehman/flutter_boilerplate_project',
    category: 'Mobile'
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Index component state:', { selectedFramework, isModalOpen });

  const filteredFrameworks = frameworks.filter(framework =>
    framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    framework.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    framework.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetBoilerplate = (framework: any) => {
    console.log('=== handleGetBoilerplate START ===');
    console.log('Framework received:', framework);
    console.log('Setting selectedFramework to:', framework.name);
    console.log('Setting isModalOpen to: true');
    
    setSelectedFramework(framework);
    setIsModalOpen(true);
    
    console.log('=== handleGetBoilerplate END ===');
  };

  const handleCloseModal = () => {
    console.log('=== handleCloseModal START ===');
    console.log('Setting isModalOpen to: false');
    console.log('Setting selectedFramework to: null');
    
    setIsModalOpen(false);
    setSelectedFramework(null);
    
    console.log('=== handleCloseModal END ===');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Get Started with the Best
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Boilerplates
              </span>
              for Your Favorite Frameworks
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
              Skip the setup, jump straight to coding. Access production-ready boilerplates 
              for the most popular frameworks and tools in modern development.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-16 animate-scale-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search frameworks..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFrameworks.map((framework, index) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              onGetBoilerplate={handleGetBoilerplate}
              index={index}
            />
          ))}
        </div>
        
        {filteredFrameworks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No frameworks found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </section>

      {/* Why Use Boilerplates Section */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Use Boilerplates?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accelerate your development process with pre-configured, production-ready templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
              <p className="text-gray-600">Get your project running in minutes, not hours. Skip the tedious configuration and focus on building features.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
              <p className="text-gray-600">Built following industry standards and best practices. Clean architecture, proper folder structure, and modern tooling.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Production Ready</h3>
              <p className="text-gray-600">Includes testing setup, build optimization, and deployment configurations. Ready for production from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with New Boilerplates
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get notified when we add new frameworks and templates to our collection
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        framework={selectedFramework}
      />

      <Footer />
    </div>
  );
};

export default Index;
