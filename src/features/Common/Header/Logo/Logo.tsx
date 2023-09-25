import styles from './logo.module.scss'
import { EIcons, Icons, LogoIcon } from '../../../../ui/Icons';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link className={styles.logoLink} to="/">
            <div className={styles.headerLogo}>
                <Icons name={EIcons.logo} />
                <span className={styles.headerLogoText}>Pomodoro_box</span>
            </div>
        </Link>   
    );  
}