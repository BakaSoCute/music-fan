
import {client} from "../../../shared/api/client"
import { useQuery } from "@tanstack/react-query"


export function Playlist() {

    // const traks = async () => {
    //     const response = await client.GET("/playlists")
    //     const data = response.data
    //     return data
    // }
    const query = useQuery({
    staleTime: 10000,
    queryKey: ["playlists"],
    queryFn: async () =>{
        const response = await client.GET("/playlists")
        if (response.error) {
            throw (response as unknown as {error:Error}).error;
        }
        return response.data
    }
    })
    if (query.isPending) {return (<span>Loading</span> )}
    if (query.isError) {return (<span>Error:{JSON.stringify(query.error.message)}</span> )}


    return (
        <div>

        <ul>
            {query.data.data?.map((track) => {
            return (
                <li key={track.id}>
                {track.attributes.title}
                </li>
            )
            })}
        </ul>
        </div>
    )
}