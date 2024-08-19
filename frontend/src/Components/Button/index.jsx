import Link from 'next/link';
import React from 'react';

const Button = ({ name, link, secondary = false, normalBtn = false, onClick ,type }) => {
  const buttonClasses = `py-[12px] px-[15px] ${secondary ? "bg-white" : "bg-[#DFC9E2] hover:bg-[#F0E4F2] transition-all duration-300"} rounded-[8px] border-[1px] border-[#612F69]  text-center`;

  return normalBtn ? (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {name}
    </button>
  ) : (
    <Link href={link} className={buttonClasses}>
      
        {name}
      
    </Link>
  );
};

export default Button;
