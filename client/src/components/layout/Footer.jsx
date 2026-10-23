import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { Button, Input } from '../common';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to RoamVista Expeditions dispatch!');
    setEmail('');
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 transition-colors duration-200">
      {/* Top Banner / Trust Badges */}
      <div className="border-b border-neutral-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Verified Journeys</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Vetted local guides & secure client escrow</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="w-12 h-12 rounded-xl bg-secondary-600/20 text-secondary-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Boutique & Small Groups</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Average 8–12 guests per expedition</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800">
            <div className="w-12 h-12 rounded-xl bg-accent-600/20 text-accent-400 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Global Support</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Dedicated concierge teams worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl" aria-label="RoamVista Home">
              <img
                src="/logo/logo-cropped-dark.png"
                alt="RoamVista Logo"
                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              RoamVista pioneers sustainable luxury expeditions and transformative cultural journeys across seven continents. Handcrafted itineraries backed by certified local conservation experts.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-600 hover:text-white text-neutral-400 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Expeditions & Experiences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Expeditions & Experiences
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/destinations" className="hover:text-primary-400 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-accent-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Curated Experiences</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link to="/experiences?theme=Alpine+Trekking" className="hover:text-primary-400 transition-colors">
                  Alpine Trekking & Peaks
                </Link>
              </li>
              <li>
                <Link to="/experiences?theme=Wildlife+Safari" className="hover:text-primary-400 transition-colors">
                  Wildlife Safaris
                </Link>
              </li>
              <li>
                <Link to="/experiences?theme=Cultural+Heritage" className="hover:text-primary-400 transition-colors">
                  Cultural Immersions
                </Link>
              </li>
              <li>
                <Link to="/experiences?theme=Coastal+Sailing" className="hover:text-primary-400 transition-colors">
                  Coastal & Island Yachting
                </Link>
              </li>
              <li>
                <Link to="/experiences?theme=Arctic+Expedition" className="hover:text-primary-400 transition-colors">
                  Polar & Arctic Expeditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Guides
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary-400 transition-colors">
                  Traveler Field Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-400 transition-colors">
                  Traveler Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary-400 transition-colors">
                  Admin Gateway
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Concierge
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <span>742 Evergreen Terrace, Suite 400, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+1 (800) 555-ROAM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>concierge@roamvista.com</span>
              </div>
            </div>

            {/* Newsletter input inside column */}
            <form onSubmit={handleNewsletter} className="mt-5 space-y-2">
              <p className="text-[11px] font-semibold text-neutral-300">Subscribe to Expedition News</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-primary-500"
                />
                <Button type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />} />
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} RoamVista Expeditions, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
