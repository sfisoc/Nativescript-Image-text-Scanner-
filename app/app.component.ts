import { Component } from "@angular/core";
import * as camera from "nativescript-camera";
import { Image } from "ui/image";
import { TextField } from "ui/text-field";
import { ImageSource } from "image-source";
import { Page } from "ui/page";
import { OCR, RetrieveTextResult } from "nativescript-ocr";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    public picture: any;
    private ocr: OCR;
    private read: string;

    public constructor(private page: Page) {
        this.ocr = new OCR();
        camera.requestPermissions();
        this.picture = "https://cloud.githubusercontent.com/assets/1245462/26420117/b72aca2c-408f-11e7-9b19-a36f61a4b28a.png";
    }

    public takePicture() {

        camera.takePicture()
            .then((imageAsset) => {
                console.log("Result is an image asset instance");
                let image = new Image();

                image.src = imageAsset;
                this.picture = image.src;
                this.doRecognize(imageAsset);
            }).catch((err) => {
                console.log("Errors -> " + err.message);
            });
    }

    decodetext(img)
    {

        this.ocr.retrieveText({
            image: img,
                 // you can include only certain characters in the result 
             // .. or you can exclude certain characters from the result 
            onProgress: (percentage: number) => {
                console.log(`Decoding progress: ${percentage}%`);
            }
        }).then(
            (result: RetrieveTextResult) => {
                //this.set(HelloWorldModel.BUSY_KEY, false);
               // alert(result.text);
                console.log(`Result : ${result.text}`);
                this.read= result.text;
               
            }, (error: string) => {
                alert(error);
                console.log(`Error: ${error}`);
            })
    }

    doRecognize(src): void {

        let img: ImageSource = new ImageSource();
        
       
        img.fromAsset(src).then
        (
            img=>{this.decodetext(img)}
        )
        .catch()
        {
            erro=>{console.log(" Erro :"+erro)}
        }
     
    }


}
