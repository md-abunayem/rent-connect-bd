import { TrendingUp, DollarSign, Users, Home, Calendar, ArrowUpRight, Percent } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const revenueMetrics = [
  {
    title: 'Monthly Revenue',
    value: '৳28.5L',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'Total platform revenue this month',
  },
  {
    title: 'Commission Earned',
    value: '৳15.2L',
    change: '+18.3%',
    changeType: 'positive' as const,
    icon: Percent,
    description: 'From booking commissions (3-5%)',
  },
  {
    title: 'Premium Subscriptions',
    value: '1,247',
    change: '+25.7%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'Active premium landlord accounts',
  },
  {
    title: 'Featured Listings Revenue',
    value: '৳4.8L',
    change: '+32.1%',
    changeType: 'positive' as const,
    icon: Home,
    description: 'From promoted property listings',
  },
];

const monthlyBreakdown = [
  { month: 'Jan', commissions: 12.5, subscriptions: 3.2, featured: 2.8, total: 18.5 },
  { month: 'Feb', commissions: 13.2, subscriptions: 3.5, featured: 3.1, total: 19.8 },
  { month: 'Mar', commissions: 14.1, subscriptions: 3.8, featured: 3.6, total: 21.5 },
  { month: 'Apr', commissions: 15.2, subscriptions: 4.2, featured: 4.8, total: 24.2 },
  { month: 'May', commissions: 15.2, subscriptions: 4.5, featured: 4.8, total: 24.5 },
];

const RevenueStats = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Platform Revenue Analytics
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent view of HavenHub's revenue streams and growth metrics
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {revenueMetrics.map((metric, index) => (
            <Card key={metric.title} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                    {metric.change}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Monthly Revenue Trends
              </CardTitle>
              <CardDescription>
                Revenue breakdown by stream over last 5 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyBreakdown.map((month, index) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{month.month} 2024</span>
                      <span className="font-bold text-primary">৳{month.total}L</span>
                    </div>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${(month.commissions / month.total) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(month.subscriptions / month.total) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-purple-500" 
                        style={{ width: `${(month.featured / month.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Commissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Subscriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Featured Ads</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Projections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Growth Projections
              </CardTitle>
              <CardDescription>
                Expected revenue growth for next quarter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300">Q3 2024 Target</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Commission optimization</div>
                  </div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">৳35L</div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <div>
                    <div className="font-semibold text-blue-700 dark:text-blue-300">New Premium Users</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Expected monthly growth</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">+400</div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                  <div>
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Enterprise Deals</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Corporate housing partnerships</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">₹12L</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Projected Monthly Revenue:</span>
                  <span className="text-2xl text-primary">৳42L</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  +47% growth from current month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RevenueStats;