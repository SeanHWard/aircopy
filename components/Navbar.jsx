import styles from './Navbar.module.css';

export default function Navbar() {

  return(
    <div>
   <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Aircopy</h1>
        {/* <img src="/logo.png" alt="Logo" /> */}
      </div>
      {/* <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <a href="#">Home</a>
        </li>
        <li className={styles.navItem}>
          <a href="#">About</a>
        </li>
        <li className={styles.navItem}>
          <a href="#">Contact</a>
        </li>
      </ul> */}
    </nav>

    </div>

    
  )
}