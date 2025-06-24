
import React from 'react';
import { ExternalLink, Download } from 'lucide-react';

interface Framework {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  repository: string;
  category: string;
}

interface FrameworkCardProps {
  framework: Framework;
  onGetBoilerplate: (framework: Framework) => void;
  index: number;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, onGetBoilerplate, index }) => {
  const handleGetBoilerplateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Get Boilerplate button clicked for:', framework.name);
    onGetBoilerplate(framework);
  };

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${framework.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative p-8">
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {framework.category}
          </span>
        </div>
        
        {/* Logo */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {framework.logo}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {framework.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors">
          {framework.description}
        </p>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleGetBoilerplateClick}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${framework.color} text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer`}
          >
            <Download className="w-4 h-4" />
            Get Boilerplate
          </button>
          
          <a
            href={framework.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group/link"
          >
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-gray-800" />
          </a>
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
    </div>
  );
};

export default FrameworkCard;
