import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PropTypes from 'prop-types'

class CommentApp extends Component {
    static propTypes = {
        onSubmit:PropTypes.func
    }
    constructor(){
        super()
        this.state={
            username:'',
            content:''
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    _loadUsername(){
        const username = localStorage.getItem('username')
        if(username){
            this.setState({username})
        }
    }

    componentDidMount() {
        this.textarea.focus()
    }

    _saveUsername(username){
       localStorage.setItem('username',username)
    }

    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }

    handleUsernameChange(event){
        this.setState({
            username:event.target.value
        })
    }

    handleContentChange(event){
        this.setState({
            content:event.target.value
        })
    }

    handleSubmit(){
        //if pass in onSubmit
        if(this.props.onSubmit){
            this.props.onSubmit({
                username: this.state.username,
                content:this.state.content,
                createdTime:+new Date()
            });
        }
        //use setStates to clear user input, but keep the user name to ensure
        //user experience
        this.setState({content:''})
    }


    render(){
        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>Username</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                               onBlur={this.handleUsernameBlur.bind(this)}
                               onChange={this.handleUsernameChange.bind(this)}/>

                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>Message</span>
                    <div className='comment-field-input'>
                        <textarea ref={(textarea)=> this.textarea=textarea}
                                  value={this.state.content}
                                  onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}
                    >Submit</button>
                </div>
            </div>
        )
    }
}

export default CommentApp;
