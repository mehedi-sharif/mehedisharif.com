import config from "@/config/config.json";
import menu from "@/config/menu.json";

export interface NavigationLink {
  name: string;
  url: string;
}

const { main }: { main: NavigationLink[] } = menu;

const HeaderNav = () => (
  <div className="signature-header-space">
  <header className="signature-header">
    <nav className="signature-nav" aria-label="Main navigation">
      <a href="/" className="signature-nav-brand" aria-label={`${config.site.title} home`}>
        <img
          src={config.site.logo_darkmode}
          width={217}
          height={50}
          alt={config.site.title}
        />
      </a>
      <div className="signature-nav-links">
        {main.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className={item.url === "/contact" ? "signature-nav-link signature-nav-contact" : "signature-nav-link"}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  </header>
  </div>
);

export default HeaderNav;
