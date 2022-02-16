var webdriver = require ('selenium-webdriver'),

  By = webdriver.By;

async function search(keyword){
	var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();
	await driver.get("https://www.google.com/search?q="+keyword);

	return driver;
}

async function getElementsByTagName(driver, tag){
	let elements = await driver.findElements(By.xpath("//"+tag));

	let promises = 
		elements.map( async function(elem){
			let x = await elem.getText();
			return x;
		});

	let text = await Promise.all(promises);
	return {"driver": driver, "elementsFound": elements.map((x, index) => {x.text = text[index]; x.index = index; return x;})};
}

// Finds base url 
// For parsing purpose we're going to extract all tags named cite 
// Which is the tag used for search results

// Schema: { url: STRING, pageNo: int, resultNo: int, err: string }
// errors: [ "not found", "no results", "error connecting" ]

async function findBaseURL(driver, base){
	let citeResults = await getElementsByTagName(driver, "cite");

	let filtered = citeResults.elementsFound.filter(
	 x => x.text != "" && x.text != undefined )
		.map (
			(elem, index) => {
				elem.index = index+1;
				return elem;
			}
		).filter( element => element.text.includes(base));

	return filtered;
}


search("dogs").then(page => findBaseURL(page, "https://en.wikipedia.org")).then(result => console.log(result));
