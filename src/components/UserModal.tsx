
import React, { useState } from 'react';
import { X, Copy, Download, ExternalLink, Check } from 'lucide-react';

interface Framework {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  repository: string;
  category: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  framework: Framework | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, framework }) => {
  const [step, setStep] = useState<'form' | 'download'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: ''
  });
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const professions = [
    'Frontend Developer',
    'Backend Developer',
    'Full-stack Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Student',
    'Technical Lead',
    'CTO',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('User data:', {
      ...formData,
      framework: framework?.name,
      timestamp: new Date().toISOString()
    });
    
    setIsSubmitting(false);
    setStep('download');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getDownloadUrl = (repoUrl: string) => {
    return `${repoUrl}/archive/refs/heads/master.zip`;
  };

  const getCloneCommand = (repoUrl: string) => {
    return `git clone ${repoUrl}.git`;
  };

  const resetModal = () => {
    setStep('form');
    setFormData({ name: '', email: '', profession: '' });
    setCopiedCommand(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen || !framework) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className={`px-6 py-4 bg-gradient-to-r ${framework.color} text-white rounded-t-2xl relative`}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-3xl">{framework.logo}</span>
            <div>
              <h2 className="text-xl font-bold">{framework.name}</h2>
              <p className="text-white/80 text-sm">{framework.category} Framework</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-gray-600 mb-6">
                  Please provide your information to access the {framework.name} boilerplate:
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession *
                </label>
                <select
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your profession</option>
                  {professions.map(profession => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r ${framework.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Processing...' : 'Get Boilerplate'}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Download!
                </h3>
                <p className="text-gray-600">
                  Choose your preferred method to get the {framework.name} boilerplate:
                </p>
              </div>

              {/* Download Option */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Direct Download</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Download the complete boilerplate as a ZIP file
                    </p>
                    <a
                      href={getDownloadUrl(framework.repository)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${framework.color} text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200`}
                    >
                      <Download className="w-4 h-4" />
                      Download ZIP
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Clone Option */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-lg mt-1 flex-shrink-0">📋</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Git Clone</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Clone the repository directly to your local machine
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                      <code className="text-sm text-gray-800 break-all">
                        {getCloneCommand(framework.repository)}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(getCloneCommand(framework.repository))}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      {copiedCommand ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Command
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
