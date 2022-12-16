import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

  const { platform, product, audience, CTA } = req.body;

  const prompt = generatePrompt(platform, product, audience, CTA);

  console.log(prompt)

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(platform, product, audience, CTA) {
  
  return (
    `Write 3 line copy using the DIC (Disrupt, Intrigue, Click) framework.
    Optimize for: ${platform}.
    To sell the following product/service: ${product}. 
    This person is targeting: ${audience}. 
    The CTA (call to action) is: ${CTA}.`
  );
}

