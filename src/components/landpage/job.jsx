import React from 'react'

function Job() {
    const carousel=[{id:1,link:'/objects/jug.png',text:'He saw a girl who got sad after breaking the water jug which she used for growing her plants so he boosted her dopamine by repairing the jug'}
        ,{id:2,link:'/objects/toy.png',text:'He saw a guy disrespecting his toys so he cracked them with plants to teach him about valuing things to remain happy in life '},
        {id:3,link:'/objects/flowers.png',text:'He created a flower gift for a widow who remembered how many flowers her late husband would bring to her'}
    ]
  return (
    <>
    <div className='flex flex-col items-center font-JustM text-4xl h-200 gap-40 pt-10'>
       <div className='relative  text-center h-[60px] w-[140px] mt-3 mr-4'>
            <div className='bg-[#CA5B5B] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
<h1 className='text-white text-3xl'>Job</h1>
            </div>
        <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40'>
        </img>
        </div>
         <div className='flex gap-20'>  
            {carousel.map((content)=>{
                return <div  className='flex flex-col gap-8 justify-center items-center text-center' key={content.id}>
                    <div className='h-40 w-40 text-center border border-red-500'>
                    <img src={content.link} />
                    </div>
                    <h1>{content.text}</h1>
                    </div>
            })}
         </div>
    </div>
    </>
  )
}

export default Job;