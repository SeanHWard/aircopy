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
    `Write copy using the ${type} framework.
    Make each sentence a new line.
    Optimize the message for a ${length} ${platform}.
    To product/service that is being marketed is ${product}. 
    Target the message to ${audience}. 
    The end goal/CTA (call to action) of the copy is to get the reader to: ${CTA}.
    On a scale of 1-10, 1 being super informal and 10 being very formal make it a ${formality}.

    Dont include any template filler words in the response.
    Do not include any hashtags.
    If it is for an email, include a provocative subject line that is preceded by the words "Subject Line:".`
  );
}

