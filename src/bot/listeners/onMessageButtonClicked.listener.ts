import { OnEvent } from '@nestjs/event-emitter';
import { Events } from 'mezon-sdk';
import { Injectable } from '@nestjs/common';
import { LixiService } from '../commands/lixi/lixi.service';

@Injectable()
export class ListenerMessageButtonClicked {
  constructor(
    private lixiService: LixiService,
  ) {}

  @OnEvent(Events.MessageButtonClicked)
  async hanndleButtonForm(data) {
    try {
      const args = data.button_id.split('_');
      const buttonConfirmType = args[0];
      switch (buttonConfirmType) {
        case 'lixi':
          this.handleSelectLixi(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('hanndleButtonForm ERROR', error);
    }
  }

  async handleSelectLixi(data) {
    try {
      await this.lixiService.handleSelectLixi(data);
    } catch (error) {
      console.log('ERORR handleSelectPoll', error);
    }
  }
}
