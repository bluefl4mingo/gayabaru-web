'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import { Users, House, Venus, Mars, BookOpen, Briefcase, ChartColumnIncreasing } from 'lucide-react';
import { MdTempleHindu, MdChurch, MdMosque, MdTempleBuddhist } from "react-icons/md";
import { GiShintoShrine, GiPrayer  } from "react-icons/gi";
import { BiSolidBible } from "react-icons/bi";
import { motion } from 'motion/react';


interface InfographicData1 {
  totalPenduduk: number;
  lakiLaki: number;
  perempuan: number;
  kepalaKeluarga: number;
  age1: number;
  age2: number;
  age3: number;
  age6: number;
  age15: number;
  age45: number;
  age54: number;
  age60: number;
  ageOld: number;
  dusunLakaliba: number;
  dusunJaya: number;
  dusunLtd: number;
  kkLakaliba: number;
  kkJaya: number;
  kkLtd: number;
  islam: number;
  kristen: number;
  katolik: number;
  hindu: number;
  buddha: number;
  konghucu: number;
  otherReligion: number;
}

interface InfographicData2 {
  uneducated: number;
  SD: number;
  SMP: number;
  SMA: number;
  diploma: number;
  S1: number;
  S2: number;
  S3: number;
  otherEducation: number;
  petaniPemilikLahan: number;
  petaniPenyewa: number;
  buruhTani: number;
  nelayanPemilikKapal: number;
  nelayanPenyewaPerahu: number;
  buruhNelayan: number;
  guruNonPNS: number;
  pedagang: number;
  PNS: number;
  TNI: number;
  perangkatDesa: number;
  otherJob: number;
}

interface ClientProps {
  data1: InfographicData1;
  data2: InfographicData2;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const StatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: number, unit: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Card className='p-0 h-[10em]'>
      <div className="flex flex-col bg-white h-full rounded-lg">
          <div className="grid h-full grid-cols-3">
            {/* ICON ROW */}
            <motion.div 
              className="flex h-full w-36 bg-linear-to-b from-sky-800/80 to-cyan-600/60 items-center justify-center rounded-l-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {icon}
            </motion.div>
            {/* DATA ROW */}
            <motion.div 
              className="flex flex-col col-span-2 text-sm md:pl-12 lg:pl-6 xl:pl-12 py-4 justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5}}
              viewport={{ once: true }}
            >
              <span className="text-xl font-heading2 font-medium mb-3">{title}</span>
              <span className="text-4xl text-sky-800/80 font-heading2 font-bold text-shadow-sm text-shadow-md">{value.toLocaleString('id-ID')}</span>
              <span className="font-body2 font-medium text-muted-foreground">{unit}</span>
            </motion.div>
          </div>
      </div>
    </Card>
  </motion.div>
);

// Komponen Wrapper Section
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <motion.section 
    className="mb-16"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.h2 
      className="text-2xl font-bold font-heading2 mb-6 text-sky-800 tracking-tight"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  </motion.section>
);

