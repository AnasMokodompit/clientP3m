
import { Link } from 'react-router-dom'
import style from './PageNotFound.module.css'

function PageNotFound() {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <p className={style.title}>Opps! Page not found</p>
                <p className={style.status}>404</p>
                <p className={style.pesan}>We can't find the page you're looking for</p>
                <Link to='/login'><span className={style.button}>Go Back Home</span></Link>
            </div>
        </div>
    )
}


export default PageNotFound