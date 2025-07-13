# How to Use This App

1. **Clone the Repository**

   ```
   git clone https://github.com/Ismail0Mohamed/Udacity-project
   cd image-resizer-projectFinalChanges
   ```

2. **Install Dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages:

   ```
   npm install
   ```

3. **Build the Application**
   Compile the TypeScript source code:

   ```
   npm run build
   ```

4. **Start the Application**
   Run the app:

   ```
   npm run start
   ```

### Endpoints

- `GET /` - View the main page with upload form and gallery
- `POST /upload` - Upload a new image
- `GET /images/:filename?width=<width>&height=<height>` - Get a resized version of an image
- `GET /api/images` - Get a list of all available images

### Image Upload

- Only .jpg images are accepted
- Images are automatically resized based on provided dimensions
- Resized images are cached for future requests

### URL Parameters

- `width` - Desired width of the image (pixels)
- `height` - Desired height of the image (pixels)

## Example Usage

1. Upload an image:

```
POST /upload
Content-Type: multipart/form-data
file: <image.jpg>
width: 300
height: 200
```

2. Access a resized version:

```
GET /images/myimage.jpg?width=300&height=200
```

## Project Structure

```
src/
├── api/
│   └── App.ts          # Main application file
├── frontend/
│   └── index.html      # Frontend interface
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
