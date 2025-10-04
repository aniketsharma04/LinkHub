'use client';

import { Profile, Link as LinkType } from '@/lib/supabase';
import { ExternalLink } from 'lucide-react';

interface ProfileViewProps {
  profile: Profile;
  links: LinkType[];
}

export default function ProfileView({ profile, links }: ProfileViewProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: `linear-gradient(135deg, ${profile.theme_color}15 0%, ${profile.theme_color}05 100%)`,
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          {profile.avatar_url && (
            <div className="mb-6">
              <img
                src={profile.avatar_url}
                alt={profile.display_name || profile.username}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 shadow-lg"
                style={{ borderColor: profile.theme_color }}
              />
            </div>
          )}

          {profile.display_name && (
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
              {profile.display_name}
            </h1>
          )}

          <p className="text-lg text-gray-600 mb-2">@{profile.username}</p>

          {profile.bio && (
            <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {links.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No links available yet</p>
            </div>
          ) : (
            links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-5 rounded-2xl text-center font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-slide-up"
                style={{
                  backgroundColor: 'white',
                  border: `2px solid ${profile.theme_color}20`,
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = profile.theme_color;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = profile.theme_color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'inherit';
                  e.currentTarget.style.borderColor = `${profile.theme_color}20`;
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{link.title}</span>
                  <ExternalLink className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Create your own LinkHub
          </a>
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
