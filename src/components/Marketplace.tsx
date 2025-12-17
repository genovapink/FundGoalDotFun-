import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Search, Heart } from 'lucide-react';

// Mock data
const projects = [
  {
    id: '1',
    name: 'Open Science Lab',
    description: 'Funding groundbreaking research in quantum computing and AI',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    category: 'Research',
    raised: 32.5,
    goal: 50,
    supporters: 234,
  },
  {
    id: '2',
    name: 'Student Scholarship Fund',
    description: 'Supporting underprivileged students in pursuing STEM education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    category: 'Education',
    raised: 18,
    goal: 30,
    supporters: 456,
  },
  {
    id: '3',
    name: 'Climate Tech Project',
    description: 'Building carbon capture technology for a sustainable future',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop',
    category: 'Environment',
    raised: 42,
    goal: 50,
    supporters: 189,
  },
  {
    id: '4',
    name: 'Community Library',
    description: 'Creating a decentralized network of community learning spaces',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop',
    category: 'Community',
    raised: 8.5,
    goal: 25,
    supporters: 312,
  },
];

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Research', 'Education', 'Environment', 'Community'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4 text-white">Explore Projects</h1>
          <p className="text-gray-400">Support meaningful projects on Base Network</p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-800 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => {
            const progressPercentage = (project.raised / project.goal) * 100;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/project/${project.id}`}>
                  <Card className="overflow-hidden bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all group">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm border-gray-800 text-white">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg mb-2 text-white">{project.name}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">
                              {project.raised} BASE raised
                            </span>
                            <span className="text-white">
                              {progressPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-white h-full rounded-full transition-all"
                              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Heart className="w-4 h-4" />
                            <span>{project.supporters} supporters</span>
                          </div>
                          <span className="text-gray-400">
                            {project.goal} BASE goal
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
