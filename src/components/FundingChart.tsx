import { Card } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FundingChartProps {
  data: Array<{ date: string; amount: number; type: 'donation' | 'withdrawal' }>;
  target: number;
}

export function FundingChart({ data, target }: FundingChartProps) {
  // Calculate cumulative funding
  const chartData = data.reduce((acc, item, index) => {
    const previousAmount = index > 0 ? acc[index - 1].cumulative : 0;
    const cumulative = item.type === 'donation' 
      ? previousAmount + item.amount 
      : previousAmount - item.amount;
    
    return [
      ...acc,
      {
        date: item.date,
        cumulative: Math.max(0, cumulative),
        amount: item.amount,
        type: item.type
      }
    ];
  }, [] as Array<{ date: string; cumulative: number; amount: number; type: string }>);

  const currentFunding = chartData.length > 0 ? chartData[chartData.length - 1].cumulative : 0;
  const percentageToTarget = (currentFunding / target) * 100;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg shadow-lg">
          <p className="text-sm text-gray-400 mb-1">{data.date}</p>
          <p className="text-white flex items-center gap-2">
            {data.type === 'donation' ? (
              <TrendingUp className="w-4 h-4 text-white" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-white">
              {data.type === 'donation' ? '+' : '-'}{data.amount.toLocaleString()} BASE
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Total: {data.cumulative.toLocaleString()} BASE
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg text-white">Funding Progress</h3>
          <div className="text-right">
            <div className="text-2xl text-white">{currentFunding.toLocaleString()} BASE</div>
            <div className="text-sm text-gray-400">of {target.toLocaleString()} BASE goal</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">{percentageToTarget.toFixed(1)}% funded</span>
            <span className="text-gray-400">{(target - currentFunding).toLocaleString()} BASE remaining</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentageToTarget, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorFunding" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="cumulative" 
              stroke="#ffffff" 
              strokeWidth={2}
              fill="url(#colorFunding)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full" />
          <span className="text-gray-400">Donations</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full" />
          <span className="text-gray-400">Withdrawals</span>
        </div>
      </div>
    </Card>
  );
}