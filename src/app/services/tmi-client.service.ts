import { CHANNEL } from '@/consts/twitch';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import tmi from 'tmi.js';

@Injectable()
export class TmiClientService {
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  client: tmi.Client;

  constructor() {
    this.client = new tmi.Client({
      options: { debug: true },
      channels: [CHANNEL],
    });
  }

  connect(): Promise<[string, number]> {
    return this.client.connect();
  }

  disconnect(): Promise<[string, number]> {
    return this.client.disconnect();
  }
}
