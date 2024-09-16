# urelaa-cli

A npm package to generate Urelaa API documentation

## Installation

```
$ npm install urelaa-cli
$ yarn add urelaa-cli
```

## Features

-   Generate API documentation from your codebase
-   Interactive command-line interface for easy configuration
-   Support for multiple programming languages and frameworks
-   Customizable output formats (HTML, Markdown, JSON)
-   Automatic detection of API endpoints and parameters
-   Integration with version control systems for documentation versioning
-   Built-in templates for consistent documentation styling
-   Command-line options for fine-tuning the generation process
-   Ability to exclude specific files or directories from documentation

## Demo

```
     urelaa create fm // to create frontend module
     urelaa create bm // to create backend module

     ####

     urelaa --help  // to see the help menu
     urelaa --version  // to see the version


```

# Setup Guide For Backend

### Setup App Export Area

```
   //open './express-app.js' file and add the auto import marker and auto export marker


    const path = require("path");
    //IMPORT MODULES AREA

    //and on the export section add the following comment

    app.use("/files", express.static(path.join(__dirname, "../")));
    //INCLUDE ROUTES AREA

```

# Setup Guide For Frontend

### Add Markers Into Helpers files

```
    //open './src/helpers/Constants.js' file and add the following end of the file or any
    //area you want

    //CONSTANT_EXPORTS_AREA


    //open './src/helpers/nav.js' file and add the following comment end of the return area

    //NAVS_EXPORTS_AREA

```

### Modify Routes

```
   // open './src/routes/AppRoutes.js' file and add the following comment into require area

     //ROUTE_IMPORTS_AREA

    // and add the following comment into end of the exports array area

    //ROUTE_DECLARATION_AREA


    //open './src/routes/Slugs.js' file and add the following comment into end of the file

    //SLUGS_EXPORTS_AREA






```

### Cache Api

```
   import { BCache } from "cache-wise";
   const cachApi = new BCache();
        const data = await cachApi.get(url, {
            invalidAfter: INVALID_AFTER,
    });
```