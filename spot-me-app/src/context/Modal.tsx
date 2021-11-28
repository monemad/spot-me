import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext(null);

interface ModalProviderProps {
    children: any;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const modalRef = useRef(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
        </>
    );
}

interface ModalProps {
    onClose: () => void;
    children: any;
}

export function Modal({ onClose, children }: ModalProps) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content" onClick={e=>e.stopPropagation()}>
            {children}
        </div>
        </div>,
        modalNode
    );
}
