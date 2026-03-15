import { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import styles from '../styles/ExplanationModal.module.css';

export default function ExplanationModal({ isOpen, onClose, title, content }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      // Focus the close button for accessibility when modal opens
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={styles.overlay}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          <button
            className={styles.closeHeaderBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        <div className={styles.body}>
          {content}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            ref={closeBtnRef}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // We check if document is defined to avoid Next.js SSR issues
  if (typeof document !== 'undefined') {
    return ReactDom.createPortal(modalContent, document.body);
  }

  return null;
}
