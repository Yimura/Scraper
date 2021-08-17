export interface SearchTypes {
  ANY: "CAA%3D";
  CHANNEL: "EgIQAg%3D%3D";
  LIVE: "EgJAAQ%3D%3D";
  MOVIE: "EgIQBA%3D%3D";
  PLAYLIST: "EgIQAw%3D%3D";
  VIDEO: "EgIQAQ%3D%3D";
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface GeneralData {
  id: string;
  link: string;
  thumbnail: string;
  title: string;
}

export interface ShareableGeneralData extends GeneralData {
  shareLink: string;
}

export interface VideoPreview extends ShareableGeneralData {
  duration: number;
  duration_raw: string;
  views: number;
}

export interface ChannelPreview {
  name: string;
  link: string;
  verified: boolean;
}

export interface Video extends ShareableGeneralData {
  description: string;
  duration: number;
  duration_raw: string;
  uploaded: string;
  views: number;
  channel: ChannelPreview;
}

export interface Playlist extends GeneralData {
  preview: VideoPreview[];
  duration: number;
  duration_raw: string;
}

export interface Stream extends ShareableGeneralData {
  watching: number;
  channel: ChannelPreview;
}

export interface Channel {
  channelId: string;
  description: string;
  link: string;
  thumbnails: Thumbnail[];
  subscribed: boolean;
  uploadedVideos: number;
  verified: boolean;
}

export interface Results {
  channels: Channel[];
  playlists: Playlist[];
  streams: Stream[];
  videos: Video[];
}

export interface SearchOptions {
  searchType?: keyof SearchTypes;
  language?: string;
}

declare class Scraper {
  private _lang: string;

  public constructor(language?: string);

  private _extractData(
    json: Record<string, unknown>
  ): Record<string, unknown>[];
  private _fetch(
    search_query: string,
    searchType?: keyof SearchTypes,
    requestedLang?: string
  ): Promise<string>;
  private _getSearchData(webPage: string): Record<string, unknown>;
  private _parseData(data: Record<string, unknown>[]): Results;

  public search(query: string, options?: SearchOptions): Promise<Results>;
  public setLang(language?: string): void;
}
