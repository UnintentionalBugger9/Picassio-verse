import React from "react";

function FirstPage(){
    return(
        <>
        <div className=" relative left-210 top-50 font-JustM flex flex-col h-50 w-160  gap-7 justify-center items-center">
            <div className="text-5xl">
                The Story of Happiness Through Empathy
            </div>
            <div className="flex gap-3 text-[#FF4EA4] text-4xl cursor-pointer">
                <h1 >Get Started</h1>
                <h1 className="pt-0.3 ">➤</h1>
            </div>
        </div>
        <img src='/landpage/hero.png'></img>
        </>
    )
}

export default FirstPage;