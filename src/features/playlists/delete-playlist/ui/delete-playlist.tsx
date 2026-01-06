import { useDeleteMutation } from "../api/useDeleteMutation"

type Props = {
    playlistId: string
}

export const DeletePlaylist = ({playlistId}: Props) => {

    const {mutate} = useDeleteMutation(playlistId)


    const handleDelete = () => {
        mutate()
    }
    return (
        <button onClick={handleDelete}>Delete Playlist</button>
    )
}