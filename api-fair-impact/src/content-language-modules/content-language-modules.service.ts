import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContentLanguageModuleDto } from './dto/create-content-language-module.dto';
import { UpdateContentLanguageModuleDto } from './dto/update-content-language-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentLanguageModule } from './entities/content-language-module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentLanguageModulesService {
  private readonly logger = new Logger(ContentLanguageModulesService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(ContentLanguageModule)
    private readonly contentLanguageModuleRepository: Repository<ContentLanguageModule>,
  ) {}

  async create(
    createContentLanguageModuleDto: CreateContentLanguageModuleDto,
  ): Promise<ContentLanguageModule> {
    let contentLanguageModule = this.contentLanguageModuleRepository.create({
      dotCode: createContentLanguageModuleDto.digitalObjectType.code,
      nativeLanguageLabel: createContentLanguageModuleDto.language.nativeLabel,
      version: createContentLanguageModuleDto.digitalObjectTypeSchema.uuid,
      ...createContentLanguageModuleDto,
    });

    try {
      contentLanguageModule = await this.contentLanguageModuleRepository.save(
        contentLanguageModule,
      );
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Content Language Module already exists!');
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to create contentLanguageModule!',
      );
    }

    return contentLanguageModule;
  }

  findAll() {
    return `This action returns all contentLanguageModules`;
  }

  async findOne(uuid: string): Promise<ContentLanguageModule> {
    try {
      const contentLanguageModule =
        await this.contentLanguageModuleRepository.findOne({
          where: { uuid },
        });

      if (!contentLanguageModule) {
        throw new NotFoundException(
          `Content Language Module with uuid ${uuid} not found!`,
        );
      }

      return contentLanguageModule;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch contentLanguageModule!',
      );
    }
  }

  update(
    id: number,
    updateContentLanguageModuleDto: UpdateContentLanguageModuleDto,
  ) {
    return `This action updates a #${id} contentLanguageModule`;
  }

  async remove(uuid: string): Promise<ContentLanguageModule> {
    try {
      const contentLanguageModule = await this.findOne(uuid);

      return this.contentLanguageModuleRepository.remove(contentLanguageModule);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        'Failed to remove contentLanguageModule!',
      );
    }
  }
}
