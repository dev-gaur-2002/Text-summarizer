import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getSummary({ articleUrl: article.url })
      .then((data) => {
        const newArticle = { ...article, summary: data.data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        // console.log(article)
        // console.log("done");

        localStorage.setItem("articles", JSON.stringify(updatedAllArticles)); //secding item to localstorage for reload
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 300);
  };

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      console.log("yes");
      console.log(articlesFromLocalStorage);
      setAllArticles(articlesFromLocalStorage); // execute??
    } else {
      console.log("no");
    }

    // setArticle(article);
    // setAllArticles(allArticles);
    console.log("article", article, "all articles", allArticles); // testing
  }, []);

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        {/* input for URL */}
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            required
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/*  History Logs */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  Display summarized text */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loading..." />
        ) : error ? (
          <p>Oops!! that was not supposed to happen .. Please try again !</p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-2">
              <h2>
                Aricle <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium  text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
