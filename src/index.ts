import { WebClient } from '@slack/web-api';
import { Message } from '@slack/web-api/dist/response/GroupsRepliesResponse';

const CHANNEL_ID = process.env.CHANNEL_ID || '';

const client = new WebClient(process.env.SLACK_TOKEN);

const getMessageTimestamps = async(): Promise<string[]> => {
  try {
    const result = await client.conversations.history({channel: CHANNEL_ID});

    if (result.messages == undefined) {
      return []
    }

    return result.messages.map((message: Message): string => message.ts || '');
  } catch (error) {
    console.log(`fail: getMessageTimestamps error is ${error}`)
    return error;
  }
}

const getRandomNumber = (max: number) : number=> {
  return Math.floor(Math.random() * max)
}

const getPermaLink = async(messageTimeStamp: string): Promise<string> => {
  try {
    const result = await client.chat.getPermalink({channel: CHANNEL_ID, message_ts: messageTimeStamp})
    return result.permalink || '';
  } catch (error) {
    console.log("fail: getPermaLink error is ${error}")
    return error;
  }
}

const postMessageLink = async (link: string): Promise<void> => {
  try {
    await client.chat.postMessage({channel: CHANNEL_ID, text: link})
  } catch (error) {
    console.log("fail: postMessageLink error is ${error}")
    console.log(error)
  }
}

(async() => {
  const timeStamps = await getMessageTimestamps();
  const i = getRandomNumber(timeStamps.length)
  const link = await getPermaLink(timeStamps[i])
  await postMessageLink(link)
})();
