const logoDark = new Proxy({"src":"/_astro/logo-dark.BI5IQM6O.png","width":217,"height":50,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/logo-dark.png";
							}
							
							return target[name];
						}
					});

export { logoDark as default };
