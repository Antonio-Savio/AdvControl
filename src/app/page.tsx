import Image from "next/image";
import heroImg from '@/assets/lawyer-clipart.png'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-5rem)]">
      
      <h2 className="text-xl md:text-2xl font-medium mb-2 text-center">Rastreie e acompanhe suas demandas jurídicas</h2>
      <h1 className="font-bold text-2xl md:text-3xl mb-8 text-center text-blue-600">
        Organize seu escritório com praticidade e eficiência
      </h1>
      <Image
        src={heroImg}
        alt="Banner AdvControl"
        width={300}
      />
    </main>
  );
}