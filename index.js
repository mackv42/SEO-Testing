var webdriver = require ('selenium-webdriver'),

  By = webdriver.By;

async function search(keyword){
	var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();
	await driver.get("https://www.google.com/search?q="+keyword);

	return driver;
}

async function findElementsByTagName(driver){
	let elements = await driver.findElements(By.xpath("//cite"));

	let promises = 
		elements.map( async function(elem){
			let x = await elem.getText();
			return x;
		});

	text = await Promise.all(promises);
	return {"driver": driver, "elementsFound": elements, "text": text};
}

// Finds base url 
async function findBaseURL(driver, base){
	
}


search("dogs").then(driver => findBaseURL(driver, ""));


setTimeout(()=>{}, 100000)

//For parsing purpose we're going to extract all tags named cite 
// Which is seemingly the tag used ( exclusive to ) search results


// Schema: { url: STRING, pageNo: int, resultNo: int, err: string }
// errors: [ "not found", "no results", "error connecting" ]



