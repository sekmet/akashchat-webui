# Akash Chat WebUI

A modern, feature-rich chat interface powered by the Akash Supercloud, offering zero-cost access to advanced language models.

![Akash Chat WebUI](https://github.com/user-attachments/assets/2676fc96-746f-4f9b-8cbd-2157a1382586)

## Features

### Core Functionality
- 🤖 Advanced Language Model Integration
  - Multiple model options including Meta-Llama-3 variants
  - Customizable system prompts
  - Real-time chat interactions

### Enhanced Capabilities
- 🌐 Web Search Integration
  - Real-time web search powered by Tavily API
  - Seamless integration of search results into chat context
  - Toggle between chat and search modes

- 📁 File Processing
  - Support for multiple file formats:
    - PDF documents
    - Word documents (DOCX)
    - Excel spreadsheets (XLSX)
    - CSV files
    - Plain text files
  - Automatic file content extraction and analysis
  - File size limit: 10MB

### User Experience
- 🎨 Modern UI/UX
  - Clean, intuitive interface
  - Dark/Light theme support
  - Responsive design for all screen sizes
  - Real-time message updates

- 💾 Data Management
  - Chat history preservation
  - Conversation search functionality
  - Easy chat organization and deletion

### Security & Authentication
- 🔒 Secure Authentication via Clerk
- 🔑 API Key Management
- 🛡️ Protected Routes

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd akash-chat-webui
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Configuration

### Required API Keys
- **Akash Chat API**: Required for core chat functionality
- **Tavily API**: Required for web search capability
- **UploadThing**: Required for file upload functionality
- **Clerk**: Required for authentication

### Optional Settings
- System Prompt Customization
- Model Selection
- Theme Preferences
- API Endpoint Configuration

## Development

### Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- Marked (Markdown Rendering)
- PDF.js, Mammoth, XLSX (File Processing)

### Project Structure
```
src/
├── components/      # Reusable UI components
├── pages/          # Main application pages
├── store/          # State management
├── types/          # TypeScript definitions
└── utils/          # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Akash Network for providing the Supercloud infrastructure
- Clerk for authentication services
- Tavily for web search capabilities
- UploadThing for file upload services
