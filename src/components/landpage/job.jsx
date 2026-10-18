import React from 'react';

function Job() {
  const carousel = [
    {
      id: 1,
      link: '/objects/jug.png',
      text: 'He saw a girl who got sad after breaking the water jug which she used for growing her plants so he boosted her dopamine by repairing the jug'
    },
    {
      id: 2,
      link: '/objects/toy.png',
      text: 'He saw a guy disrespecting his toys so he cracked them with plants to teach him about valuing things to remain happy in life'
    },
    {
      id: 3,
      link: '/objects/flowers.png',
      text: 'He created a flower gift for a widow who remembered how many flowers her late husband would bring to her'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-6 px-6 md:px-12 max-w-6xl mx-auto select-none">
      {/* Badge */}
      <div className="relative inline-flex items-center justify-center w-[140px] h-[56px] flex-shrink-0">
        <div className="bg-[#CA5B5B] w-[130px] h-[48px] rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white text-3xl font-JustM pt-1">Job</span>
        </div>
        <img 
          src="/buttons/buttonsReal.png" 
          alt="" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none brightness-75 opacity-70"
        />
      </div>

      {/* 3 Story Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 my-auto items-stretch">  
        {carousel.map((content) => (
          <div 
            key={content.id}
            className="bg-[#FFFDF6]/70 backdrop-blur-xs border border-[#1E1E1E]/12 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xs hover:shadow-md hover:-translate-y-2 transition-all duration-300 font-JustM"
          >
            {/* Object Image */}
            <div className="h-36 w-36 flex items-center justify-center p-2 mb-4">
              <img 
                src={content.link} 
                alt="Story object"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Description */}
            <p className="text-2xl md:text-3xl text-[#1E1E1E] leading-relaxed flex-1 flex items-center justify-center">
              {content.text}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom spacer for balanced vertical alignment */}
      <div className="h-6 flex-shrink-0" />
    </div>
  );
}

export default Job;