import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async getGalleryImages() {
    const { resources } = await v2.search
      .expression('folder:Gallery')
      .sort_by('public_id', 'desc')
      .execute();

    const data = resources.map((resource) => {
      return {
        id: resource.asset_id,
        url: resource.secure_url,
      };
    });

    return data;
  }

  async getDoorDesigns() {
    const { resources } = await v2.search
      .expression('folder:Designs')
      .sort_by('public_id', 'desc')
      .execute();

    const data = resources.map((resource) => {
      return {
        name: resource.filename,
        id: resource.asset_id,
        url: resource.secure_url,
      };
    });

    return data;
  }

  async getFinishColors() {
    const { resources } = await v2.search
      .expression('folder:Finish')
      .sort_by('public_id', 'desc')
      .execute();

    const data = resources.map((resource) => {
      return {
        name: resource.filename,
        id: resource.asset_id,
        url: resource.secure_url,
      };
    });

    return data;
  }

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
}
