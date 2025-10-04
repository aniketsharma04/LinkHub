'use client';

import { ExternalLink, Link2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DemoPage() {
  const demoProfile = {
    username: 'demo',
    display_name: 'Jane Creator',
    bio: 'Content creator | Designer | Coffee lover ☕️',
    theme_color: '#10b981',
  };

  const demoLinks = [
    { id: '1', title: 'My Portfolio', url: 'https://example.com' },
    { id: '2', title: 'YouTube Channel', url: 'https://youtube.com' },
    { id: '3', title: 'Instagram', url: 'https://instagram.com' },
    { id: '4', title: 'Shop My Products', url: 'https://shop.example.com' },
    { id: '5', title: 'Book a Meeting', url: 'https://calendly.com' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: `linear-gradient(135deg, ${demoProfile.theme_color}15 0%, ${demoProfile.theme_color}05 100%)`,
      }}
    >
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              style={{ backgroundColor: demoProfile.theme_color }}
            >
              JC
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
            {demoProfile.display_name}
          </h1>

          <p className="text-lg text-gray-600 mb-2">@{demoProfile.username}</p>

          <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
            {demoProfile.bio}
          </p>
        </div>

        <div className="space-y-4">
          {demoLinks.map((link, index) => (
            <div
              key={link.id}
              className="block w-full p-5 rounded-2xl text-center font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-slide-up cursor-pointer"
              style={{
                backgroundColor: 'white',
                border: `2px solid ${demoProfile.theme_color}20`,
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = demoProfile.theme_color;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = demoProfile.theme_color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.borderColor = `${demoProfile.theme_color}20`;
              }}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{link.title}</span>
                <ExternalLink className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/signup">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Link2 className="h-4 w-4 mr-2" />
              Create Your Own LinkHub
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
