const author = new Proxy({"src":"/_astro/author.DSgQK7-x.png","width":252,"height":279,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/author.png";
							}
							
							return target[name];
						}
					});

export { author as default };
