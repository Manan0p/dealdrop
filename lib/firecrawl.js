import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({apiKey: process.env.FIRECRAWL_API_KEY});

export async function scrapeProduct(url) {
    try {
        const result = await firecrawl.scrape(url, {
            formats:[{type: 'json', prompt: 'Extract the product name, price, and description.', schema: ""}]
        });
    } catch (error) {
        
    }
}