import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import {
  Heart,
  Users,
  Share2,
  QrCode
} from 'lucide-react';
import { FundingChart } from './FundingChart';

export function ProjectDetail() {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  // Mock project data
  const project = {
    id: '1',
    name: 'Open Science Lab',
    description: 'Funding groundbreaking research in quantum computing and AI. Our mission is to make cutting-edge research accessible to everyone and accelerate scientific discovery through decentralized collaboration.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Research',
    raised: 32.5,
    goal: 50,
    supporters: 234,
    createdAt: '2 days ago',
    donationWallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    updates: [
      {
        date: '2 days ago',
        title: 'Project Launch',
        content: 'Excited to launch Open Science Lab! Join us in revolutionizing research funding.'
      },
      {
        date: '1 day ago',
        title: 'First Milestone',
        content: 'Thank you to our amazing community for the support.'
      }
    ],
    teamMembers: [
      { name: 'Dr. Sarah Chen', role: 'Lead Researcher', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { name: 'Alex Kumar', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
    ]
  };

  const progressPercentage = (project.raised / project.goal) * 100;

  // Mock funding history data
  const fundingHistory = [
    { date: 'Jan 1', amount: 5, type: 'donation' as const },
    { date: 'Jan 3', amount: 3, type: 'donation' as const },
    { date: 'Jan 5', amount: 7.5, type: 'donation' as const },
    { date: 'Jan 7', amount: 2, type: 'withdrawal' as const },
    { date: 'Jan 10', amount: 10, type: 'donation' as const },
    { date: 'Jan 12', amount: 4, type: 'donation' as const },
    { date: 'Jan 15', amount: 5, type: 'donation' as const },
  ];

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${project.donationWallet}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge className="bg-gray-900/90 backdrop-blur-sm border-gray-800 text-white mb-4">
              {project.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl mb-2 text-white">{project.name}</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Funding Chart */}
            <FundingChart data={fundingHistory} target={project.goal} />

            {/* YouTube Video */}
            {project.youtubeEmbed && (
              <Card className="p-0 bg-gray-900/50 border-gray-800 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.youtubeEmbed}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-900/50 border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Raised</div>
                <div className="text-xl text-white">{project.raised} BASE</div>
              </Card>
              <Card className="p-4 bg-gray-900/50 border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Supporters</div>
                <div className="text-xl text-white">{project.supporters}</div>
              </Card>
              <Card className="p-4 bg-gray-900/50 border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Progress</div>
                <div className="text-xl text-white">{progressPercentage.toFixed(0)}%</div>
              </Card>
            </div>

            {/* Tabs */}
            <Card className="bg-gray-900/50 border-gray-800">
              <Tabs defaultValue="about" className="p-6">
                <TabsList className="bg-black">
                  <TabsTrigger value="about" className="text-gray-400 data-[state=active]:text-white">About</TabsTrigger>
                  <TabsTrigger value="updates" className="text-gray-400 data-[state=active]:text-white">Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-4 mt-6">
                  <div>
                    <h3 className="text-lg mb-3 text-white">About This Project</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3 text-white">Team</h3>
                    <div className="space-y-3">
                      {project.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="updates" className="space-y-4 mt-6">
                  <h3 className="text-lg mb-4 text-white">Project Updates</h3>
                  {project.updates.map((update, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-black border border-gray-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white">{update.title}</div>
                        <div className="text-sm text-gray-400">{update.date}</div>
                      </div>
                      <p className="text-sm text-gray-400">{update.content}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800 sticky top-24">
              <div className="space-y-6">
                {/* Donate Section */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-white">
                    <Heart className="w-5 h-5" />
                    Support This Project
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Send BASE directly to the creator
                  </p>
                  
                  {!showQR ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-black rounded-lg border border-gray-800">
                        <p className="text-xs text-gray-400 mb-1">Wallet Address</p>
                        <p className="text-xs font-mono break-all text-white">{project.donationWallet}</p>
                      </div>
                      <Button 
                        onClick={() => setShowQR(true)}
                        variant="outline" 
                        className="w-full border-gray-700 hover:bg-gray-800 text-white"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Show QR Code
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg">
                        <img 
                          src={qrCodeUrl} 
                          alt="Donation QR Code" 
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-xs text-center text-gray-400">
                        Scan to donate BASE
                      </p>
                      <Button 
                        onClick={() => setShowQR(false)}
                        variant="outline" 
                        className="w-full border-gray-700 hover:bg-gray-800 text-white"
                      >
                        Hide QR Code
                      </Button>
                    </div>
                  )}
                </div>

                {/* Quick Donate */}
                <div className="pt-6 border-t border-gray-800">
                  <Input
                    type="number"
                    placeholder="Amount in BASE"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="bg-black border-gray-800 text-white mb-3"
                  />
                  <Button className="w-full bg-white text-black hover:bg-gray-200 mb-3">
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </div>

                {/* Share */}
                <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
