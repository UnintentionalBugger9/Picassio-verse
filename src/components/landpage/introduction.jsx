import React from 'react';

function Introduction() {
    const text=[{id:1,question:'What am I',answer:'Picassio is a creature of canvas who has been asked by god to look after people of earth'},{id:2,question:'Personality',answer:'Anxious and depressed'},{id:3,question:'Profession',answer:'Dopamine Manager'}];

  return (
   <div className='flex flex-col items-center justify-between h-full py-6 font-JustM text-4xl select-none'>
        <div className='relative text-center h-[60px] w-[140px] mt-3'>
            <div className='bg-[#CA5B5B] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
                <h1 className='text-white text-3xl'>Picassio</h1>
            </div>
            <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40' alt="">
            </img>
        </div>

        <div className='flex gap-16 md:gap-20 items-center justify-center my-auto'>
            <div className='h-[300px] w-[230px] flex items-center justify-center'>
                <img src='/creature/pencil.png' alt="Picassio" className="max-h-full max-w-full object-contain"></img>
            </div>

            <div className='flex flex-col gap-3'>
                {text.map((content)=>{
                    return <div key={content.id}>
                        <div>{content.question}</div>
                        <div className='text-[#3903FF]'>{content.answer}</div>
                    </div>
                })}
            </div>
        </div>

        <h1 className='text-center px-4'>"To know the worth of happiness you must feel sadness"</h1>
   </div>
  );
}

export default Introduction;