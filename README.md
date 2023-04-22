# QueryWhisperer - Transcript Generation with AI

This is a MERN (MongoDB, Express, React, Node.js) application that utilizes the power of artificial intelligence to generate transcripts from YouTube videos. The application uses a combination of technologies including OpenAI, LangChain, and Pinecone to provide an accurate and efficient question-answering system.

## Features

- Takes a YouTube video link as input and generates the video's transcript using the OpenAI "Whisper" API.
- Stores the generated text transcript, embedded with LangChain and OpenAI, into a Pinecone vector datastore for efficient similarity search.
- Allows users to ask questions about the video or videos that have been trained before, and the system provides accurate answers using the embedded texts.
- ~~Supports long videos by breaking them into smaller chunks for processing.~~ `scope for future improvement, currently you need to provide the smaller chunks inside the demo-mp3 folder and there is a commented code, you can use that `
- Provides a user-friendly interface for easy interaction and input of YouTube video links.
- Can be extended to support other types of documents, such as PDFs, for question-answering.

` tested with a 7.5 hours long video's audio, though i did not download the audio using this code, that would have taken days to process 🤦‍♀️`
` you can question about this video as well, the video is :` https://www.youtube.com/watch?v=QxU-JrfA824
## Application Workflow

1. The user provides a YouTube video link through the application's user interface.
2. The application uses the `ytdl-core` npm package to download the audio from the YouTube video.
3. The downloaded audio is then passed to the OpenAI 'Whisper API' to convert it into text transcripts.
4. The text transcripts are embedded into vector format using Langchain and OpenAI embedding models.
5. The embedded vectors are stored in the Pinecone vector datastore for efficient similarity search.
6. When a user query comes in, Langchain performs a similarity search on the embedded vectors and returns the most relevant answer.
7. The application displays the answer to the user through the user interface.

## User Interface and Workflow

- The user goes to the application's website and inputs a YouTube video link. After a few moments, the application generates the text transcript for the video using the steps mentioned in the Application Workflow.
- The user can then ask the application any questions about the video, and the AI-powered question-answering system will provide accurate answers based on the generated transcripts.
- The application is designed to be useful for extracting information from informative videos and can potentially support other formats, such as PDFs, in the future.

## Technologies Used

- Node.js: Backend server for handling requests and processing data.
- React: Frontend library for building the user interface.
- MongoDB: Database for storing application data.
- OpenAI: API for converting audio to text transcripts and generating answers.
- Langchain: Library for converting text to embedded vectors for efficient similarity search.
- Pinecone: Vector datastore for storing and querying embedded vectors.

## Installation

1. Clone the repository and then `npm i` in both backend and frontene.
2. Then navigate to backend.
3. Run `npm run dev` to concurrently start the client and server.
4. Update the API URL in the frontend components `UploadComponent.jsx` and `QnaComponent.jsx` to `localhost:5000`.
5. Update the CORS allow origin in `backend/app.js` to `"localhost:3000"`.
- to skip this step, clone the `locale` branch I will be creating that branch soon
6. Set the required environment variables in the backend `.env` file:
    - `OPENAI_API_KEY`: API key for OpenAI service.
    - `DATABASE_URI`: MongoDB database URI.
    - `PINECONE_API_KEY`: API key for Pinecone service.
    - `PINECONE_INDEX_NAME`: Name of the Pinecone index.
7. Access the application in your web browser at `localhost:3000`



## Usage

1. Access the application's website and provide a YouTube video link.
2. Wait for the application to generate the text transcript for the video.
3. Ask questions about the video through the application's user interface.
4. View the answers provided by the AI-powered question-answering system.

Note: For testing and development purposes, you can use YouTube shorts or other short videos.

## Future Improvements
- Support for PDF documents for question-answering.
- Enhancement of error handling and edge case scenarios.
- Integration of more advanced AI capabilities, such as summarization and sentiment analysis.
- Implementation of user authentication and authorization for secure access to the application.
- Deployment of the application to a cloud platform for scalability and availability.

` though, first and foremost there are lots of improvement scopes in terms of code quality, specially in jsx components, we should fix those first, thank you `

## Contribution

I welcome contributions to improve and enhance the functionality of this application. If you would like to contribute, please follow these steps:

1. Fork the repository to your own GitHub account, (prefereably the `locale` branch).
2. Clone the forked repository to your local machine.
3. Create a new branch for your contribution.
4. Make your changes and test them locally.
5. Commit your changes with clear and descriptive commit messages.
6. Push your changes to your forked repository.
7. Submit a pull request to the main repository with a detailed description of your changes.

Please ensure that your contributions adhere to the following guidelines:

- Follow the coding style and best practices used in the project.
- Provide clear and concise documentation for any new features or changes.
- Test your changes thoroughly to ensure they do not introduce any new bugs.
- Be responsive to feedback and be willing to make changes as needed.


Thank you for your contributions in advance! Together, we can make this application even better.
_________________
- finding bugs is most prioritized contribution for now :)


## Conclusion

This application provides an efficient way to generate text transcripts from YouTube videos and extract information through a question-answering system powered by AI. With further enhancements, such as support for PDFs and other formats, this application has the potential to be a valuable tool for extracting information from various multimedia sources.
_________________
- Three of my OpenAI account's $5 free trial has been reached out, someone please sponsor me. 😭😭🥺
_________________
![image](https://user-images.githubusercontent.com/68517592/233770362-cdcd70c3-0661-437b-b5cb-a93389d24558.png)
![image](https://user-images.githubusercontent.com/68517592/233770402-1e8caeae-00b8-42e0-a310-6dcd6a694e90.png)


