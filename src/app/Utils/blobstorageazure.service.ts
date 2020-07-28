import { Injectable } from '@angular/core';
import { 
  AnonymousCredential, 
  BlobURL,
  BlockBlobURL,  
  ContainerURL, 
  ServiceURL, 
  StorageURL, 
  Aborter,SharedKeyCredential,
  uploadBrowserDataToBlockBlob,
  BlobUploadCommonResponse,
} from '@azure/storage-blob';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { BehaviorSubject } from 'rxjs'; 
 
@Injectable({
  providedIn: 'root'
})
export class BlobstorageazureService {
  private static _uploadProgressSource = new BehaviorSubject<number>(0);
  public static UploadProgress  ;
  constructor() { }

  public static async  uploadBlobToStorage (file: File,filename): Promise<BlobUploadCommonResponse> {
    this.UploadProgress = this._uploadProgressSource.asObservable();
  
    const anonymousCredential = new AnonymousCredential();
    const pipeline = StorageURL.newPipeline(anonymousCredential); 
    const serviceURL = new ServiceURL(
      `https://sphv2.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2030-07-27T11:20:40Z&st=2020-07-27T03:20:40Z&spr=https,http&sig=AdG6XqrNoYCbsR9vPpsgyGzFy0DAyav2f2wwMiu%2BiYQ%3D`,
      pipeline
    );
    const containerName = "randomproject";
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const blobName = filename+".png";
    const blobUrl = BlobURL.fromContainerURL(containerURL, blobName);
    const blockblobURL = BlockBlobURL.fromBlobURL(blobUrl);
 
    const options = {blockSize: this.getBlockSize(file), parallelism: 10, progress: (transferProgressEvent: TransferProgressEvent) => {
      this.onProgressChanged(transferProgressEvent, file, this._uploadProgressSource);
    } };
    const blobUploadCommonResponse = await 
    uploadBrowserDataToBlockBlob(Aborter.none, file, blockblobURL,options);

    return blobUploadCommonResponse;
  }

  private static getBlockSize(file: File): number {
    const size32Mb = 1024 * 1024 * 32;
    const size4Mb = 1024 * 1024 * 4;
    const size512Kb = 1024 * 512;

    return file.size > size32Mb ? size4Mb : size512Kb;
  }  

  private static onProgressChanged(transferProgressEvent: TransferProgressEvent, file: File,
    uploadProgressSource: BehaviorSubject<number>) {
      const percentCompleted: number = Math.round((transferProgressEvent.loadedBytes / file.size) * 100);
      uploadProgressSource.next(percentCompleted);
  }  
}
