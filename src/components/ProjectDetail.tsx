import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { motion } from 'framer-motion'; 
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
    name: 'Rosy-Scan',
    description: `Rosy adalah eco-assistant cerdas yang membantu masyarakat mengelola sampah secara benar, menyenangkan, dan bermanfaat. Rosy tidak hanya memindai sampah, tetapi juga memberikan edukasi, panduan, dan reward nyata bagi setiap aksi peduli lingkungan.

Dengan teknologi AI Image Recognition, Rosy mampu mengenali apakah sebuah sampah organik atau non-organik, lalu memberi tahu cara memilahnya dengan benar. Setelah sampah dipilah, pengguna diarahkan untuk mengumpulkan dan menyetorkannya ke Bank Sampah resmi yang ditampilkan pada peta real-time (bukan dummy map). Setiap titik bank sampah yang terhubung akan muncul langsung di peta aplikasi.

Setelah pengguna menyetor sampah di titik Bank Sampah terdekat, Rosy memberikan 50 poin untuk setiap setoran yang divalidasi. Poin tersebut dapat ditukarkan dengan hadiah:
150 poin → Stiker Rosy
300 poin → NFT Rosy eksklusif
320 poin → Badge Eco-Warrior, yang akan tampil di profil pengguna.

Rosy diciptakan untuk membuat kegiatan memilah sampah menjadi lebih mudah, lebih terarah, dan lebih seru, sekaligus membantu masyarakat menciptakan lingkungan yang lebih bersih dengan sistem reward yang nyata dan transparan.
Scan, Pilah, Setor, Dapatkan Reward, Bersama Rosy, menjaga bumi jadi lebih menyenangkan.`,
    image: 'https://i.pinimg.com/736x/c8/80/df/c880dfc393f0bda44f9502b7fb396ee4.jpg',
    youtubeEmbed: 'https://www.youtube.com/embed/QQYgCxu988s',
    category: 'Education',
    raised: 0,
    goal: 50,
    supporters: 0,
    createdAt: 'Now',
    donationWallet: '0x0e3fcdd57e0b52a42e83d1b7bc5d75f782076057',
    updates: [
      {
        date: 'Now',
        title: 'Project Launch',
        content: 'Excited to launch'
      }
    ],
    teamMembers: [
      { name: 'Mulankid', role: 'Developer', avatar: 'https://i.pinimg.com/736x/9f/22/07/9f2207d9c7641b8de45361fa9d4916f4.jpg' },
    ]
  };

  const progressPercentage = (project.raised / project.goal) * 100;

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
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge className="bg-gray-900/90 backdrop-blur-sm border-gray-800 text-white mb-4">
              {project.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl mb-2 text-white">{project.name}</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <FundingChart data={fundingHistory} target={project.goal} />

            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full rounded-xl"
                src={project.youtubeEmbed} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

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

            <Card className="bg-gray-900/50 border-gray-800">
              <Tabs defaultValue="about" className="p-6">
                <TabsList className="bg-black">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4 mt-6">
                  <h3 className="text-lg text-white">About This Project</h3>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </TabsContent>
                <TabsContent value="updates" className="space-y-4 mt-6">
                  {project.updates.map((u, i) => (
                    <div key={i} className="p-4 rounded-lg bg-black border border-gray-800 text-white">
                      <div className="font-bold">{u.title}</div>
                      <div className="text-sm text-gray-500">{u.date}</div>
                      <p className="mt-2 text-gray-400">{u.content}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800 sticky top-24">
              <h3 className="text-white mb-4">Support This Project</h3>
              {!showQR ? (
                <Button onClick={() => setShowQR(true)} className="w-full bg-white text-black">
                  Show QR Code
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-2 rounded">
                    <img src={qrCodeUrl} alt="QR" className="w-full" />
                  </div>
                  <Button onClick={() => setShowQR(false)} variant="outline" className="w-full text-white">
                    Hide QR
                  </Button>
                </div>
              )}
              <div className="mt-4">
                <Input 
                  type="number" 
                  placeholder="Amount in BASE" 
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="bg-black text-white border-gray-800 mb-2"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Donate Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
