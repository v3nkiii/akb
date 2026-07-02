import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "p";
  className?: string;
};

export default function Typography({
  children,
  variant = "p",
  className = "",
}: Props) {
  const baseStyles = "text-white";

  const styles = {
    h1: "text-[clamp(24px,5vw,48px)] font-bold",
    h2: "text-[clamp(20px,4vw,36px)] font-bold",
    h3: "text-[clamp(18px,3.5vw,28px)] font-semibold",
    p: "text-[clamp(14px,2.5vw,18px)] leading-relaxed",
  };

  const Tag = variant;

  return (
    <Tag className={`${baseStyles} ${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
