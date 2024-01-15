import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer.prompt([
    {
        name: "URL",
        message: "Enter URL to generate a QR code:",
        type: "input"
    }
])
    .then((answers) => {
        // Get user input
        const url = answers.URL;

        // Create QR image of user input 
        let qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream("qr_code.png"));

        // Store user input to text file
        fs.writeFile("url.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });