import Image from "next/image";
import Banner from "@/components/Banner";
import Increase from '@/components/Increase';
import Decrease from "@/components/Decrease";
import Products from "@/components/Products";

export default function Home() {
  return (
     <div>
        <Banner/>
        <Increase/>
        <Decrease/>
        <Products/>
      
    </div>
  );
}
 
