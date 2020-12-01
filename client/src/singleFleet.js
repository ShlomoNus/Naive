import { useEffect, useState } from "react";
import Axios from "axios";
import {Link, useLocation} from 'react-router-dom'
import TableComp from "./tableComp";



export default function SingleFleet() {
    const location = useLocation()
    const headers=['name','mmsi', 'imo',  'flag', 'vessel_class', 'size', 'number_of_blips']
    const [vessels,setVessels]=useState([])
    useEffect( () =>{
        const getVessels = async() =>{
            const _id = location.state['_id']
           const vessels= await Axios.get(`http://localhost:80/fleet/${_id}`);
            setVessels(vessels.data['vessels'])
        }
        getVessels()
    },[])


    return (
        <div style={{width:'100%',height:'100%'}}>
            <TableComp headers={headers} rowsData={vessels} />
        </div>
    )

    
     
}
