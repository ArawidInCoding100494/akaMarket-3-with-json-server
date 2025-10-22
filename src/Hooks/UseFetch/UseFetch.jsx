import { useEffect, useState } from "react"

const UseFetch = (url) => {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        const getData = async () =>{
            try{
                const res = await fetch(url)
                if(!res.ok) throw new Error("serverda xatolik!")
                const result = await res.json()
                setData(result)

            }catch (err) {
                    setError(err.message)
                    setisLoading(false)
            }
        }

        getData()

    }, [url])

  return {data, isLoading, error, setData}
}

export  {UseFetch}