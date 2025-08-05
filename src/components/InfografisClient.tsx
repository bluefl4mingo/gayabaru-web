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
import { Users, House, Venus, Mars, Briefcase, ChartColumnIncreasing } from 'lucide-react';
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


const StatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: number, unit: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <Card className='p-0 lg:h-[10em]'>
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
              className="flex flex-col col-span-2 text-sm pl-[12%] md:pl-12 lg:pl-6 xl:pl-12 py-4 justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5}}
              viewport={{ once: true }}
            >
              <span className="text-md lg:text-xl font-heading2 font-medium mb-3">{title}</span>
              <span className="text-xl md:text-3xl lg:text-4xl text-sky-800/80 font-heading2 font-bold text-shadow-sm text-shadow-md">{value.toLocaleString('id-ID')}</span>
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
      className="text-lg lg:text-2xl font-bold font-heading2 mb-6 text-sky-800 tracking-tight"
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
  const PIE_COLORS = ['#0ea5e9', '#06b6d4', '#10b981'];

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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-body2 font-semibold text-gray-800">{`${label}`}</p>
          <p className="text-sky-600">
            {`${payload[0].name}: ${payload[0].value.toLocaleString('id-ID')} jiwa`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom pie chart tooltip
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-heading2 ont-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sky-600">
            {`${payload[0].value.toLocaleString('id-ID')} jiwa`}
          </p>
        </div>
      );
    }
    return null;
  };

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
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ChartColumnIncreasing className="inline-block w-6 h-6 lg:w-8 lg:h-8 text-sky-800 lg:mr-3" />
          </motion.div>
          <h1 className="text-xl lg:text-4xl font-bold font-heading2 tracking-tight text-sky-800">
            Infografis Kependudukan Desa
          </h1>
        </motion.div>
        <motion.p 
          className="mt-2 max-w-4xl text-xs md:text-sm lg:text-lg text-slate-700 font-body2 font-medium"
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
          <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-white shadow-lg border-0">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-lg lg:text-xl font-heading2 font-bold text-gray-800 mb-1">Distribusi Usia Penduduk</h3>
                <p className="font-body2 text-gray-600 text-sm">Data demografi berdasarkan kelompok usia</p>
              </div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart 
                  data={ageData} 
                  layout="vertical" 
                  margin={{ left: 20, right: 30, top: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="ageGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis 
                    type="number" 
                    fontFamily="Inter, sans-serif"
                    fontSize={13}
                    stroke="#64748b"
                    tickFormatter={(value) => value.toLocaleString('id-ID')}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={40} 
                    fontFamily="Inter, sans-serif"
                    fontSize={13}
                    stroke="#64748b"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="jumlah" 
                    fill="url(#ageGradient)" 
                    name="Jumlah Jiwa" 
                    radius={[0, 6, 6, 0]}
                    animationDuration={2000}
                    animationBegin={300}
                  />
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
          >
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg border-0 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading2 font-bold text-lg lg:text-xl text-gray-800 tracking-tight flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                  Populasi per Dusun
                </CardTitle>
                <p className="font-body2 text-sm text-gray-600">Distribusi penduduk berdasarkan wilayah</p>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={370}>
                  <PieChart>
                    <defs>
                      {PIE_COLORS.map((color, index) => (
                        <linearGradient key={index} id={`populationGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={color} stopOpacity={1}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie 
                      data={populationByDusun} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={120}
                      innerRadius={40}
                      paddingAngle={3}
                      animationBegin={0}
                      animationDuration={1500}
                      label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {populationByDusun.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#populationGradient${index})`}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
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
          >
            <Card className="overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg border-0 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading2 font-bold text-lg lg:text-xl text-gray-800 tracking-tight flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3"></div>
                  Kepala Keluarga per Dusun
                </CardTitle>
                <p className="font-body2 text-sm text-gray-600">Distribusi KK berdasarkan wilayah</p>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={370}>
                  <PieChart>
                    <defs>
                      {PIE_COLORS.map((color, index) => (
                        <linearGradient key={index} id={`kkGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={color} stopOpacity={1}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie 
                      data={kkByDusun} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={120}
                      innerRadius={40}
                      paddingAngle={3}
                      animationBegin={200}
                      animationDuration={1500}
                      label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {kkByDusun.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#kkGradient${index})`}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
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
          <Card className="overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg border-0">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-lg lg:text-xl font-heading2 font-bold text-gray-800 tracking-tight mb-2">Tingkat Pendidikan Penduduk</h3>
                <p className="font-body2 text-gray-600 text-sm">Distribusi penduduk berdasarkan jenjang pendidikan</p>
              </div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart 
                  data={educationData}
                  margin={{ left: 0, right: 30, top: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="educationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis 
                    dataKey="name" 
                    height={80}
                    fontFamily="Inter, sans-serif"
                    fontSize={13}
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis 
                    width={40} 
                    fontFamily="Inter, sans-serif"
                    fontSize={13}
                    stroke="#64748b"
                    tickFormatter={(value) => value.toLocaleString('id-ID')}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="jumlah" 
                    fill="url(#educationGradient)" 
                    name="Jumlah Jiwa" 
                    radius={[6, 6, 0, 0]}
                    animationDuration={2000}
                    animationBegin={400}
                  />
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
                    <TableHead className="pl-6 md:pl-15 py-3 font-heading2 font-semibold text-lg md:text-xl lg:text-2xl text-white tracking-tight items-center">
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
                    <TableHead className="pr-6 md:pr-15 font-heading2 font-semibold text-lg md:text-xl lg:text-2xl text-white text-right tracking-tight">
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
                      <TableCell className="pl-6 md:pl-15 py-1 font-medium font-body2 md:text-lg text-gray-700 tracking-tight">{job.pekerjaan}</TableCell>
                      <TableCell className="pr-10 md:pr-25 font-medium font-body2 md:text-lg text-gray-700 text-right">{job.jumlah.toLocaleString('id-ID')}</TableCell>
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
