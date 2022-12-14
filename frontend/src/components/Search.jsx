import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from './Spinner';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import { feedQuery, searchQuery } from '../utils/data';


const Search = ({ searchTerm }) => {
  const [pins,setPins]=useState()
  const [loading, setLoading]=useState(false)
useEffect(()=>{
if(searchTerm!==""){
  setLoading(true)
  const query=searchQuery(searchTerm.toLowerCase())
  client.fetch(query).then((data)=>{
    setPins(data);
    setLoading(false) 
  })
} else {
  client.fetch(feedQuery).then((data)=>{
  setPins(data);
  setLoading(false)
  })
}

},[searchTerm]
)



  return (
    <div>
      {loading && <Spinner message="Wait for Loading..."/>}
      {pins?.length !==0 && <MasonryLayout pins={pins}/>}
    {pins?.length ===0 && searchTerm!=="" && !loading &&(
        <div className="mt-10 text-center text-xl">No Pins!</div>
      )}


    </div>
   
  )
}

export default Search