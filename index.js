var webdriver = require ('selenium-webdriver'),

  By = webdriver.By;

function search(keyword){
	var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();
	driver.get("https://www.google.com/search?q="+keyword);

	return driver;
}

let driver = search("dogs");
//For parsing purpose we're going to extract all tags named cite 
// Which is seemingly the tag used ( exclusive to ) search results