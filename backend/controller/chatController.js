const e = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const chat = async (req, res) => {

  const openai = new OpenAIApi(configuration);

  const topic = "Blog Writing";
  const question = "Write a blog post about ServiceNow in a particular blog format according to modern SEO practices, the blog should contain proper headings, subheadings, and bullet points with description. The blog should be around 600 words long, strictly.";

  const GPT35TurboMessage = [
    {
      role: "system", 
      content: "You are a smart Blog writer, You follow the best practices of SEO and try to rank them better in search indexes"
    },
    {
      role: "user",
      content: "this is the topic I want to write about: `ServiceNow is an American company that provides an Application Platform as a Service (APaaS) which is a cloud-based computing model that provides the infrastructure needed to develop, run, and manage applications. ServiceNow platform can be used in different areas of an organization like IT, HR, Finance, and Security. To use the platform, users will need to install the ServiceNow platform on their system and configure it as per the business requirement. ServiceNow supports most of the major browsers like Chrome, Microsoft Edge, Firefox, and Apple Safari. ServiceNow also offers three different mobile applications, ServiceNow Agent, Now Mobile, and ServiceNow Onboarding, which can be configured as per the business requirement. After installation, users can use the platform to automate manual repeatable processes and tasks, access and manage user requests, configure forms and task management, access the service catalog, use notifications, and access knowledge management.`" 
    },
    
    {
      role: "assistant",
      content: "Please Consider the given topic and what you know about the service, and write the blog post, blog title: `How to install and configure ServiceNow platform on your system?`"
    },
    {
      role: "user",
      content: question
    }
  ]

  try{
    const GPT35Turbo = async(message)=>{
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: message,
      });
      return response.data.choices[0].message.content;
      // return response.data.choices[0].text;
    }
  
    const GPT35TurboResponse = await GPT35Turbo(GPT35TurboMessage);
    console.log(GPT35TurboResponse);
    res.json(GPT35TurboResponse.replace(/\n/g, ""));
  }catch(error){
    console.log(error.message);
    res.json({error: error});
  }



};

module.exports = chat;
