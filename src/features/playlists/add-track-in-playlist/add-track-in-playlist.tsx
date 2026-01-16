import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../../shared/api/client";
//import type { SchemaAddTrackToPlaylistRequestPayload } from "../../../shared/api/schema";
type Props = {
    playlistId: string
    trackId: string
}

export function addTrackInPlaylist ({trackId,playlistId}:Props) {
    const query = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const res = await client.POST("/playlists/{playlistId}/relationships/tracks",{
                params:{
                    path:{
                        playlistId:playlistId
                    }
                },
                body:{
                    trackId:trackId
                }
            })
            return res.data
        },
        onSuccess:() => query.invalidateQueries({queryKey:["tracks"]})
    })
}