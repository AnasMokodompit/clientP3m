import style from './AddData.module.css'
import CreateData from '../CreateData'
import Sidebar from '../sidebar/Sidenar'
import Navbar from '../navbar/Navbar'
import { useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"



function AddData() {
    const {pathname} = useLocation()
    const {id} = useParams()

    return (
        <div className={style.container}>
        <Sidebar/>
        <div className={style.kanan}>
            <Navbar/>
            <div className={style.content}>
                <ToastContainer/>
                {pathname === "/data-penelitian/Add" && (
                    <div>
                        <div>
                            <span>Create Data Penelitian</span>
                        </div>
                        <CreateData/>
                    </div>
                )}
                {pathname === `/data-penelitian/Edit/${id}` && (
                    <div>
                        <div>
                            <span>Edit Data Penelitian</span>
                        </div>
                        <CreateData/>
                    </div>
                )}
                {pathname === "/data-pengabdian/Add" && (
                    <div>
                        <div>
                            <span>Create Data Pengabdian</span>
                        </div>
                        <CreateData/>
                    </div>
                )}
                {pathname === `/data-pengabdian/Edit/${id}` && (
                    <div>
                        <div>
                            <span>Edit Data Pengabdian</span>
                        </div>
                        <CreateData/>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}

export default AddData