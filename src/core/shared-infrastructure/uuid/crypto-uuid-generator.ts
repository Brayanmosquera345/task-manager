import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UuidGenerator } from '@/core/shared-domain/interfaces/uuid-generator';

@Injectable()
export class CryptoUuidGenerator implements UuidGenerator {
  generate(): string {
    return randomUUID();
  }
}
