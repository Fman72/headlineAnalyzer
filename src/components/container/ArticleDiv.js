import React from "react";

class ArticleDiv extends React.Component{
  constructor(props){
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {hovered : false};
  }

  handleMouseOver(){
    console.log("on");
    this.setState({hovered : true});
  }

  handleMouseOut(){
    console.log("out");
    this.setState({hovered : false});
  }

  render(){
    if(this.state.hovered)
    {
      return (
        <div onMouseOver = {this.handleMouseOver} onMouseOut = {this.handleMouseOut} className = {'article-div col-md-2'} style = {{zIndex: 10}}>
          <div className = {'top-div'}>
            {this.props.article.title}
          </div>
          <div className={"description-div"}>
            "{this.props.article.description}"
          </div>
          <div className={"middle-div"}>
            {this.props.article.publishedAt}
          </div>
          <div className={"sentiment-div"}>
            Title Sentiment: {this.props.article.titleSentiment}<br/>
            Description Sentiment: {this.props.article.descriptionSentiment}
          </div>
        </div>
      );
    }

    return (
      <div onMouseOver = {this.handleMouseOver} onMouseOut = {this.handleMouseOut} className = {'article-div col-md-2'}>
        <div className = {'top-div'}>
          {this.props.article.title}
        </div>
        <div className={"middle-div"}>
          {this.props.article.publishedAt}
        </div>
        <div className={"sentiment-div"}>
          Title Sentiment: {this.props.article.titleSentiment}<br/>
          Description Sentiment: {this.props.article.descriptionSentiment}
        </div>
      </div>
    );
  }
}

export default ArticleDiv;