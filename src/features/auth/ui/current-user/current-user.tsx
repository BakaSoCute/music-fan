import { Link } from "@tanstack/react-router"
import { useMeQuery } from "../../api/use-me-query"
import styles from "../account-bar.module.css"
import { LogoutButton } from "../logout-button"

export const CurrentUser = () => {

    const query = useMeQuery()

    if(!query.data) return <span>...</span>
    return (
        <div className={styles.meInfoContainer}>
            <Link to="/my-playlist" activeOptions={{exact:true}}>
                {query.data!.login} <LogoutButton/>
            </Link>
        </div>
    )
}