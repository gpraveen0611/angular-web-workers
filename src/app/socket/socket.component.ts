import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item'; 
@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {
  defaultTimer: number = 1000;
  defaultSize: number = 1000;
  additionalIds: string = "12, 15, 16, 18, 25, 26, 78, 52, 29, 30";
  b2bWorker: any;
  result: Item[] = [];

  constructor() {

  }

  intializeB2bWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new 
      this.b2bWorker = new Worker(new URL('./b2b.worker', import.meta.url));
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  getData() {
    this.intializeB2bWorker();
    this.b2bWorker.postMessage({ 'timer': this.defaultTimer, 'size': this.defaultSize, 'ids': this.additionalIds });
    this.b2bWorker.addEventListener('message', ({ data }: any) => {
      const arr = this.additionalIds.split(',')
      arr.forEach((element, index) => {
        data[index].id = element;
      });
      this.result = data; 
    });
  }

  stopWorker() {
    this.b2bWorker.terminate()
  }

  ngOnInit(): void {
    this.getData();
  }

}
