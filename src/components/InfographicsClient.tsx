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
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Users, User, UserCheck, House, BookOpen, Briefcase, Church } from 'lucide-react';

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
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-bold">{value.toLocaleString('id-ID')}</div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);

// Komponen Wrapper Section
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-2xl font-semibold mb-6 text-slate-700">{title}</h2>
    {children}
  </section>
);

export default function InfographicsClient({ data1, data2 }: ClientProps) {
  const ageData = [
    { name: '0-1 Thn', jumlah: data1.age1 },
    { name: '1-2 Thn', jumlah: data1.age2 },
    { name: '1-3 Thn', jumlah: data1.age3 },
    { name: '3-6 Thn', jumlah: data1.age6 },
    { name: '6-15 Thn', jumlah: data1.age15 },
    { name: '15-45 Thn', jumlah: data1.age45 },
    { name: '45-54 Thn', jumlah: data1.age54 },
    { name: '54-60 Thn', jumlah: data1.age60 },
    { name: '> 60 Thn', jumlah: data1.ageOld },
  ];

  const populationByDusun = [
    { name: 'Dusun Lakaliba', value: data1.dusunLakaliba },
    { name: 'Dusun Jaya', value: data1.dusunJaya },
    { name: 'Dusun LTD', value: data1.dusunLtd },
  ];
  const kkByDusun = [
    { name: 'Dusun Lakaliba', value: data1.kkLakaliba },
    { name: 'Dusun Jaya', value: data1.kkJaya },
    { name: 'Dusun LTD', value: data1.kkLtd },
  ];
  const PIE_COLORS = ['#0ea5e9', '#f97316', '#10b981'];

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
    <div className="space-y-12">
      {/* 1. Jumlah Penduduk & KK */}
      <Section title="Populasi & Keluarga">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-6 w-6 text-muted-foreground" />} title="Total Penduduk" value={data1.totalPenduduk} unit="Jiwa" />
          <StatCard icon={<User className="h-6 w-6 text-muted-foreground" />} title="Laki-laki" value={data1.lakiLaki} unit="Jiwa" />
          <StatCard icon={<UserCheck className="h-6 w-6 text-muted-foreground" />} title="Perempuan" value={data1.perempuan} unit="Jiwa" />
          <StatCard icon={<House className="h-6 w-6 text-muted-foreground" />} title="Kepala Keluarga" value={data1.kepalaKeluarga} unit="KK" />
        </div>
      </Section>

      {/* 2. Berdasarkan Kelompok Umur */}
      <Section title="Berdasarkan Kelompok Umur">
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                <Legend />
                <Bar dataKey="jumlah" fill="#0ea5e9" name="Jumlah Jiwa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Section>

      {/* 3. Berdasarkan Dusun */}
      <Section title="Berdasarkan Dusun">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle>Populasi per Dusun</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={populationByDusun} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
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
          <Card>
            <CardHeader><CardTitle>Kepala Keluarga per Dusun</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={kkByDusun} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {kkByDusun.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* 4. Berdasarkan Pendidikan */}
      <Section title="Berdasarkan Tingkat Pendidikan">
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={educationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#f97316" name="Jumlah Jiwa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Section>

      {/* 5. Berdasarkan Pekerjaan */}
      <Section title="Berdasarkan Mata Pencaharian">
        <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pekerjaan</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobData.map((job) => (
                  <TableRow key={job.pekerjaan}>
                    <TableCell className="font-medium">{job.pekerjaan}</TableCell>
                    <TableCell className="text-right">{job.jumlah.toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Card>
      </Section>

       {/* 6. Berdasarkan Agama */}
       <Section title="Berdasarkan Agama">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Islam" value={data1.islam} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Kristen" value={data1.kristen} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Katolik" value={data1.katolik} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Hindu" value={data1.hindu} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Buddha" value={data1.buddha} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Konghucu" value={data1.konghucu} unit="Jiwa" />
          <StatCard icon={<Church className="h-6 w-6 text-muted-foreground" />} title="Kepercayaan Lain" value={data1.otherReligion} unit="Jiwa" />
        </div>
      </Section>
    </div>
  );
}
