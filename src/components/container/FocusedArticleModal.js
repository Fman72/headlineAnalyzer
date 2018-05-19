import React from 'react';
import {connect} from 'react-redux';

import Modal from 'react-modal';
import {hideFocusedArticlesModal} from "../../../build/actions/modalActions";
import ArticleDiv from "./ArticleDiv";

class FocusedArticleModal extends React.Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.props.dispatch(hideFocusedArticlesModal());
  }

  render(){
    let modalContent = (<div>
      <img className = 'loading-image' src = "images/circle-loading.gif"></img>
    </div>);

    if(this.props.focusedArticles.length > 0)
    {
      modalContent = [];
      this.props.focusedArticles.forEach(article => {
        modalContent.push(<ArticleDiv key = {article.title} article = {article}></ArticleDiv>)
      });
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldFocusAfterRender={true}
        shouldReturnFocusAfterClose={true}
        onRequestClose={this.closeModal}
        overlayClassName={"ReactModal__Overlay row"}
        style={{
          overlay: {
            backgroundColor: 'papayawhip'
          },
          content: {
            backgroundRepeat: 'repeat',
            backgroundSize: '250px 250px',
            background: 'repeating-linear-gradient(-45deg, #D4DCE3 1%, #DBE2EB 1.23%)'
          }
        }}
      >
        {this.props.focusedArticles.length > 0 && <h2>Articles for {this.props.focusedArticles[0].source} on {new Date(this.props.focusedArticles[0].publishedAt).toLocaleDateString()}</h2>}
        {modalContent}
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    focusedArticles: state.focusedArticles,
    isOpen: state.modals.focusedArticles
  };
}

export default connect(mapStateToProps)(FocusedArticleModal);
