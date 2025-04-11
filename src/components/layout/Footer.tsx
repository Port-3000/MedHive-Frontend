import Link from 'next/link';
import { BlurContainer } from '../ui/BlurContainer';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: 'Platform',
      links: [
        { name: 'Model Hub', path: '/model-hub' },
        { name: 'Contribute', path: '/contribute' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Documentation', path: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Data Protection', path: '/data-protection' },
        { name: 'Security', path: '/security' },
      ],
    },
  ];

  return (
    <footer className="py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="bg-medhive-500 text-white font-bold p-2 rounded-md">MH</span>
              <span className="font-bold text-xl text-white">MedHive</span>
            </Link>
            <p className="text-white mb-6 max-w-md">
              A secure federated learning platform that enables hospitals to collaboratively train ML models without compromising patient privacy.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-white hover:bg-medhive-100 hover:text-medhive-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-white hover:bg-medhive-100 hover:text-medhive-900 transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-white hover:bg-medhive-100 hover:text-medhive-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-white hover:bg-medhive-100 hover:text-medhive-600 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.path} 
                      className="text-white hover:text-medhive-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} MedHive. All rights reserved.
            </p>
            <div className="flex items-center mt-4 sm:mt-0">
              <p className="text-gray-400 text-sm">
                Built with passion for medical innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
