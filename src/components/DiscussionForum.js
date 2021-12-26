import React from "react";


import DiscussionBoard from 'react-discussion-board'

import 'react-discussion-board/dist/index.css'
import axios from "axios";




const eventBaseUrl = "http://localhost:8080/forum/discussions";
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
class DiscussionForum extends React.Component {
  state = {
    allPosts: []
   };

   componentWillMount(){
    const {
      allPosts
    } = this.state;
    axios.get(eventBaseUrl).then((res) => {
      const postArray=[];
      res.data.map((index)=>{
        postArray.push({name:index.username,content:index.text, date:new Date(index.time)})
      })
      this.setState({allPosts:postArray})
    });
   }

    submitPost = (text) => {
      const {
        allPosts
      } = this.state;
     
      let current_datetime = new Date()
      let currentHours = current_datetime.getHours();
      currentHours = ("0" + currentHours).slice(-2);
      let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()]+" "+ current_datetime.getFullYear() + " "+  currentHours + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
      console.log(formatted_date)
      const finalDate = new Date(formatted_date);
      console.log('finalDate',finalDate)
    this.setState({allPosts:[...allPosts,{name:'bala',content:text,date:finalDate}]})
    const params = {
       text:text,
       username:'bala',
       userId:'123',
       time:finalDate
    }

    axios.post(eventBaseUrl,params).then((res) => {
     console.log(res);
    });
  }

  render(){
   const{allPosts} = this.state;
    return (
      <div className='App' style={{'margin-top':'36px'}}>
        <DiscussionBoard posts={allPosts} onSubmit={this.submitPost} />
      </div>
    )

  }
}

export default DiscussionForum