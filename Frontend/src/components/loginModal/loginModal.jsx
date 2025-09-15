import FormComponent from "../loginForm/loginForm.component";
import { useLoginModal } from "./useLoginModal";

export const LoginModal = () => {
    const { loginModalHandler } = useLoginModal();

    return (
        <div onClick={loginModalHandler} id="loginModal" className="hidden fixed z-30 w-screen h-screen top-0 left-0 login-modal items-center justify-center pointer-events-auto">
            <div onClick={(e) => e.stopPropagation()} className="login-modal-content p-8 z-50 pointer-events-auto">
                <button onClick={loginModalHandler} className="modal-close">×</button>
                <h2 className="login-title">Log ind</h2>
                <FormComponent isSignUp={false} />
            </div>
        </div>
    );
}