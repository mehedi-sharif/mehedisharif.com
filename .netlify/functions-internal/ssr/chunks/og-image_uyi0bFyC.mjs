const ogImage = new Proxy({"src":"/_astro/og-image.DXPRzR3w.png","width":3600,"height":2400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/og-image.png";
							}
							
							return target[name];
						}
					});

export { ogImage as default };
