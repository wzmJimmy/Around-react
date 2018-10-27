import React ,{Component} from 'react';
import {Button,Modal,message} from 'antd';
import {CreatePostForm} from "./CreatePostForm";
import {API_ROOT, AUTH_PREFIX, KEY, POS_KEY,random} from "../util/constant";
import $ from 'jquery';

export class CreatePostButton extends Component{
    state = { visible: false,confirmLoading: false }

    showModal = () => {
        this.setState({
            visible: true,
            confirmLoading: false,
        });
    }

    handleOk = () => {
        this.setState({ confirmLoading: true });
        this.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                const {lat, long} = JSON.parse(localStorage.getItem(POS_KEY));
                const formData = new FormData();
                formData.set('lat', lat + random());
                formData.set('lon', long + random());
                formData.set('message', values.message);
                formData.set('image', values.Image[0].originFileObj);

                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(KEY)}`,
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                 }).then((response) => {
                    message.success('Created a post successfully!');
                    this.form.resetFields();
                    this.setState({ visible: false, confirmLoading: false });
                    this.props.loadNearbyPosts();
                }, (response) => {
                    message.error(response.responseText);
                    this.setState({ visible: false, confirmLoading: false });
                }).catch((error) => {
                    console.log(error);
                });
            }
        });

    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    saveFormRef = (form)=>{
        this.form = form;
    }
    render(){
        return(
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create new post
                </Button>
                <Modal
                    title="Create new post"
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Create"
                >
                    <CreatePostForm ref={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }

}