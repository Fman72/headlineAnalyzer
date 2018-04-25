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
      >
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
