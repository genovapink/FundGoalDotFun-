import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Plus, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const userStats = {
    projectsCreated: 2,
    totalRaised: 48.5,
    totalSupporters: 678,
  };

  const userProjects = [
    {
      id: '1',
      name: 'Open Science Lab',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=150&fit=crop',
      raised: 32.5,
      goal: 50,
      supporters: 234,
    },
    {
      id: '2',
      name: 'Neural Network Research',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=150&fit=crop',
      raised: 16,
      goal: 40,
      supporters: 444,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2 text-white">Your Dashboard</h1>
            <p className="text-gray-400">Manage your projects</p>
          </div>
          <Link to="/create">
            <Button className="bg-white text-black hover:bg-gray-200">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Projects Created</div>
            <div className="text-3xl text-white">{userStats.projectsCreated}</div>
          </Card>
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Total Raised</div>
            <div className="text-3xl text-white">{userStats.totalRaised} BASE</div>
          </Card>
          <Card className="p-6 bg-gray-900/50 border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Total Supporters</div>
            <div className="text-3xl text-white">{userStats.totalSupporters}</div>
          </Card>
        </div>

        {/* Projects List */}
        <div>
          <h2 className="text-xl mb-6 text-white">Your Projects</h2>
          <div className="space-y-4">
            {userProjects.map((project) => {
              const progress = (project.raised / project.goal) * 100;
              
              return (
                <Card key={project.id} className="p-6 bg-gray-900/50 border-gray-800">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 text-white">{project.name}</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">
                              {project.raised} BASE of {project.goal} BASE
                            </span>
                            <span className="text-white">{progress.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="bg-white h-full rounded-full transition-all"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Heart className="w-4 h-4" />
                          <span>{project.supporters} supporters</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Link to={`/project/${project.id}`}>
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-800 text-white">
                          View Project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
