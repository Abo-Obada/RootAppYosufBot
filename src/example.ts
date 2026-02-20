import data from "./json/badWorldList.json";


import {
  rootServer,
  MessageType,
  ChannelMessageEvent,
  ChannelMessageCreatedEvent,
  ChannelMessageCreateRequest,
  CommunityJoinedEvent,
  CommunityEvent,
  CommunityMemberBanEvent,
  CommunityMemberBanCreatedEvent,
  ChannelGuid,
  ChannelMessageDeleteRequest,
  UserGuid,
  RootApiException,
  ErrorCodeType,
  ChannelGroupGuid,

} from "@rootsdk/server-bot";

import {canBan, canKick} from "./permissions"


export function initializeExample(): void {

  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated, onBanCommand);
  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated, onKickCommand);
  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated, onTimeout);
  rootServer.community.communityMemberBans.on(CommunityMemberBanEvent.CommunityMemberBanCreated,onBanUsersEvent);
  rootServer.community.communities.on(CommunityEvent.CommunityJoined,onJoinMember);
  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated,onBadWordRemoval);
  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated,onPreventLinks);
  rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated,onHelp);
 // rootServer.community.channelMessages.on(ChannelMessageEvent.ChannelMessageCreated,onCloseServer);
}    

//ban the fuck ass of users
async function  onBanCommand(evt: ChannelMessageCreatedEvent): Promise<void> {

  const banArr = ["/ban ", "/حظر ","/توكل "];
  if(evt.messageType === MessageType.System) return;
  const ban:string | undefined = banArr.find(n=> evt.messageContent.startsWith(n.trim()));
  if(typeof ban ==="string"){

  const isAuth:boolean = await canBan(evt.userId);
  if(!isAuth){
   await rootServer.community.channelMessages.create({channelId: evt.channelId, content: `ليس لديك صلاحية الحظر المستخدمين يا منيوك `});
   return;
  }

  //fetch the id after writing the command.
  const rawId: string | undefined = evt.messageContent.match(/user\/([^)]*)/)?.[1].toString();
  if(typeof rawId === "string"){
    //using the assertion of string as UserGuid
    const userId = rawId as UserGuid;
    try {
      //execute ban
    await rootServer.community.communityMemberBans.create({userId: userId});
    } catch (error) {
      if(error instanceof RootApiException){
        if(error.errorCode === ErrorCodeType.NoPermissionToBan){
        }
      }
    }
  }
  }
}

//set timeout
async function  onTimeout(evt: ChannelMessageCreatedEvent): Promise<void> {

  
  const banArr = ["/timeout ", "/توقيف ","/مؤقت "];
  if(evt.messageType === MessageType.System) return;
  const ban:string | undefined = banArr.find(n=> evt.messageContent.startsWith(n.trim()));
  if(typeof ban ==="string"){

  const isAuth:boolean = await canBan(evt.userId);
  if(!isAuth){
   await rootServer.community.channelMessages.create({channelId: evt.channelId, content: `شوف يا كس, بس المعلم يلي بيعطي تايم أوت `});
   return;
  }

  //fetch the id after writing the command.
  const rawId: string | undefined = evt.messageContent.match(/user\/([^)]*)/)?.[1].toString();
  if(typeof rawId === "string"){
    //using the assertion of string as UserGuid
    const userId = rawId as UserGuid;
    try {
      //execute ban
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1);
    (await rootServer.community.communityMemberBans.create({userId: userId,expiresAt: expiresAt}));
    } catch (error) {
      if(error instanceof RootApiException){
        if(error.errorCode === ErrorCodeType.NoPermissionToBan){
        }
      }
    }
  }
  }
}

