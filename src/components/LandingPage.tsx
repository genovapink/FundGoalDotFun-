import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import {
  Rocket,
  Heart,
  TrendingUp,
  Shield,
} from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Create Project',
      description: 'Launch your fundraising project with transparent blockchain tracking'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Direct Donations',
      description: 'Receive BASE tokens directly to your wallet from supporters'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Monitor funding in real-time with dynamic charts'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Transparent',
      description: 'All transactions recorded on Base Network blockchain'
    }
  ];

  const stats = [
    { value: '0.003', label: 'BASE Creation Fee' },
    { value: '100%', label: 'Transparent' },
    { value: 'Base', label: 'Network' },
    { value: 'P2P', label: 'Direct Funding' }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl mb-6 text-white">
            FundGoaldotFun
            <br />
            The Future of Decentralized Crowdfunding
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering Fundraising with Tokenization & Blockchain Transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Create Project
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
                View Projects
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-900/50 border border-gray-800">
              <div className="text-2xl md:text-3xl mb-2 text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-white">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Simple, transparent crowdfunding on Base Network
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all text-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4 text-white mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 rounded-xl p-12 text-center border border-gray-800 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-white">Ready to Launch?</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Start your fundraising journey on Base Network today
          </p>
          <Link to="/create">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Create Project Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
