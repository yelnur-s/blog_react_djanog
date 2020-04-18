import React, {useEffect} from 'react';
import '../../App.css';
import {Card } from 'antd';
import Header from '../../components/header'
import {withRouter} from 'react-router-dom'
import {getArticle} from '../../store/actions/articleActions'
import { connect } from 'react-redux'

const { Meta } = Card;

const onMount = props => () => {
  props.getArticle(props.match.params.id)
}

function BlogDetails(props) {
  console.log("BLOG ID: ", props.match.params.id)

  const {article} = props.articleReducer
  useEffect(onMount(props), [])

  return (
    <div>
      <Header/>
      <div className="container container-inner">
        <Card
          hoverable
        className="blog-item"
          cover={<img alt="example" src={article.image || `/images/2.jpg`} />}
        >
          <Meta title={article.title} description={article.description} />

          Tags: {article.tags && article.tags.map(item => (<span>{item.name}</span>))} <br/>
          Category: {article.category && article.category.name}<br/>
          Author: {article.author && article.author.username}
        </Card>
      </div>
    </div>
  );
}


const mapStateToProps = state =>({
  articleReducer: state.articleReducer
})

const mapDispatchToProps = {
  getArticle,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BlogDetails))
