import FormComponent from "../loginForm/loginForm.component";
import { useLoginModal } from "./useLoginModal";

export const LoginModal = () => {
    const { loginModalHandler } = useLoginModal();

    return (
        <div onClick={loginModalHandler} id="loginModal" className="bg-black/50 hidden fixed z-60 w-screen h-screen top-0 left-0 login-modal items-center justify-center pointer-events-auto">
            <div onClick={(e) => e.stopPropagation()} className="w-128 bg-white relative rounded-2xl flex flex-col px-28 py-16 z-70 pointer-events-auto">
                <button onClick={loginModalHandler} className="absolute top-2 right-4 text-4xl">×</button>
                <h2 className="text-center text-2xl mb-4">Log ind</h2>
                <FormComponent isSignUp={false} 
                formClassNames="flex flex-col" 
                inputClassNames="w-full bg-off-white border border-gray-300 rounded-2xl px-4 py-3 my-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                buttonClassNames="mt-4 bg-blue-bright rounded-2xl text-white p-3 text-xl" />
            </div>
        </div>
    );
}