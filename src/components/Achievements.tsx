import React from 'react';
import { Trophy, Star, Zap, Code, Rocket, Users, BookOpen, Briefcase, Crown, Medal, Activity, Globe, Bot, Brain, Laptop2, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

type FloatingIconProps = {
  children: React.ReactNode;
  delay?: number;
};

const FloatingIcon = ({ children, delay = 0 }: FloatingIconProps) => (
    <div 
      className="absolute animate-bounce opacity-20"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

const Achievements = () => {
  const [inView, setInView] = React.useState(false);
  const [activeYear, setActiveYear] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const achievementsTimeline = [
    {
      year: '2023',
      theme: 'Foundation',
      icon: <Star className="w-6 h-6" />,
      items: [
        { icon: <Trophy className="w-5 h-5" />, text: 'Won my first hackathon (Robotics/IoT).' },
        { icon: <Zap className="w-5 h-5" />, text: 'Built a line-following robot using Raspberry Pi.' },
        { icon: <Code className="w-5 h-5" />, text: 'Started building projects with Arduino, C, and embedded systems.' },
        { icon: <Rocket className="w-5 h-5" />, text: 'Entered the world of hackathons and tech competitions.' },
      ]
    },
    {
      year: '2024',
      theme: 'Breakthrough',
      icon: <Rocket className="w-6 h-6" />,
      items: [
        { icon: <Globe className="w-5 h-5" />, text: 'Represented my college at Delhi Startup Mahakumbh, addressed by PM Modi and top founders.' },
        { icon: <Trophy className="w-5 h-5" />, text: 'Won a robotics hackathon.' },
        { icon: <Briefcase className="w-5 h-5" />, text: 'Completed an internship at RC Labs as a Software Developer.' },
        { icon: <UserCheck className="w-5 h-5" />, text: 'Took Arduino sessions and Linux VirtualBox workshops for juniors.' },
        { icon: <Users className="w-5 h-5" />, text: 'Conducted hands-on training in IoT and robotics at campus.' },
        { icon: <Laptop2 className="w-5 h-5" />, text: 'Built ERP systems and launched AI & web-based projects.' },
        { icon: <BookOpen className="w-5 h-5" />, text: 'Learned MERN stack, Django, and contributed to full-stack apps.' },
      ]
    },
    {
      year: '2025',
      theme: 'Leadership',
      icon: <Crown className="w-6 h-6" />,
      items: [
        { icon: <Briefcase className="w-5 h-5" />, text: 'Interned as a Product Management Intern at Gully Group.' },
        { icon: <Users className="w-5 h-5" />, text: 'Conducted a Hackathon at my college as lead organizer.' },
        { icon: <Medal className="w-5 h-5" />, text: 'Received Best Upcoming Engineer 2025 (Multiple Awards).' },
        { icon: <Activity className="w-5 h-5" />, text: 'Led multiple Drone workshops and technical sessions.' },
        { icon: <Bot className="w-5 h-5" />, text: 'Created advanced AI applications: Datasheet AI, Sanskrit GPT, MediBot, and more.' },
        { icon: <Brain className="w-5 h-5" />, text: 'Completed advanced courses in AI, Full Stack Dev, FastAPI, and LLMs.' },
        { icon: <Globe className="w-5 h-5" />, text: 'Reinvited to Delhi tech events for achievements in AI and product dev.' },
      ]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: <Code className="w-6 h-6" /> },
    { number: "3+", label: "Years Experience", icon: <Trophy className="w-6 h-6" /> },
    { number: "100+", label: "GitHub Contributions", icon: <Activity className="w-6 h-6" /> },
    { number: "15+", label: "Technologies Mastered", icon: <Sparkles className="w-6 h-6" /> }
  ];

  return (
    <section id="achievements" className="py-24 bg-white dark:bg-black text-slate-900 dark:text-white relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon delay={0}>
          <div className="top-20 left-20 relative">
            <Code className="w-8 h-8 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <div className="top-40 right-32 relative">
            <Rocket className="w-10 h-10 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={2}>
          <div className="bottom-32 left-1/4 relative">
            <Trophy className="w-7 h-7 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={1.5}>
          <div className="bottom-40 right-20 relative">
            <Brain className="w-9 h-9 text-gray-300" />
          </div>
        </FloatingIcon>
        
        {/* Geometric shapes */}
        <div className="absolute top-16 left-16 w-32 h-32 border-2 border-gray-200 rounded-full animate-spin opacity-30" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 border-2 border-gray-200 rounded-full animate-spin opacity-20" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 border-2 border-gray-200 rotate-45 animate-pulse opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="title text-6xl md:text-8xl mb-6 text-slate-900 dark:text-white">Achievements</h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-slate-900 dark:bg-white animate-pulse"></div>
            <Sparkles className="w-6 h-6 text-slate-900 dark:text-white animate-spin" style={{animationDuration: '3s'}} />
            <div className="w-12 h-1 bg-slate-900 dark:bg-white animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            A structured timeline of growth, innovation, and leadership in technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Central timeline line with animated dots */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-900 dark:bg-white h-full rounded-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Timeline items */}
          <div className="space-y-32">
            {achievementsTimeline.map((yearBlock, idx) => (
              <div 
                key={yearBlock.year}
                className={`relative transition-all duration-1000 delay-${idx * 200} ${inView ? 'opacity-100 translate-x-0' : `opacity-0 ${idx % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`}`}
              >
                {/* Animated timeline connector */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0">
                  <div className={`w-6 h-6 rounded-full border-4 border-slate-900 dark:border-white transition-all duration-500 ${activeYear === idx ? 'bg-slate-900 dark:bg-white animate-pulse shadow-lg' : 'bg-white dark:bg-slate-900'}`}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`transition-all duration-500 ${activeYear === idx ? 'text-white animate-bounce' : 'text-slate-900 dark:text-white'}`}>
                      {yearBlock.icon}
                    </div>
                  </div>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${idx % 2 === 0 ? '' : 'lg:grid-cols-2'}`}>
                  {/* Year section */}
                  <div className={`${idx % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:order-2 lg:pl-20'}`}>
                    <div className="inline-block group">
                      <div className={`bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:rotate-1`}>
                        <div className="flex items-center gap-6 mb-4">
                          <div className={`p-4 bg-slate-900 dark:bg-white text-white rounded-2xl group-hover:scale-110 transition-all duration-300 ${activeYear === idx ? 'animate-pulse' : ''}`}>
                            {yearBlock.icon}
                          </div>
                          <div>
                            <div className="text-5xl font-black text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                              {yearBlock.year}
                            </div>
                            <div className="text-sm uppercase tracking-wider text-slate-600 dark:text-slate-300 font-bold mt-1">
                              {yearBlock.theme}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors duration-300">
                            <span className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-pulse"></span>
                            <span>MILESTONE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements section */}
                  <div className={`${idx % 2 === 0 ? 'lg:pl-20' : 'lg:order-1 lg:pr-20'}`}>
                    <div className="bg-white dark:bg-black rounded-3xl p-8 transition-all duration-300 shadow-2xl hover:scale-102 hover:-rotate-1">
                      <div className="space-y-6">
                        {yearBlock.items.map((item, i) => (
                          <div 
                            key={i} 
                            className="flex items-start gap-4 group hover:translate-x-4 transition-all duration-300 p-3 rounded-xl"
                            style={{animationDelay: `${i * 0.1}s`}}
                          >
                            <div className="p-3 bg-transparent text-slate-900 dark:text-white rounded-xl group-hover:scale-110 transition-all duration-300 mt-1">
                              {item.icon}
                            </div>
                            <p className="text-slate-900 dark:text-white leading-relaxed transition-colors duration-300 font-medium">
                              {item.text}
                            </p>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-3 h-40 bg-gradient-to-b from-transparent via-slate-900 to-transparent opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-3 h-40 bg-gradient-to-b from-slate-900 via-transparent to-slate-900 opacity-30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </section>
  );
};

export default Achievements;