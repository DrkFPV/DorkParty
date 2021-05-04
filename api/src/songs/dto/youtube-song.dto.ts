export class YoutubeSongDto{
  readonly kind?: "youtube#searchResult";
  readonly etag?: string;
  readonly id?: {
    readonly kind?: string,
    readonly videoId?: string,
    readonly channelId?: string,
    readonly playlistId?: string
  };
  readonly snippet?: {
    readonly publishedAt?: Date,
    readonly channelId?: string,
    readonly title?: string,
    readonly description?: string,
    readonly thumbnails?: {
      readonly key?:{
        readonly url?: string;
        readonly width?: number;
        readonly height?: number;
      }
    },
    readonly channelTitle?: string,
    readonly liveBroadcastContent?: string
  }
}