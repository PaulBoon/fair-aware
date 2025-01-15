import {
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { IsGlobalAlpha } from 'src/decorators/is-global-alpha';
import { DigitalObjectTypeSchema } from 'src/digital-object-type-schemas/entities/digital-object-type-schema.entity';
import { DigitalObjectType } from 'src/digital-object-types/entities/digital-object-type.entity';
import { Language } from 'src/languages/entities/language.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['digitalObjectTypeSchema', 'language', 'digitalObjectType'])
export class ContentLanguageModule {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  version: string; // Derived from the version of the related DigitalObjectTypeSchema.

  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  @Column()
  dotCode: string; // Derived from the related DigitalObjectType.

  @IsNotEmpty()
  @IsGlobalAlpha()
  @Column()
  nativeLanguageLabel: string; // Derived from the related Language. (Not sure how useful this is)

  @IsNotEmpty()
  @IsString()
  @IsJSON()
  @Column({ type: 'jsonb' })
  schema: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @IsNotEmpty()
  @ManyToOne(() => DigitalObjectType, (dot) => dot.contentLanguageModules, {
    onDelete: 'CASCADE',
  })
  digitalObjectType: DigitalObjectType;

  @IsNotEmpty()
  @IsString()
  @ManyToOne(
    () => DigitalObjectTypeSchema,
    (dotSchema) => dotSchema.contentLanguageModules,
    {
      onDelete: 'CASCADE',
    },
  )
  digitalObjectTypeSchema: DigitalObjectTypeSchema;

  @ManyToOne(() => Language, (language) => language.contentLanguageModules, {
    onDelete: 'CASCADE',
  })
  language: Language;
}
