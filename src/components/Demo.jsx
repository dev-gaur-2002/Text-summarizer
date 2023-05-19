import React from 'react'
import { useState,useEffect } from 'react'
import {copy,linkIcon,loader,tick} from '../assets'
import {useLazyGetSummaryQuery} from '../services/article'

const Demo = () => {

  const [article,setArticle] = useState({
    url:'',
    summary:''
  })

  const [allArticles, setAllArticles] = useState([])

  const [getSummary , {error,isFetching}] = useLazyGetSummaryQuery()
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    await getSummary({articleUrl:article.url}).then((data)=>{
      const newArticle = {...article,summary:data.data.summary}
      const updatedAllArticles = [newArticle, ...allArticles];
      
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      console.log(article)
      console.log("done");
    }).catch((err)=>{
      console.log(err)
    });

  }

  useEffect(()=>{
    setArticle(article);
    setAllArticles(allArticles);
    console.log('article' , article , 'all articles' , allArticles) // testing
  },[article,setArticle,allArticles,setAllArticles])


  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        {/* input for URL */}
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5' />
          <input 
          type="url"
          placeholder='Enter a URL'
          value={article.url}
          required
          onChange={(e)=>{setArticle({
            ...article,
            url:e.target.value
          })}}    
          className = 'url_input peer'      
          />
          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
          ↵
          </button> 
        </form>

        {/*  History Logs */}

      </div>

        {/*  Display summarized text */}

    </section>
  )
}

export default Demo