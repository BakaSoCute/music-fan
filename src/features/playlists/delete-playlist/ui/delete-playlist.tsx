import { useDeleteMutation } from "../api/useDeleteMutation"
import style from "../../../../app/style/playlist.module.css"

type Props = {
    playlistId: string
}

export const DeletePlaylist = ({playlistId}: Props) => {

    const {mutate} = useDeleteMutation(playlistId)


    const handleDelete = () => {
        mutate()
    }
    return (
        <button className={style.delete} onClick={handleDelete}>Delete</button>
    )
}