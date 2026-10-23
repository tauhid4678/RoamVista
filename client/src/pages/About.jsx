import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Globe2, Award, Users } from 'lucide-react';
import { Badge, Card } from '../components/common';

export const About = () => {
  const team = [
    {
      name: 'Julian Vance',
      role: 'Founder & Head of Expeditions',
      bio: 'Former high-altitude mountain guide with 22 years of field tenure across the Andes and Himalayas.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dr. Soraya Morales',
      role: 'Director of Conservation & Ecology',
      bio: 'Marine biologist dedicated to sustainable tourism standards and fragile ecosystem preservation.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kenji Takahashi',
      role: 'Head of Cultural Curation',
      bio: 'UNESCO cultural consultant focused on heritage preservation and authentic community exchanges.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center mb-1">
          <img
            src="/logo/logo-cropped.png"
            alt="RoamVista Logo"
            className="h-16 w-auto object-contain dark:hidden"
          />
          <img
            src="/logo/logo-cropped-dark.png"
            alt="RoamVista Logo"
            className="h-16 w-auto object-contain hidden dark:block"
          />
        </div>
        <Badge variant="primary" size="sm">Our Mission & Heritage</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Pioneering Thoughtful, Transformative Global Expeditions
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          RoamVista was founded on a singular conviction: that travel, when conducted with humility, curiosity, and ethical stewardship, transforms both the traveler and the communities they visit.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <Badge variant="secondary" size="sm">The Origin</Badge>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Born from the Remote Ridges of Patagonia
          </h2>
          <p>
            In 2018, our founders stood at the base of the French Valley in Torres del Paine after completing an unsupported traverse. They noticed how commercial mass-market tourism was beginning to erode both the tranquility of the trails and the livelihoods of regional guides.
          </p>
          <p>
            RoamVista was established to chart an alternative course: strictly small groups (capped at 12 guests), 100% fair living wages for all porters and guides, complete carbon mitigation, and private access to natural wonders away from tour bus herds.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div>
              <p className="text-2xl font-extrabold text-primary-600 font-mono">100%</p>
              <p className="text-xs text-neutral-500">Carbon Offset Guaranteed</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-secondary-600 font-mono">8-12</p>
              <p className="text-xs text-neutral-500">Max Travelers per Group</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
            alt="Patagonia Wilderness"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="accent" size="sm">Guiding Principles</Badge>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Our Commitments to the World</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="p-6" className="space-y-3">
            <Globe2 className="w-8 h-8 text-primary-500" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Ecosystem Preservation</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We allocate a mandatory 5% of all expedition fees directly into habitat restoration and endangered species monitoring in the regions we explore.
            </p>
          </Card>

          <Card padding="p-6" className="space-y-3">
            <HeartHandshake className="w-8 h-8 text-secondary-500" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Community Dignity</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We never utilize exploitative subcontracting. Every guide, boat captain, and lodge host is a recognized, fairly compensated partner.
            </p>
          </Card>

          <Card padding="p-6" className="space-y-3">
            <ShieldCheck className="w-8 h-8 text-accent-500" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Safety Without Compromise</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              From Iridium satellite communication devices on remote ridges to 24/7 emergency medical evacuation insurance, peace of mind is fundamental.
            </p>
          </Card>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="primary" size="sm">Expedition Leadership</Badge>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Meet the Curators</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} padding="p-0" className="overflow-hidden">
              <div className="h-60 w-full overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">{member.role}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
