import React from "react"
import SPflag from "./assets/sp-flag.png"
import FRflag from "./assets/fr-flag.png"
import JPflag from "./assets/jpn-flag.png"

export default function Content() {

    const [formData, setFormData] = React.useState({
        text: "",
        lang: ""
    })
    
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [answer, setAnswer] = React.useState("")
    
    function handleChange(e){
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value 
            }
        })
    }
    
    async function gpt() {
        const messages = [
                {
                    role: "system",
                    content: "You are an excellent translator, only provider answers without other description"
                },
                {
                    role: "user",
                    content: `Translate ${formData.text} in ${formData.lang}`
                }
            ]
            
        // const completion = await openai.chat.completions.create({
        //         model: 'gpt-3.5-turbo',
        //         messages: messages
        //     })
        
        try {
            const url = "https://bold-dawn-1201.celery1206.workers.dev/"

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(messages)
            })
            if(!response.ok){
                throw new Error(`Worker Error: ${data.error}`)
            }
            const data = await response.json()
            // console.log(data)
            setAnswer(data)
        } catch(err) {
            console.error(err.message)

        }
        
        
    }
    
    function clearInput(){
        setFormData({
            text:"",
            lang:""
        })
        setAnswer("")
    }
    
    React.useEffect(() => {
        if(isSubmit){
            gpt()
        }
        if(!isSubmit){
            clearInput()
        }
    }, [isSubmit])
    
    function handleSubmit(e){
        e.preventDefault()
        setIsSubmit(prev => !prev)

    }


    return (
        <main> 
            <form onSubmit={handleSubmit}>
                <h2>Text to translate 👇</h2>
                <textarea 
                    id="input-text" 
                    rows="3" 
                    required
                    onChange={handleChange} 
                    name="text"
                    value={formData.text}
                    ></textarea>
                
                {isSubmit ? 
                    <div className="output">
                        <h2>Your translation 👇</h2>
                        <p className="answer">{answer}</p>
                    </div>
                : <div>
                    <h2>Select language 👇</h2>
                    <div className="input-lang">
                        <label htmlFor="french">
                            <input type="radio" id="french" name="lang" value="french" onChange={handleChange} checked={formData.lang === "french"}/>
                                French <img src={FRflag} />
                        </label>
                        <label htmlFor="Spanish">
                            <input type="radio" id="Spanish" name="lang" value="spanish" onChange={handleChange} checked={formData.lang === "spanish"}/>
                            Spanish <img src={SPflag} />
                        </label>
                        <label htmlFor="japanese">
                            <input type="radio" id="japanese" name="lang" value="japanese" onChange={handleChange} checked={formData.lang === "japanese"}/>
                            Japanese <img src={JPflag} />
                        </label>
                    </div>
                </div>}
                <button>{isSubmit? "Start Over" : "Translate"}</button>
            </form>
            
        </main>
    )
}