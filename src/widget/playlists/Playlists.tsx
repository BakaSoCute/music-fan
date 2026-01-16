
import { DeletePlaylist } from "../../features/playlists/delete-playlist/ui/delete-playlist"
import {client} from "../../shared/api/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import style from "../../app/style/playlist.module.css"

type Props = {
    userId?: string
    isMy?: string | undefined
    onPlaylistSelected?: (playlistId: string) => void
}
export function Playlists({userId, isMy,onPlaylistSelected}: Props) {

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
    const handleSelectedPlaylistClick = (plailistId: string) => {
        onPlaylistSelected?.(plailistId)
    }

    return (
        <div>

        <ul className={style.container}>
            {query.data.data?.map((track) => {
            return (
                <li className={style.li} key={track.id} >
                    <p onClick={() => {handleSelectedPlaylistClick(track.id)}}>{track.attributes.title} </p>{isMy &&<DeletePlaylist playlistId={track.id} />}
                </li>
            )
            })}
        </ul>
        </div>
    )
}