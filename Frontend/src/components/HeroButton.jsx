import styles from './HeroButton.module.css'

export default function HeroButton({children, ...props}) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
}