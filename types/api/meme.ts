export type MemeAPIResponse = {
  postLink: string
  subreddit: string
  title: string
  url: string
  nsfw: string
  spoiler: string
  author: string
  ups: string
  preview: [string, ...string[]]
}
