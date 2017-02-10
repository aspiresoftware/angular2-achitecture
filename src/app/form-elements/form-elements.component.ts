import { Component, OnInit, ViewChild } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.css']
})
export class FormElementsComponent implements OnInit {

  // Textbox with Softsearch
  private searchStr: string;
  private dataService: CompleterData;
  private searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];

  // Selectbox with Softsearch
  form: FormGroup;
  multiple0: boolean = false;
  multiple1: boolean = true;
  options0: Array<any> = [];
  options1: Array<any> = [];
  selection: Array<string>;

  @ViewChild('preSingle') preSingle;
  @ViewChild('preMultiple') preMultiple;

  logSingleString: string = '';
  logMultipleString: string = '';

  // TextArea
  private textValue = 'initial value';
  private log: string = '';

  // Switch
  checked: boolean;

  // Slider
  val: number;
  rangeValues: number[];

  constructor(
    private completerService: CompleterService
  ) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    const numOptions = 100;
    const opts = new Array(numOptions);

    for (let i = 0; i < numOptions; i++) {
        opts[i] = {
            value: i.toString(),
            label: i.toString()
        };
    }

    this.options0 = opts.slice(0);
    this.options1 = opts.slice(0);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));
    this.form.addControl('selectMultiple', new FormControl(''));
  }

  onSingleOpened() {
    this.logSingle('- opened');
  }

  onSingleClosed() {
    this.logSingle('- closed');
  }

  onSingleSelected(item) {
    this.logSingle('- selected (value: ' + item.value  + ', label:' + item.label + ')');
  }

  onSingleDeselected(item) {
    this.logSingle('- deselected (value: ' + item.value  + ', label:' + item.label + ')');
  }

  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected(item) {
    this.logMultiple('- selected (value: ' + item.value  + ', label:' + item.label + ')');
  }

  onMultipleDeselected(item) {
    this.logMultiple('- deselected (value: ' + item.value  + ', label:' + item.label + ')');
  }

  private logSingle(msg: string) {
    this.logSingleString += msg + '\n';
    // Let change detection do its work before scrolling to div bottom.
    setTimeout(() => {
      this.scrollToBottom(this.preSingle.nativeElement);
    });
  }

  private logMultiple(msg: string) {
    this.logMultipleString += msg + '\n';
    // Let change detection do its work before scrolling to div bottom.
    setTimeout(() => {
        this.scrollToBottom(this.preMultiple.nativeElement);
    });
  }

  private scrollToBottom(elem) {
    elem.scrollTop = elem.scrollHeight;
  }

  private logText(value: string): void {
    this.log += `Text changed to '${value}'\n`;
  }

  private logCheckbox(element: HTMLInputElement): void {
    this.log += `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`;
  }

  private logRadio(element: HTMLInputElement): void {
    this.log += `Radio ${element.value} was selected\n`;
  }

}
