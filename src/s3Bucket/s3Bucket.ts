import { NextFunction, Request, Response } from 'express';
import multer, { Field, MulterError } from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { BadRequestHttpException } from '@/exceptions/HttpException';

class FileUploadService {
    private AWS_BUCKET: string = process.env.AWS_BUCKET as string;
    private s3: S3Client = new S3Client({
        region: process.env.AWS_REGION as string,
        credentials: {
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        },
    });

    private supportedFileTypes: string[] = ['.xlsx', '.xls', '.ods', '.jpg', 'png'];

    private multerS3Storage = multerS3({
        s3: this.s3,
        bucket: this.AWS_BUCKET,
        acl: 'public-read',
        key: (req: Request, file, cb) => {
            // Sanitize the filename
            const fileName = path.basename(file.originalname);
            cb(null, fileName);
        },
    });

    public upload = multer({
        storage: this.multerS3Storage,
    }).fields(this.getUploadFields());

    public uploadLocal = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            if (!this.supportedFileTypes.includes(ext)) {
                return callback(new BadRequestHttpException(`Only support ${this.supportedFileTypes.join(', ')} files`));
            }
            callback(null, true);
        },
    }).single('document');

    private getUploadFields(): Field[] {
        return [
            { name: 'kaizen_before_image', maxCount: 5 },
            { name: 'kaizen_after_image', maxCount: 5 },
            { name: 'manager_sign', maxCount: 1 }
        ];
    }

    public uploadHandler = (req: Request, res: Response, next: NextFunction): void => {
        this.upload(req, res, (error: any) => {
            if (error instanceof MulterError) {
                console.error('Multer Error:', error);
                res.status(400).json({ error: `Multer Error: ${error.message}` });
            } else if (error) {
                console.error('Error:', error);
                res.status(500).json({ error: `Error: ${error.message}` });
            } else {
                next();
            }
        });
    };
}

export default FileUploadService;
