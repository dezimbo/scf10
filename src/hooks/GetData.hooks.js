import { useState, useEffect } from 'react';
import axios from "axios";



export const useGetData = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [addeded, setAddeded] = useState(false);
    const updateOnClose = () => setAddeded(!addeded);
    useEffect(() => {
        const fetchData = async() => {
            await axios.get('https://scf10.herokuapp.com/api/order', {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((res) => {
                    setData(res.data.order)
                    setIsLoaded(true)
                })
                .catch(err => console.log(err))
        }
        fetchData();
    }, [addeded])
    return { data, isLoaded, updateOnClose }


}