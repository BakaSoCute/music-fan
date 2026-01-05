
import { LoginButton } from "./login-button"
import { useMeQuery } from "../api/use-me-query"
import { CurrentUser } from "./current-user/current-user"

export const AccountBar = () => {

    const query = useMeQuery()

    if(query.isPending) return <span>Loading</span>
    return (
        <div>
            {!query.data && <LoginButton/>}
            {query.data && <CurrentUser/>}

        </div>
    )
}