export default function InfographicsClient({ data1, data2 }: ClientProps) {
  const ageData = [
    { name: '0-1', jumlah: data1.age1 },
    { name: '1-2', jumlah: data1.age2 },
    { name: '1-3', jumlah: data1.age3 },
    { name: '3-6', jumlah: data1.age6 },
    { name: '6-15', jumlah: data1.age15 },
    { name: '15-45', jumlah: data1.age45 },
    { name: '45-54', jumlah: data1.age54 },
    { name: '54-60', jumlah: data1.age60 },
    { name: '> 60', jumlah: data1.ageOld },
  ];

  const populationByDusun = [
    { name: 'Dusun Lakaliba', value: data1.dusunLakaliba },
    { name: 'Dusun Jaya', value: data1.dusunJaya },
    { name: 'Dusun Lantai Dua', value: data1.dusunLtd },
  ];
  const kkByDusun = [
    { name: 'Dusun Lakaliba', value: data1.kkLakaliba },
    { name: 'Dusun Jaya', value: data1.kkJaya },
    { name: 'Dusun Lantai Dua', value: data1.kkLtd },
  ];
  const PIE_COLORS = ['#3fb1e6ff', '#ce8ec9ff', '#36ca99ff'];

  const educationData = [
    { name: 'Tidak Sekolah', jumlah: data2.uneducated },
    { name: 'SD', jumlah: data2.SD },
    { name: 'SMP', jumlah: data2.SMP },
    { name: 'SMA', jumlah: data2.SMA },
    { name: 'Diploma', jumlah: data2.diploma },
    { name: 'S1', jumlah: data2.S1 },
    { name: 'S2', jumlah: data2.S2 },
    { name: 'S3', jumlah: data2.S3 },
    { name: 'Lainnya', jumlah: data2.otherEducation },
  ];

  const jobData = [
    { pekerjaan: 'Petani Pemilik Lahan', jumlah: data2.petaniPemilikLahan },
    { pekerjaan: 'Petani Penyewa', jumlah: data2.petaniPenyewa },
    { pekerjaan: 'Buruh Tani', jumlah: data2.buruhTani },
    { pekerjaan: 'Nelayan Pemilik Kapal', jumlah: data2.nelayanPemilikKapal },
    { pekerjaan: 'Nelayan Penyewa Perahu', jumlah: data2.nelayanPenyewaPerahu },
    { pekerjaan: 'Buruh Nelayan', jumlah: data2.buruhNelayan },
    { pekerjaan: 'Guru Non PNS', jumlah: data2.guruNonPNS },
    { pekerjaan: 'Pedagang', jumlah: data2.pedagang },
    { pekerjaan: 'PNS/ASN', jumlah: data2.PNS },
    { pekerjaan: 'TNI', jumlah: data2.TNI },
    { pekerjaan: 'Perangkat Desa', jumlah: data2.perangkatDesa },
    { pekerjaan: 'Lainnya', jumlah: data2.otherJob },
  ];

  return (
    <motion.div 
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.div 
        className="text-left mb-6 pb-2 border-b"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ChartColumnIncreasing className="inline-block w-8 h-8 text-sky-800 mr-3" />
          </motion.div>
          <h1 className="text-4xl font-bold font-heading2 tracking-tight text-sky-800">
            Infografis Kependudukan Desa
          </h1>
        </motion.div>
        <motion.p 
          className="mt-2 max-w-4xl text-lg text-slate-700 font-body2 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Memberikan informasi lengkap mengenai karakteristik demografi penduduk Desa Gaya Baru
        </motion.p>
      </motion.div>

      {/* 1. Jumlah Penduduk & KK */}
      <Section title="• Jumlah Penduduk & Kepala Keluarga">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={<Users size={75} stroke="white" className="" />} title="Total Penduduk" value={data1.totalPenduduk} unit="Jiwa" />
          <StatCard icon={<Mars size={75} stroke="white" className="" />} title="Laki-laki" value={data1.lakiLaki} unit="Jiwa" />
          <StatCard icon={<Venus size={75} stroke="white" className="" />} title="Perempuan" value={data1.perempuan} unit="Jiwa" />
          <StatCard icon={<House size={75} stroke="white" className="" />} title="Kepala Keluarga" value={data1.kepalaKeluarga} unit="KK" />
        </div>
      </Section>  

      {/* 2. Berdasarkan Kelompok Umur */}
      <Section title="• Berdasarkan Kelompok Umur">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={ageData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontFamily="Poppins"/>
                  <YAxis type="category" dataKey="name" width={60} fontFamily="Poppins"/>
                  <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.7)' }} />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#0ea5e9" name="Jumlah Jiwa" label={{ position: 'right', fill: '#1c363fff', fontWeight: 500 }} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* 3. Berdasarkan Dusun */}
      <Section title="• Berdasarkan Dusun">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader><CardTitle className="font-heading2">Populasi per Dusun</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={populationByDusun} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {populationByDusun.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader><CardTitle className="font-heading2">Kepala Keluarga per Dusun</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={kkByDusun} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {kkByDusun.map((entry, index) =>  (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* 4. Berdasarkan Pendidikan */}
      <Section title="• Berdasarkan Tingkat Pendidikan">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={educationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" height={40}/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#0ea5e9" name="Jumlah Jiwa" label={{ position: 'top', fill: '#1c363fff', fontWeight: 500 }} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* 5. Berdasarkan Pekerjaan */}
      <Section title="• Berdasarkan Mata Pencaharian">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Table className="border-1 bg-white">
                <TableHeader>
                  <TableRow className="bg-sky-800/80 rounded-t-xl">
                    <TableHead className="pl-15 py-3 font-heading2 font-semibold text-2xl text-white tracking-tight items-center">
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Briefcase size={30} className="inline-block mr-3"></Briefcase>
                        Pekerjaan
                      </motion.div>
                    </TableHead>
                    <TableHead className="pr-15 font-heading2 font-semibold text-2xl text-white text-right tracking-tight">
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        Jumlah
                      </motion.span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobData.map((job, index) => (
                    <motion.tr
                      key={job.pekerjaan}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                      className="border-b"
                    >
                      <TableCell className="pl-15 py-1 font-medium font-body2 text-lg text-gray-700 tracking-tight">{job.pekerjaan}</TableCell>
                      <TableCell className="pr-25 font-medium font-body2 text-lg text-gray-700 text-right">{job.jumlah.toLocaleString('id-ID')}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
      </Section>

       {/* 6. Berdasarkan Agama */}
       <Section title="• Berdasarkan Agama">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<MdMosque size={75} fill="white" className="" />} title="Islam" value={data1.islam} unit="Jiwa" />
          <StatCard icon={<MdChurch size={75} fill="white" className="" />} title="Kristen" value={data1.kristen} unit="Jiwa" />
          <StatCard icon={<BiSolidBible size={75} fill="white" className="" />} title="Katolik" value={data1.katolik} unit="Jiwa" />
          <StatCard icon={<MdTempleHindu size={75} fill="white" className="" />} title="Hindu" value={data1.hindu} unit="Jiwa" />
          <StatCard icon={<MdTempleBuddhist size={75} fill="white" className="" />} title="Buddha" value={data1.buddha} unit="Jiwa" />
          <StatCard icon={<GiShintoShrine size={75} fill="white" className="" />} title="Konghucu" value={data1.konghucu} unit="Jiwa" />
          <StatCard icon={<GiPrayer size={75} fill="white" className="" />} title="Kepercayaan Lain" value={data1.otherReligion} unit="Jiwa" />
        </div>
      </Section>
    </motion.div>
  );
}
