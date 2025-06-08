
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sprout, BarChart3, DollarSign, Shield, Users, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LandingProps {
  onNavigateToAuth: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigateToAuth }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store contact message in localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const newContact = {
      id: Date.now().toString(),
      ...contactForm,
      timestamp: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    setContactForm({ name: '', email: '', message: '' });
  };

  const features = [
    {
      icon: BarChart3,
      title: "Easy project tracking",
      description: "Monitor your agricultural projects from start to finish with our intuitive tracking system."
    },
    {
      icon: DollarSign,
      title: "Smart budgeting and harvest planning",
      description: "Plan your budget and set harvest targets with intelligent forecasting tools."
    },
    {
      icon: Sprout,
      title: "Simple and intuitive dashboard",
      description: "Access all your project information in one clean, easy-to-use interface."
    },
    {
      icon: Shield,
      title: "Secure user access with role-based control",
      description: "Keep your data safe with secure authentication and role-based permissions."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Taniku</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
              <Button variant="outline" onClick={onNavigateToAuth}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Farming Starts Here
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Taniku helps you manage agricultural projects easily and efficiently.
          </p>
          <Button size="lg" onClick={onNavigateToAuth} className="text-lg px-8 py-4">
            Get Started
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About Taniku</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Taniku is a digital solution designed to help farmers, agripreneurs, and agricultural 
            businesses manage their projects effectively — from planning to harvest. Our platform 
            simplifies project management, budget tracking, and harvest planning to help you achieve 
            better results in your agricultural endeavors.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why Use Taniku?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Contact Us</h2>
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    placeholder="Tell us how we can help you..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Sprout className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Taniku</h3>
              </div>
              <p className="text-gray-400">
                Smart agriculture project management for modern farmers.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
                <button 
                  onClick={onNavigateToAuth}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Taniku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
