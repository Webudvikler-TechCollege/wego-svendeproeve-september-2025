import FormComponent from "../../components/loginForm/loginForm.component"

export const FrontPage = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold">Welcome to the Frontpage</h1>
            <FormComponent isSignUp={true} />
        </div>
    )
}
