import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { KnowledgeService } from "./knowledge.service";
import { Tenant } from "../common/decorators/tenant.decorator";

/**
 * KnowledgeController — manajemen Basis Pengetahuan per tenant.
 * Prefix: /api/knowledge/*
 */
@Controller("knowledge")
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  // ---- Documents ----
  @Get("docs")
  async getDocs(@Tenant("tenantId") tenantId: string) {
    return this.knowledgeService.getDocs(tenantId);
  }

  @Post("docs")
  @UseInterceptors(FileInterceptor("file"))
  async uploadDoc(
    @Tenant("tenantId") tenantId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { nama?: string; tipe?: string },
  ) {
    if (!file) throw new BadRequestException("File tidak ditemukan");
    return this.knowledgeService.uploadDoc(tenantId, file, body);
  }

  @Delete("docs/:id")
  async deleteDoc(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.knowledgeService.deleteDoc(tenantId, id);
  }

  @Get("docs/:id/chunks")
  async getDocChunks(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.knowledgeService.getDocChunks(tenantId, id);
  }

  // ---- FAQ ----
  @Get("faq")
  async getFaq(@Tenant("tenantId") tenantId: string) {
    return this.knowledgeService.getFaq(tenantId);
  }

  @Post("faq")
  async createFaq(
    @Tenant("tenantId") tenantId: string,
    @Body() body: { pertanyaan: string; jawaban: string },
  ) {
    return this.knowledgeService.createFaq(tenantId, body);
  }

  @Put("faq/:id")
  async updateFaq(
    @Tenant("tenantId") tenantId: string,
    @Param("id") id: string,
    @Body() body: { pertanyaan?: string; jawaban?: string },
  ) {
    return this.knowledgeService.updateFaq(tenantId, id, body);
  }

  @Delete("faq/:id")
  async deleteFaq(@Tenant("tenantId") tenantId: string, @Param("id") id: string) {
    return this.knowledgeService.deleteFaq(tenantId, id);
  }

  // ---- Search (RAG) ----
  @Get("search")
  async search(
    @Tenant("tenantId") tenantId: string,
    @Body() query: string,
  ) {
    // Endpoint ini akan dipanggil oleh worker untuk RAG
    return this.knowledgeService.search(tenantId, query);
  }
}
