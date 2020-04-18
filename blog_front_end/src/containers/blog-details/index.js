import React from 'react';
import '../../App.css';
import {Card } from 'antd';
import Header from '../../components/header'


const { Meta } = Card;

function BlogDetails() {
  

  return (
    <div>
      <Header/>
      <div className="container container-inner">
        <Card
          hoverable
        className="blog-item"
          cover={<img alt="example" src="/images/2.jpg" />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </div>
    </div>
  );
}

export default BlogDetails;
