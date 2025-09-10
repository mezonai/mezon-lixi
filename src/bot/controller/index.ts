import { Body, Controller, Get, Post } from '@nestjs/common';
import { MezonClient } from 'mezon-sdk';
import { MezonClientService } from 'src/mezon/services/mezon-client.service';

@Controller()
export class UsersController {
  private client: MezonClient;
  constructor(private clientService: MezonClientService) {
    this.client = this.clientService.getClient();
  }

  @Post('/sendMessage')
  async sendMessage(@Body() data) {
    console.log('datadata', data);
    const message = data.message;
    const targets = data.alias;
    const userIds = data.userIds;
    const roles = data.roleAlias;
    const roleIds = data.roleIds;
    const channelId = data.channelId;
    const channel = await this.client.channels.fetch(channelId);
    const isBuzz = data.isBuzz;

    const mentions: any[] = [];
    let userIndex = 0;
    let roleIndex = 0;

    for (const target of targets) {
      let start = 0;
      while (true) {
        const index = message.indexOf(target, start);
        if (index === -1) break;

        mentions.push({
          user_id: userIds[userIndex],
          s: index,
          e: index + target.length,
        });

        userIndex++;
        start = index + target.length;
      }
    }

    for (const role of roles) {
      let start = 0;
      while (true) {
        const index = message.indexOf(role, start);
        if (index === -1) break;

        mentions.push({
          role_id: roleIds[roleIndex],
          s: index,
          e: index + role.length,
        });

        userIndex++;
        start = index + role.length;
      }
    }

    console.log('results', mentions);
    await channel.send(
      { t: message },
      mentions,
      [],
      false,
      true,
      '',
      isBuzz ? 8 : undefined,
    );
  }
}
