import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

  const {type, platform, length, formality, product, audience, CTA } = req.body;

  const prompt = generatePrompt(type, platform, length, formality, product, audience, CTA);

  console.log(prompt)

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(type, platform, length, formality, product, audience, CTA) {

  
  return (
    `Write copy ${type}.
    Skip a line in between each sentence.
    Optimize the message for a ${length} ${platform}.
    The product/service that is being marketed is ${product}. 
    Target the message to ${audience}. 
    The call to action of the copy is to get the reader to: ${CTA}.
    Overall, the formality of the tone and word choice should be ${formality}.

    Dont include any template filler words in the response.
    Do not include any hashtags.`
  );
}

