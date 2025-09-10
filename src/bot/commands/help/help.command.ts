import axios from 'axios';
import { ChannelMessage, EMarkdownType, MezonClient } from 'mezon-sdk';
import { CommandMessage } from 'src/bot/base/command.abstract';
import { Command } from 'src/bot/base/commandRegister.decorator';
import { CommandStorage } from 'src/bot/base/storage';
import { DynamicCommandService } from 'src/bot/services/dynamic.service';
import { MezonClientService } from 'src/mezon/services/mezon-client.service';

@Command('help')
export class HelpCommand extends CommandMessage {
  constructor(
    clientService: MezonClientService,
    private dynamicCommandService: DynamicCommandService,
  ) {
    super(clientService);
  }

  async execute(args: string[], message: ChannelMessage) {
    const messageChannel = await this.getChannelMessage(message);
    // const channel = await this.client.channels.fetch('1958142391919579136');
    // // const data = await channel.addQuickMenuAccess({
    // //   clan_id: message.clan_id ?? '',
    // //   menu_name: 'hello',
    // //   action_msg: '*hello',
    // // });
    // console.log('channel.meeting_code', channel.meeting_code);
    // const data = await channel.generateMeetToken({
    //   channel_id: '1958142391919579136',
    //   room_name: channel.meeting_code,
    // });

    // console.log('channel data', data);
    // if (data.token) {
    //   const body = {
    //     room_name: 'playground-YBOo-GImH',
    //     participant_identity: 'bot1',
    //     participant_name: 'botmusic',
    //     url: 'https://cdn.mezon.ai/sounds/7346483973050015537.mp3',
    //     name: 'music',
    //   };
    //   console.log('body', body);
    //   const res = await axios.post(
    //     'https://0d70270bc015.ngrok-free.app/api/playmedia',
    //     body,
    //     {
    //       headers: {
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOiI1NGZlZDg3OS01NDhjLTQzNWYtYmJhYy1hNzA1MjE0NDFhMzciLCJ1aWQiOjE4NDA2NTE1MzAyMzYwNzE5MzYsInVzbiI6IktPTVUiLCJ2cnMiOnsiYXBwbmFtZSI6IktPTVUiLCJjcmVhdG9yIjoiMTgzMTI3NjQ2Mjg4NDI2MTg4OCIsInNoYWRvdyI6ImZhbHNlIn0sImV4cCI6MTc4NzM5MTM1MH0.4bdt8NgZyhVgk_0i1yl5NNVnwG6Zox7e3iztop1zgNA`,
    //       },
    //     },
    //   );
    //   console.log('res', res);
    // }
    const allCommands = CommandStorage.getAllCommands();
    const allCommandsCustom =
      this.dynamicCommandService.getDynamicCommandList();
    const hidenCommandList = [
      'update',
      'register',
      'toggleactive',
      'checkchannel',
      'toggleprivatechannel',
      'togglechannel',
    ];
    const allCommandKeys = Array.from(allCommands.keys()).filter(
      (item) => !hidenCommandList.includes(item),
    );
    const messageContent =
      'Lixi - Help Menu' +
      '\n' +
      '• Lixi (' +
      allCommandKeys.length +
      ')' +
      '\n' +
      allCommandKeys.join(', ');
    const messageSent = await messageChannel?.reply({
      t: messageContent,
      mk: [{ type: EMarkdownType.PRE, s: 0, e: messageContent.length }],
    });
    return messageSent;
  }
}
