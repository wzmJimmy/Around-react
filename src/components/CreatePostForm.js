import React ,{Component} from 'react';
import {Form,Icon,Input,Upload} from 'antd';

const FormItem = Form.Item
class innerCreatePostForm extends Component{

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    beforeUpload = () => {
        return false;
    }


    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return(
            <Form layout="vertical"> 
                <FormItem {...formItemLayout} label="Message"> 
                    {getFieldDecorator('message', { 
                        rules: [{ required: true, message: 'Please input Message!' }], 
                    })(
                         <Input/>
                    )} 
                    </FormItem>

                <FormItem {...formItemLayout} label="Image">

                    <div className="dropbox">
                        {getFieldDecorator('Image', {
                            rules: [{ required: true, message: 'Please upload image!' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem> 
            </Form>
        )
    }
}

export const CreatePostForm = Form.create()(innerCreatePostForm);