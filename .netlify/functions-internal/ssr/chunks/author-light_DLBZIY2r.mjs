const authorLight = new Proxy({"src":"/_astro/author-light.ekm5dqhL.png","width":252,"height":279,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/mehedi/Development/Projects/mehedisharif.com/public/images/author-light.png";
							}
							
							return target[name];
						}
					});

export { authorLight as default };
