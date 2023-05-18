import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
      <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>

          <img src={logo} alt="logo_text_summarizer" className='w-28  object-contain'/>

          <button type='button' className='black_btn' onClick={()=>{
            window.open('https://github.com/dev-gaur-2002/Text-summarizer');          
          }}>
            Source Code
          </button>
        </nav>

        <h1 className='head_text'> 
          Summarize Articles with <br className='max-md:hidden'/>
          <span className='orange_gradient'>OpenAi GPT-4</span>
        </h1>

        <h2 className='desc'>
          Bored of reading lengthy articles ? Try Sumz that summarizes them into short, clear and consize summaries.
        </h2>
      </header>
  )
}

export default Hero