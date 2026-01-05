
import { useLoginMutation } from "../api/use-login-mutation"

export const LoginButton = () => {

    const mutation = useLoginMutation()
    const handleLoginClick = () => {
        window.addEventListener("message", handleOauthMessage)
        window.open(`https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=${import.meta.env.VITE_CALLBACK_URL}`,"apihub-oauth2", "width=500, heigth=600")
    }
    const handleOauthMessage = (event: MessageEvent) => {
        window.removeEventListener("message", handleOauthMessage)
        if (event.origin  !== document.location.origin) {
            console.warn("origin not match")
            return
        }
        const code = event.data.code
        if (!code) {
            console.warn("no code in message")
            return
        }
        mutation.mutate({code})
    }




    return (
        <button onClick={handleLoginClick}>Login with APIHUB</button>
    )

}