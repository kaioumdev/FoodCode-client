import React, { useEffect, useState } from 'react'

const useMenu = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('menu.json')
       .then(res => res.json())
       .then(data => {
           setMenu(data)
           setLoading(false)
       })
       .catch(error => {
           setError(error)
           setLoading(false)
       })
    }, [])

    return [menu, loading, error]
}

export default useMenu