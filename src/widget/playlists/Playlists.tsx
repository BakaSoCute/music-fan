
import { DeletePlaylist } from "../../features/playlists/delete-playlist/ui/delete-playlist"
import {client} from "../../shared/api/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

type Props = {
    userId?: string
    onPlaylistSelected?: (playlistId: string) => void
}
export function Playlists({userId, onPlaylistSelected}: Props) {

    // const [currentPage, setCurrentPage] = useState(1)
    // const [search, setSearch ] = useState("")
    const query = useQuery({
    queryKey: ["playlists",{ userId}],
    queryFn: async ({signal}) =>{
        const response = await client.GET("/playlists", {
            params: {
                query:{
                    userId
                }
            },
            signal
        })
        if (response.error) {
            throw (response as unknown as {error:Error}).error;
        }
        return response.data
    },
    placeholderData: keepPreviousData
    })

    if (query.isPending) {return (<span>Loading</span> )}
    if (query.isError) {return (<span>Error:{JSON.stringify(query.error.message)}</span> )}
    // if (query.data?.meta.page !== currentPage) {
    //     setCurrentPage(query.data?.meta.page)
    // }
    const hanldeSelectedPlaylistClick = (plailistId: string) => {
        onPlaylistSelected?.(plailistId)
    }

    return (
        <div>

        <ul>
            {query.data.data?.map((track) => {
            return (
                <li key={track.id} onClick={() => {hanldeSelectedPlaylistClick(track.id)}}>
                {track.attributes.title} <DeletePlaylist playlistId={track.id} />
                </li>
            )
            })}
        </ul>
        </div>
    )
}