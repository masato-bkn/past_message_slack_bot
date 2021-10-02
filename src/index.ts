import { WebClient } from '@slack/web-api';
import { Message } from '@slack/web-api/dist/response/GroupsRepliesResponse';

const CHANNEL = process.env.CHANNEL || '';

const client = new WebClient(process.env.SLACK_TOKEN);

const getMessageTimestamps = async(): Promise<string[]> => {
  try {
    const result = await client.conversations.history({channel: CHANNEL});

    if (result.messages == undefined) {
      return []
    }

    return result.messages.map((message: Message): string => message.ts || '');
  } catch (error) {
    return error
  }
}

const getRandomNumber = (max: number) : number=> {
  return Math.floor(Math.random() * max)
}

const getPermaLink = async(messageTimeStamp: string): Promise<string | undefined> => {
  const result = await client.chat.getPermalink({channel: CHANNEL, message_ts: messageTimeStamp})
  return result.permalink;
}

(async() => {
  const timeStamps = await getMessageTimestamps();
  const i = getRandomNumber(timeStamps.length)
  console.log(await getPermaLink(timeStamps[i]))
})();
