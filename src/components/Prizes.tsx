import React, { useEffect, useState } from 'react';
import { FiAward, FiDollarSign } from 'react-icons/fi';

const Prizes: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('[data-section="prizes"]');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const prizeCategories = [
    {
      title: 'AoPS Coupons',
      subtitle: 'Art of Problem Solving',
      totalCoupons: 6,
      couponValue: 25,
      logo: '/AoPS.png',
      gradient: 'from-blue-500 to-blue-600',
      prizes: [
        { category: 'Top 5 Competitors', count: 5, description: 'Highest scoring participants' },
        { category: 'Top 1 Ambassador', count: 1, description: 'Best performing ambassador' }
      ]
    },
    {
      title: 'PhysOlymp Coupons',
      subtitle: 'Physics Olympiad Guide',
      totalCoupons: 10,
      couponValue: 80,
      logo: '/physolymp.png',
      gradient: 'from-purple-500 to-purple-600',
      prizes: [
        { category: 'Top 8 Competitors', count: 8, description: 'Highest scoring participants' },
        { category: 'Top 3 Ambassadors', count: 3, description: 'Best performing ambassadors' }
      ]
    },
    {
      title: 'Wolfram Accounts',
      subtitle: 'Wolfram Research',
      totalCoupons: 10,
      couponValue: 1660,
      logo: '/Wolfram.png',
      gradient: 'from-red-500 to-red-600',
      prizes: [
        { category: 'Top 10 Competitors', count: 10, description: 'One-year Wolfram accounts ($1660 each)' }
      ],
      specialNote:
        'Bonus: 3-month Wolfram accounts for all competitors when the event is limited to fewer than 1,200 participants — bringing the total prize pool to $300,000.'
    }
  ];

  // Fixed total prize pool for display
  const totalValue = 300000;

  return (
    <section
      className="relative py-20 lg:py-32 bg-white dark:bg-phiga-gray-900 overflow-hidden"
      data-section="prizes"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-6"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out'
            }}
          >
            <FiAward className="text-yellow-600 dark:text-yellow-400" size={20} />
            <span className="text-yellow-800 dark:text-yellow-300 font-semibold">
              Competition Prizes
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-heading font-black mb-6 text-phiga-main dark:text-white"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out 0.1s'
            }}
          >
            Win Amazing Prizes
          </h2>

          {/* Total Prize Pool */}
          <div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg mb-4"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out 0.2s'
            }}
          >
            <FiDollarSign size={24} />
            <span>${totalValue.toLocaleString()} Total Prize Pool</span>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300 max-w-2xl mx-auto"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s ease-out 0.3s'
            }}
          >
            Prize pool reaches $300,000 when the bonus tier is unlocked for events limited to fewer than 1,200 participants.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prizeCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-white dark:bg-phiga-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-phiga-gray-700"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.6s ease-out ${0.4 + index * 0.1}s`
              }}
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={category.logo}
                    alt={category.subtitle}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-2">
                  {category.title}
                </h3>

                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${category.gradient} text-white px-4 py-2 rounded-lg font-semibold`}>
                  <span>
                    {category.totalCoupons} × ${category.couponValue} = $
                    {(category.totalCoupons * category.couponValue).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {category.prizes.map((prize, prizeIndex) => (
                  <div key={prizeIndex} className="bg-gray-50 dark:bg-phiga-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-phiga-main dark:text-white">
                          {prize.category}
                        </h4>
                        <p className="text-sm text-phiga-gray-600 dark:text-phiga-gray-300">
                          {prize.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-phiga-accent">
                          {prize.count}
                        </div>
                        <div className="text-xs text-phiga-gray-500">
                          {category.title.includes('Wolfram') ? 'accounts' : 'coupons'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {category.specialNote && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                      {category.specialNote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="text-center mt-12"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out 0.6s'
          }}
        >
          <div className="bg-gray-50 dark:bg-phiga-gray-800 rounded-xl p-6 max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-2">
              Ready to Win?
            </h3>
            <p className="text-phiga-gray-600 dark:text-phiga-gray-300 mb-4">
              Compete for educational prizes worth up to $300,000.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
              <FiAward size={18} />
              <span>29 Total Winners • Top Competitors & Ambassadors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
