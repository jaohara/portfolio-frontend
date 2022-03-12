/*
  A type to represent the data returned from the Project table in the database.
  Uses an array to store technologies (this.techs) returned as well.
*/

// I forgot what I used this for. I think its purpose is to 
//  create an object with JS variable names from SQL database names?
export class ProjectData {
  deployedUrl?: string | null;
  description: string;
  githubUrl?: string | null;
  id: number; // should this be a number?
  imageId?: number | null;
  imageUrl?: string | null;
  isScrap: boolean;
  modified: string;
  published: string;
  title: string;
  techs: Array<string>;
  userId?: number | null; // do I still need this?

  constructor (
    deployed_url: string | null = null,
    description: string,
    github_url: string | null = null,
    id: number,
    image_id: number | null = null,
    image_url: string | null = null,
    is_scrap: boolean,
    modified: string,
    published: string,
    techs: Array<string> = [],
    title: string,
    user_id: number | null = null
  ) {
    this.deployedUrl  = deployed_url;
    this.description  = description;
    this.githubUrl    = github_url;
    this.id           = id;
    this.imageId      = image_id;
    this.imageUrl     = image_url;
    this.isScrap      = is_scrap;
    this.modified     = modified;
    this.published    = published;
    this.techs        = techs;
    this.title        = title;
    this.userId       = user_id;
  }
};

export interface Tag {
  id: number,
  name: string
}

export interface Project {
  deployed_url?: string,
  description?: string,
  github_url?: string,
  id?: number,
  image_id?: number,
  image_url?: string,
  is_scrap?: number | boolean,
  modified?: string,
  published?: string,
  primary_key?: number | string,
  title?: string,
  user_id?: number,
};

export interface Post {
  body?: string,
  header_image_url?: string,
  hidden?: number | boolean,
  id?: number,
  modified?: string,
  primary_key?: number | string,
  published?: string,
  slug?: string,
  title?: string,
  user_id?: number,
};

export interface Page {
  body?: string,
  hidden?: number | boolean,
  modified?: string,
  name?: string,
  pretty_name?: string,
  primary_key?: number | string,
};

export interface Image {
  created?: string,
  description?: string,
  id?: number,
  name?: string,
  static_url?: string,
}

export interface MenuControls {
  name: string,
  hide: () => void,
};

export type ActiveMenuType = "filter" | "sort" | "search" | null;