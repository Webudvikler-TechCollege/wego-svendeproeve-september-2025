// Custom hook for login modal functionality
export const useLoginModal = () => {
  const loginModalHandler = () => {
    const modal = document.getElementById("loginModal");
    const modalContent = modal?.querySelector(".login-modal-content");
    
    if (modal) {
      if (modal.classList.contains("hidden")) {
        // Opening modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      } else {
        // Closing modal with animation
        modal.classList.add("closing");
        modalContent?.classList.add("closing");
        
        setTimeout(() => {
          modal.classList.add("hidden");
          modal.classList.remove("flex", "closing");
          modalContent?.classList.remove("closing");
        }, 300); // Match animation duration
      }
    }
  };

  return { loginModalHandler };
};