//the shit ass of the users
async function  onKickCommand(evt: ChannelMessageCreatedEvent): Promise<void> {
  
  const banArr = ["/kick ", "/طرد ","/انقلع "];
  if(evt.messageType === MessageType.System) return;
  const ban:string | undefined = banArr.find(n=> evt.messageContent.startsWith(n.trim()));
  if(typeof ban ==="string"){

  //if user has no perm, it will won't ban.
  const isAuth:boolean = await canKick(evt.userId);
  if(!isAuth){
   await rootServer.community.channelMessages.create({channelId: evt.channelId, content: `ليس لديك صلاحية للطرد المستخدمين يا منيوك 
    إذ بدك فيك تنيك حالك فعادي `});
   return;
  }

  //fetch the id after writing the command.
  const rawId: string | undefined = evt.messageContent.match(/user\/([^)]*)/)?.[1].toString();
  if(typeof rawId === "string"){
    //using the assertion of string as UserGuid
    const userId = rawId as UserGuid;
    try {
      //execute ban
    await rootServer.community.communityMemberBans.kick({userId: userId});
    } catch (error) {
      if(error instanceof RootApiException){
        if(error.errorCode === ErrorCodeType.NoPermissionToBan){
        }
      }
    }
  }
  }
}
//notify who banned
 async function onBanUsersEvent(evt: CommunityMemberBanCreatedEvent): Promise<void> {
  console.log("The user has been banned!");
}
//determine who joined
async function onJoinMember(evt: CommunityJoinedEvent): Promise<void>{
  const user:string = (await rootServer.community.communityMembers.get(evt)).nickname;
  const customMessage:string = `نورت السيرفر يا ${user} `;
  const channelId:string =  "002cf492-4958-8304-bc09-1dd5d55617a5";
  rootServer.community.channelMessages.create({channelId: channelId as ChannelGuid, content:customMessage});
}
//clean input from curse words
async function onBadWordRemoval(evt: ChannelMessageCreatedEvent) : Promise<void> {
  
  const message:string = evt.messageContent;
  const normalized = message.toLowerCase();

const clean = normalized
    .toLowerCase()
    .replace(/[^a-z\s]/g, "");

  const isBad = data.some(item => new RegExp(`\\b(${item.match.toLocaleLowerCase()})\\b`).test(clean));

 if(isBad){
  try {
  await rootServer.community.channelMessages.delete({channelId: evt.channelId, id: evt.id});
  await rootServer.community.channelMessages.create({channelId: evt.channelId,content: "Watch your language, the diddy is watching 👀"});
  } catch (RootApiException) {
    console.log(RootApiException);
  }
}
}

async function onPreventLinks(evt: ChannelMessageCreatedEvent): Promise<void> {
  const urlRegex = /\b((https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}([\/?#][^\s]*)?)\b/gi
  const matches = evt.messageContent.match(urlRegex);

  if (!matches) return;

  for (const raw of matches) {
    try {
      const normalized = raw.startsWith('http')? raw : `https://${raw}`;

      new URL(normalized);

      console.log('Blocked link:', raw);
      rootServer.community.channelMessages.delete({channelId: evt.channelId, id: evt.id});
      rootServer.community.channelMessages.create({channelId: evt.channelId, content: `ممنوع اللنكات `});
      return; 
    } catch {

    }
  }
}

async function onHelp(evt: ChannelMessageCreatedEvent):Promise<void> {
  if(!evt.messageContent.startsWith("/help")) return;

  rootServer.community.channelMessages.create({channelId: evt.channelId, 
    content:`ts
    من أجل حظر المستخدمين أستخدم 
    /ban
    /حظر
    /توكل
    من أجل طرد المستخدمين 
    /kick
    /طرد
    /أنقلع
    من أجل توقيف المستخدمين 
    /timeout 
    /توقيف
    /مؤقت
    `});
}

//  async function onCloseServer(evt: ChannelMessageCreatedEvent):Promise<void> {
//    const prefix:string = "/close";
//    if(evt.messageType === MessageType.System) return;

//    try {
//       const everyoneRole =  (await rootServer.community.communityRoles.list()).find(n=>n.name ==="EVERYONE");
//       if(everyoneRole){
//           const channelGroupId = "002d16e3-80e4-8105-8d60-013a50a362a1" as ChannelGroupGuid;
//         await rootServer.community.channelGroups.emit("channelGroup.edited",{channelGroupPermission:{}})
//       }
//     }catch(error){
//       console.log(error);
//     }
//  }
