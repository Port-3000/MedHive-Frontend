import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlurContainer } from '../ui/BlurContainer';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Model Hub', path: '/model-hub' },
    { name: 'Contribute', path: '/contribute' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <BlurContainer 
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
        intensity={isScrolled ? 'high' : 'medium'}
      >
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-medhive-500 text-white font-bold p-2 rounded-md">MH</span>
          <span className="font-bold text-xl">MedHive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative font-medium transition-colors hover:text-medhive-600 ${
                pathname === link.path 
                  ? 'text-medhive-600 after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-medhive-500'
                  : 'text-gray-700 hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-medhive-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-medhive-500 text-medhive-600 hover:bg-medhive-50"
          >
            Sign In
          </Button>
          <Button className="bg-medhive-500 hover:bg-medhive-600">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </BlurContainer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <BlurContainer 
            className="container mx-auto px-4 py-5 mt-1 flex flex-col space-y-4 animate-fade-in"
            intensity="high"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-2 px-4 rounded-md font-medium ${
                  pathname === link.path 
                    ? 'bg-medhive-100 text-medhive-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" className="border-medhive-500 text-medhive-600 w-full">
                Sign In
              </Button>
              <Button className="bg-medhive-500 hover:bg-medhive-600 w-full">
                Sign Up
              </Button>
            </div>
          </BlurContainer>
        </div>
      )}
    </header>
  );
}
