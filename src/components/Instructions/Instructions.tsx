import styles from './instructions.module.scss'

export function Instructions() {
    return (
        <>
            <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>
            <div className={styles.desc}>
                <ul className={styles.descItems}>
                    <li>Выберите категорию и напишите название текущей задачи</li>
                    <li>Запустите таймер («помидор»)</li>
                    <li> Работайте пока «помидор» не прозвонит</li>
                    <li> Сделайте короткий перерыв (3-5 минут)</li>
                    <li>Продолжайте работать «помидор» за «помидором», пока задачи 
                        <br/> не будут выполнены. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                    </li>
                </ul>
            </div>
        </>  
    )
}