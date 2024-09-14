import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

import styles from './Messenger.module.css'

export default function Messenger() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)

  const nameInputRef = useRef(null)

  const handleSubmit = event => {
    event.preventDefault()
    setMessageSent(true)
    setTimeout(() => {
      setMessageSent(false)
    }, 3000)
    setName('')
    setEmail('')
    setMessage('')
  }

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus()
    } else {
      setName('')
      setEmail('')
      setMessage('')
    }
  }, [isOpen])

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.box}>
          <div className={styles.header}>
            <h2>How can we help you?</h2>
          </div>
          <div className={styles.form}>
            {messageSent ? (
              <div role="alert" aria-live="polite" className={styles.success}>
                Your message has been sent.
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <label htmlFor="messenger-name" className='sr-only'>Type your name</label>
              <input
                autoComplete="off"
                id="messenger-name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Type your name here"
                className={styles.input}
                required
                ref={nameInputRef}
              />
              <label htmlFor="email" className='sr-only'>Type your email</label>
              <input
                autoComplete="off"
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Type your email here"
                className={styles.input}
                required
              />
              <label htmlFor="message" className='sr-only'>Type your message</label>
              <textarea
                id="message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Type your message here"
                required
              />
              <button
                type="submit"
                className={styles.sendButton}
              >
                <Send />
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.openCloseButton}
        aria-label={isOpen ? 'Close messenger' : 'Open messenger'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
