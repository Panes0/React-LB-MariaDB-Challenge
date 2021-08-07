import { inject } from "@loopback/core";
import {
    post,
    Request,
    requestBody,
    Response,
    RestBindings,
} from "@loopback/rest";
import { FILE_UPLOAD_SERVICE } from "../keys";
import { FileUploadHandler, MovieObj } from "../types";

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import axios from "axios";

/**
 * A controller to handle file uploads using multipart/form-data media type
 */
export class FileUploadController {
    /**
     * Constructor
     * @param handler - Inject an express request handler to deal with the request
     */
    constructor(
        @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadHandler,
    ) {}
    @post("/files", {
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        },
                    },
                },
                description: "Files and fields",
            },
        },
    })
    async fileUpload(
        @requestBody.file()
        request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response,
    ): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            this.handler(request, response, (err: unknown) => {
                if (err) reject(err);
                else {
                    resolve(FileUploadController.getFilesAndFields(request));
                }
            });
        });
    }

    /**
     * Get files and fields for the request
     * @param request - Http request
     */
    private static getFilesAndFields(request: Request) {
        const uploadedFiles = request.files;
        const mapper = (f: globalThis.Express.Multer.File) => ({
            fieldname: f.fieldname,
            originalname: f.originalname,
            encoding: f.encoding,
            mimetype: f.mimetype,
            size: f.size,
        });
        let files: object[] = [];

        ///////TESTING////////////////////
        //console.log(files);
        ///////////////////////////

        if (Array.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper);
        } else {
            for (const filename in uploadedFiles) {
                files.push(...uploadedFiles[filename].map(mapper));
            }
        }

        FileUploadController.parseAndLoadToDB();

        return { files, fields: request.body };
    }

    static async parseAndLoadToDB() {
        //parse CSV file
        const results: any = [];
        let normalized_results: MovieObj[] = [];
        let new_file_path = path.join(
            __dirname,
            "../../",
            `${process.env.UPLOAD_DIR}/peliculas.csv`,
        );
        fs.createReadStream(new_file_path)
            .pipe(
                csv({
                    headers: ["title", "description", "release"],
                    separator: ";",
                }),
            )
            .on("data", data => results.push(data))
            .on("end", async () => {
                console.log(results);
                normalized_results = results.map((movie: any) => {
                    const norm_movie = {
                        title: movie.title,
                        description: movie.description,
                        release: movie.release,
                    };
                    console.log("NORM MOVIE", norm_movie);
                    return norm_movie;
                });
                
                //Send data to DB
                for (let movie of normalized_results) {
                    axios
                        .post(
                            "http://localhost:3001/movies",
                            JSON.stringify(movie),
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            },
                        )
                        .catch(function (error) {
                            console.log("ERROR: ", error.response.data);
                        });

                    //console.log(movie);
                }
            });
    }
}
