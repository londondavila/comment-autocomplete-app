import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClickOutsideDirective } from './drop-down-directive';
import { SearchFilterPipe } from './search.component';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  viewProviders: [ClickOutsideDirective]
})
export class CommentsComponent implements OnInit {

  @Input() triggerChar = '@';

  @Input() triggerCharPosition!: number;

  // TODO
  @Input() closeMenuOnBlur = false;

  selectedUser!: any;
  testString!: string;

  @HostListener('keydown', ['$event'])
  handleAt(event: KeyboardEvent) {

    // possible - refactor as case - switch?
    // maybe add to ngAfterViewInit ?
    if (this.textarea == '') {
      this.panelOpen = false;
    }

    if (event.key === this.triggerChar) {
      // console.log('YES')
      // console.log(this.panelOpen)
      this.panelOpen = true;

      // help with @ as first key pressed
      if (!this.textarea) {
        this.triggerCharPosition = 1;
      }

      // get index of trigger
      if (this.textarea) {
        this.triggerCharPosition = this.textarea.length + 1;
        // console.log('trigger pos: ', this.triggerCharPosition)
      }
    }

    // moved from afterviewinit()
    if (event.key != this.triggerChar && this.textarea.includes(this.triggerChar)) {
      this.hidden = this.textarea.slice(this.textarea.lastIndexOf(this.triggerChar) + 1);

      if (this.hidden.length < 0) {
        this.panelOpen = false;
      }

      if (this.hidden == this.selectedUser) {
        this.panelOpen = false;
      }
    }
  }

  comments = [
    { message: 'Waiting on parts...' },
    { message: '@Kevin can you order more parts?' },
  ];
  
  users = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
  ];

  constructor(private fb: FormBuilder) {}

  usersArray: any = [];

  /**
   * Uses users$ object to search every comment saved, and calls
   * onTag() to tag any matches.
   */
  onSearchComments() {
    // could later use regex instead of usersArray
    for (let user of this.usersArray) {
      this.comments.forEach((comment, index) => {
        if (comment.message.search(user) > -1) {
          // console.log(`FOUND USER ${user}`);
          comment.message = this.onTag(user, comment.message);
        }
      });
    }
  }

  /**
   * Open tagging interface to select user from users$ object,
   * and tag them in the textarea using onTag().
   * @param {event} keyboardEvent - Read keypress event.
   */
  onKeyPressEvent(event: any) {
  }

  /**
   * Checks if form textarea is not empty,
   * and adds what is there as string to comments object.
   */
  onAddComment() {
    let input = this.formGroup.get('text')?.value;
    if (input) {
      // console.log('add')
      // add textarea as string
      let newComment = { message: this.formGroup.get('text')?.value }
      this.comments.push(newComment)
      this.onSearchComments();
      this.formGroup.reset();
    }
    this.panelOpen = false;
  }
  // old method without reactiveforms
  //  onAddComment() {
  //   if (this.textarea != undefined) {
  //     let add = { message: this.textarea };
  //     this.comments.push(add);
  //     this.onSearchComments();
  //     this.textarea = '';
  //   }
  // }

  /**
   * Applies a CSS <span> tag to bold users found in user object.
   * @param {string} user - The username that you have found and wish to tag.
   * @param {string} comment - The comment that you will be adding a tag to.
   */
   onTag(user: string, comment: string) {
    let span = `<span class='user'>${user}</span>`;
    return comment.split(user).join(span);
  }

  /**
   * Plugs in the user chosen from
   * the list of users filtered.
   * @param {string} selection - The selected user to pass in.
   */
  select(selection: string) {
    // set selectedUser for later reference
    this.selectedUser = selection;
    // this.textarea += selection + ' '; --- OLD
    // replaces + fills in autocomplete
    this.textarea = this.textarea.substring(0, this.triggerCharPosition) + selection;
    // TODO: add focus back to textarea

    // set hidden to none and panel to close
    this.hidden = '';
    this.panelOpen = false;
  }
  
  panelOpen: boolean = false;
  textarea!: string;
  TESTtext!: string;
  user!: string;
  list!: string;
  hidden!: string;

  formGroup! : FormGroup;

  initForm() {
    this.formGroup = this.fb.group({
      'user' : [''],
      'list' : [''],
      text: new FormControl(),
    })
  }

  ngOnInit(): void {
    // init form
    this.initForm();
    this.panelOpen = false;
    this.textarea = '';

    // populate new array with users for tagging
    for (let i = 0; i < this.users.length; i++) {
      this.usersArray.push('@' + this.users[i].name);
    }

    this.onSearchComments();
  }

  ngAfterViewInit(): void {
  //   this.formGroup.get('text')?.valueChanges.subscribe(res => {
  //     console.log(res)
  //     console.log('hidden: ', this.hidden)
  //     if (res.includes(this.triggerChar)) {
  //       this.hidden = this.textarea.slice(this.textarea.lastIndexOf(this.triggerChar) + 1);

  //       if (this.hidden.length < 0) {
  //         this.panelOpen = false;
  //       }

  //       if (this.hidden == this.selectedUser) {
  //         this.panelOpen = false;
  //       }
  //     }
  //     console.log('input data is ', res);
  //     if (this.formGroup.get('text')?.value.includes(this.usersArray)) {
  //       console.log('found something')
  //     }
  //     if (res.indexOf('@') > -1) {
  //       console.log('@ has been pressed');
  //       let begin = this.formGroup.get('text')?.value.indexOf('@');
  //       if (res.indexOf(' ', begin) > -1) {
  //         this.panelOpen = false;
  //       }
  //     }

  //   })
  }
}
