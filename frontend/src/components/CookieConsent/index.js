import styles from './CookieConsent.module.css'

import Button from '../Button'

const CookieConsent = ({ giveConsentClickHandler, declineConsentClickHandler }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>We use cookies 🍪 to ensure our application functions properly, to enhance user experience, and to gather insights on application usage.</p>
        <p>By clicking "Accept," you consent to our use of cookies. If you click "Decline," we won't use cookies, and your personal information will not be tracked.</p>
        <div className={styles.buttons}>
          <Button
            primary={true}
            text="Accept"
            onClick={giveConsentClickHandler}
          />
          <Button
            primary={false}
            text="Decline"
            onClick={declineConsentClickHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
