import { Global, Module } from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { QueueService } from "../queue/queue.service";

/**
 * CommonModule — provider global untuk DatabaseService & QueueService.
 * Di-import oleh semua feature module tanpa perlu deklarasi berulang.
 */
@Global()
@Module({
  providers: [DatabaseService, QueueService],
  exports: [DatabaseService, QueueService],
})
export class CommonModule {}
