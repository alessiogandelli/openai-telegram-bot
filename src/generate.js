const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, 'image.png');
require('dotenv').config()


const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN
});
const openai = new OpenAIApi(configuration);

export async function magic(prompt) {

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:prompt,
        temperature: 0.3,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    return response.data.choices[0].text;
}

export async function generateImage(prompt) {
    console.log("generating image...")
    let urls = []
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 4,
            size: "1024x1024",
        });

        for (let i = 0; i < response.data.data.length; i++) {
            const url = response.data.data[i].url;
            urls.push(url)
        }
    } catch (err) {
        urls.push("https://i.imgur.com/4ZQZ1Zm.png")
    }


    return urls
}



//magic("come studiare meglio?")
