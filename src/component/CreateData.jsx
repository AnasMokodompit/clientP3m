import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import style from './CreateData.module.css'
import AnggotaPenelitian from './AnggotaPenelitian'
import { useLocation } from 'react-router-dom';
import IdentitaUsulan from './IndentitasUsulan'
import { useSelector } from 'react-redux'

function CreateData() {
    const [ComponenDisplay, setComponenDisplay] = useState("IndetitasUsulan")
    const {pathname} = useLocation()
    const {id} = useParams()
    let {dataSimpanAnggotaDosen} = useSelector(tes => tes.partisiDosen)




    const hendekCekInSubmitIdentitasUsulan = () => {
        if (dataSimpanAnggotaDosen.length !== 0) {
            setComponenDisplay('AngtUsulanProposal')
        }
        // console.log(dataSimpanAnggotaDosen.length)
    }

    const submitIdentitasUsulan = (e) => {
        // console.log(e)
        if (e === undefined) {
            setComponenDisplay('IndetitasUsulan')
        }
        setComponenDisplay(e)
    }
    
    useEffect(() => {
        
    },[])

    return (
        <div className={style.containerCreate}>
            {/* {console.log(ComponenDisplay)} */}
            <div className={style.navbarAdd}>
                <div className={`${style.navbarItem} ${ComponenDisplay === 'IndetitasUsulan' ? style.navbarActive :'' }`} onClick={() => setComponenDisplay('IndetitasUsulan')}>
                    <span>IDENTITAS USULAN</span>
                </div>
                {(pathname === "/data-penelitian/Add") && (
                    <div className={`${style.navbarItem} ${ComponenDisplay === 'AngtUsulanProposal' ? style.navbarActive :'' }`}  onClick={() => hendekCekInSubmitIdentitasUsulan()}>
                        <span>ANGGOTA PENELITIAN</span>
                    </div>
                )}
                {pathname === `/data-penelitian/Edit/${id}` && (
                    <div className={`${style.navbarItem} ${ComponenDisplay === 'AngtUsulanProposal' ? style.navbarActive :'' }`}  onClick={() => setComponenDisplay('AngtUsulanProposal')}>
                        <span>ANGGOTA PENELITIAN</span>
                    </div>
                )}
                {pathname === "/data-pengabdian/Add" && (
                    <div className={`${style.navbarItem} ${ComponenDisplay === 'AngtUsulanProposal' ? style.navbarActive :'' }`} onClick={() => hendekCekInSubmitIdentitasUsulan()}>
                        <span>ANGGOTA PENGABDIAN</span>
                    </div>
                )}
                {pathname === `/data-pengabdian/Edit/${id}` && (
                    <div className={`${style.navbarItem} ${ComponenDisplay === 'AngtUsulanProposal' ? style.navbarActive :'' }`}  onClick={() => setComponenDisplay('AngtUsulanProposal')}>
                        <span>ANGGOTA PENGABDIAN</span>
                    </div>
                )}
            </div>
            <div className={style.content}>
                {ComponenDisplay === "IndetitasUsulan" && (
                    <IdentitaUsulan submitIdentitasUsulan={submitIdentitasUsulan}/>
                )}
                
                {ComponenDisplay === "AngtUsulanProposal" && (
                    <AnggotaPenelitian/>
                )}
            </div>
        </div>
    )
}

export default CreateData