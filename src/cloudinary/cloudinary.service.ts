import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async findImageByAssetId(asset_id: string) {
    const { resources } = await v2.search
      .expression(`asset_id:${asset_id}`)
      .execute();

    const data = resources.map((resource) => {
      return {
        public_id: resource.public_id,
      };
    });

    return data;
  }

  async deleteImages(asset_id: string) {
    const imageToDelete = await this.findImageByAssetId(asset_id);

    console.log(imageToDelete);

    for (const img of imageToDelete) {
      await v2.uploader.destroy(img.public_id);
    }
    return { message: 'Image deleted successfully' };
  }
}
