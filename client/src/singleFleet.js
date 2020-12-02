import { useEffect, useState } from "react";
import Axios from "axios";
import {Link, useLocation} from 'react-router-dom'
import TableComp from "./tableComp";
import { Button, TextField } from "@material-ui/core";



export default function SingleFleet() {
    const location = useLocation()
    const defaultFilter ={name:'',flag:'',mmsi:''}
    const [filter,setFilter] =useState(defaultFilter)

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

    const updateFilter = (filterName,value ) =>{
        setFilter({...filter,[filterName]:value })
    }
    const filterVessels= async() =>{
        let jsonBody={}
        jsonBody['_id'] = location.state['_id']
        jsonBody['name'] = filter.name
        setFilter(defaultFilter)
        const response =  await Axios.get('http://localhost:80/fleet/vessels',{params:jsonBody});
        const vessels =response['data']['vessels']
        setVessels(vessels)
    }

    return (
        <div style={{textAlign:'center'}}>
        <form>
        <TextField onChange={ (e) =>updateFilter('name',e.target.value )}  value={filter.name} id="standard-basic" label="Name" />
        <TextField onChange={ (e) =>updateFilter('flag',e.target.value )}  value={filter.flag} id="standard-basic" label="Flag" />
        <TextField onChange={ (e) =>updateFilter('mmsi',e.target.value )} value={filter.mmsi} id="standard-basic" label="MMSI" />
        <Button variant="contained" onClick={ () =>{filterVessels()}} >Filter</Button>

         </form>
            <TableComp headers={headers} rowsData={vessels} />
        </div>
    )

    
     
}
