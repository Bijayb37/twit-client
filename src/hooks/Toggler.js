import { useState } from 'react'

export default function Toggler(initialValue) {
    const [booleanValue, setBooleanValue] = useState(initialValue)

    const toggle = () => {
        setBooleanValue(prev => !prev)
    }
    
    return [booleanValue, toggle]
}