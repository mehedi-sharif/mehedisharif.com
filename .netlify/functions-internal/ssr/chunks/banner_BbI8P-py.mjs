const banner = new Proxy({"src":"/_astro/banner.BMwzPDc-.png","width":1199,"height":380,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/banner.png";
							}
							
							return target[name];
						}
					});

export { banner as default };
