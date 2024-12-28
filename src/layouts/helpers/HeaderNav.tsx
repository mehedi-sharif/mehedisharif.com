import config from "@/config/config.json";
import menu from "@/config/menu.json";
import React, { useState } from 'react';

export interface NavigationLink {
  name: string;
  url: string;
}

const { main }: { main: NavigationLink[] } = menu;

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const {
    logo,
    logo_darkmode,
    logo_width,
    logo_height,
    logo_text,
    title,
  } = config.site;

  const { theme_switcher } = config.settings;

  return (
    <header className={isOpen ? "menu-open relative z-10" : "relative z-10"}>
      <div className="mx-auto max-w-[1460px]">
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            <a href="/" className="navbar-brand inline-block">
              {logo || logo_darkmode ? (
                <>
                  {/* Light mode logo */}
                  <img
                    srcSet={`${logo} 1x, ${logo} 2x`}
                    className={`inline-block ${theme_switcher && 'dark:hidden'}`}
                    width={parseInt(logo_width.replace("px", ""))}
                    height={parseInt(logo_height.replace("px", ""))}
                    alt={title}
                    style={{
                      height: logo_height,
                      width: logo_width,
                    }}
                  />

                  {/* Dark mode logo */}
                  {theme_switcher && (
                    <img
                      srcSet={`${logo_darkmode} 1x, ${logo_darkmode} 2x`}
                      className="hidden dark:inline-block"
                      width={parseInt(logo_width.replace("px", ""))}
                      height={parseInt(logo_height.replace("px", ""))}
                      alt={title}
                      style={{
                        height: logo_height,
                        width: logo_width,
                      }}
                    />
                  )}
                </>
              ) : (
                logo_text || title
              )}
            </a>

            <button id="menu" onClick={toggle} aria-label="menu">
              <svg
                className="menu-toggler dark:invert"
                viewBox="0 0 100 100"
                width="60"
              >
                <path
                  className="line top"
                  d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                />
                <path className="line middle" d="m 30,50 h 40" />
                <path
                  className="line bottom"
                  d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <div className="header-alt absolute top-0 w-full bg-black dark:bg-white">
        <div className="mx-auto max-w-[1460px]">
          <div className="container">
            <nav className="flex items-center justify-between py-4">
              <a href="/" className="navbar-brand inline-block">
                {logo || logo_darkmode ? (
                  <>
                    {/* Dark mode logo */}
                    <img
                      srcSet={`${logo_darkmode} 1x, ${logo_darkmode} 2x`}
                      className={`inline-block ${theme_switcher && 'dark:hidden'}`}
                      width={parseInt(logo_width.replace("px", ""))}
                      height={parseInt(logo_height.replace("px", ""))}
                      alt={title}
                      style={{
                        height: logo_height,
                        width: logo_width,
                      }}
                    />
                    {/* Light mode logo */}
                    {theme_switcher && (
                      <img
                        srcSet={`${logo} 1x, ${logo} 2x`}
                        className="hidden dark:inline-block"
                        width={parseInt(logo_width.replace("px", ""))}
                        height={parseInt(logo_height.replace("px", ""))}
                        alt={title}
                        style={{
                          height: logo_height,
                          width: logo_width,
                        }}
                      />
                    )}
                  </>
                ) : (
                  logo_text || title
                )}
              </a>

              <div className="menu-container order-2 absolute left-0 top-full ml-auto inline-flex w-full flex-col pb-8 text-center md:order-1 lg:static lg:w-auto lg:flex-row lg:pb-0">
                {main.map((menu) => (
                  <a
                    key={menu.name}
                    href={menu.url}
                    className="mx-0 inline-block py-2 text-base text-white dark:text-dark lg:mx-6 lg:py-0"
                  >
                    {menu.name}
                  </a>
                ))}
              </div>

              <button
                className="order-1 md:order-2"
                onClick={toggle}
                aria-label="menu"
              >
                <svg
                  className="menu-toggler active light dark:invert"
                  viewBox="0 0 100 100"
                  width="60"
                >
                  <path
                    className="line top"
                    d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
                  />
                  <path className="line middle" d="m 30,50 h 40" />
                  <path
                    className="line bottom"
                    d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderNav;
