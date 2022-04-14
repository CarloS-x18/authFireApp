import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photoProfile'
})
export class PhotoProfilePipe implements PipeTransform {

  transform( photoUrl: string | undefined ): string {

    console.log(photoUrl)

    if( photoUrl !== undefined ) {
      return photoUrl;
    } else {
      return './assets/img/profile.png'
    }

  }

}
