import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-400 flex">
      <div>
        <Link href="/">visula.io</Link>
      </div>
      <div>
        <Link href="/terms">Terms & Condition</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
