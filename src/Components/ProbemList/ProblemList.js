import React from "react";
import axios from 'axios';

import Card from './Component/Card';
import Spinner from './Component/Spinner';
import Dropdown from './Component/Dropdown';
import Checkbox from './Component/Checkbox';

class ProblemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      level:''
    }
  }

  componentDidMount() {
    axios.post('http://54.198.168.63/getData/',{
      "type" : "list",
      "tags" : ["String"],
      'level': 'E'
    })
      .then(reponse => {
        console.log(reponse.data.map(d => console.log(d)))
        this.setState(
          { questions:reponse.data }
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate(prevProps, prevState){
    console.log(this.state.questions)
    if (prevState.level !== this.state.level){
        console.log('required new request')
        axios.post('http://54.198.168.63/getData/',{
      "type" : "list",
      "tags" : ["String"],
    })
      .then(reponse => {
        console.log(reponse.data)
        this.setState(
          { questions:reponse.data.filter(question => question.level === this.state.level)}
        )
      })
      .catch(error => {
        console.log(error)
      })

    }else {
      console.log('do not required request')
  }
  } 


  render(){
    const {questions} = this.state;
    return (
      <div>
        <h1 className="container" style={{textAlign:'center', marginTop: '4%'}}>Problem List</h1>
        <Dropdown onChange={value => this.setState(
          { level:value }
          )}/>
          <Checkbox/>
        {
          questions.length ? 
          questions.map(question => <div style={ { fontSize:30,marginTop:'10%',marginLeft:'10%' }} key={question.id}>
            <Card id={question.id} title={question.level} description={question.description}/>
            </div>
            ):<div style={{display:'flex', justifyContent: 'center', marginTop: '5%'}}><Spinner/></div>
          }


      </div>
    )
  }
}
export default ProblemList;
