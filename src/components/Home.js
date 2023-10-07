import React, { useState, useEffect } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log(response.data.data);
        setArticles(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div className="container my-3">
        <h1 style={{marginTop:'90px'}} className="text-center">NewsZilla - Top  Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        
        <div className="container">
        <div className="row">
        
          {articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4">
                  <NewsItem
                    author={element.author}
                    date={element.publish_date}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
      
              );
            })}
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default Home;