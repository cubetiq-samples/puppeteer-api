# Puppeteer API

#### GET /image

-   Description: Takes a URL as a query parameter, captures a screenshot of the webpage at the specified URL using Puppeteer, and returns the captured image file.
-   Query Parameters:
    -   url: The URL of the webpage to capture as a screenshot.
-   Response:
    -   Content-Type: image/webp
    -   Body: The captured image file.

#### GET /pdf

-   Description: Takes a URL as a query parameter, generates a PDF of the webpage at the specified URL using Puppeteer, and returns the generated PDF file.
-   Query Parameters:
    -   url: The URL of the webpage to generate as a PDF.
-   Response:
    -   Content-Type: application/pdf
    -   Body: The generated PDF file.

#### GET /list/pdf

-   Description: Retrieves a list of all PDF files stored on the server.
-   Response:
    -   Body: JSON array containing the names of all PDF files.

#### GET /list/image

-   Description: Retrieves a list of all image files stored on the server.
-   Response:
    -   Body: JSON array containing the names of all image files.

#### GET /pdf/:id

-   Description: Retrieves a specific PDF file by its ID.
-   Path Parameters:
    -   id: The ID of the PDF file.
-   Response:
    -   Content-Type: application/pdf
    -   Body: The requested PDF file.

#### GET /image/:id

-   Description: Retrieves a specific image file by its ID.
-   Path Parameters:
    -   id: The ID of the image file.
-   Response:
    -   Content-Type: image/webp
    -   Body: The requested image file.

#### GET /delete/pdf/:id

-   Description: Deletes a specific PDF file by its ID.
-   Path Parameters:
    -   id: The ID of the PDF file.
-   Response:
    -   Body: Confirmation message indicating the file has been deleted.

#### GET /delete/image/:id

-   Description: Deletes a specific image file by its ID.
-   Path Parameters:
    -   id: The ID of the image file.
-   Response:
    -   Body: Confirmation message indicating the file has been deleted.

#### GET /delete/all

-   Description: Deletes all PDF and image files stored on the server.
-   Response:
    -   Body: Confirmation message indicating all files have been deleted.

#### GET /exit

-   Description: Shuts down the server by exiting the process.
-   Response: N/A

### Contributors

-   Sambo Chea <sombochea@cubetiqs.com>
