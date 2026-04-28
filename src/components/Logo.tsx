import { Link } from "react-router-dom";

type Props = { className?: string; tone?: "light" | "dark" };

const Logo = ({ className = "", tone = "dark" }: Props) => {
  return (
    <Link
      to="/"
      aria-label="Eschatos Church — retour à l'accueil"
      className={`inline-flex items-center cursor-pointer ${className}`}
    >
      <img
        src={tone === "light" ? "/logo/logoblanc.png" : "/logo/logonoir.png"}
        alt="Eschatos Church"
        className="h-12 w-auto object-contain md:h-14"
        loading="eager"
        width={200}
        height={56}
      />
    </Link>
  );
};

export default Logo;
