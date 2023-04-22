require("dotenv").config();
const { WebBrowser } = require("langchain/tools/webbrowser");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const urls = require("../utils/links");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
let garbage_extensions = ['.aif','.cda','.mid','.midi','.mp3','.mpa','.ogg','.wav','.wma','.wpl','.7z','.arj','.deb','.pkg','.rar','.rpm','.tar.gz','.z','.zip','.bin','.dmg','.iso','.toast','.vcd','.csv','.dat','.db','.dbf','.log','.mdb','.sav','.sql','.tar','.apk','.bat','.bin','.cgi','.pl','.exe','.gadget','.jar','.py','.wsf','.fnt','.fon','.otf','.ttf','.ai','.bmp','.gif','.ico','.jpeg','.jpg','.png','.ps','.psd','.svg','.tif','.tiff','.asp','.cer','.cfm','.cgi','.pl','.part','.py','.rss','.key','.odp','.pps','.ppt','.pptx','.c','.class','.cpp','.cs','.h','.java','.sh','.swift','.vb','.ods','.xlr','.xls','.xlsx','.bak','.cab','.cfg','.cpl','.cur','.dll','.dmp','.drv','.icns','.ico','.ini','.lnk','.msi','.sys','.tmp','.3g2','.3gp','.avi','.flv','.h264','.m4v','.mkv','.mov','.mp4','.mpg','.mpeg','.rm','.swf','.vob','.wmv','.doc','.docx','.odt','.pdf','.rtf','.tex','.txt','.wks','.wps','.wpd']
const scraping = async (req, res) => {
  const model = new ChatOpenAI({ temperature: 0 });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
  });
  const webBrowser = new WebBrowser({ model, embeddings });
  const query = ` display all the site map url links and emails of the page `;
  console.time("scraping..");
  try {
    const advisorEmails = {};
    await Promise.all(
      urls.map(async (url) => {
        const result = await webBrowser.call(`${url}, ${query}`);
        const [content, extraLinks] = result.split("Relevant Links:");
        console.log(content);
        const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const match = content.match(regex);
        const sanitizedEmail = match ? match : [];
        const regexContact = /(https?:\/\/[^\s]+)/g;
        const matchContact = content.match(regexContact);
        const contactUrl =
          matchContact &&
          matchContact.map((url) => {
            return url.replace(/[()]/g, "");
          });
        if (contactUrl) {
          await Promise.all(
            contactUrl.map(async (url) => {
              if (garbage_extensions.some(ext => url.endsWith(ext))) {
                // console.log('Garbage extension found in url: ', url);
                return;
              }
              const contactEmail = await webBrowser.call(
                `${url}, what is the contact Email ?`
              );
              const mailRegex =
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
              const [content, extraLinks] =
                contactEmail.split("Relevant Links:");
              const mailMatch = content.match(mailRegex);
              const sanitizedMailContact = mailMatch ? mailMatch[0] : null;
              if(sanitizedMailContact){
                sanitizedEmail.push(sanitizedMailContact);
              }
            })
          );
        }

        advisorEmails[url] = Array.from(new Set(sanitizedEmail));
      })
    );
    res.json(advisorEmails);
    console.timeEnd("scraping..");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    console.timeEnd("scraping..");
    return;
  }
};

module.exports = scraping;

// res.json(content);
// const regex = /^\d+\. (.+?)\s+-\s+(https:\/\/\S+)/gm;
// const matches = content.matchAll(regex);
// const advisors = [];

// for (const match of matches) {
//   const [_, name, url] = match;
//   if (url.startsWith("https://www")) {
//     advisors.push(url);
//   }
// }
// const promises = [...matches].map(async (match) => {
//   const [_, name, url] = match;
//   if (url.startsWith("https://www")) {
//     const mainWebsite = await webBrowser.call(
//       `${url}, what is the link for visiting the main website ?`
//     );
//     const regex = /(https?:\/\/[^\s]+)/i;
//     const match = mainWebsite.match(regex);
//     const mainUrl = match ? match[0] : null;
//     const email = await webBrowser.call(
//       `${mainUrl}, what is the contact mail address ?`
//     );
//     if(email.startsWith("The contact email address is")){
//       const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
//       const match = email.match(regex);
//       const sanitizedEmail = match ? match[0] : null;
//       return { name, url: mainUrl, email: sanitizedEmail };
//     }else{
//       const contactPage = await webBrowser.call(
//         `${mainUrl}, what is the link for visiting the contact page ?`
//       );
//       const regex = /(https?:\/\/[^\s]+)/i;
//       const match = contactPage.match(regex);
//       const contactUrl = match ? match[0] : null;
//       const contactEmail = await webBrowser.call(
//         `${contactUrl}, what is the contact mail address ?`
//       );
//       const mailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
//       const mailMatch = contactEmail.match(mailRegex);
//       const sanitizedMailContact = mailMatch ? mailMatch[0] : null;
//       return { name, url: mainUrl, email: sanitizedMailContact };
//     }
//   }
// });
// const advisors = await Promise.all(promises);
// // const mainWebsite = await webBrowser.call(`${"https://www.tc-group.com/"}, ${"what is the email given for this website ?"}`);
// // console.log(lookLinkedin);
// res.json(advisors);

// ************
// const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY,
//     temperature: 0.9,
//     modelName: `gpt-3.5-turbo`,
//     maxTokens: 400, });
// const completion = await new LLMChain({
//     llm: createModel(),
//     prompt: executeTaskPrompt,
// }).call({
//     goal: "visit this site: https://www.xero.com/advisors/find-advisors/?type=advisors&orderBy=ADVISOR_RELEVANCE&sort=ASC&pageNumber=1, and return the emails of the advisors",
//     task: 'visit the site and look for the emails and then return them',
// })
// res.send(completion.text);
// const retriever = new RemoteLangChainRetriever({
//     url: "https://github.com/reworkd",
//     auth: {},
//     inputKey: "question",
//     outputKey: "text",
// });
// const chain = RetrievalQAChain.fromLLM(model, retriever);
// const completion = await chain.call({
//     query: "give me contents of this page ?",
// });
// res.send(completion.text);

// ****************
