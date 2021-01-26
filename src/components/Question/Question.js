import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Question.css'

const initQuestionState = { name: '' }
const showQuestionState = { questionShown: true }

const Question  = () => {
    const [userName, setUserName] = useState(initQuestionState)
    const [questionState, setQuestionState] = useState(showQuestionState)
   
    const showGreeting = () => {
        setQuestionState({
            questionShown: false
        })
    }
    const handleInputChange = e => {
        const {name, value} = e.target
        setUserName({...userName, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userName.name)
        showGreeting()
    }
    return (
        <div className='question'>
        { 
            questionState.questionShown
            ? ( <form id='questionForm' onSubmit={handleSubmit}>
                    <label>What is your name?
                        <br />
                        <input type='text' id='nameField' name='name' placeholder='name' value={userName.name} required onChange={handleInputChange}/>
                    </label>
                    <br />
                    <input type="submit" id='submitBtn' value="SUBMIT NAME" />
                </form>)
            : ( <div className='greetingsYall'>
                    <p>Welcome, {userName.name}!</p>
                    <Link to='/notes'>Let's write some notes! CLick Me!</Link>
               </div>)
        }
        </div> 
    )
}

export default Question
