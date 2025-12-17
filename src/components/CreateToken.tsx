import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';

export function CreateToken() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    walletAddress: '',
    fundingTarget: '',
    youtubeEmbed: '',
    image: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4 text-white">Create Your Project</h1>
          <p className="text-gray-400">Start receiving support from the community</p>
        </div>

        <Card className="p-8 bg-gray-900/50 border-gray-800">
          <form className="space-y-6">
            <div>
              <Label htmlFor="wallet" className="text-white">Your Base Wallet Address</Label>
              <Input
                id="wallet"
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                className="bg-black border-gray-800 text-white font-mono text-sm mt-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This wallet will receive all donations</p>
            </div>

            <div>
              <Label htmlFor="name" className="text-white">Project Name</Label>
              <Input
                id="name"
                placeholder="e.g., Medical Research Fund"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-black border-gray-800 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="target" className="text-white">Funding Target (BASE)</Label>
              <Input
                id="target"
                type="number"
                placeholder="e.g., 10"
                value={formData.fundingTarget}
                onChange={(e) => setFormData({ ...formData, fundingTarget: e.target.value })}
                className="bg-black border-gray-800 text-white mt-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">How much BASE do you want to raise?</p>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project and how funds will be used..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-black border-gray-800 text-white mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="youtube" className="text-white">YouTube Video (Optional)</Label>
              <Input
                id="youtube"
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                value={formData.youtubeEmbed}
                onChange={(e) => setFormData({ ...formData, youtubeEmbed: e.target.value })}
                className="bg-black border-gray-800 text-white mt-2"
              />
            </div>

            <div>
              <Label className="text-white">Project Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-800 rounded-lg p-8 text-center hover:border-gray-700 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-400">
                    {formData.image ? formData.image.name : 'Click to upload image'}
                  </p>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-400">Creation Fee:</span>
                <span className="text-white">0.003 BASE</span>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Create Project
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
