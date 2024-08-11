import Link from "next/link";

const HeroNavLink = ({
  href,
  className,
  text,
  children,
}: {
  href: string;
  className?: string;
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={href} className={className}>
      <span>{text}</span>
      {children}
    </Link>
  );
};

export default HeroNavLink;
