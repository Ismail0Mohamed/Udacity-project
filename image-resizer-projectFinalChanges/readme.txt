# Image Processing API

A Node.js API that processes images using Sharp.js. This API allows users to:
- Upload images
- Resize images with custom dimensions
- View a gallery of uploaded images
- Access resized versions of images via URL parameters


## Project Structure

```
src/
├── api/
│   └── App.ts          # Main application file
├── frontend/
│   ├── index.html      # Frontend interface
│   └── style.css       # Styles
├── middleware/
│   ├── dimensionsFromUrl.ts   # Image resizing middleware
│   ├── resizingImage.ts       # Upload resizing middleware
│   └── upload.ts              # File upload middleware
├── routes/
├── test/               # Test files
└── utils/             # Utility functions
```

## Technologies Used

- Node.js
- Express
- Sharp.js for image processing
- TypeScript
- Jasmine for testing

## Scripts

- `npm start` - Start the server
- `npm test` - Run tests
- `npm run build` - Build the project
- `npm run dev` - Run in development mode

## Error Handling

The API includes error handling for:
- Invalid file types
- Missing files
- Invalid dimensions
- File system errors
- Processing errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request