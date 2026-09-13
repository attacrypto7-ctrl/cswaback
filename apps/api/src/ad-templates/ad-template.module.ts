import { Module } from "@nestjs/common";
import { AdTemplateController } from "./ad-template.controller";
import { AdTemplateService } from "./ad-template.service";

@Module({
  controllers: [AdTemplateController],
  providers: [AdTemplateService],
  exports: [AdTemplateService],
})
export class AdTemplateModule {}
