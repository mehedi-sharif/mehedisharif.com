const favicon = new Proxy({"src":"/_astro/favicon.CvAtepQw.png","width":64,"height":64,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/favicon.png";
							}
							
							return target[name];
						}
					});

export { favicon as default };
