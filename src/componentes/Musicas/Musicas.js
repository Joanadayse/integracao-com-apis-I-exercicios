import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'



export default function Musicas(props) {

  // const {id: currentPlaylist , name}= props.playlist
    const [musicas, setMusicas] = useState([])
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [url, setUrl] = useState("");
 
    const headers={
    headers:{
        Authorization:"everton"
    }
  }

  // pegar as musicas
  const getTracks = () => {
   
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks` , headers)
    .then((resposta)=>{ setMusicas(resposta.data.result.tracks)})
    .catch((erro)=>{ console.log(erro)})
  };

  useEffect(() => {
    getTracks();

  }, []);

//  adicionar musicas
  const addMusicas= async(name,artist,url)=>{
    const body={
        name:name,
        artist:artist,
        url:url,
    };

    try{
     await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, body, headers)
     alert("Musica adicionada com sucesso")
     setName("")
     setArtist("")
     setUrl("")
     getTracks()
    }  
    catch(erro){
      alert(erro.response)
    } 
  }

// deletar musica
  const deleteMusica=(trackId)=>{
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks/${trackId}`, headers)
    .then((resposta)=>{
        alert("musica deletada com sucesso!")
        getTracks()
    })
    .catch((erro)=>{
        console.log(erro.response)
    })

  }
  // deletar playlist
 const deleteTrackToPlaylist = async ()=>{
  const url=`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}`

  try{
     await axios.delete(url, headers)
    props.getAllPlaylists()
  } catch (erro){
    alert(erro.message)

  }

  axios .delete()

 }

    return (
        <ContainerMusicas>
          <button onClick={deleteTrackToPlaylist}>X</button>

            <h2>{props.playlist.name}</h2>

            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>
                          {musica.name} - {musica.artist}
                        </h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>deleteMusica(musica.id)}>X</button>
                    </Musica>)
            })}
          <ContainerInputs>
        
        <InputMusica
          value={artist}
          placeholder="artista"
          onChange={(e) => setArtist(e.target.value)}
        />
        <InputMusica
          value={name}
          placeholder="musica"
          onChange={(e) => setName(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao onClick={() => addMusicas(name, artist, url)}>
          Adicionar musica
        </Botao>
      </ContainerInputs>

      </ContainerMusicas>
    )
        }

