const service1 = new Proxy({"src":"/_astro/service-1.vcBgDojw.png","width":559,"height":518,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/service-1.png";
							}
							
							return target[name];
						}
					});

export { service1 as default };
