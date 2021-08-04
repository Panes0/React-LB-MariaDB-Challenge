import {Entity, model, property} from '@loopback/repository';

@model()
export class Movie extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  release?: string;


  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovieWithRelations = Movie & MovieRelations;
