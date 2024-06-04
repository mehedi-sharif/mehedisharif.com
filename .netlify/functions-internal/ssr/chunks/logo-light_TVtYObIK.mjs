const logoLight = new Proxy({"src":"/_astro/logo-light.DuCpJX0c.png","width":217,"height":50,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/logo-light.png";
							}
							
							return target[name];
						}
					});

export { logoLight as default };