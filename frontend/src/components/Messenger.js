import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function Messenger() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)

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

  return (
    <div className="messenger-container">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="messenger-button"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="messenger-box">
          <div className="messenger-header">
            <h2>How can we help you?</h2>
            <button
              onClick={() => {
                setMessageSent(false)
                setIsOpen(false)
              }}
              className="close-button"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="messenger-form">
            { messageSent ? (
              <div aria-label="Your message has been sent." className='success'>
                Your message has been sent.
              </div>
            ) : null }
            <form onSubmit={handleSubmit}>
              <label htmlFor="messenger-name" className='sr-only'>Type your name</label>
              <input
                autoComplete="off"
                id="messenger-name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Type your name here"
                className="messenger-input"
                required
              />
              <label htmlFor="email" className='sr-only'>Type your email</label>
              <input
                autoComplete="off"
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Type your email here"
                className="messenger-input"
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
                className="send-button"
              >
                <Send />
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
