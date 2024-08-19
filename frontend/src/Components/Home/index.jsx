import React from "react";
import Button from "../Button";
import heroImage from "./heroImg.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="  mx-auto w-full py-[40px] xl:py-[60px] px-[20px] xl:px-[40px] flex flex-col xl:flex-row  items-center justify-center">
        <div className="max-w-[688px] w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
        Welcome to the Delivery Cost App
      </h1>
      <div className="flex flex-col lg:flex-row  gap-[12px] justify-center items-center">
        <Button
          name="Add Delivery cost for states"
          link="/add-delivery-costs"
        />
        <Button
          name="View Delivery cost for states"
          link="/view-delivery-costs"
          secondary
        />
      </div>
        </div>
      
      <Image src={heroImage} alt="hero image" className="w-[600px]" />
    </div>
  );
};

export default Hero;
