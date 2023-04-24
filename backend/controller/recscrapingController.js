require("dotenv").config();
const { WebBrowser } = require("langchain/tools/webbrowser");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const urls = require("../utils/links");
const garbage = require("../utils/garbage");
const e = require("express");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const model = new ChatOpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY });
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPENAI_API_KEY,
});
const webBrowser = new WebBrowser({ model, embeddings });

const recscraper = async (req, res) => {
  let processed_urls = new Set();
  let unProcessed_urls = new Set();
  let emailsArray = new Set();

  const takeLink = async (url) => {
    console.log("startng for " + url);
    let website = url;
    unProcessed_urls.add(website);
    email_count = 0;
    await crawl();
    console.log("done for " + url);
    console.log("emails found: " + emailsArray.size);
    return emailsArray;
  };

  const crawl = async () => {
    console.log(processed_urls.size);
    console.log(emailsArray.size);
    unProcessed_urls = new Set(
      [...unProcessed_urls].filter(
        (url) =>
          !processed_urls.has(url) &&
          !/\b(services?|blogs?|news|articles?|guides?|settings?)\b/i.test(
            url
          ) &&
          !/(news|#)/i.test(url)
      )
    );

    console.log(unProcessed_urls, "after check");
    const promises = Array.from(unProcessed_urls).map(async (url) => {
      const result = await parse_url(url);
      return result;
    });
    const results = await Promise.all(promises);
    for (let urls of results) {
      urls.forEach((url) => unProcessed_urls.add(url));
    }

    if (unProcessed_urls.size > 0) {
      await crawl();
    } else {
      console.log("done");
      return new Set(emailsArray);
    }
  };

  const parse_url = async (url) => {
    console.log("parse_url for " + url);
    let website = url;
    let { hostname } = new URL(website);
    let base_url = hostname;
    let result = await webBrowser.call(
      `${url}, display all the site map url links and emails of the page`
    );
    let [content, extraLinks] = result.split("Relevant Links:");
    const regexContact = /(https?:\/\/[^\s]+)/g;
    const matchContact = content.match(regexContact);
    const contactUrls =
      matchContact &&
      matchContact.map((url) => {
        return url.replace(/[()]/g, "");
      });
    const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const match = content.match(regex);
    const sanitizedEmail = match ? match : [];
    const urls = (contactUrls ?? []).filter(
      (url) =>
        new URL(url).hostname === base_url &&
        !garbage.some((ext) => url.endsWith(ext) || url.endsWith(`${ext}/`))
    );
    let parsed_url = [];
    for (let url of urls) {
      let skip = false;
      for (let extension of garbage) {
        if (!url.endsWith(extension) && !url.endsWith(extension + "/")) {
          continue;
        } else {
          skip = true;
          break;
        }
      }
      if (!skip) {
        parsed_url.push(url);
      }
    }
    processed_urls.add(url);

    for (let url of parsed_url) {
      if (
        !processed_urls.has(url) &&
        !/\b(services?|blogs?|news|articles?|guides?|settings?)\b/i.test(url) &&
        !/(news|#)/i.test(url)
      ) {
        unProcessed_urls.add(url);
      } else {
        parsed_url = parsed_url.filter((item) => item !== url);
      }
    }

    parse_emails(Array.from(new Set(sanitizedEmail)), base_url);
    return parsed_url;
  };

  const parse_emails = (emails, base_url) => {
    emails.forEach((email) => {
      const formattedEmail = `${base_url} : ${email}`;
      if (!emailsArray.has(formattedEmail)) {
        emailsArray.add(formattedEmail);
      }
    });
  };
  console.time("start");
  const linkPromises = urls.map(async (url) => {
    const result = await takeLink(url);
    return result;
  });
  console.log(linkPromises);
  const newEmailsArray = await Promise.all(linkPromises);
  console.log(newEmailsArray[0]);
  const answer = [...newEmailsArray[0]];
  console.timeEnd("start");
  res.json(answer);
};

module.exports = recscraper;

// python code for the same
// import re
// import requests
// import requests.exceptions
// from urllib.parse import urlsplit, urljoin
// from lxml import html
// import sys
// import csv

// class EmailCrawler:

//     processed_urls = set()
//     unprocessed_urls = set()
//     emails = set()
//     outputfile = "mails.csv"

//     def __init__(self, websites):
//         self.links= websites
//         for link in websites:
//          self.takeLink(link)

//     def takeLink(self, website):
//         print(' startng for {}'.format(website))
//         self.website = website
//         self.unprocessed_urls.add(website)
//         self.headers = {
//             'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/78.0.3904.70 Chrome/78.0.3904.70 Safari/537.36',
//         }
//         self.base_url = urlsplit(self.website).netloc
//         # self.outputfile = self.base_url.replace('.','_')+'.csv'
//         # we will use this list to skip urls that contain one of these extension. This will save us a lot of bandwidth and speedup the crawling process
//         # for example: www.example.com/image.png --> this url is useless for us. we cannot possibly parse email from images and all other types of files.
//         self.garbage_extensions = ['.aif','.cda','.mid','.midi','.mp3','.mpa','.ogg','.wav','.wma','.wpl','.7z','.arj','.deb','.pkg','.rar','.rpm','.tar.gz','.z','.zip','.bin','.dmg','.iso','.toast','.vcd','.csv','.dat','.db','.dbf','.log','.mdb','.sav','.sql','.tar','.apk','.bat','.bin','.cgi','.pl','.exe','.gadget','.jar','.py','.wsf','.fnt','.fon','.otf','.ttf','.ai','.bmp','.gif','.ico','.jpeg','.jpg','.png','.ps','.psd','.svg','.tif','.tiff','.asp','.cer','.cfm','.cgi','.pl','.part','.py','.rss','.key','.odp','.pps','.ppt','.pptx','.c','.class','.cpp','.cs','.h','.java','.sh','.swift','.vb','.ods','.xlr','.xls','.xlsx','.bak','.cab','.cfg','.cpl','.cur','.dll','.dmp','.drv','.icns','.ico','.ini','.lnk','.msi','.sys','.tmp','.3g2','.3gp','.avi','.flv','.h264','.m4v','.mkv','.mov','.mp4','.mpg','.mpeg','.rm','.swf','.vob','.wmv','.doc','.docx','.odt','.pdf','.rtf','.tex','.txt','.wks','.wps','.wpd']
//         self.email_count = 0
//         self.crawl()

//     def crawl(self):
//         """
//         It will continue crawling untill the list unprocessed urls list is empty
//         """

//         url = self.unprocessed_urls.pop()
//         print("CRAWL : {}".format(url))
//         self.parse_url(url)

//         if len(self.unprocessed_urls)!=0:
//             self.crawl()
//         else:
//             print('End of crawling for {} '.format(self.website))
//             print('Total urls visited {}'.format(len(self.processed_urls)))
//             print('Total Emails found {}'.format(self.email_count))
//             # print('Dumping processed urls to {}'.format(self.base_url.replace('.','_')+'.txt'))
//             # with open(self.base_url.replace('.','_')+'.txt' ,'w') as f:
//             #     f.write('\n'.join(self.processed_urls))

//     def parse_url(self, current_url: str):
//         """
//         It will load and parse a given url. Loads it and finds all the url in this page.
//         It also filters the urls and adds them to unprocessed url list.
//         Finally it scrapes the emails if found on the page and the updates the email list

//         INPUT:
//             current_url: URL to parse
//         RETURN:
//             None
//         """

//         #we will retry to visit a url for 5 times in case it fails. after that we will skip it in case if it still fails to load
//         response = requests.get(current_url, headers=self.headers)
//         tree = html.fromstring(response.content)
//         urls = tree.xpath('//a/@href')  # getting all urls in the page

//         #Here we will make sure that we convert the sub domain to full urls
//         # example --> /about.html--> https://www.website.com/about.html
//         urls = [urljoin(self.website,url) for url in urls]
//         # now lets make sure that we only include the urls that fall under our domain i.e filtering urls that point outside our main website.
//         urls = [url for url in urls if self.base_url == urlsplit(url).netloc]

//         #removing duplicates
//         urls = list(set(urls))

//         #filtering  urls that point to files such as images, videos and other as listed on garbage_extensions
//         #Here will loop through all the urls and skip them if they contain one of the extension
//         parsed_url = []
//         for url in urls:
//             skip = False
//             for extension in self.garbage_extensions:
//                 if not url.endswith(extension) and  not url.endswith(extension+'/'):
//                     pass
//                 else:
//                     skip = True
//                     break
//             if not skip:
//                 parsed_url.append(url)

//         # finally filtering urls that are already in queue or already visited
//         for url in parsed_url:
//             if url not in self.processed_urls:
//                 # print("{} adding to unprocessed_urls",url)
//                 self.unprocessed_urls.add(url)

//         #parsing email
//         self.parse_emails(response.text)
//         # adding the current url to processed list
//         self.processed_urls.add(current_url)

//     def parse_emails(self, text: str):
//         """
//         It scans the given texts to find email address and then writes them to csv
//         Input:
//             text: text to parse emails from
//         Returns:
//             bool: True or false (True if email was found on page)
//         """
//         # parsing emails and then saving to csv
//         emails = set(re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text, re.I))
//         #TODO: sometime "gFJS3amhZEg_z39D5EErVg@2x.png" gets accepted as email with the above regex. so for now i will check if email ends with jpeg,png and jpg

//         for email in emails:
//             skip_email = False
//             for checker in ['jpg','jpeg','png']:
//                 if email.endswith(checker):
//                     skip_email = True
//                     break

//             if not skip_email:
//                 if email not in self.emails:
//                     with open(self.outputfile, 'a', newline='') as csvf:
//                         csv_writer = csv.writer(csvf)
//                         csv_writer.writerow([self.base_url,email])
//                     self.email_count +=1
//                     self.emails.add(email)
//                     print(' {} Email found {}'.format(self.email_count,email))

//         if len(emails)!=0:
//             return True
//         else:
//             return False

// print('WELCOME TO EMAIL CRAWLER')
// try:
//     website = sys.argv
//     print(["http://www.accruharrisorchard.com.au/","http://www.perriams.co.nz/"])
// except:
//     website = input("Please enter a website to crawl for emails:")
//   # python email_crawler.py
// crawl = EmailCrawler([

// "https://www.bdo.my/en-gb/services/business-services-and-outsourcing",
// "http://www.abs1040.com/",
// "http://sageco.co.uk/",
// "http://www.minford.eu/",
// "
// "http://www.kgaww.co.nz/",
// "http://www.collinshume.com.au/",
// "http://www.iclc
// "http://www.alexandersloan.co.uk/",
// "https://afadvisory.co.za/",
// "https://www.crowleysdfk.ie/xero-implementation-and-training/",
// "https://www.pacificaccount
// "https://scrubbed.net/xero",

// ])
// # crawl.crawl()
