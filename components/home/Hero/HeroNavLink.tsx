import Link from "next/link";

const HeroNavLink = ({
  href,
  className,
  text,
  children,
  handleClick,
}: {
  href: string;
  className?: string;
  text: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <Link href={href} className={className} onClick={handleClick}>
      <span>{text}</span>
      {children}
    </Link>
  );
};

export default HeroNavLink;
