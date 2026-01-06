import { Navigate } from "@tanstack/react-router";
import { useMeQuery } from "../../features/auth/api/use-me-query";
import { Playlists } from "../../widget/playlists/Playlists";
import { AddPlaylystForm } from "../../features/playlists/add-playlist/ui/add-playlist-form";
import styles from "../style/playlist.module.css"
import { EditPlaylystForm } from "../../features/playlists/edit-playlist/ui/edit-playlist-form";
import { useState } from "react";

export function MyPlaylistPage () {
    const { data, isPending} = useMeQuery()
    const [selectedPlaylist,setSelectedPlaylist] = useState<string | null>(null)

    if (isPending) return (<div>Loading...</div>)

    if (!data) {
        return <Navigate to="/" replace />
    }

 return(
    <div className={styles.playlist_container}>
        <h2>Мой плейлист</h2>
        <hr />
        <AddPlaylystForm/>
        <hr />
        <Playlists userId={data.userId} onPlaylistSelected={setSelectedPlaylist}/>
        {selectedPlaylist && <EditPlaylystForm key={selectedPlaylist} playlistId={selectedPlaylist}/>}
    </div>
 )
}