import { Check, Crown, Star, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: 'Basic Landlord',
    price: 0,
    period: '/month',
    description: 'Perfect for individual landlords starting out',
    badge: null,
    features: [
      'Up to 3 property listings',
      'Basic property photos (5 max)',
      'Standard search visibility',
      'Basic tenant messaging',
      '5% commission on bookings',
      'Community support',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Premium Host',
    price: 1500,
    period: '/month',
    description: 'Most popular for growing landlords',
    badge: 'Most Popular',
    features: [
      'Unlimited property listings',
      'Professional photo gallery (20 max)',
      'Priority search placement',
      'Advanced messaging & scheduling',
      '3% commission on bookings',
      'Phone & chat support',
      'Performance analytics',
      'Verified landlord badge',
      'Featured listing options',
    ],
    buttonText: 'Upgrade to Premium',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    name: 'Business Elite',
    price: 4500,
    period: '/month',
    description: 'For property management companies',
    badge: 'Enterprise',
    features: [
      'Unlimited listings & locations',
      'Virtual tour integration',
      'Top search visibility',
      'Dedicated account manager',
      '2% commission on bookings',
      '24/7 priority support',
      'Advanced analytics dashboard',
      'Custom branding options',
      'Bulk property management',
      'API access integration',
      'White-label solutions',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary' as const,
    popular: false,
  },
];

const PricingPlans = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Revenue Plans for Landlords
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to maximize your rental income and grow your property business
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>30-day money back</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : 'hover:shadow-lg'} transition-all duration-300`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className={`${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary'} px-4 py-1`}>
                    {plan.badge === 'Most Popular' && <Star className="w-3 h-3 mr-1" />}
                    {plan.badge === 'Enterprise' && <Crown className="w-3 h-3 mr-1" />}
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">৳{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      + commission on each booking
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'shadow-lg' : ''}`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                  {plan.popular && <Zap className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Enterprise Solutions Available
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Need custom features for your property management company? We offer white-label solutions, 
              custom integrations, and dedicated support for large-scale operations.
            </p>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;