import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoBookmarksOutline } from "react-icons/io5";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import Footer from "../../components/Footer/Footer";
import PeopleList from "../../components/PeopleList/PeopleList";
import TopicsToFollow from "../../components/TopicsToFollow/TopicsToFollow";
import articles from "./articles.json";
import "./styles.scss";

export default class Home extends Component {
  state = {
    articles: [],
  };

  fetchArticles = async () => {
    try {
      let response = await fetch("http://localhost:3000/articles");
      if (response.ok) {
        let results = await response.json();
        console.log(results);
        this.setState({ articles: [...results, ...results, ...results] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    alert("okß");
    console.log("finished mounting");
    this.fetchArticles();
  };

  render() {
    return (
      <div>
        {this.state.articles.length > 0 && (
          <Container>
            <Row
              className={"row-cols-lg-3 pb-4"}
              style={{ borderBottom: "1px solid rgba(230, 230, 230, 1)" }}
            >
              <Col>
                <ArticleListItem
                  article={this.state.articles[0]}
                  articleImg={"top"}
                  headingFont={"large"}
                  subheading
                />
              </Col>

              <Col className={"flex-column w-100"}>
                {this.state.articles.slice(0, 4).map((article) => (
                  <ArticleListItem
                    articleImg={"left"}
                    headingFont={"small"}
                    article={article}
                  />
                ))}
              </Col>

              <Col>
                <PeopleList />
                <TopicsToFollow />
              </Col>
              <Col className={""}>{/*<TagsList />*/}</Col>
            </Row>
            <Row className={"py-4 mt-4"}>
              <Col className={"col-lg-8 pr-5 pl-2"}>
                {this.state.articles.slice(0).map((article) => (
                  <ArticleListItem
                    articleImg={"left"}
                    headingFont={"large"}
                    subheading
                    article={article}
                  />
                ))}
              </Col>
              <Col className={"col-lg-4 "}>
                <div
                  className={"flex-column py-4 px-4 w-100"}
                  style={{ backgroundColor: "rgb(250, 250, 250)" }}
                >
                  <div className={"mb-4 title"}>
                    {" "}
                    <IoBookmarksOutline style={{ fontSize: 20 }} />{" "}
                    <span className={"ml-2"}>READING LIST </span>
                  </div>
                  {this.state.articles.slice(0, 3).map((article) => (
                    <ArticleListItem headingFont={"small"} article={article} />
                  ))}
                </div>
                <Footer />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
