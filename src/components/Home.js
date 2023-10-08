import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "./NewsItem";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import UserService from "../services/user.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const getInitialDate =(addOrSubDay)=> {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() +addOrSubDay,
    );
  }
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const [articlefeeder, setArticlefeeder] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dateFrom, setDateFrom] = useState(getInitialDate(-7));
  const [dateTo, setDateTo] = useState(getInitialDate(2));

  useEffect(() => {
    UserService.getPublicContent(isLoggedIn, keyword).then(
      (response) => {
        setArticles(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    var startDate = new Date(dateFrom).toISOString().slice(0, 10);
    var endDate = new Date(dateTo).toISOString().slice(0, 10);
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    const filteredarticle = articles
      .filter((article) => {
        return article.title.includes(keyword);
      })
      .filter(function (date) {
        return date.publish_date >= startDate && date.publish_date <= endDate;
      });

    console.log(filteredarticle);
    setArticlefeeder(filteredarticle);
  }, [articles, keyword, dateFrom, dateTo]);
  const onChangeKeyword = (e) => {
    const val = e.target.value;
    setKeyword(val);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    UserService.getPublicContent(isLoggedIn, keyword).then(
      (response) => {
        setArticles(response.data.data);
        // console.log(response.data)
      },
      (error) => {
        console.log(error);
      }
    );
  };
  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div className="container my-3">
        <h1 style={{ marginTop: "90px" }} className="text-center">
          Top Headlines
        </h1>
        <>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search with key word"
              aria-label="RSearch with key word"
              aria-describedby="basic-addon2"
              value={keyword}
              onChange={onChangeKeyword}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </InputGroup>
        </>

        <div>
          <div class="row">
            <div className="col-md-2">
              <div className="form-group">
                <label>From</label>
                <div class="input-group">
                  <DatePicker
                    className="form-control"
                    selected={dateFrom}
                    onChange={(date) => setDateFrom(date)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label>To</label>
                <div className="input-group">
                  <DatePicker
                    className="form-control"
                    selected={dateTo}
                    onChange={(date) => setDateTo(date)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {this.state.loading && <Spinner />} */}

        <div className="container">
          <div className="row">
            {articlefeeder.map((element) => {
              return (
                <div key={element.url} className="col-md-4">
                  <NewsItem
                    author={element.author}
                    date={element.publish_date}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgUrl={element.image_url}
                    newsUrl={element.url}
                    source={element.source}
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
