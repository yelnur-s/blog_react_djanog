import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import '../../App.css';
import { Row, Col, Card, Button, Tag } from 'antd';
import ModalBlog from '../../components/modal-blog'
import Header from '../../components/header';
import {getArticles} from '../../store/actions/articleActions'
import './main.css';

const { Meta } = Card;

const onMount = props => () => {
  props.getArticles()
}


function Main(props) {
  const [modalBlogVisible, setModalBlogVisible] = useState(false)

  const openModal = () => {
    setModalBlogVisible(true)
  }

  const closeModal = () => {
    setModalBlogVisible(false)
  }

  useEffect(onMount(props), [])


  console.log("Hello!", props.articleReducer)
  const {articles} = props.articleReducer

  const articlesList = articles.map(item => (
            <Col span={12}>
                  <Card
                  hoverable
                 className="blog-item"
                  cover={<img alt="example" src={item.image || '/images/2.jpg'} />}
                >
                  <Meta className="card-meta" title={item.title} description={item.description} />
                  {item.tags.map(tag => (<Tag>{tag.name}</Tag>))}
                </Card>
              </Col>
  ))

  return (
    <div>
      
      <Header />
      <div className="bg-img">
          <div className="bg-img--content">
            <p className="bg-img--date">26, July, 2020</p>
            <p className="bg-img--title"> Top 10 films on kinopoisk</p>
          </div>
      </div>

    <div className="container container-inner">
        <Row>
          <Col span={18}>

            <Row>
              {articlesList}
            </Row>
           
          </Col>
          <Col span={6}>
            <Button className="add-new" type="primary" block size="large" onClick={openModal}>
                    Write new Blog
            </Button>
            <Card title="About Me"  style={{ width: `100%` }}  cover={<img alt="example" src="/images/3.jpg"/>}>
            <Meta title="Europe Street beat" description="This all about my self" />
            </Card>
          </Col>
        </Row>
      </div>

      <ModalBlog modalBlogVisible={modalBlogVisible} close={closeModal}/>
    </div>
  );
}

const mapStateToProps = state =>({
  articleReducer: state.articleReducer
})

const mapDispatchToProps = {
  getArticles,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
