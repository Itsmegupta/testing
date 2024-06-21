import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JamTech';
  myForm!: FormGroup;
  currentFile?: File;
  message = '';
  preview = ''
  constructor(private formBuilder: FormBuilder,private common:CommonService) { }

  ngOnInit(): void {
    // Initialize the form structure and validation
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(form:any): void {
    if (this.myForm.valid) {
      // Process the form data here (e.g., send it to a backend service)
      console.log(this.myForm.value);
      // Optionally, you can reset the form after successful submission
      this.myForm.reset();
    } else {
  
    }
  }
  url:any
  formdata = new FormData();

  selectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        var url = e.target.files[0].name;
  
        this.formdata = new FormData();
        this.formdata.append('image', e.target.files[0], url);
  
        this.common.uploadProfilePic(this.formdata).subscribe((data: any) => {
          if (data === 'success') {
            console.log('Image uploaded successfully.');
          }
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  

  upload(): void {
    if (this.currentFile) {
      console.log(this.currentFile);
      
      // this.uploadService.upload(this.currentFile).subscribe({
      //   next: (event: any) => {
      //     if (event instanceof HttpResponse) {
      //       this.message = event.body.message;
      //       this.imageInfos = this.uploadService.getFiles();
      //     }
      //   },
      //   error: (err: any) => {
      //     console.log(err);

      //     if (err.error && err.error.message) {
      //       this.message = err.error.message;
      //     } else {
      //       this.message = 'Could not upload the image!';
      //     }
      //   },
      //   complete: () => {
      //     this.currentFile = undefined;
      //   },
      // });
    }
  }

}
