import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function ReviewPdf() {
    const {optionsPdf} = useSelector(tes => tes.dataPdf)
    const { dataLogin } = useSelector(tes => tes.p3m)
    const idPDF = useParams()
    const [namePdf, setPdfName] = useState('')


    const hendleCekPdf = () => {
        if (idPDF?.id) {
            axios.get(`http://localhost:3005/api/dokumen/${idPDF.id}`, { headers: { Authorization: `Bearer ${dataLogin.dataLogin.token}`}})
            .then((res) => {
                setPdfName(res.data.data?.urlPdf)
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
            
        }
        console.log(idPDF.id)
    }

    useEffect(() => {
        hendleCekPdf()
    },[])


    return (
        // <iframe src={optionsPdf.picturePreview} width="99%" height="730px"></iframe>
        <iframe src={namePdf} width="99%" height="730px"></iframe>
    )
}

export default ReviewPdf