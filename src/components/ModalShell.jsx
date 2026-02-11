export function ModalShell({ onClose, children }) {
    return (
        <div className="overlay">
            <div className="popup" >
                <div className="modal-content" >
                    <span 
                        className="close" 
                        onClick={ onClose }
                    >&times;</span>
                    {children}
                </div>
            </div>
        </div>
    );
}