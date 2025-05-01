import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">CurrencyWise</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Accurate, real-time currency conversion for travelers, businesses, and financial professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">API Access</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">Currency Info</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">About</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-500">Terms of Service</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Follow Us</h3>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary-500">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-500">
            © {currentYear} CurrencyWise. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-gray-500 flex items-center">
              Made with <HeartIcon className="h-4 w-4 text-error-500 mx-1" /> for IT31023
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;