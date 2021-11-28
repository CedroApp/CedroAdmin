import { useEffect } from 'react'

import './options.css'

export default function Options({ options, setOptions }) {
    
    useEffect(()=>{
        console.log("oiii")
    }, [])

    return(
        <div className="options-create-container">
            {
                options.map((option, i) => {
                    return (
                        <input placeholder={`Opção ${i+1}`} type="text" className="input input-distance" value={option} onChange={e => {
                            let optionsArray = options
                            optionsArray[i] = e.target.value
                            setOptions([...optionsArray])
                        }} />
                    )
                })
            }
        </div>
    )
}