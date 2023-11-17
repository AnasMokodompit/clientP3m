import { Swiper, SwiperSlide} from 'swiper/react'
import style from './SwiperJadwalP3M.module.css'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import dateFormat from "dateformat"


function SwiperJadwalP3M() {
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [dataJadwal, setDataJadwal] = useState([])

    const hendleGetAllJadwalP3M = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/penJadwalan`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
        .then((res) => {
            setDataJadwal(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        hendleGetAllJadwalP3M()
    },[])
    return (
        <div className={style.container}>
            {dataJadwal.length !== 0 ?
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                >
                {dataJadwal.map((data,key) => {
                    return (
                    <SwiperSlide key={key} className={style.contentItem}>
                        <div className={style.logoCard}>
                            <span className={`${style.icon} material-symbols-outlined`}>import_contacts</span>
                        </div>
                        <div className={style.jdlbox}>
                            <p>{data?.jadwalJudul}</p>
                        </div>
                        <div className={style.tgl}>
                            <p><span>{dateFormat(data?.tglMulai, "dd mmm yyyy")} - </span> <span>{dateFormat(data?.tglAkhir, "dd mmm yyyy")}</span></p>
                        </div>
                    </SwiperSlide>
                    )
                })}

                <div className={style.slider_controler}>
                    <div className={`swiper-button-next ${style.slider_arrow}`}/>
                    <div className={`swiper-button-prev ${style.slider_arrow}`}/>
                    <div className="swiper-pagination"/>
                </div>

                </Swiper>
            : 
           <>
             <div className={style.contentItemNotValue}>
                <span>JADWAL P3M TIDAK ADA</span>
            </div>
           </>
        }
        </div>
    )   
}


export default SwiperJadwalP3M