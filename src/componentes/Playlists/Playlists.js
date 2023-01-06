import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"
import { Header } from "../Header/Header";

function Playlists(props) {
    const [playlists, setPlaylists] = useState([])
 const [searchPlalistValue,setSearchPlalistValue]= useState('')
 const [novaPlaylist, setNovaPlaylist] = useState("")



 const config={
    headers:{
        Authorization:"everton"
    }
}


const handleChange=(event)=>{
    const {target}= event ;
    setSearchPlalistValue(target.value)
}

const getPlaylist = async (event)=>{
    event.preventDefault()
    const playlistName= event.target.namePlaylist.value
    const url= `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${playlistName}`

try{
  const response= await axios.get(url,config)
  const result=(response?.data?.result?.playlist)
  //  verificação para ver se a playlist que tem é igual a que foi digitada
      const playlistFiltradas= playlists.filter((playlist,index)=> playlist.name=== result[index]?.name)
      setPlaylists(playlistFiltradas)
}
catch(erro){
alert (erro)
}}



const getAllPlaylists = async() => {
    try{
        const result = await axios
        .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        config)
        setPlaylists(result.data.result.list);
    }catch(erro){
        alert(erro.response);
    }
}

useEffect(()=>{
    getAllPlaylists()
},[])

const deletePlaylist = async() => {
    try{
        await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}`, config)
        getAllPlaylists()
    }catch(e){
        alert(e.response)
    }
  }

  const createPlaylist = async(nome) => {
    const body = {
      name: nome
    }
    try{
    await axios
    .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, config)
    setNovaPlaylist("")
    getAllPlaylists()
  }catch(err){
    alert(err.response)
  }
}

const searchPlaylist = async() => {
    if(searchPlalistValue.length === 0){
        getAllPlaylists()
    }else{
        try{
            const response = await axios
            .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${searchPlalistValue}`, config)
            const result = response?.data?.result?.playlist
            setPlaylists(result)
        }catch(err){
            alert(err.data);
        }
    }
}


    return (
        <div>
           
            <Header
            setNovaPlaylist={setNovaPlaylist}
            novaPlaylist={novaPlaylist}
            createPlaylist={createPlaylist}
            searchPlaylist={searchPlaylist}
            searchPlalistValue={searchPlalistValue}
             setSearchPlalistValue={setSearchPlalistValue}
            />


            {playlists.length === 0 && 'nao encontrada'}
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} id={playlist.id} getAllPlaylists={getAllPlaylists} deletePlaylist={deletePlaylist}/>
            })}

        </div>
    );
}

export default Playlists;
