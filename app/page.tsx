import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Link2, Zap, Palette, ChartBar as BarChart3, Shield, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                LinkHub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                One Link
              </span>
              <br />
              <span className="text-gray-900">For Everything You Are</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Share your content, grow your audience, and connect with your followers.
              All your links in one beautifully simple page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6">
                  Create Your LinkHub
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Everything You Need to <span className="text-emerald-600">Stand Out</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-emerald-600" />}
                title="Lightning Fast"
                description="Create your page in under 60 seconds. No coding required. Just add your links and go live instantly."
              />
              <FeatureCard
                icon={<Palette className="h-8 w-8 text-emerald-600" />}
                title="Fully Customizable"
                description="Make it yours with custom colors, themes, and styles. Match your brand perfectly."
              />
              <FeatureCard
                icon={<Smartphone className="h-8 w-8 text-emerald-600" />}
                title="Mobile Optimized"
                description="Looks perfect on any device. Your links adapt beautifully to every screen size."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-emerald-600" />}
                title="Track Performance"
                description="See how your links perform. Understand your audience and optimize your content."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-emerald-600" />}
                title="Secure & Reliable"
                description="Your data is safe with us. Built with enterprise-grade security and 99.9% uptime."
              />
              <FeatureCard
                icon={<Link2 className="h-8 w-8 text-emerald-600" />}
                title="Unlimited Links"
                description="Add as many links as you want. No limits, no restrictions. Always free."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-10">
              Join thousands of creators, influencers, and businesses using LinkHub to share their world.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-12 py-6">
                Create Your Free LinkHub
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link2 className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold">LinkHub</span>
          </div>
          <p className="text-gray-400">
            © 2024 LinkHub. All rights reserved. Made with love for creators everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
