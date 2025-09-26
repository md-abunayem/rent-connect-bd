import { Crown, Zap, Eye, MessageSquare, BarChart3, Shield, Star, Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const premiumFeatures = [
  {
    icon: Crown,
    title: 'Featured Listings',
    description: 'Get your properties shown at the top of search results',
    price: '৳500/listing/month',
    benefits: ['3x more visibility', 'Priority placement', 'Highlighted badge'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Instant Boost',
    description: 'Promote your listing for 24-48 hours for quick bookings',
    price: '৳200/boost',
    benefits: ['Top position', '48-hour visibility', 'Urgent badge'],
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Eye,
    title: 'Super Visibility',
    description: 'Enhanced listing with premium photo gallery and virtual tours',
    price: '৳300/listing/month',
    benefits: ['20+ photos', 'Virtual tour', 'Premium gallery'],
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: MessageSquare,
    title: 'Priority Support',
    description: 'Get faster responses and dedicated customer support',
    price: '৳800/month',
    benefits: ['24/7 chat support', 'Phone assistance', 'Account manager'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed insights about your listings and tenant behavior',
    price: '৳400/month',
    benefits: ['View tracking', 'Inquiry analytics', 'Market insights'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Verified Badge',
    description: 'Get a verified landlord badge to build trust with tenants',
    price: '৳1000/year',
    benefits: ['Trust badge', 'Background check', 'Identity verified'],
    color: 'from-emerald-500 to-green-500',
  },
];

const PremiumFeatures = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Premium Features & Add-ons
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Boost your rental income with powerful premium features designed to maximize your property visibility and bookings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {premiumFeatures.map((feature, index) => (
            <Card key={feature.title} className="relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" 
                   style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                    {feature.price}
                  </Badge>
                </div>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant="outline">
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-primary" />
                <Badge className="bg-primary text-primary-foreground">Bundle Offer</Badge>
              </div>
              <CardTitle className="text-2xl font-bold">Complete Premium Package</CardTitle>
              <CardDescription className="text-lg">
                Get all premium features at a discounted rate
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-muted-foreground line-through">৳3,200/month</span>
                <span className="text-4xl font-bold text-primary">৳2,199/month</span>
                <Badge className="bg-green-500 text-white">Save 31%</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>Featured Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Unlimited Boosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-500" />
                  <span>Super Visibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-pink-500" />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Verified Badge</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Start Premium Trial
                  <Rocket className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                14-day free trial • No setup fees • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;