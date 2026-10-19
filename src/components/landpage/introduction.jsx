import React from 'react';

function Introduction() {
    const text = [{ id: 1, question: 'What am I', answer: 'Picassio is a creature of canvas who has been asked by god to look after people of earth' }, { id: 2, question: 'Personality', answer: 'Anxious and depressed' }, { id: 3, question: 'Profession', answer: 'Dopamine Manager' }];

    return (
        <div className='flex flex-col items-center justify-between h-full py-6 font-JustM text-4xl select-none'>
            <div className='relative text-center h-[60px] w-[140px] mt-3 top-20'>
                <div className='bg-[#CA5B5B] h-[50px] pt-1.5 mt-1 rounded-4xl w-[130px] relative left-1'>
                    <h1 className='text-white  text-3xl'>Picassio</h1>
                </div>
                <img src='/buttons/buttonsReal.png' className='absolute inset-0 w-full h-full brightness-40' alt="">
                </img>
            </div>

            <div className='flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-center my-auto max-w-5xl px-6'>
                <div className='h-[260px] md:h-[300px] w-[210px] md:w-[240px] flex items-center justify-center flex-shrink-0'>
                    <img src='/creature/pencil.png' alt="Picassio" className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"></img>
                </div>

                <div className='flex flex-col gap-3 max-w-xl text-center md:text-left'>
                    {text.map((content) => {
                        return <div key={content.id}>
                            <div className="text-3xl md:text-4xl">{content.question}</div>
                            <div className='text-[#3903FF] text-3xl md:text-4xl'>{content.answer}</div>
                        </div>
                    })}
                </div>
            </div>

            <h1 className='text-center px-4'>"The worth of light is known only through a wander in the dark"</h1>
        </div>
    );
}

export default Introduction;