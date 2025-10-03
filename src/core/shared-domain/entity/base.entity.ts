import { CreatedAt } from '../value-objects/create-at.vo';
import { DeletedAt } from '../value-objects/delete-at.vo';
import { UpdatedAt } from '../value-objects/update-at.vo';
import { Uuid } from '../value-objects/uuid.vo';

export abstract class EntityBase {
  protected readonly _id: Uuid;
  protected readonly _createdAt: CreatedAt;
  protected _updatedAt: UpdatedAt;
  protected _deletedAt: DeletedAt;
  constructor(id: Uuid) {
    const now = new Date();
    this._id = id;
    this._createdAt = new CreatedAt(now);
    this._updatedAt = new UpdatedAt(now, now);
    this._deletedAt = new DeletedAt(null, now);
  }

  // getters públicos
  get id(): string {
    return this._id.value;
  }

  get createdAt(): Date {
    return this._createdAt.value;
  }

  get updatedAt(): Date {
    return this._updatedAt.value;
  }

  get deletedAt(): Date | null {
    return this._deletedAt.value;
  }

  public markUpdated(): void {
    this._updatedAt = new UpdatedAt(new Date(), this._createdAt.value);
  }

  public softDelete(): void {
    this._deletedAt = new DeletedAt(new Date(), this._createdAt.value);
  }

  public restore(): void {
    this._deletedAt = new DeletedAt(null, this._createdAt.value);
    this.markUpdated();
  }
}
