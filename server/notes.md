# Project 5: Spike 5

# Image Upload

## Cloudinary

We're not going to be saving any actual images on MongoDB. Instead we will be saving them on the cloud-based image and video management service, [**Cloudinary**](https://cloudinary.com/documentation/how_to_integrate_cloudinary), then just saving a URL reference in MongoDB. To make the upload process easier and safer, we'll also use a middleware called [**Multer**](https://www.npmjs.com/package/multer). Install both packages via npm.

Start by creating a free account on Cloudinary. Under **Media Library**, you can create folders and manually add or delete files. Start by creating a folder for your user images: 'profile_pics' or 'user_avatars', whatever you like. Upload a sample image. 

On your Dashboard, you'll be able to see the **Cloud Name**, your **API Key**, and your **API Secret**. We'll save these variables in our `.env` file. Then create a folder in your server called `config`, to hold configuration files. This is just to save space on our `index.js`. In a `.js` file for `cloudinary`, copy and paste the config code snippet from the 'getting started' page in Cloudinary docs. Make sure to replace each of the variables for your `process.env` variables. Export this as a function, which we will call on the `index.js` together with the middlewares. 

```js
import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export default cloudinaryConfig
```

We'll also need to update our user Schema to include a property for our image. The value will be a `String` URL linking to the image that we will already have uploaded to Cloudinary. This is a good opportunity to demonstrate the [default property](https://mongoosejs.com/docs/defaults.html), which I'll set to the URL of the sample image I already uploaded. If this property isn't included on the user object, or the value is set to **undefined**, then the default will be applied. Any other value (including **null** or an empty string) will still be stored in the database - so be sure to pay attention if you choose to follow this logic.

## Middleware

[Middleware](https://expressjs.com/en/guide/using-middleware.html) refers to functions that can be placed _between_ your routes and your controller functions. 

We're going to create a function using [Multer](https://github.com/expressjs/multer#readme) to act as [middleware](https://expressjs.com/en/guide/using-middleware.html) on any routes that will receive a file to be uploaded. This won't be our only middleware, so create a folder for `middlewares`, and then create a `.js` file called `multer` for all multer functions (you might decide to write more, later). Here, we'll write and export this function:

```js
import multer from "multer";
import path from "path";

export const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    cb(null, true);
  },
});
```

Let's break it down...

We import the **multer** function from the Multer package. This will accept an object as an argument, which will hold specific properties. First, we are going to set the `storage` property - this indicates the temporary storage location for files being selected in HTML, which will be either the memory of our application, or a local folder on the user's device. We're specifying to use `multer.diskStorage()` (meaning, a local folder) and we're putting an empty object to indicate the default settings. This means Multer will save the file in the operating system's default folder for temporary files, and it will automatically generate a unique name for the file (we don't want it to accidentally conflict with something already in the temp folder!).

The `path` import is a [module](https://nodejs.org/api/path.html) directly from Node.js. It allows us to inspect the full pathname of a file, but it also lets us isolate the file extension. We're going to add another property, `fileFilter`, to our multer object, and we're going to specify that we're only allowing files with the extensions `.jpg`, `.jpeg`, or `.png` to be uploaded.

The `fileFilter` property accepts a function with 3 arguments: the **request**, the **file**, and another **callback** function. The callback function dictates what should happen after the fileFilter logic has been applied. In our case, if the file extension isn't accepted, it will throw an error, and `false` indicates that the file should _not_ be uploaded. If the file extension is accepted, then it won't send an error, and `true` gives permission for the file to continue to our controller function. 

We call this Multer function on our Route _before_ the controller function. This ensures the file has been checked before it ever reaches your controller function. Now, if we log `req.file` to the console, we should see the file from our request! The rest of the text is still held in the `req.body`. When we call the function, however, we have to specify that we're uploading a **single** file, and we have to specify which **field** that file will be held in:

```js
import { multerUploads } from '../middlewares/multer.js';

router.post("/new", multerUploads.single("avatar"), createUser);
```

We can then access that file through the request object at `req.file`. If we log it to the console, we'll see the path to the temporary folder the file has been saved. 

## Custom Upload Function

Now we need to write a function to upload that file to Cloudinary! I'm going to create a folder called `utils` to hold my utility functions. Here, I'll create a `.js` file for `image management`. The first function will be my upload:

```js
import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async(file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: folder });
    console.log(result);
    return result.secure_url;
  } catch(e) {
    console.log(e);
  }
}
```

Basically, I've just copied this Cloudinary uploader function directly from the Cloudinary documentation. I'm passing a file and a folder into the function, and cloudinary does the rest to put that file into that folder. I just need to make sure to include both arguments when I call the function. It will return quite a large object with many properties, let's upload a file and log the result to the console to look at it. In Postman, for any POST request that includes files, we need to use **Form Data**.

The most useful of those properties for us will be **secure_url**, which is just a link to the online source of the image. If you want to be able to delete anything from Cloudinary, you will also need to save the **public_id**. Deleting from Cloudinary is optional! I'm going to have my `imageUpload` function return just the secure URL. If something goes wrong and we end up in the catch block, my function will have returned `undefined`. When a property on a Mongoose schema that has a `default` value is given `undefined`, then the default kicks in. This is not "falsy", the value must be `undefined` for the default to activate (`null` or `""` will be saved as values!)

Our whole `createUser` function should now look something like this:

```js
const createUser = async(req, res) => {
  // validation
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(406).json({ error: "Please fill out all fields" });
  }
  try {
    // create base user
    const newUser = new User({ 
      ...req.body
    });
    // upload and add url if file has been included
    if (req.file) {
      const uploadedImage = await imageUpload(req.file, "pandas_avatars");
      newUser.avatar = uploadedImage;
    }
    const result = await newUser.save();
    res.status(200).json(result)
  } catch(e) {
    console.log(e)
    e.code === 11000 ? res.status(406).json({ error: "That email is already registered" }) 
    : res.status(500).json({ error: "Unknown error occured", ...e })
  }
}
```

## Optional: Clean Temp Files

It's good practise to delete any files you create once you're finished with them. Depending on the device and device settings, the temp folder could be cleaned regularly, perhaps once a week, or once a month, but there's also a chance it won't be and that file will stay there forever! If you look online, you'll see countless frustrated users wondering why their temp folders are getting so full and slowing down their computers. High chance, those files are coming from sloppy programmers that don't clean up after themselves. 

Node includes a [**File System** module](https://www.w3schools.com/nodejs/nodejs_filesystem.asp), with functions we can use to Create, Read, Update, Delete, and even Rename files from our code. Once we've uploaded our file to Cloudinary, we will never need the temp file again, so we're going to use `fs.unlink()` to delete it once we're done.

Since I'm going to need to do this regardless of whatever else happens in my controller function, I will create a small utility function for myself to make it easier to call it when I need it:

```js
import fs from "fs";

export const removeTempFile = (file) => {
  if (file) { 
    fs.unlink(file.path, (error) => { 
      if (error) {
        console.log(error);
      } else {
        console.log("Temp file deleted");
      }
    });
  }
}
```

At any point that our function would exit (ie. return), I will call it. I can also then add it to a `finally` block at the end of my controller function, so that if I never exit early, it will run after the `try/catch` block has finished:

```js
removeTempFile(req.file);
```

## Front-End

Phew. Now that it's all working through Postman, we have to write a fetch to call it from our React front-end! Let's look at the code in Postman's sidebar to guide us - we can see they're appending their body as Form Data. This is necessary so our Multer middleware can check the field we're using to hold our file.

We'll need to add an `<input type='file' />` so our user can select their file for upload. You can [access](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files) this file using `event.target.files`. The type of this property can vary, so you have to be careful: if you cancel from the file selection popup _without_ selecting a file, the default value of `event.target.files` is `null`. Once you have selected a file, it becomes a `FileList`, essentially an array of files. Since we're only selecting one, it will always be the item at the zero index. If you then open the popup and cancel without selecting something, the `FileList` will be empty, but it is still a `FileList` and no longer `null`!

**Warning:** When using FormData to submit POST requests using _XMLHttpRequest_ or the *Fetch_API* with the _multipart/form-data_ Content-Type (e.g. when uploading Files and Blobs to the server), **do not explicitly set the Content-Type header on the request**. Doing so will prevent the browser from being able to set the Content-Type header with the boundary expression it will use to delimit form fields in the request body. [Read more](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects).

## Optional: Image Preview

To transform our file into something an `<img>` element can display, we can use the [`createObjectURL(file)` static method](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static). When passed a file as an argument, this method returns a string that can be given to the `src` attribute of an `<img>`. This string could be saved in a state. The string represents a temporary URL, but much like the temporary file, if we don't release it when we're finished, it will stay in the document memory until the document is unloaded. For React, since we only have one HTML document, this is the entire time the app is running. 

To release, we can use [URL.revokeObjectURL(objectURL)](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static) static method. Pass the string that was created by the previous method as an argument, and the temporary URL will be forgotten. This would perhaps best be achieved in a useEffect. 