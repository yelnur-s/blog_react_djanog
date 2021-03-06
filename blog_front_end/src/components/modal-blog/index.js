import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {errorReset} from '../../store/actions/errorActions'

import { connect } from 'react-redux'
import {getCatgories, getTags, saveArticle} from '../../store/actions/articleActions'
const {Option} = Select

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

const onMount = props => () => {
  props.getCatgories()
  props.getTags()
}
  

function ModalBlog(props) {
  const {modalBlogVisible, close, articleReducer} = props
  const {error} = props.errorReducer
  const [visible, setVisible] = useState(modalBlogVisible)
  const [imageUrl, setImageUrl] = useState(``)
  const [loading, setLoading] = useState(false)
  const {tags, categories, closeAddModal} = articleReducer
  const [formData, setFormData] = useState({
    title: ``,
    description: ``,
    category: null,
    tags: [],
    image: null
  })

  console.log(tags, categories)
  useEffect(() => {
    setVisible(modalBlogVisible)

    if(!modalBlogVisible) {
      props.errorReset()
    }
  }, [modalBlogVisible])


  useEffect(() => {
    if(closeAddModal) {
      setVisible(false)
    }
  }, [closeAddModal])

  useEffect(onMount(props), [])

  const handleOk = () => {
    props.saveArticle(formData)
    // close();
  };

  const onFinish = values => {
    console.log(values);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const categoryChange = value => {
    setFormData({...formData, category: value})
  }

  const tagsChange = value => {
    setFormData({...formData, tags: value})
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const fileChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
          setLoading(false);
          setImageUrl(imageUrl)
      });

      setFormData({...formData, image: info.file.originFileObj})
    }
  }


  return (
    <Modal
        title="Add Blog"
        visible={visible}
        onOk={handleOk}
        onCancel={close}
    >

        <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['blog', 'title']} label="Title" rules={[{ required: true }]}
        validateStatus={error.msg && error.msg.title ? `error` : ``}
        help={error.msg && error.msg.title  ? error.msg.title.join(' ') : ``}
        >
            <Input name="title" value={formData.title} onChange={handleChange}/>
        </Form.Item>
        

        <Form.Item name={['blog', 'category']} label="Category"
        validateStatus={error.msg && error.msg.category ? `error` : ``}
        help={error.msg && error.msg.category  ? error.msg.category.join(' ') : ``}
        >
            <Select onChange={categoryChange} name="category">
              {categories.map(item => (<Option value={item.id}>{item.name}</Option>))}
            </Select>
        </Form.Item>

        <Form.Item name={['blog', 'tags']} label="Tags"
        validateStatus={error.msg && error.msg.tags ? `error` : ``}
        help={error.msg&&error.msg.tags  ? error.msg.tags.join(' ') : ``}
        >
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select multiple tag"
                defaultValue={[]}
                onChange={tagsChange}
                optionLabelProp="label"
                name="tags"
            >
              {tags.map(item => (<Option value={item.id} label={item.name}>
                  <div className="demo-option-label-item">
                      {item.name}
                  </div>
                </Option>))}
            </Select>
        </Form.Item>
        <Form.Item name={['blog', 'description']} label="Description"
        validateStatus={error.msg && error.msg.description ? `error` : ``}
        help={error.msg && error.msg.description  ? error.msg.description.join(' ') : ``}
        >
            <Input.TextArea name="description" value={formData.description} onChange={handleChange}/>
        </Form.Item>
        <Form.Item
           validateStatus={error.msg && error.msg.image ? `error` : ``}
           help={error.msg&&error.msg.image  ? error.msg.image.join(' ') : ``}
        >
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={fileChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Form.Item>
        </Form>
        {error.detail && <span style={{color: `red`}}> {error.detail} <br/></span>} 
    </Modal>
  );
}

const mapStateToProps = state =>({
  articleReducer: state.articleReducer,
  errorReducer: state.errorReducer
})



const mapDispatchToProps = {
  getCatgories,
  getTags,
  saveArticle,
  errorReset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBlog)
