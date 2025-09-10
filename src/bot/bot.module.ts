import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { User } from './models/user.entity';
import { ExtendersService } from './services/extenders.services';
import { DynamicCommandService } from './services/dynamic.service';
import { HelpCommand } from './commands/help/help.command';
import { BotGateway } from './events/bot.gateways';
import { ListenerChannelMessage } from './listeners/onChannelMessage.listener';
import { CommandBase } from './base/command.handle';
import { MezonBotMessage } from './models/mezonBotMessage.entity';
import { ListenerMessageButtonClicked } from './listeners/onMessageButtonClicked.listener';
import { ListenerTokenSend } from './listeners/tokensend.handle';
import { WithdrawTokenCommand } from './commands/casino/Withdraw';
import { AccBalanceCommand } from './commands/casino/accBalance';
import { LixiCommand } from './commands/lixi/lixi.command';
import { LixiService } from './commands/lixi/lixi.service';
import { BlockRut } from './models/blockrut.entity';
import { BlockRutCommand } from './commands/casino/BlockRut';
import { BanCommand } from './commands/ban/ban';
import { UnbanCommand } from './commands/ban/unban';
import { Transaction } from './models/transaction.entity';
import { ChecktransactionCommand } from './commands/transaction/checktransaction.command';
import { JackPotTransaction } from './models/jackPotTransaction.entity';
import { UpdateCommand } from './commands/update/update.command';
import { RedisCacheService } from './services/redis-cache.service';
import { UserCacheService } from './services/user-cache.service';
import { ReplyStatsService } from './services/reply-stats.service';
import { UsersController } from './controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    DiscoveryModule,
    TypeOrmModule.forFeature([
      User,
      MezonBotMessage,
      BlockRut,
      Transaction,
      JackPotTransaction,
    ]),
    HttpModule,
  ],
  providers: [
    CommandBase,
    BotGateway,
    ListenerChannelMessage,
    ListenerMessageButtonClicked,
    HelpCommand,
    ConfigService,
    ExtendersService,
    DynamicCommandService,
    RedisCacheService,
    UserCacheService,
    ReplyStatsService,
    ListenerTokenSend,
    WithdrawTokenCommand,
    AccBalanceCommand,
    LixiCommand,
    LixiService,
    BlockRutCommand,
    BanCommand,
    UnbanCommand,
    ChecktransactionCommand,
    UpdateCommand,
  ],
  controllers: [UsersController],
})
export class BotModule {}
