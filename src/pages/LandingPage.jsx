import React, { useState } from 'react';
import { Button, Container, Typography, Card, CardContent, TextField, IconButton, Divider } from '@mui/material';
import { ChevronRight, ArrowRight, Youtube, Star, DollarSign, Clock, Repeat, ExternalLink, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin , Quote, TrendingUp, Shield, Globe, Calendar,Users, RefreshCw, CheckCircle, Smartphone, ChevronDown, ChevronUp, HelpCircle, Bell, MessageCircle } from 'lucide-react';
import NavBar2 from '../components/layout/Navbar2';

const LandingPage = () => {
  // Review section data
  const testimonials = [
    {
      name: "Michael Johnson",
      role: "Early Investor",
      comment: "I've been using TronYield for 6 months now and the weekly interest payments have been consistent and reliable. The platform is easy to use and customer support is excellent.",
      rating: 5,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },
    {
      name: "Sarah Williams",
      role: "Crypto Enthusiast",
      comment: "The best TRON investment platform I've used. The interest rates are competitive and I love getting paid every Friday. It's become a significant part of my passive income strategy.",
      rating: 5,
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100"
    },
    {
      name: "David Chen",
      role: "Financial Advisor",
      comment: "As someone who advises clients on digital investments, I've found TronYield to be transparent and reliable. The smart contract code is well-audited and the team is responsive.",
      rating: 4,
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100"
    }
  ];

  // Info section data
  const steps = [
    {
      icon: <DollarSign size={40} strokeWidth={1.5} />,
      title: "1. Deposit TRX",
      description: "Connect your TRON wallet and deposit any amount of TRX to start earning interest. Minimum deposit is 100 TRX.",
      benefits: ["No deposit fees", "Instant confirmation", "Secure storage"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Clock size={40} strokeWidth={1.5} />,
      title: "2. Earn Interest",
      description: "Your investment automatically generates interest at a competitive rate of 8% APY, calculated and distributed every Friday.",
      benefits: ["Weekly payments", "Transparent rates", "No hidden fees"],
      color: "from-teal-500 to-emerald-600"
    },
    {
      icon: <Repeat size={40} strokeWidth={1.5} />,
      title: "3. Withdraw Anytime",
      description: "Access your funds at any time with no lock-up period. Withdraw your principal plus accumulated interest whenever you want.",
      benefits: ["No withdrawal fees", "No lock-up period", "Fast processing"],
      color: "from-amber-500 to-orange-600"
    }
  ];

  // Features section data
  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: "High Interest Rates",
      description: "Earn competitive interest rates on your TRON assets, significantly higher than traditional banking options.",
      color: "bg-blue-600"
    },
    {
      icon: <Calendar size={24} />,
      title: "Weekly Payouts",
      description: "Receive your interest earnings every Friday, directly to your connected TRON wallet.",
      color: "bg-indigo-600"
    },
    {
      icon: <Shield size={24} />,
      title: "Blockchain Security",
      description: "All transactions are secured by TRON blockchain technology, ensuring transparency and immutability.",
      color: "bg-teal-600"
    },
    {
      icon: <DollarSign size={24} />,
      title: "No Hidden Fees",
      description: "We maintain complete transparency with no hidden fees. What you see is what you get.",
      color: "bg-emerald-600"
    },
    {
      icon: <Clock size={24} />,
      title: "Quick Withdrawals",
      description: "Access your funds whenever you need them with our fast and efficient withdrawal process.",
      color: "bg-purple-600"
    },
    {
      icon: <Users size={24} />,
      title: "Growing Community",
      description: "Join thousands of investors already benefiting from our reliable TRON yield platform.",
      color: "bg-amber-600"
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Auto-Compounding",
      description: "Maximize your returns with optional auto-compounding of your weekly interest payments.",
      color: "bg-blue-500"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Friendly",
      description: "Monitor your investments and manage your account from any device with our responsive platform.",
      color: "bg-indigo-500"
    }
  ];

  // FAQs section data
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does TronYield generate returns?",
      answer: "We generate returns through a combination of liquidity providing, yield farming, and other DeFi strategies on the TRON blockchain. Our diversified approach ensures stable returns for our investors."
    },
    {
      question: "Is there a minimum deposit amount?",
      answer: "Yes, the minimum deposit amount is 100 TRX. There is no maximum limit on deposits."
    },
    {
      question: "When are interest payments distributed?",
      answer: "Interest payments are calculated daily and distributed every Friday to your connected TRON wallet."
    },
    {
      question: "Can I withdraw my investment at any time?",
      answer: "Yes, you can withdraw your principal and accumulated interest at any time without penalties."
    },
    {
      question: "Is my investment secure?",
      answer: "All investments are secured by smart contracts on the TRON blockchain. Our contracts have been audited by leading blockchain security firms."
    },
    {
      question: "What are the fees?",
      answer: "We charge a small 1% performance fee on generated yields. There are no deposit or withdrawal fees beyond standard TRON network transaction costs."
    }
  ];
  
  // 
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  // footer
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header/Navigation */}
      <NavBar2 home="#home" hiw="#how-it-works" features="#features" reviews="#reviews" faq="#faq" />

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-blue-950 to-blue-700 text-white">
      <Container maxWidth="lg">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Typography variant="h2" className="font-bold mb-6">
              Earn Weekly Interest on Your TRON Investment
            </Typography>
            <Typography variant="h6" className="mb-8 opacity-90">
              Deposit TRX and receive interest payments every Friday. Safe, secure, and transparent blockchain-based investment.
            </Typography>
            
            <div className="flex flex-wrap gap-4 mt-2 mb-8">
              <div className="flex items-center gap-2 bg-blue-800 bg-opacity-50 rounded-lg px-4 py-2">
                <TrendingUp size={18} />
                <span className="text-sm">Up to 8% APY</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-800 bg-opacity-50 rounded-lg px-4 py-2">
                <Calendar size={18} />
                <span className="text-sm">Weekly Payouts</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-800 bg-opacity-50 rounded-lg px-4 py-2">
                <Shield size={18} />
                <span className="text-sm">Audited Contract</span>
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant="contained" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
              >
                Start Earning
              </Button>
              <Button 
                variant="outlined" 
                className="border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-md font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <img 
                src="https://cloudfront-us-east-1.images.arcpublishing.com/morningstar/WDZXFKO5AZBQLL77GTVP3SSDWA.png" 
                alt="TRON Investment" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 bg-blue-600 rounded-md px-4 py-2 shadow-md">
                <Typography variant="body2" className="font-medium">Next payout: Friday</Typography>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

      {/* Info Section */}
      <section id="how-it-works" className="py-20 bg-gray-100">
      <Container maxWidth="lg">
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-1 mb-4">
            <span className="text-blue-600 font-medium text-sm">Simple Process</span>
          </div>
          <Typography 
            variant="h3" 
            fontFamily="serif" 
            className="font-bold mb-4"
          >
            How It Works
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Start earning passive income with TRX in three simple steps
          </Typography>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line between cards (visible on md screens and up) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
                <div className={`h-1.5 bg-gradient-to-r ${step.color}`}></div>
                <CardContent className="p-8">
                  <div className="flex justify-center mb-8">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <Typography variant="h5" className="font-bold mb-4 text-center">
                    {step.title}
                  </Typography>
                  
                  <Typography variant="body1" className="text-gray-600 mb-6 text-center">
                    {step.description}
                  </Typography>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <Typography variant="subtitle2" className="font-medium mb-3 text-gray-700">
                      Benefits:
                    </Typography>
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center mb-2 last:mb-0">
                        <CheckCircle size={16} className={`mr-2 text-${step.color.split(' ')[1].replace('to-', '')}`} />
                        <Typography variant="body2" className="text-gray-600">
                          {benefit}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-24 z-20">
                  <div className="bg-white shadow-md rounded-full p-1">
                    <ArrowRight size={24} className="text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <Typography variant="h4" className="font-bold mb-4">
                    Ready to Start Earning?
                  </Typography>
                  <Typography variant="body1" className="opacity-90 mb-6">
                    Join thousands of investors already earning weekly passive income with TRX. Start with as little as 100 TRX today.
                  </Typography>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
                      Connect Wallet
                    </button>
                    <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex justify-between mb-4 pb-4 border-b border-white border-opacity-20">
                      <span>Current APY</span>
                      <span className="font-bold text-xl">8.0%</span>
                    </div>
                    <div className="flex justify-between mb-4 pb-4 border-b border-white border-opacity-20">
                      <span>Next Payout</span>
                      <span className="font-bold">Friday</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value Locked</span>
                      <span className="font-bold">12.4M TRX</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
      <Container maxWidth="lg">
        <div className="flex flex-col items-center text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-2">
            Platform Benefits
          </div>
          <Typography variant="h3" className="font-bold mb-4">
            Why Choose GMM
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers unique advantages for TRON investors looking for reliable passive income
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="rounded-xl hover:shadow-lg transition-shadow border-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${feature.color} p-3 rounded-lg mr-4 text-white`}>
                    {feature.icon}
                  </div>
                  <Typography variant="h6" className="font-bold">
                    {feature.title}
                  </Typography>
                </div>
                <Typography variant="body2" className="text-gray-600">
                  {feature.description}
                </Typography>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r flex flex-col gap-2.5 items-center from-blue-600 to-indigo-600 text-white rounded-xl p-8 max-w-3xl mx-auto">
            <Typography variant="h5" className="font-bold mb-4">
              Ready to earn passive income with your TRON?
            </Typography>
            <Typography variant="body1" className="mb-6 opacity-90">
              Start with as little as 100 TRX and watch your assets grow weekly.
            </Typography>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium shadow-md">
              Get Started Now
            </button>
          </div>
        </div>
      </Container>
    </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container maxWidth="lg">
        <div className="flex flex-col gap-1.5 items-center text-center mb-16">
          <Typography variant="h3" className="font-bold mb-4">
            Explore Our Platform
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Watch these videos to learn more about our platform features and see our products in action
          </Typography>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Card 1 */}
          <Card className="shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div 
              className="relative aspect-video cursor-pointer group"
              onClick={() => handleVideoClick('dQw4w9WgXcQ')}
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 hover:bg-black/30 transition-colors duration-300 group">
                <div className="bg-white/90 p-2 rounded-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={20} className="text-gray-800" />
                  <span className="ml-1 text-sm font-medium text-gray-800">Watch on YouTube</span>
                </div>
              </div>
              <iframe 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                title="Platform Rules" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Youtube size={24} className="text-red-600 mr-2" />
                <Typography variant="h6" className="font-bold">
                  Platform Rules & Guidelines
                </Typography>
              </div>
              <Typography variant="body2" className="text-gray-600">
                Learn about our community guidelines and how to make the most of our platform features.
              </Typography>
            </CardContent>
          </Card>
          
          {/* Video Card 2 */}
          <Card className="shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div 
              className="relative aspect-video cursor-pointer group"
              onClick={() => handleVideoClick('dQw4w9WgXcQ')}
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 hover:bg-black/30 transition-colors duration-300 group">
                <div className="bg-white/90 p-2 rounded-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={20} className="text-gray-800" />
                  <span className="ml-1 text-sm font-medium text-gray-800">Watch on YouTube</span>
                </div>
              </div>
              <iframe 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                title="Portfolio Showcase" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Youtube size={24} className="text-red-600 mr-2" />
                <Typography variant="h6" className="font-bold">
                  Product Showcase & Portfolio
                </Typography>
              </div>
              <Typography variant="body2" className="text-gray-600">
                Discover our latest products and see real-world examples of successful implementations.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <Container maxWidth="lg">
        <div className="text-center mb-16">
          <Typography 
            variant="overline" 
            className="text-blue-600 font-medium tracking-wider"
          >
            TRUSTED BY INVESTORS
          </Typography>
          <Typography 
            variant="h3" 
            className="font-bold mt-2 text-gray-800"
          >
            What Our Investors Say
          </Typography>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <Card 
              key={index} 
              className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border-0 ${review.bgColor}`}
              elevation={0}
            >
              <CardContent className="p-6 relative">
                <Quote 
                  size={48} 
                  className="text-blue-600 opacity-20 absolute top-4 right-4" 
                />

                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < review.rating ? "fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>

                <Typography 
                  variant="body1" 
                  className="text-gray-700 mb-6 relative z-10"
                >
                  "{review.comment}"
                </Typography>
                
                <div className="flex items-center mt-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 shadow-md">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <Typography variant="subtitle1" className="font-bold text-gray-800">
                      {review.name}
                    </Typography>
                    <Typography variant="body2" className="text-blue-600">
                      {review.role}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Typography variant="body2" className="text-gray-500">
            Join over 10,000+ investors earning passive income with TronYield
          </Typography>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            Start Investing Today
          </button>
        </div>
      </Container>
    </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container maxWidth="lg">
        <div className="flex flex-col items-center gap-1.5 text-center mb-14">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 px-4 py-1 rounded-full mb-4">
            <HelpCircle size={16} className="mr-2" />
            <Typography variant="subtitle2">Got Questions?</Typography>
          </div>
          <Typography variant="h3" className="font-bold mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about TronYield's investment platform and services
          </Typography>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`mb-4 border border-gray-100 ${
                expandedIndex === index 
                  ? 'shadow-md bg-blue-50' 
                  : 'shadow-sm hover:shadow-md'
              } transition-all rounded-xl overflow-hidden`}
            >
              <div 
                className="cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6" className={`font-bold ${expandedIndex === index ? 'text-blue-700' : ''}`}>
                      {faq.question}
                    </Typography>
                    {expandedIndex === index ? 
                      <ChevronUp size={20} className="text-blue-600" /> : 
                      <ChevronDown size={20} className="text-gray-400" />
                    }
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? 'max-h-40 mt-4' : 'max-h-0'
                  }`}>
                    <Typography variant="body1" className="text-gray-700">
                      {faq.answer}
                    </Typography>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-black/10"></div>
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10" 
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      </div>

      <Container maxWidth="lg" className="relative">
        <div className="flex flex-col items-center text-center text-white">

          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <TrendingUp size={16} className="mr-2" />
            <Typography variant="subtitle2" className="font-medium">Up to 16% APY on TRON assets</Typography>
          </div>
          
          <Typography variant="h2" marginBottom={1} className="font-bold mb-6 text-white">
            Ready to Start Earning?
          </Typography>
          
          <Typography variant="h6" marginBottom={3} className="mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of investors already earning weekly interest on their TRON assets.
          </Typography>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield size={18} className="mr-2" />
              <Typography variant="body2">Audited & Secure</Typography>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock size={18} className="mr-2" />
              <Typography variant="body2">Weekly Payouts</Typography>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <DollarSign size={18} className="mr-2" />
              <Typography variant="body2">Withdraw Anytime</Typography>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="contained" 
              size="large" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg flex items-center"
              endIcon={<ArrowRight size={20} />}
            >
              Start Investing Now
            </Button>
            
            <Button 
              variant="contained" 
              size="large" 
              className="border-white text-white hover:bg-white/10 px-6 py-4 rounded-full font-medium"
            >
              Learn More
            </Button>
          </div>

        </div>
      </Container>
    </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-blue-200 opacity-30"></div>
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-purple-200 opacity-30"></div>
      
      <Container maxWidth="md">
        <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="relative">
            {/* Top colored accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <CardContent className="p-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-6">
                  <Mail size={24} className="text-blue-600" />
                </div>
                
                <Typography variant="h4" marginBottom={2} className="font-bold mb-3 text-center">
                  Stay Updated
                </Typography>
                
                <Typography variant="body1" marginBottom={2} className="text-center mb-2 text-gray-600 max-w-md">
                  Subscribe to our newsletter for the latest updates, investment tips, and exclusive offers.
                </Typography>
                
                <div className="flex items-center gap-2 mb-8">
                  <Bell size={16} className="text-blue-600" />
                  <Typography variant="caption" className="text-blue-600 font-medium">
                    Join 12,000+ investors receiving weekly updates
                  </Typography>
                </div>
                
                {!isSubmitted ? (
                  <div className="w-full max-w-lg">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <TextField
                        fullWidth
                        placeholder="Your email address"
                        variant="outlined"
                        className="bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                          sx: { borderRadius: '0.5rem' }
                        }}
                      />
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubscribe}
                        className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap px-6 py-3 rounded-lg"
                        endIcon={<ArrowRight size={18} />}
                      >
                        Subscribe
                      </Button>
                    </div>
                    <Typography variant="caption" marginTop={2} className="text-gray-500 mt-3 block text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </Typography>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-green-50 rounded-lg w-full max-w-lg">
                    <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
                    <Typography variant="h6" className="font-medium text-green-700">
                      Thank you for subscribing!
                    </Typography>
                    <Typography variant="body2" className="text-green-600">
                      We've sent a confirmation email to {email}
                    </Typography>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </Container>
    </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/5 blur-xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/5 blur-xl"></div>
      
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                <DollarSign size={24} className="text-blue-400" />
              </div>
              <Typography variant="h5" className="font-bold text-white">
                GMM
              </Typography>
            </div>
            
            <Typography variant="body2" className="text-gray-400 mb-6">
              The leading platform for earning interest on your TRON assets. Safe, secure, and transparent.
            </Typography>
            
            <div className="flex space-x-2 mt-3">
              {[
                { icon: <Facebook size={18} color='white' />, label: "Facebook" },
                { icon: <Twitter size={18} color='white' />, label: "Twitter" },
                { icon: <Instagram size={18} color='white' />, label: "Instagram" },
                { icon: <Linkedin size={18} color='white' />, label: "LinkedIn" }
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  size="small" 
                  aria-label={social.label}
                  className="bg-gray-800 hover:bg-blue-500 text-gray-400 hover:text-white transition-colors p-2"
                >
                  {social.icon}
                </IconButton>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <Typography variant="h6" marginBottom={2} className="font-bold mb-6 flex items-center">
              <ChevronRight size={20} className="text-blue-400 mr-2" />
              Quick Links
            </Typography>
            
            <nav className="flex flex-col space-y-3">
              {[
                { href: "#home", label: "Home" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#features", label: "Features" },
                { href: "#reviews", label: "Reviews" },
                { href: "#faq", label: "FAQ" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-blue-400 mr-0 group-hover:mr-2 transition-all"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Legal */}
          <div>
            <Typography variant="h6" marginBottom={2} className="font-bold mb-6 flex items-center">
              <Shield size={20} className="text-blue-400 mr-2" />
              Legal
            </Typography>
            
            <nav className="flex flex-col space-y-3">
              {[
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Risk Disclosure" },
                { href: "#", label: "Cookies Policy" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-blue-400 mr-0 group-hover:mr-2 transition-all"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Contact Us */}
          <div>
            <Typography variant="h6" marginBottom={2} className="font-bold mb-6 flex items-center">
              <MessageCircle size={20} className="text-blue-400 mr-2" />
              Contact Us
            </Typography>
            
            <div className="flex flex-col space-y-4">
              {[
                { icon: <Mail size={16} />, text: "support@tronyield.com" },
                { icon: <Phone size={16} />, text: "+1 (555) 123-4567" },
                { icon: <Globe size={16} />, text: "www.tronyield.com" },
                { 
                  icon: <MapPin size={16} />, 
                  text: "123 Blockchain Street, San Francisco, CA 94103, USA" 
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-gray-800 p-2 rounded mr-3 mt-0.5">
                    {item.icon}
                  </div>
                  <Typography variant="body2" className="text-gray-400">
                    {item.text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <Typography variant="h6" className="font-bold mb-2">
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Get the latest updates and news delivered to your inbox
              </Typography>
            </div>
            <div className="flex">
              <Button 
                variant="contained" 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
        
        <Divider className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="body2" className="text-gray-500 mb-4 md:mb-0">
            © {currentYear} GMM. All rights reserved.
          </Typography>
          
          <Typography variant="caption" className="text-gray-600 text-center">
            TRON and TRX are registered trademarks of the TRON Foundation. All investments involve risk.
          </Typography>
        </div>
      </Container>
    </footer>
    </div>
  );
};

export default LandingPage;