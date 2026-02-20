//This is where unwated codes live here........


//welcome users on welcome channel
// async function getWelcomeChannel(groupChannelName:string, channelName:string)  {
//   const getChannelGroups = await rootServer.community.channelGroups.list();

//   const channelGroup = getChannelGroups.find(n=>n.name === groupChannelName);
//     if(channelGroup && channelGroup.id){
//       const channelListRequestId:ChannelListRequest = {channelGroupId: channelGroup.id};
//       const channelsRequest:Channel[] = (await rootServer.community.channels.list(channelListRequestId));
//       const channels = channelsRequest.find(r=>r.name === channelName);
//       if(channels && channels.id){
//        return channels.id;
//       }
//     }
//     return undefined;
// }



//  async function onCloseServer(evt: ChannelMessageCreatedEvent):Promise<void> {
//    const prefix:string = "/close";
//    if(evt.messageType === MessageType.System) return;

//    try {
//       const everyoneRole =  (await rootServer.community.communityRoles.list()).find(n=>n.name ==="EVERYONE");
//       if(everyoneRole){
//         await rootServer.community.communityRoles.edit({id: everyoneRole.id,colorHex:everyoneRole.colorHex,isMentionable:everyoneRole.isMentionable, name:everyoneRole.name,channelPermission:{
//           channelCreateMessage: false,
//         channelAppKick: false,
//       channelCreateFile: false,
//     channelCreateMessageAttachment:false,
//   channelCreateMessageMention:false,
// channelCreateMessageReaction:false,
// channelDeleteMessageOther:false,
// channelFullControl:false,
// channelMakeMessagePublic:false,
// channelManageFiles: false,
// channelManagePinnedMessages: false,
// channelMoveUserOther: false,
// channelUseExternalEmoji: false,
// channelVideoStreamMedia: false,
// channelView: false,
// channelViewFile: false,
// channelViewMessageHistory: false,
// channelVoiceDeafenOther: false,
// channelVoiceKick: false,
// channelVoiceMuteOther: false,
// channelVoiceTalk: false,
// }})
//       }
     
//     } catch (xcpt: unknown) {
//      if (xcpt instanceof RootApiException) {
//       if(xcpt.errorCode === ErrorCodeType.NoPermissionToCreate){
//         console.log(xcpt);
//       }

//      }
//    }
//  }