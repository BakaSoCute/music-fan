
import { useState } from "react"
import {client} from "../../../shared/api/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export function Playlist({}) {

    const [currentPage, setCurrentPage] = useState(1)
    const query = useQuery({
    queryKey: ["playlists",currentPage],
    queryFn: async ({signal}) =>{
        const response = await client.GET("/playlists", {
            params: {
                query:{
                    pageNumber: currentPage
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
    if (query.data?.meta.page !== currentPage) {
        setCurrentPage(query.data?.meta.page)
    }
    

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