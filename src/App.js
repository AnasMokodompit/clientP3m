import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateData from './component/CreateData';
import Beranda from './page/Beranda/Beranda';
import Login from './page/Login/Login';
import Home from './page/Home/Home';
import DataPenelitian from './component/menu/DataPenelitian';
import DataPengabdian from './component/menu/DataPengabdian';
import Skema from './component/Skema/Skema'
import DataPengguna from './component/menu/DataPengguna';
import CatatanHarian from './component/menu/CatatanHarian';
import Profile from './component/profile/Profile';
import AddData from './component/AddData/AddData';
import Keaggotaan from './component/Keanggotaan/Keanggotaan';
import TentukanReviwer from './component/TentukanReviewer/TentukanReviewerUsulan';
import Penjadwalan from './component/masterData/Penjadwalan';
import JurusanProdi from './component/jurusanAndProdi/JurusanProdi';
import UsulanProposal from './component/UsulanProposal/Usulan';
import Revisi from './component/revisiUsulan/Revisi';
import ReviewPdf from './component/revisiUsulan/ReviewPdf';
import LaporanKemajuan from './component/LaporanKemajuan/LaporanKemajuan';
import LaporanAkhir from './component/LaporanAkhir/LaporanAkhir';
import ReadUsulan from './component/ReadUsulan/ReadUsulan';
import NilaiUsulanPenelitian from './component/NilaiUsulan/NilaiUsulanPenelitian';
import PageNotFound from './page/PageNotFound/PageNotFound';
import Register from './page/Register/Register';
import DeskripsiPenilaian from './component/DeskripsiPenilaian/DeskripsiPenilaian';
import RuangLingkupSkema from './component/RuangLingkupSkemaPengabdian/RuangLingkupSkema';
import ApprovedUsulan from './component/Aprrov/ApprovedUsulan';
import TabelNilai from './component/table/TabelNilai';
import FormLaporanKemajuan from './component/LaporanKemajuan/FormLaporanKemajuan';
import ReadLaporanKemajuan from './component/LaporanKemajuan/ReadLaporanKemajuan';
import FormLaporanAkhir from './component/LaporanAkhir/FormLaporanAkhir';
import ReadLaporanAkhir from './component/LaporanAkhir/ReadLaporanAkhir';
import TentukanReviwerLaporan from './component/TentukanReviewer/TentukanReviewerLaporan';
import ReadReviewLaporan from './component/ReadReviewLaporan.jsx/ReadReviewLaporan';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/data-penelitian/revisi/reviewPdf/:id' element={<ReviewPdf/>} />
        {/* <Route path='/data-penelitian/revisi/reviewPdf' element={<ReviewPdf/>} /> */}
        <Route path='/data-pengabdian/revisi/reviewPdf/:id' element={<ReviewPdf/>} />
        {/* <Route path='/data-pengabdian/revisi/reviewPdf' element={<ReviewPdf/>} /> */}
      
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/beranda' element={<Beranda/>} />
        <Route path='/user-profile' element={<Profile/>} />
        <Route path='/data-penelitian' element={<DataPenelitian/>} />
        <Route path='/data-penelitian/skema' element={<Skema/>} />
        <Route path='/data-penelitian/deskripsiPenilaian' element={<DeskripsiPenilaian/>} />
        <Route path='/data-penelitian/:id' element={<ReadUsulan/>} />
        <Route path='/data-penelitian/revisi' element={<Revisi/>} />
        <Route path='/data-penelitian/pdf/:id' element={<UsulanProposal/>} />
        <Route path='/data-penelitian/Edit/:id' element={<AddData/>} />
        <Route path='/data-penelitian/Add' element={<AddData/>} />
        <Route path='/data-penelitian/nilaiPenelitian/:id' element={<NilaiUsulanPenelitian/>} />
        <Route path='/data-penelitian/Keangotaan' element={<Keaggotaan/>} />
        <Route path='/data-penelitian/nilai' element={<TabelNilai/>} />
        <Route path='/data-penelitian/ApprovUsulan' element={<ApprovedUsulan/>} />
        <Route path='/data-penelitian/tentukan-reviewer' element={<TentukanReviwer/>} />
        <Route path='/data-pengabdian' element={<DataPengabdian/>} />
        <Route path='/data-pengabdian/skema' element={<Skema/>} />
        <Route path='/data-pengabdian/deskripsiPenilaian' element={<DeskripsiPenilaian/>} />
        <Route path='/data-pengabdian/ruangLingkupSkema' element={<RuangLingkupSkema/>} />
        <Route path='/data-pengabdian/:id' element={<ReadUsulan/>} />
        <Route path='/data-pengabdian/revisi' element={<Revisi/>} />
        <Route path='/data-pengabdian/pdf/:id' element={<UsulanProposal/>} />
        <Route path='/data-pengabdian/Edit/:id' element={<AddData/>} />
        <Route path='/data-pengabdian/Add' element={<AddData/>} />
        <Route path='/data-pengabdian/nilaiPengabdian/:id' element={<NilaiUsulanPenelitian/>} />
        <Route path='/data-pengabdian/Keangotaan' element={<Keaggotaan/>} />
        <Route path='/data-pengabdian/nilai' element={<TabelNilai/>} />
        <Route path='/data-pengabdian/ApprovUsulan' element={<ApprovedUsulan/>} />
        <Route path='/data-pengabdian/tentukan-reviewer' element={<TentukanReviwer/>} />
        <Route path='/data-pengguna' element={<DataPengguna/>} />
        <Route path='/catatan-harian' element={<CatatanHarian/>} />
        <Route path='/laporan-kemajuan' element={<LaporanKemajuan />} />
        <Route path='/laporan-kemajuan/:id' element={<ReadLaporanKemajuan />} />
        <Route path='/laporan-kemajuan/add' element={<FormLaporanKemajuan />} />
        <Route path='/laporan-kemajuan/Edit/:id' element={<FormLaporanKemajuan />} />
        <Route path='/laporan-akhir' element={<LaporanAkhir />} />
        <Route path='/laporan-akhir/:id' element={<ReadLaporanAkhir />} />
        <Route path='/laporan-akhir/add' element={<FormLaporanAkhir />} />
        <Route path='/laporan-akhir/Edit/:id' element={<FormLaporanAkhir />} />
        <Route path='/laporan/tentukan-reviewer' element={<TentukanReviwerLaporan />} />
        <Route path='/reviewer/data-penelitian' element={<TentukanReviwer/>} />
        <Route path='/reviewer/data-pengabdian' element={<TentukanReviwer/>} />
        <Route path='/reviewer/laporan' element={<TentukanReviwerLaporan/>} />
        <Route path='/reviewer/laporan/:id' element={<ReadReviewLaporan/>} />
        <Route path='/masterData/penjadwalan' element={<Penjadwalan/>} />
        <Route path='/masterData/jurusan' element={<JurusanProdi/>} />
        <Route path='/masterData/prodi' element={<JurusanProdi/>} />

        <Route path='*' element={<PageNotFound/>}/>

        
        <Route path='/newData' element={<CreateData/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
