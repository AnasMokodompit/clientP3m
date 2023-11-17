import { useEffect, useRef, useState } from 'react';
import logoKampus from './Logo_Politeknik_Negeri_Manado.png'
import dateFormat from "dateformat"
// import pdf from './MAKALAH_AYA.pdf'

// import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

// import JsxPdf from 'jsx-pdf';



// import PDF from 'react-pdf-scroll'

// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import ReactDOMServer from "react-dom/server";



// PDF
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { useReactToPrint } from 'react-to-print';
import style from './Usulan.module.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
// import ReactPDF from '@react-pdf/renderer';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import pdfmake from 'pdfmake/build/pdfmake'
import pdffonts from 'pdfmake/build/vfs_fonts'
pdfmake.vfs = pdffonts.pdfMake.vfs



function UsulanProposal(props) {

  // pdfmake.
  

    // const [pdfFile, setPdfFile] = useState(null)
    // const [viewPdf, setViewPdf] = useState('')


  
    const id = useParams()
    const { dataLogin } = useSelector(tes => tes.p3m)
    const [dataPdf, setDataPdf] = useState([])
    const [partisipasiDosen, setPartisipasiDosen] = useState([])
    const [partisipasiMahasiswa, setPartisipasiMahasiswa] = useState([])
    const [linkPdf, setLinkPdf] = useState('')
    const {pathname} = useLocation()
    const [nameJurusan, setNameJurusan] = useState('')
    const [dataKepalaJurusan, setDataKepalaJurusan] = useState([])
    const [dataKepalaP3m, setDataKepalaP3M] = useState([])




     // PDF

    const hendleGetPenelitian = () => {
       axios.get(`${process.env.REACT_APP_BASE_API}/penelitian/${id.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
      .then((res) => {
        // console.log(res.data.data)
        setDataPdf(res?.data?.data)
        if (res.data.data?.Dokumen[0]?.pdf_idRevisi) {
          setLinkPdf(res.data.data?.Dokumen[0]?.urlPdfRevisi)
        }else{
          setLinkPdf(res?.data?.data?.Dokumen[0]?.urlPdf)
        }

        // console.log(res.data.data)
          axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPenelitian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
          .then((res) => {
              setNameJurusan(res.data.data[0][0]?.user?.jurusan.name)
              if (res.data.data[0][0]?.user?.jurusan.name) {
                axios.get(`${process.env.REACT_APP_BASE_API}/users?jabatanKampus=Kepala Jurusan`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                  .then((res) => {
                    setDataKepalaJurusan(res.data.data)
                  }).catch((err)=> {
                    console.log(err)
                  })
               }
              setPartisipasiDosen(res.data.data[0])
              setPartisipasiMahasiswa(res.data.data[1])
          }).catch((error) => {
              console.log(error)
          })
      }).catch((err) => {
          console.log(err)
      })
    }

    const hendleGetPengabdian = () => {
      axios.get(`${process.env.REACT_APP_BASE_API}/pengabdian/${id.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
     .then((res) => {
       // console.log(res.data.data)
       setDataPdf(res?.data?.data)
       if (res.data.data?.Dokumen[0]?.pdf_idRevisi) {
         setLinkPdf(res.data.data?.Dokumen[0]?.urlPdfRevisi)
       }else{
         setLinkPdf(res?.data?.data?.Dokumen[0]?.urlPdf)
       }

       // console.log(res.data.data)
         axios.get(`${process.env.REACT_APP_BASE_API}/anggotaPengabdian?judul=${res.data.data.judul}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
         .then((res) => {
             setNameJurusan(res.data.data[0][0]?.user?.jurusan.name)
             if (res.data.data[0][0]?.user?.jurusan.name) {
              axios.get(`${process.env.REACT_APP_BASE_API}/users?jabatanKampus=Kepala Jurusan`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
                .then((res) => {
                  setDataKepalaJurusan(res.data.data)
                }).catch((err)=> {
                  console.log(err)
                })
             }
             setPartisipasiDosen(res.data.data[0])
             setPartisipasiMahasiswa(res.data.data[1])
         }).catch((error) => {
             console.log(error)
         })
     }).catch((err) => {
         console.log(err)
     })
   }

   const hendleKepalaP3M = () => {
      axios.get(`${process.env.REACT_APP_BASE_API}/users?jabatanKampus=Kepala P3M`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
      .then((res) => {
        setDataKepalaP3M(res.data.data)
      }).catch((err)=> {
        console.log(err)
      })
   }

    const [numPages, setNumPages] = useState(null)

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const contentRef = useRef(null);


    const printHandler = () => {

      const content = contentRef.current;
      html2pdf()
      .set({
        filename: 'Proposal Usulan.pdf',
        // margin: 0.5,
        // image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { format: 'a4', orientation: 'portrait' },
      })
      .from(content)
      .save()
    





      console.log(html2pdf)
    }
  

    useEffect(() => {
      console.log(pathname.substring(1,pathname.length - (5 + id.id.length)))
        if (pathname.substring(1,pathname.length - (5 + id.id.length)) === "data-penelitian") {
            hendleGetPenelitian()
        }else{
          hendleGetPengabdian()
        }

        hendleKepalaP3M()
        
    }, [])
    // AKHIR PDF




    return (
        <>
             {/* <div className={style.border}></div> */}
              {/* {linkPdf && ( */}
                     {/* <div  className={style.pos} id="_316:2956" style={{top: 3456}}> */}
                   {/* )} */}
            <div className={style.container}>
              <div className={style.buttonPrintCon} >
                  <button className={style.buttonPrint} onClick={printHandler}>Print Usulan</button>
              </div>
              {/* <object data={pdf} type="application/pdf" style={{width: '100%', height:'741px'}}></object> */}

              <div ref={contentRef} className={style.content}>
                  <div className={style.cover}>
                    <div className={style.judulCover}>
                      {dataPdf?.length !== 0 && (
                        pathname .substring(1,pathname.length - 6) === "data-penelitian" ? 
                            <span id={style._191}>USULAN {dataPdf?.skema.toUpperCase()}</span>
                            :
                            console.log(dataPdf),
                            <span id={style._191}>USULAN {dataPdf?.skema.toUpperCase()}</span>
                        
                      )}
                    </div>
                    <div className={style.imgCover}>
                      <img 
                      src={logoKampus}
                      width={200}
                      height={200}
                      alt=""/>
                    </div>
                    <div className={style.judulPenelitianCover}>
                      <span>
                        {dataPdf?.length !== 0 ? dataPdf?.judul : ""}
                      </span>
                    </div>
                    <div className={style.jdlAnggota}>
                      <span id={style._192}>Ketua / Anggota Tim : </span>
                    </div>
                    {partisipasiDosen.length !== 0 && (
                      partisipasiDosen.map((data, key) => {
                        return (
                          <div key={key} className={style.nameUserCover}>
                            <span id={style._193}>
                                  {data?.nameUser} {data?.user?.nidn}
                            </span>
                          </div>
                        )
                      })
                    )}
                    <div className={style.buttonCover}>
                      <span id={style._192}>JURUSAN TEKNIK ELEKTRO</span>
                      <span id={style._192}>PROGRAM STUDI TEKNIK INFORMATIKA</span>
                      <span id={style._192}>POLITEKNIK NEGERI MANADO</span>
                      <span id={style._192}>AGUSTUS 2023</span>
                    </div>
                  </div>
                  <div className={style.lembarPengesahan1}>
                    <div className={style.jldHalamanPengesahan}>
                      <span id={style._191}>HALAMAN{" "}</span>
                      <span id={style._191}>PENGESAHAN</span>
                    </div>
                    <div className={style.jldPenelitanHlmPengesahan}>
                      <div className={style.jdlulValue}>
                        <span id={style._192}>Judul</span>
                      </div>
                      <div className={style.valueJdul}>
                        <p style={{marginRight: "5px"}}>:</p>
                        <span id={style._193}>
                           {dataPdf?.length !== 0 ? dataPdf?.judul : ""}
                        </span>
                      </div>
                    </div>
                    {partisipasiDosen.length !== 0 && (
                      partisipasiDosen.map((data, key) => {
                        // console.log(data)
                        return (
                          <div key={key}>
                              <div className={style.dataPartisipasi}>
                                <span id={style._192}>{data.jabatan}</span>
                              </div>
                              <div className={style.dataPartisipasi}>
                                <div className={style.jdlulValue}>
                                  <span id={style._193}>Nama Lengkap</span>
                                </div>
                                <div className={style.valueJdul}>
                                  <p style={{marginRight: "5px"}}>:</p>
                                  <span id={style._193}>{data?.nameUser}</span>
                                </div>
                              </div>
                              <div className={style.dataPartisipasi}>
                                <div className={style.jdlulValue}>
                                  <span id={style._193}>NIDN</span>
                                </div>
                                <div className={style.valueJdul}>
                                  <p style={{marginRight: "5px"}}>:</p>
                                  <span id={style._193}>{data?.user?.nidn}</span>
                                </div>
                              </div>
                              <div className={style.dataPartisipasi}>
                                <div className={style.jdlulValue}>
                                  <span id={style._193}>Score Sinta</span>
                                </div>
                                <div className={style.valueJdul}>
                                  <p style={{marginRight: "5px"}}>:</p>
                                  <span id={style._193}>{data?.user?.sinta}</span>
                                </div>
                              </div>
                              <div className={style.dataPartisipasi}>
                                <div className={style.jdlulValue}>
                                  <span id={style._193}>Jabatan Fungsional</span>
                                </div>
                                <div className={style.valueJdul}>
                                  <p style={{marginRight: "5px"}}>:</p>
                                  <span id={style._193}>{data?.user?.jabatan_fungsional}</span>
                                </div>
                              </div>
                              <div className={style.dataPartisipasi}>
                                <div className={style.jdlulValue}>
                                  <span id={style._193}>Program Studi</span>
                                </div>
                                <div className={style.valueJdul}>
                                  <p style={{marginRight: "5px"}}>:</p>
                                  <span id={style._193}>{data?.user?.prodi?.name}</span>
                                </div>
                              </div>
                              {data.jabatan === "Ketua Pengusul" && (
                                <>
                                <div className={style.dataPartisipasi}>
                                  <div className={style.jdlulValue}>
                                    <span id={style._193}>Nomor HP</span>
                                  </div>
                                  <div className={style.valueJdul}>
                                    <p style={{marginRight: "5px"}}>:</p>
                                    <span id={style._193}>{data?.user?.nomor_tlp}</span>
                                  </div>
                                </div>
                                <div className={style.dataPartisipasi}>
                                  <div className={style.jdlulValue}>
                                    <span id={style._193}>Alamat surel (<span style={{ fontStyle: "italic" }}> e-mail</span> )</span>
                                  </div>
                                  <div className={style.valueJdul}>
                                    <p style={{marginRight: "5px"}}>:</p>
                                    <span id={style._193}>{data?.user?.email}</span>
                                  </div>
                              </div>
                              </>
                              )}
                          </div>
                        )
                      })
                    )}
                    <div className={style.dataPartisipasi}>
                      <div className={style.jdlulValue}>
                        <span id={style._192}>Mahasiswa yang Dilibatkan{" "}</span>
                      </div>
                      <div className={style.valueJdul}>
                        <p style={{marginRight: "5px"}}>:</p>
                        <span id={style._192}>{partisipasiMahasiswa.length} Mahasiswa</span>
                      </div>
                    </div>
                    <div className={style.dataPartisipasi}>
                      <div className={style.jdlulValue}>
                        <span id={style._192}>Biaya Penelitian (Rp.)</span>
                      </div>
                      <div className={style.valueJdul}>
                        <p style={{marginRight: "5px"}}>:</p>
                        <span id={style._193}>10.000.000</span>
                      </div>
                    </div>
                    <div className={style.dataPartisipasi}>
                      <div className={style.jdlulValue}>
                        <span id={style._192}>Sumber Dana</span>
                      </div>
                      <div className={style.valueJdul}>
                        <p style={{marginRight: "5px"}}>:</p>
                        <span id={style._193}></span>
                      </div>
                    </div>
                    <div className={style.dataPartisipasi}>
                      <div className={style.jdlulValue}>
                        <span id={style._192}>Tanggal Pengajuan</span>
                      </div>
                      <div className={style.valueJdul}>
                        <p style={{marginRight: "5px"}}>:</p>
                        <span id={style._192}>{dateFormat(dataPdf?.updatedAt, "dddd dd mmmm yyyy", "id_ID")}</span>
                      </div>
                    </div>
                  </div>
                  <div className={style.lembarPengesahan2}>
                    <div className={style.dateLmbPengesahan} id="_524:2441" >
                      <span id={style._193}>Manado, {dateFormat(new Date, "dd mmmm yyyy")}</span>
                    </div>
                    <div className={style.compenentOne}>
                      <div className={style.comItem}>
                        <span id={style._193}>Mengetahui,</span>
                        <span id={style._193}>Ketua Jurusan {nameJurusan}</span>
                      </div>
                      <div className={style.comItem}>
                        <span id={style._193}>Ketua Pengusul</span>
                      </div>
                    </div>
                    <div className={style.compenentTwo}>
                      <div className={style.comItem}>
                        {/* {console.log(dataKepalaJurusan)} */}
                        <span id={style._193}>{dataKepalaJurusan[0]?.name}</span>
                        <span id={style._193}>NIP. 19927232115031100</span>
                      </div>
                      <div className={style.comItem}>
                        <span id={style._193}>{partisipasiDosen[0]?.nameUser}</span>
                        <span id={style._193}>NIP. 19907232019031104</span>
                      </div>
                    </div>
                    <div className={style.compenentThree}>
                      <div className={style.comItem}>
                        <span id={style._193}>Menyetujui</span>
                        <span id={style._193}>Kepala P3M Politeknik Negeri Manado</span>
                      </div>
                    </div>
                    <div className={style.compenentFour}>
                      <div className={style.comItem}>
                        {/* {console.log(dataKepalaP3m)} */}
                        <span id={style._193}>{dataKepalaP3m[0]?.name}</span>
                        <span id={style._193}>NIP. 19907232019031100{" "}</span>
                      </div>
                    </div>
                  </div>
                  {/* {console.log(linkPdf)} */}
                  {linkPdf !== undefined && (
                    <div className={style.pdfInputUsulan} style={{ margin:'auto'}}>
                      <Document 
                          file={linkPdf}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                                            
                          {
                            Array(numPages).fill().map((_,i) => (
                              // console.log(i+1),
                              <Page width={800} height={1120} key={i} pageNumber={i+1}/>
                              ))
                          }
                          {/* <Page width={800} pageNumber={1}/> */}
                        </Document>
                  </div> 
                  )}
            </div>
          </div>

        </>

    )    
}


export default UsulanProposal

