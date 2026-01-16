import { useQuery } from "@tanstack/react-query"
import { client } from "../../shared/api/client"


export const Tracks = () => {
    const {data,isFetching,isError} = useQuery({
        queryKey: ["tracks"],
        queryFn:async () => {
            const res = await client.GET("/playlists/tracks")
            if (res.error) {
            throw (res as unknown as {error:Error}).error;
            }
            return res
        }
    })
    if (isFetching) {
        return <span>Загрузка...</span>
    }
    if(isError) {
         return <span>Ошибка</span>
    }

    return(
        <div>
            <ul>
                {data?.data?.data.map((track) => {
                    return (
                        <li key={track.id}>
                            <h1>{track.attributes.title}</h1>
                            <audio controls src={track.attributes.attachments[0]?.url}>{track.attributes.title}</audio>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}